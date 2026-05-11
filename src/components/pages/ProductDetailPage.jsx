import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShoppingCart } from "lucide-react";
import Container from "../layout/Container";
import { siteData } from "../../data/siteData";

export default function ProductDetailPage({ productId, onBack, onBuy }) {
  const product = siteData.products.find((p) => p.id === productId);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-brand-ivory pt-24 pb-20">
      <Container>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-green hover:text-brand-green-light transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Kembali ke Beranda</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-display font-bold text-brand-green mb-6">
              {product.title}
            </h1>
            <p className="text-lg text-brand-muted leading-relaxed mb-8">
              {product.fullDescription}
            </p>

            <div className="space-y-4 mb-10">
              <h3 className="text-xl font-bold text-brand-dark">Manfaat Program:</h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-brand-gold shrink-0 mt-1" size={20} />
                    <span className="text-brand-muted">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: Pricing Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="sticky top-32"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-brand-green/5 border border-brand-green/5">
              <div className="mb-6">
                <p className="text-brand-muted uppercase tracking-widest text-xs font-bold mb-2">Investasi Program</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-display font-bold text-brand-green">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                  <span className="text-brand-muted">/ program</span>
                </div>
              </div>

              <div className="p-4 bg-brand-ivory rounded-2xl mb-8">
                <p className="text-sm text-brand-muted italic text-center">
                  "Pembelajaran yang bermakna adalah investasi terbaik untuk diri sendiri."
                </p>
              </div>

              <button
                onClick={onBuy}
                className="w-full bg-brand-green text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-brand-green-light transition-all shadow-lg shadow-brand-green/20 group"
              >
                <ShoppingCart size={20} />
                Beli Produk Sekarang
              </button>
              
              <p className="text-center text-xs text-brand-muted mt-4">
                Akses instan setelah konfirmasi pembayaran
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  );
}
