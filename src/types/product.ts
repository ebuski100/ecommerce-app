export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  reviews: Review[];
  thumbnail: string;
  description: string;
  isSuperDeal?: boolean;
};
export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

export type Category = {
  slug: string;
  name: string;
};
export type CartContextType = {
  cartIds: number[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  toggleCart: (id: number) => void;
  setCartIds: React.Dispatch<React.SetStateAction<number[]>>;
};
