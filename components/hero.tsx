'use client'
import { CldImage } from "next-cloudinary";

export default function Hero({ image }: any) {
  if (!image) return null;
  return (
    <section className="relative h-screen flex items-center justify-center text-white">
      <CldImage
        src={image.public_id}
        fill
        alt="fashion/hero"
        className="object-cover"
        quality="auto:best"
      />

      <div className="absolute bg-black/50 p-10 text-center rounded-xl">
        <h1 className="text-5xl font-bold mb-4">
          Custom-Made Dresses That Define You
        </h1>
        <p className="mb-6">Elegant. Unique. Tailored for You.</p>

        <a
          href="https://wa.me/233553782097"
          className="bg-green-500 px-6 py-3 rounded-lg"
        >
          Order on WhatsApp
        </a>
      </div>
    </section>
  );
}
