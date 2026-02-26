import CartUI from "../../components/CartUI";

import { getCartProducts } from "@/lib/products";

export default async function CartPage() {
  const products = await getCartProducts();

  return <CartUI products={products} />;
}
