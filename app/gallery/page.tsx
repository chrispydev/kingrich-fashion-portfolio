// app/gallery/page.js
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/whatsapp-button";
import AdvancedGallery from "@/components/advanced-gallery";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <AdvancedGallery />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
