import CartUI from "../../components/CartUI";

import { getCartProducts, getCartedProducts } from "@/lib/products";
import Footer from "@/components/Footer";

export default async function CartPage() {
  const products = await getCartProducts();
  const cartedProducts = await getCartedProducts();
  const cartIds = cartedProducts.map((p) => p.id);

  return (
    <div>
      <CartUI
        products={products}
        cartedProducts={cartedProducts}
        cartIds={cartIds}
      />
      <Footer cartIds={cartIds} />
    </div>
  );
}
