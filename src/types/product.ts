export type Product = {
  id: number;
  title: string;
  price: number;
  images: string[];
  reviews: Review[];
  thumbnail: string;
  description: string;
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
