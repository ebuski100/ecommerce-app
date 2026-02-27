import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { productId, action } = await req.json();

  const cookieStore = await cookies();
  const existing = cookieStore.get("cart");

  const cart: number[] = existing?.value ? JSON.parse(existing.value) : [];

  const id = Number(productId);
  let updatedCart = [...cart];

  if (action === "add") {
    if (!updatedCart.includes(id)) {
      updatedCart.push(id);
    }
  }

  if (action === "remove") {
    updatedCart = updatedCart.filter((item) => item !== id);
  }

  if (action === "clear") {
    updatedCart = [];
  }

  cookieStore.set("cart", JSON.stringify(updatedCart), {
    httpOnly: true,
    path: "/",
  });

  return NextResponse.json({
    success: true,
    cart: updatedCart,
  });
}
