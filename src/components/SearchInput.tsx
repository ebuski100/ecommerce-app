import React from "react";
import { Camera, Search } from "lucide-react";

type Props = {
  className?: string;
};
const SearchInput = ({ className }: Props) => {
  return (
    <div
      className={`z-50 p-2 shadow fixed top-0 right-0 left-0 bg-white mb-6 ${className}`}
    >
      <div>
        <input
          type="text"
          placeholder="I'm shopping for..."
          className="relative w-full border rounded-[1rem] p-3 "
        />
      </div>
      <Camera
        className="absolute top-1/2 right-20 -translate-y-1/2 text-gray-500 cursor-pointer"
        size={30}
      />

      <Search
        size={30}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-500 cursor-pointer bg-black text-white rounded-2xl w-[50px] p-1 "
      />
    </div>
  );
};

export default SearchInput;
