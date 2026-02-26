import FlashCountdown from "@/components/FlashCountdown";
import GoBack from "@/components/GoBack";
import MoretoLove from "@/components/MoretoLove";
import Share from "@/components/Share";
import { getSpecProduct } from "@/lib/products";
import Image from "next/image";
const SuperDeals = async () => {
  function getDailyRandomItems<T>(items: T[], count: number) {
    const seed = new Date().getDate();

    const shuffled = [...items].sort((a, b) => {
      const hashA = JSON.stringify(a).length + seed;
      const hashB = JSON.stringify(b).length + seed;
      return (hashA % 10) - (hashB % 10);
    });

    return shuffled.slice(0, count);
  }
  const products = await getSpecProduct();
  const superDeals = getDailyRandomItems(products, 6);

  return (
    <div className="mt-15 pb-30">
      <div className="fixed top-0 left-0 right-0 bg-white p-4 z-50 shadow flex flex-row justify-between items-center">
        <div className="flex flex-row  flex-1 items-center ">
          <GoBack />
          <h1 className="font-bold ml-8">SuperDeals</h1>
          <FlashCountdown />
        </div>
        <Share />
      </div>

      <div className="font-bold flex items-center  text-[2.5rem] px-2 ">
        UP TO
        <span className="mx-3 text-[3.5rem] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-800 bg-clip-text text-transparent animate-pulse">
          80%
        </span>{" "}
        OFF
      </div>

      <div className="bg-purple-500/50 p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-2">
        {superDeals.map((product) => {
          const discountedPrice = Math.round(product.price * 0.2); // 80% off

          return (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-3 relative"
            >
              {/* Image */}
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

              {/* Title */}
              <h2 className="text-sm font-semibold mt-2 line-clamp-2">
                {product.title}
              </h2>

              {/* Price */}
              <div className="flex items-center gap-2 mt-1">
                <span className="text-red-600 font-bold text-lg">
                  ${discountedPrice}
                </span>
                <span className="text-gray-400 line-through text-sm">
                  ${product.price}
                </span>

                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-md font-bold">
                  -80%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <MoretoLove products={products} />
    </div>
  );
};

export default SuperDeals;
