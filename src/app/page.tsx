import React from "react";
import { Zap, ChevronRight, Camera, Search } from "lucide-react";
import Image from "next/image";

const Home = () => {
  const superDeals = [
    {
      id: 1,
      title: "iPhone 13 Pro",
      price: 1200,
      image: "https://dummyjson.com/image/i/products/1/1.jpg",
    },
    {
      id: 2,
      title: "AirPods Max",
      price: 500,
      image: "https://dummyjson.com/image/i/products/10/1.jpg",
    },
    {
      id: 3,
      title: "Gaming Laptop",
      price: 2000,
      image: "https://dummyjson.com/image/i/products/6/1.png",
    },
    {
      id: 4,
      title: "Gaming Laptop",
      price: 2000,
      image: "https://dummyjson.com/image/i/products/6/1.png",
    },
    {
      id: 5,
      title: "Gaming Laptop",
      price: 2000,
      image: "https://dummyjson.com/image/i/products/6/1.png",
    },
    {
      id: 6,
      title: "Gaming Laptop",
      price: 2000,
      image: "https://dummyjson.com/image/i/products/6/1.png",
    },
  ];
  const categories = [
    { slug: "electronics", name: "Electronics" },
    { slug: "clothing", name: "Clothing" },
    { slug: "furniture", name: "Furniture" },
    { slug: "books", name: "Books" },
    { slug: "gaming", name: "Gaming" },
    { slug: "toys", name: "Toys" },
    { slug: "beauty", name: "Beauty" },
  ];

  const ads = [
    { id: 1, img: "/adidas.jfif" },
    { id: 2, img: "/Brand Identity.jfif" },
    { id: 3, img: "/onlineShopping.jfif" },
    { id: 4, img: "/peanut.jfif" },
    { id: 5, img: "/psd.jfif" },
    { id: 6, img: "/summersale.jfif" },
    { id: 7, img: "/type.jfif" },
  ];

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
              {categories.map((cat) => (
                <div
                  key={cat.slug}
                  className="flex-shrink-0 px-4 py-2 bg-gray-100 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-200 transition"
                >
                  {cat.name}
                </div>
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
        <div className="flex flex-row justify-between p-2 active:bg-red-200/50 cursor-pointer">
          <h1 className="font-bold text-[18px]">Super deals</h1>
          <div className="text-red-500 flex flex-row bg-red-200/50 p-1 font-bold rounded-2xl">
            <Zap />
            <p>Limited time 80% off</p>
            <ChevronRight />
          </div>
        </div>

        <div className="flex gap-4 overflow-x-auto px-2 pb-4 my-4">
          {superDeals.map((product) => {
            const discountedPrice = Math.round(product.price * 0.2);

            return (
              <div
                key={product.id}
                className="min-w-[180px] bg-white rounded-xl p-3 shadow-sm relative"
              >
                {/* 80% Badge */}

                <img
                  src={product.image}
                  alt={product.title}
                  className="h-28 object-contain mx-auto"
                />

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

                  <span className=" bg-red-600 text-white text-xs px-2 py-1 rounded-md font-bold">
                    -80%
                  </span>
                </div>
              </div>
            );
          })}
          <div className="w-[150px] flex-shrink-0   flex items-center flex-col justify-center cursor-pointer ">
            <div className="w-8 h-8 rounded-full  flex items-center border justify-center">
              <ChevronRight size={24} />
            </div>
            <p>view more</p>
          </div>
        </div>

        <div className="flex gap-4 overflow-y-auto px-2 pb-4 my-4 flex-col">
          <div className="flex flex-row justify-between font-bold bg-gray-200/30 p-2 cursor-pointer">
            <h1 className="text-[18px]">Recommended for you</h1>
            <ChevronRight size={24} />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
            {superDeals.map((product) => {
              return (
                <div
                  key={product.id}
                  className="min-w-[120px] bg-white rounded-xl p-3 shadow-sm "
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-28 object-contain mx-auto"
                  />

                  <h2 className="text-sm font-medium mt-2 line-clamp-2">
                    {product.title}
                  </h2>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-400 line-through text-sm">
                      ${product.price}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
