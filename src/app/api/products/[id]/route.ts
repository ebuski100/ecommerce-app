import { NextResponse, NextRequest } from "next/server";
import { getProductById } from "@/lib/products";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const res = await getProductById(id);

  if (!res.ok) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  const data = await res.json();

  return NextResponse.json(data);
}
