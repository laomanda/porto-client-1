import Container from "../layout/Container";
import { siteData } from "../../data/siteData";

export default function Footer() {
  return (
    <footer className="border-t border-brand-gold/10 py-8">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-xl text-brand-green">{siteData.brand.name}</h3>
        </div>

        <div className="text-sm text-brand-muted">
          © 2026 {siteData.brand.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
