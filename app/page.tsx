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
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        {/* SPINNER */}
        <div className="relative">
          <div className="w-10 h-10 border-2 border-green-500 rounded-full"></div>
          <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>

        {/* TEXT */}
        <p className="mt-4 text-sm tracking-widest text-gray-500 uppercase">
          Loading collection
        </p>
      </div>
    )
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
