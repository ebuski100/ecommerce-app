import React from "react";
import { Zap, ChevronRight, Camera, Search } from "lucide-react";
import FlashCountdown from "@/components/FlashCountdown";
import { getCategories, getSpecProduct } from "@/lib/products";
import Image from "next/image";

import Link from "next/link";
import AnimatedHeart from "@/components/AnimatedHeart";
import Footer from "@/components/Footer";
type Category = {
  slug: string;
  name: string;
};
type Props = {
  categories: Category[];
  activeCategory?: string;
};
const Home = async ({ activeCategory }: Props) => {
  const products = await getSpecProduct();
  const ads = [
    { id: 1, img: "/adidas.jfif" },
    { id: 2, img: "/Brand Identity.jfif" },
    { id: 3, img: "/onlineShopping.jfif" },
    { id: 4, img: "/peanut.jfif" },
    { id: 5, img: "/psd.jfif" },
    { id: 6, img: "/summersale.jfif" },
    { id: 7, img: "/type.jfif" },
    { id: 8, img: "/userInfo folder.jpg" },
  ];
  const categories = await getCategories();

  // 🔥 Deterministic daily random generator
  function getDailyRandomItems<T>(items: T[], count: number) {
    const seed = new Date().getDate(); // changes daily

    // Simple seeded shuffle
    const shuffled = [...items].sort((a, b) => {
      const hashA = JSON.stringify(a).length + seed;
      const hashB = JSON.stringify(b).length + seed;
      return (hashA % 10) - (hashB % 10);
    });

    return shuffled.slice(0, count);
  }
  const superDeals = getDailyRandomItems(products, 6);

  return (
    <div className="pb-30">
      <div className="flex  flex-col  items-center   mt-40">
        <div
          className={`z-50 p-2 shadow fixed top-0 right-0 left-0 bg-white mb-6 `}
        >
          <div>
            <div>
              <input
                type="text"
                placeholder="I'm shopping for..."
                className="relative w-full border rounded-[1rem] p-3 "
              />
            </div>
            <Camera
              className="absolute top-8 right-20 -translate-y-1/2 text-gray-500 cursor-pointer"
              size={30}
            />

            <Search
              size={30}
              className="absolute top-8 right-4 -translate-y-1/2 text-gray-500 cursor-pointer bg-black text-white rounded-2xl w-[50px] p-1 "
            />
          </div>
          <div className="w-full overflow-x-auto py-4">
            <div className="flex gap-4 px-2 min-w-max">
              {categories.map((cat: Category) => (
                <Link
                  href={`/products/category/${cat.slug}`}
                  key={cat.slug}
                  className={`flex-shrink-0 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition ${activeCategory === cat.slug ? "text-green-600 font-semibold" : "hover-text-green-500"}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden  pb-4">
        <div className="marquee-track">
          <div className="marquee-content">
            {ads.map((ad) => (
              <div
                key={ad.id}
                className="relative w-[500px] h-[300px]   overflow-hidden  border"
              >
                <Image
                  src={ad.img}
                  alt="ad"
                  height={200}
                  width={500}
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Duplicate once */}
          <div className="marquee-content">
            {ads.map((ad) => (
              <div
                key={`dup-${ad.id}`}
                className="relative w-[250px] h-[150px] shrink-0  overflow-hidden"
              >
                <Image
                  src={ad.img}
                  alt="ad"
                  fill
                  className="object-cover"
                  sizes="250px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-row justify-between p-2 acitve:bg-red-500/30">
          <h1 className="font-bold text-[18px] flex flex-row  items-center">
            <Zap className="fill-red-500 stroke-none mr-1" />
            Super deals
          </h1>
          <div className="text-red-500 flex flex-row items-center  p-1 font-bold rounded-2xl p-2">
            <p> 50% off</p>

            <FlashCountdown />
            <Link href={`/superDeals`}>
              <ChevronRight className="ml-2" />
            </Link>
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto px-2 pb-4 my-4  px-5">
          {superDeals.map((product) => {
            const discountedPrice = Math.round(product.price * 0.5);

            return (
              <div
                key={product.id}
                className="min-w-[180px] bg-white rounded-xl p-3 shadow-sm relative"
              >
                {/* 80% Badge */}
                {product.images && (
                  <div className="flex justify-center">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="object-contain"
                    />
                  </div>
                )}
                <AnimatedHeart className="absolute top-5 right-5" />
                <h2 className="text-sm font-medium mt-2 line-clamp-2">
                  {product.title}
                </h2>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-red-600 font-bold text-lg">
                    ${discountedPrice}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ${product.price}
                  </span>

                  <span className=" bg-red-600 text-white text-xs px-2 py-1 rounded-lg font-bold">
                    -50%
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-4 overflow-y-auto px-2 pb-4 my-4 flex-col">
          <div className="flex flex-row justify-between font-bold bg-gray-200/30 p-2 cursor-pointer">
            <h1 className="text-[18px]">Recommended for you</h1>
            <ChevronRight size={24} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
            {products.length === 0 ? (
              <div className="col-span-full text-center py-10 text-gray-500 text-lg">
                No products found.
              </div>
            ) : (
              products.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="rounded-lg p-3 shadow-md  m-2 cursor-pointer block relative"
                >
                  {product.images && (
                    <div className="flex justify-center ">
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="object-contain"
                      />
                    </div>
                  )}
                  <AnimatedHeart className="top-3 right-3 absolute" />
                  <h2 className="font-medium text-green-500 mt-2">
                    {product.title}
                  </h2>
                  <p className="text-gray-500">${product.price}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
