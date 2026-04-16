import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const rootDir = path.resolve(import.meta.dirname, "..");
const publicDir = path.join(rootDir, "public");
const svgPath = path.join(publicDir, "favicon.svg");
const icoPath = path.join(publicDir, "favicon.ico");
const sizes = [16, 32, 48, 64, 256];

function pngPath(size) {
  return path.join(publicDir, `favicon-${size}x${size}.png`);
}

async function renderPng(size, svgBuffer) {
  return sharp(svgBuffer, { density: 384 })
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
}

async function buildFavicon() {
  const svgBuffer = await readFile(svgPath);
  const pngBuffers = await Promise.all(
    sizes.map((size) => renderPng(size, svgBuffer)),
  );

  await Promise.all(
    pngBuffers.map((buffer, index) => writeFile(pngPath(sizes[index]), buffer)),
  );

  const icoBuffer = await pngToIco(pngBuffers);
  await writeFile(icoPath, icoBuffer);

  console.log(
    `Generated favicon assets from ${path.relative(rootDir, svgPath)} (${sizes.join(", ")} px)`,
  );
}

buildFavicon().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
