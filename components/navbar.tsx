"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-100">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">

        {/* BRAND */}
        <h1 className="font-serif text-2xl tracking-wide font-bold">
          BrandName
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-black text-gray-600 transition">
            Home
          </Link>
          <Link href="/gallery" className="hover:text-black text-gray-600 transition">
            Gallery
          </Link>
          <Link href="/about" className="hover:text-black text-gray-600 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-black text-gray-600 transition">
            Contact
          </Link>
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/233XXXXXXXXX"
          target="_blank"
          className="hidden md:inline-flex bg-black text-white px-5 py-2 rounded-full text-sm hover:bg-gray-800 transition"
        >
          Order on WhatsApp
        </a>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-4 bg-white border-t">
          <Link href="/" className="block">Home</Link>
          <Link href="/gallery" className="block">Gallery</Link>
          <Link href="/about" className="block">About</Link>
          <Link href="/contact" className="block">Contact</Link>

          <a
            href="https://wa.me/233XXXXXXXXX"
            target="_blank"
            className="block bg-black text-white text-center py-2 rounded-full mt-4"
          >
            Order on WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
