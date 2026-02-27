import Image from "next/image";

import SmartHeader from "@/components/SmartHeader";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Bus, ChevronRight, RefreshCcw, Star } from "lucide-react";

import MoretoLove from "@/components/MoretoLove";
import GoBack from "@/components/GoBack";
import AnimatedCartButton from "@/components/AnimatedCartButton";
import AnimatedHeart from "@/components/AnimatedHeart";
import PageTransition from "@/components/PageTransition";
import { fetchSingleProduct } from "@/lib/products";
import { fetchProducts } from "@/lib/products";

type PageProps = {
  params: { id: string };
};

export default async function ProductDetails({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchSingleProduct(id);
  const products = await fetchProducts();

  if (!product) {
    return <div className="p-10 text-center">Product not found</div>;
  }
  const isDeal = product.isSuperDeal === true;
  const discountedPrice = Math.round(product.price * 0.2);
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

            <GoBack className="top-5  left-3" />

            <span className="absolute bottom-3 left-3 text-xl mt-2">
              {isDeal ? (
                <div className="flex items-center gap-2">
                  <span className="text-red-600 font-bold">
                    ${discountedPrice}
                  </span>
                  <span className="line-through text-gray-400 text-sm">
                    ${product.price}
                  </span>
                  <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-md font-bold">
                    -80%
                  </span>
                </div>
              ) : (
                <span className="text-green-600">${product.price}</span>
              )}
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

        <button className="bg-green-800 fixed bottom-25 mt-6 flex items-center w-[60px] h-[60px] justify-center  text-white rounded-full animate-bounce hover:scale-105 z-50 font-bold cursor-pointer ">
          Order
        </button>

        <ScrollToTopButton />
      </div>
    </PageTransition>
  );
}
