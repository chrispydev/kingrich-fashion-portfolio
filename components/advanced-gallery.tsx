"use client";

import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence } from "framer-motion";

type CloudImage = {
  public_id: string;
  secure_url: string;
};

type SelectedImage = CloudImage & {
  images: string[];
};

export default function AdvancedGallery() {
  const [images, setImages] = useState<CloudImage[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");

  const [selected, setSelected] = useState<SelectedImage | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(true);

  // ---------------------------
  // FETCH IMAGES
  // ---------------------------
  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch("/api/images");
        const data: CloudImage[] = await res.json();

        const cats = new Set<string>();

        data.forEach((img) => {
          const parts = img.public_id.split("/");
          if (parts.length >= 2) {
            cats.add(parts[1]); // category = wedding, casual, etc.
          }
        });

        setCategories(["All", ...Array.from(cats)]);
        setImages(data);
      } catch (error) {
        console.error("Failed to load images", error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, []);

  // reset loading when modal image changes
  useEffect(() => {
    setImgLoading(true);
  }, [currentIndex, selected]);

  // ---------------------------
  // FILTER
  // ---------------------------
  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => {
        const parts = img.public_id.split("/");
        return parts[1] === activeCategory;
      });

  // ---------------------------
  // LOADING SCREEN
  // ---------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-10 h-10 border-2 border-green-500 rounded-full"></div>
          <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>

        <p className="mt-4 text-sm tracking-widest text-gray-500 uppercase">
          Loading collection
        </p>
      </div>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-3xl text-center mb-8 font-bold">
        Our Designs
      </h1>

      {/* CATEGORY FILTERS */}
      <div className="flex justify-center gap-3 flex-wrap mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border transition ${activeCategory === cat
              ? "bg-black text-white"
              : "bg-white text-black"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {filtered.map((item) => (
          <motion.div
            key={item.public_id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cursor-pointer break-inside-avoid"
            onClick={() => {
              setSelected({
                ...item,
                images: [item.public_id], // single image
              });
              setCurrentIndex(0);
            }}
          >
            <CldImage
              src={item.public_id}
              width={400}
              height={500}
              className="rounded-xl hover:scale-105 transition"
              quality="auto"
              format="auto"
              alt="design"
            />
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-4 rounded-xl max-w-lg w-full relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* CLOSE */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-50 w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-black hover:scale-105 transition"
              >
                ✕
              </button>

              {/* IMAGE */}
              <div className="relative">
                {imgLoading && (
                  <div className="w-full h-100 bg-gray-200 animate-pulse rounded-lg" />
                )}

                <CldImage
                  alt="design"
                  src={selected.images[currentIndex]}
                  width={800}
                  height={1000}
                  className={`rounded-lg mb-4 w-full h-100 object-cover transition-opacity duration-500 ${imgLoading ? "opacity-0" : "opacity-100"
                    }`}
                  quality="auto:best"
                  onLoad={() => setImgLoading(false)}
                />
              </div>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/233540791479?text=${encodeURIComponent(
                  `Hello, I like this design: ${selected.secure_url}`
                )}`}
                target="_blank"
                className="bg-green-500 text-white px-6 py-3 rounded-lg block text-center"
              >
                Order via WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
