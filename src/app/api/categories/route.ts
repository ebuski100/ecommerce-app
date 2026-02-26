import { NextResponse } from "next/server";
import { getCategories } from "@/lib/products";

export async function GET() {
  try {
    const res = await getCategories();
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
