"use client";

import Link from "next/link";
import HeartFavorite from "./HeartFavorite";
import { ProductType, UserType } from "@/lib/types";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  console.log("product", product);
  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[220px] flex flex-col gap-2"
    >
      {/* <Image
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${product.media[0].url}`}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      /> */}
      <div>
        <p className="text-base-bold">{product.title}</p>
        <p className="text-small-medium text-grey-2">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="line-through text-sm text-red-600">
            FCFA {product.expense}
          </p>
          <p className="text-body-bold">FCFA {product.price}</p>
        </div>

        <HeartFavorite
          product={product}
          updateSignedInUser={updateSignedInUser}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
