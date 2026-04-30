"use client";

import { useEffect, useState } from "react";

type CloudImage = {
  public_id: string;
  folder: string;
  tags?: string[];
};

type ApiResponse = {
  images: CloudImage[];
  categories: string[];
};

export default function AdvancedGallery() {
  const [images, setImages] = useState<CloudImage[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/images");
      const data: ApiResponse = await res.json();

      setImages(data.images);
      setCategories(data.categories);
    }

    fetchData();
  }, []);

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) =>
        img.folder.includes(activeCategory)
      );

  return (
    <div>
      {/* CATEGORY FILTERS */}
      <div className="flex gap-3 flex-wrap mb-6">
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

      {/* GALLERY */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filtered.map((img) => (
          <img
            key={img.public_id}
            src={`https://res.cloudinary.com/dvpj0q2lv/image/upload/${img.public_id}`}
            className="rounded-xl"
          />
        ))}
      </div>
    </div>
  );
}
