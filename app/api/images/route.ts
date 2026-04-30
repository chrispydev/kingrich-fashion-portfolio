import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

type CloudinaryResource = {
  public_id: string;
  secure_url: string;
  created_at: string;
  tags?: string[];
};

type CloudinarySearchResult = {
  resources: CloudinaryResource[];
};

export async function GET() {
  try {
    const result = (await cloudinary.search
      .expression("folder:fashion/*")
      .sort_by("created_at", "desc")
      .max_results(30)
      .execute()) as CloudinarySearchResult;
    return NextResponse.json(result.resources);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
