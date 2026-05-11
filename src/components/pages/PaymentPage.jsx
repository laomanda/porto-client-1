import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle, MessageCircle } from "lucide-react";
import Container from "../layout/Container";
import qrisImage from "../../assets/qris.jpeg";

export default function PaymentPage({ onBack }) {
  const whatsappNumber = "+6283104688084";
  const whatsappMessage = encodeURIComponent("Halo Ustadz Bagus, saya sudah melakukan pembayaran untuk program. Mohon konfirmasinya.");
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-brand-ivory pt-24 pb-20">
      <Container className="max-w-2xl">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-brand-green hover:text-brand-green-light transition-colors mb-8 group"
        >
          <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
          <span className="font-medium">Kembali</span>
        </button>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-3xl p-8 shadow-2xl border border-brand-green/5 text-center"
        >
          <h2 className="text-3xl font-display font-bold text-brand-green mb-2">Pembayaran QRIS</h2>
          <p className="text-brand-muted mb-8">Silakan scan kode QR di bawah ini untuk menyelesaikan transaksi.</p>

          <div className="relative mx-auto w-full max-w-sm aspect-square bg-white border-4 border-brand-ivory rounded-2xl overflow-hidden mb-8 shadow-inner">
            <img 
              src={qrisImage} 
              alt="QRIS Payment" 
              className="w-full h-full object-contain p-4"
            />
          </div>

          <div className="bg-brand-ivory/50 rounded-2xl p-6 mb-8 text-left space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-brand-green" size={18} />
              <span className="text-sm text-brand-dark">Pastikan nominal sesuai dengan harga produk.</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="text-brand-green" size={18} />
              <span className="text-sm text-brand-dark">Simpan bukti transfer Anda.</span>
            </div>
          </div>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-green-700 transition-all shadow-lg shadow-green-600/20"
          >
            <MessageCircle size={20} />
            Saya Sudah Bayar
          </a>
          
          <p className="text-xs text-brand-muted mt-6">
            Butuh bantuan? <a href={whatsappLink} className="text-brand-green underline">Hubungi kami di WhatsApp</a>
          </p>
        </motion.div>
      </Container>
    </div>
  );
}
