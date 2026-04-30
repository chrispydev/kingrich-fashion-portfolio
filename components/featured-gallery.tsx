import { CldImage } from "next-cloudinary";

export default function FeaturedGallery({ images }: any) {

  return (
    <section className="py-16 max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Designs
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {images.map((img: any) => (
          <CldImage
            alt={img.public_id}
            key={img.public_id}
            src={img.public_id}
            width={400}
            height={600}
            crop="fill"
            className="rounded-xl hover:scale-105 transition"
          />
        ))}
      </div>

      <div className="text-center mt-8">
        <a href="/gallery" className="underline">
          View Full Gallery
        </a>
      </div>
    </section>
  );
}
