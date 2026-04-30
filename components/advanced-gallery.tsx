"use client";

import { useEffect, useState } from "react";
import { CldImage } from "next-cloudinary";
import { motion, AnimatePresence } from "framer-motion";

type CloudImage = {
  public_id: string;
  secure_url: string;
  tags?: string[];
};

type GroupedItem = CloudImage & {
  images: string[];
};

export default function AdvancedGallery() {
  const [images, setImages] = useState<CloudImage[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");

  const [selected, setSelected] = useState<GroupedItem | null>(null);
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

          // expected: fashion/featured/image-name
          if (parts.length >= 2) {
            const category = parts[1]; // 👈 TAKE WORD AFTER "fashion"
            if (category && category !== "fashion") {
              cats.add(category);
            }
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

  useEffect(() => {
    setImgLoading(true);
  }, [currentIndex, selected]);
  // ---------------------------
  // GROUP IMAGES (optional expansion)
  // ---------------------------
  const grouped: GroupedItem[] = Object.values(
    images.reduce((acc: any, img) => {
      const key = img.public_id;

      if (!acc[key]) {
        acc[key] = { ...img, images: [] };
      }

      acc[key].images.push(img.public_id);

      return acc;
    }, {})
  );

  // ---------------------------
  // FILTER BY CATEGORY
  // ---------------------------
  const filtered =
    activeCategory === "All"
      ? grouped
      : grouped.filter((img) => {
        const parts = img.public_id.split("/");
        return parts[1] === activeCategory;
      });

  // ---------------------------
  // MODAL NAVIGATION
  // ---------------------------
  const nextImage = () => {
    if (!selected) return;
    setCurrentIndex((prev) =>
      prev === selected.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!selected) return;
    setCurrentIndex((prev) =>
      prev === 0 ? selected.images.length - 1 : prev - 1
    );
  };

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
              ? "bg-black text-green-500"
              : "bg-white text-black"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MASONRY GRID */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {filtered.map((item) => (
          <motion.div
            key={item.public_id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="cursor-pointer break-inside-avoid"
            onClick={() => {
              setSelected(item);
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
                className="fixed cursor-pointer top-3 right-3 z-50 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center text-black hover:scale-105 transition"
              >
                ✕
              </button>
              {/* IMAGE SLIDER */}
              <div className="relative">
                {imgLoading && (
                  <div className="w-full h-50 bg-gray-200 animate-pulse rounded-lg" />
                )}

                <CldImage
                  alt="slider"
                  src={selected.images[currentIndex]}
                  width={800}
                  height={1000}
                  className={`rounded-lg mb-4 transition-opacity duration-500 ${imgLoading ? "opacity-0" : "opacity-100"
                    }`}
                  quality="auto:best"
                  onLoad={() => setImgLoading(false)}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,..."
                />

                {selected.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="fixed left-2 top-1/2 bg-black/50 text-white px-3 py-1 z-50"
                    >
                      ‹
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 bg-black/50 text-white px-3 py-1"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* TITLE */}
              <h2 className="text-xl font-semibold mb-4">
                {selected.public_id.split("/").pop()}
              </h2>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/233553782097?text=Hello%20I%20like%20this%20design`}
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
