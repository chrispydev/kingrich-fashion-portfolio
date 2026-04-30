# 👗 Fashion Portfolio Website

A modern, responsive fashion portfolio website built with **Next.js**, **Tailwind CSS**, and **Cloudinary**.
This platform allows designers to showcase their work beautifully and enables customers to easily view designs and place orders via WhatsApp.

---

## 🚀 Features

* 🖼️ Dynamic image loading from Cloudinary
* 🎨 Category-based filtering (e.g. Wedding, Casual, Featured)
* 📱 Fully responsive design (mobile, tablet, desktop)
* ⚡ Optimized images using Cloudinary transformations
* 🧭 Smooth animations with Framer Motion
* 🔍 Click-to-view modal for design preview
* 💬 Direct WhatsApp integration for customer inquiries
* 🧱 Masonry-style gallery layout (Instagram-inspired)
* ⏳ Elegant loading states and skeleton loaders

---

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Styling:** Tailwind CSS
* **Image Optimization:** Cloudinary
* **Animations:** Framer Motion
* **Language:** TypeScript

---

## 📂 Project Structure

```
/app
  /api/images        # Cloudinary API route
  page.tsx           # Home page

/components
  Navbar.tsx
  Hero.tsx
  AdvancedGallery.tsx
  FeaturedGallery.tsx
  CTASection.tsx
  Footer.tsx

/public              # Static assets (if any)
```

---

## ☁️ Cloudinary Setup

1. Create an account on Cloudinary
2. Upload images using this structure:

```
fashion/
  wedding/
    image1
    image2
  casual/
    image1
  featured/
    image1
```

1. Add environment variables:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 🔌 API Endpoint

Images are fetched via:

```
GET /api/images
```

This endpoint retrieves images from Cloudinary using:

* Folder: `fashion/*`
* Sorted by: latest uploads

---

## 📦 Installation

```bash
git clone https://github.com/chrispydev/kingrich-fashion-portfolio.git
cd kingrich-fashion-portfolio
npm install
npm run dev
```

App will run on:

```
http://localhost:3000
```

---

## 💬 WhatsApp Integration

Each design includes a direct WhatsApp link for inquiries:

```
https://wa.me/<phone-number>?text=<encoded-message>
```

This allows customers to quickly contact the designer with a selected design.

---

## 🎯 Future Improvements

* Multi-image slider per design
* Admin dashboard for uploads
* Product pricing & checkout system
* Search and sorting functionality
* Pagination or infinite scroll
* SEO optimization

---

## 📸 Use Case

This project is ideal for:

* Fashion designers
* Tailors & dressmakers
* Clothing brands
* Small businesses showcasing products visually

---

## 👨‍💻 Author

Developed by **Christian Yaw Owusu**

---

## 📄 License

This project is open-source and available under the MIT License.
