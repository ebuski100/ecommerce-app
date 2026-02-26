import Link from "next/link";

type Category = {
  slug: string;
  name: string;
};

type Props = {
  categories: Category[];
  activeCategory?: string;
};

export default function SideNav({ categories, activeCategory }: Props) {
  return (
    <aside className="fixed top-16 left-0 w-40 md:w-40  h-[calc(100vh-2rem)] border-r border-gray-300 px-2 bg-white overflow-y-auto overscroll-contain  pb-40">
      <h2 className="font-bold mb-1 sticky  top-0 left-0 right-0 z-50 py-2   bg-white">
        Categories
      </h2>

      <ul className="space-y-2">
        <li>
          <Link
            href="/shop"
            className={
              activeCategory
                ? "text-green-600 font-semibold "
                : "hover:text-green-600"
            }
          >
            All Products
          </Link>
        </li>

        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/products/category/${cat.slug}`}
              className={` ${activeCategory === cat.slug ? "text-green-600 font-semibold" : "hover:text-green-500"} `}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
