import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  const data = await res.json();

  return NextResponse.json(data);
}
