import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;

  try {
    const res = await getProducts(category);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch products" },
        { status: 400 },
      );
    }

    const data = await res.json();

    if (!data.products || data.products.length === 0) {
      return NextResponse.json(
        { message: "No products found", products: [] },
        { status: 404 },
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
