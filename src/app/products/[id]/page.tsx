import Image from "next/image";
import { Product } from "@/types/product";

import SmartHeader from "@/components/SmartHeader";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Bus, ChevronRight, RefreshCcw, Star } from "lucide-react";

import MoretoLove from "@/components/MoretoLove";
import GoBack from "@/components/GoBack";
import AnimatedCartButton from "@/components/AnimatedCartButton";
import AnimatedHeart from "@/components/AnimatedHeart";
import PageTransition from "@/components/PageTransition";
async function fetchProducts(): Promise<Product[]> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "";
  const res = await fetch(`${base}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.products || [];
}
type PageProps = {
  params: {
    id: string;
  };
};

async function fetchSingleProduct(id: string): Promise<Product | null> {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "";

  const res = await fetch(`${base}/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  console.log(data);
  return data;
}

export default async function ProductDetails({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchSingleProduct(id);
  const products = await fetchProducts();

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }
  const averageRating =
    product.reviews.length > 0
      ? product.reviews.reduce(
          (acc: number, review) => acc + review.rating,
          0,
        ) / product.reviews.length
      : 0;

  return (
    <PageTransition>
      <div className="p-2 mt-5  pb-40 ">
        <SmartHeader />

        <div className="grid md:grid-cols-2 gap-8 ">
          {/* LEFT: IMAGE */}
          <div
            id="description"
            className="flex justify-center border rounded-2xl border-gray-400 relative scroll-mt-40 "
          >
            <Image
              src={product.images[0]}
              alt={product.title}
              width={300}
              height={300}
              className="object-contain "
            />

            <AnimatedCartButton className="top-3 right-3 flex items-center " />
            <AnimatedHeart className="bottom-3 right-3" />

            <GoBack />
            <span className=" absolute text-green-600 bottom-3 left-3 text-xl mt-2">
              ${product.price}
            </span>
          </div>

          <div className="mb-6">
            <h1 className="text-2xl font-bold">{product.title}</h1>

            <p className="text-gray-600 mt-2">{product.description}</p>

            {/* Shipping Info */}
            <div id="shipping" className="my-6 m  py-3 scroll-mt-40 r">
              <h3 className="font-bold  text-green-500  text-[1.2rem]   ">
                Shipping Information
              </h3>
              <div className="flex flex-row justify-between items-center border-b border-b-gray-300 py-4 cursor-pointer">
                <div className="flex flex-row mt-1 mb-2">
                  <Bus size={24} className="text-green-500 mr-3" />
                  <div className="flex flex-col">
                    <div className="font-bold">Estimated delivery</div>
                    <p className="text-sm text-gray-500">
                      Delivery:{" "}
                      <span className="font-bold text-black">
                        7 business days
                      </span>
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-gray-500" />
              </div>
              <div className="flex flex-row my-3 justify-between items-center border-b border-b-gray-300 py-4 cursor-pointer">
                <div className="flex flex-row">
                  <RefreshCcw size={24} className="text-green-500 mr-3" />

                  <div className="font-bold">Return & refund Policy</div>
                </div>
                <ChevronRight className="text-gray-500" />
              </div>
              <div className="flex flex-row my-3 justify-between items-center border-b border-b-gray-300 py-4 cursor-pointer">
                <div className="flex flex-row">
                  <Bus size={24} className="text-green-500 mr-3" />
                  <div className="flex flex-col">
                    <div className="font-bold">Security & Privacy</div>
                    <p className="text-sm text-gray-500 ">
                      <span>we do not share your personal details with...</span>
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-gray-500" />
              </div>
            </div>

            {/* description */}
            <div id="reviews" className="p-3 scroll-mt-40">
              <h1 className="font-bold text-green-500 text-[1.2rem]">
                Reviews
              </h1>
              <div className="flex flex-row items-center py-2 border-b border-b-gray-300">
                <div className="font-bold text-2xl  ">
                  {averageRating.toFixed(1)}
                </div>
                <div className="flex mx-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={
                        star <= Math.round(averageRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <div className="text-gray-500 text-sm">
                  ({product.reviews.length} reviews)
                </div>
              </div>
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className=" pb-2 ">
                    <div className="flex items-center justify-between ">
                      <div className="flex flex-row  items-center">
                        <img
                          src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(
                            review.reviewerName,
                          )}`}
                          alt={review.reviewerName}
                          className="w-15 h-15 rounded-full  mr-2"
                        />
                        <h3 className="font-semibold">{review.reviewerName}</h3>
                      </div>
                      <span className="text-sm text-gray-400">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex ">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>

                    <p className="text-gray-600 mt-1">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div id="moretolove" className="scroll-mt-40">
          <MoretoLove products={products} />
        </div>

        <div className="fixed bottom-20 mt-6  px-6 py-3 w-full bg-white z-50 left-0 right-0  flex items-center justify-center">
          <button className="bg-black w-[80%]  text-white rounded-full py-2">
            Place Order
          </button>
        </div>

        <ScrollToTopButton />
      </div>
    </PageTransition>
  );
}
