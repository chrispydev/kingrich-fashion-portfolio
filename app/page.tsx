'use client'

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import FeaturedGallery from "@/components/featured-gallery";
import CTASection from "@/components/cta-section";
import WhatsAppButton from "@/components/whatsapp-button";

export default function Home() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/images");
        const data = await res.json();
        console.log(data)

        setImages(data); // ✅ IMPORTANT FIX
      } catch (err) {
        console.error("Failed to load images", err);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading images...</div>;
  }

  // 🔥 SPLIT DATA HERE
  const heroImage = images.find(img =>
    img.public_id.includes("hero")
  );

  const featuredImages = images.filter(img =>
    img.folder?.includes("featured")
  );

  return (
    <>
      <Navbar />

      {/* PASS HERO IMAGE */}
      <Hero image={heroImage} />

      {/* PASS FEATURED IMAGES */}
      <FeaturedGallery images={featuredImages} />

      <CTASection />
      <WhatsAppButton />
    </>
  );
}
