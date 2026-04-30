// components/GalleryWithFilter.jsx
"use client";

import { useState } from "react";

const categories = ["All", "Wedding", "Casual", "Traditional"];

const designs = [
  {
    id: 1,
    image: "/dress1.jpg",
    category: "Wedding",
    title: "Elegant Wedding Dress",
  },
  {
    id: 2,
    image: "/dress2.jpg",
    category: "Casual",
    title: "Casual Chic",
  },
  {
    id: 3,
    image: "/dress3.jpg",
    category: "Traditional",
    title: "Kente Style",
  },
  {
    id: 4,
    image: "/dress4.jpg",
    category: "Wedding",
    title: "Luxury Bridal",
  },
  {
    id: 5,
    image: "/dress5.jpg",
    category: "Casual",
    title: "Simple Fit",
  },
];

export default function GalleryWithFilter() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState(null);

  const filtered =
    activeCategory === "All"
      ? designs
      : designs.filter((d) => d.category === activeCategory);

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* HEADER */}
      <h1 className="text-3xl text-center mb-8 font-bold">
        Our Designs
      </h1>

      {/* FILTERS */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full border ${activeCategory === cat
              ? "bg-black text-white"
              : "bg-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="cursor-pointer overflow-hidden rounded-xl"
            onClick={() => setSelected(item)}
          >
            <img
              src={item.image}
              className="hover:scale-110 transition duration-300"
            />
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-xl max-w-lg w-full relative">

            {/* CLOSE BUTTON */}
            <button
              className="absolute top-2 right-3 text-xl"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>

            {/* IMAGE */}
            <img
              src={selected.image}
              className="rounded-lg mb-4"
            />

            {/* TITLE */}
            <h2 className="text-xl font-semibold mb-4">
              {selected.title}
            </h2>

            {/* WHATSAPP BUTTON */}
            <a
              href={`https://wa.me/233XXXXXXXXX?text=Hello%20I%20like%20this%20design:%20${encodeURIComponent(
                selected.title
              )}`}
              target="_blank"
              className="bg-green-500 text-white px-6 py-3 rounded-lg block text-center"
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
