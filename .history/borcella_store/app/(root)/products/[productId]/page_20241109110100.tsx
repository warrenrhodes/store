import { pathOr } from "ramda";

import SectionProductHeader from "./SectionProductHeader";
import SectionProductInfo from "./SectionProductInfo";
import { getProductDetails } from "@/lib/actions/actions";
import SectionMoreRelatedProducts from "./SectionMoreRelatedProducts";
import { Spacer } from "@/shared/Spacer";
import { Calendar, Package, Percent, Truck } from "lucide-react";
const shipment_details: {
  icon: JSX.Element;
  title: string;
  description: string;
}[] = [
  {
    icon: <Percent className="text-black" />,
    title: "Discount",
    description: "> $100 Disc 10%",
  },
  {
    icon: <Calendar className=" text-black" />,
    title: "Delivery Time",
    description: "......",
  },
  {
    icon: <Package className="text-x2xll text-black" />,
    title: "Package",
    description: "Reagular Premium Box",
  },
  {
    icon: <Truck className="text-2xl text-black" />,
    title: "Estimated Arrival",
    description: "......",
  },
];
type Props = {
  params: { productId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const SingleProductPage = async (props: Props) => {
  const selectedProduct = await getProductDetails(props.params.productId);

  return (
    <div className="container">
      <Spacer size="lg" />
      <div className="mb-20">
        <SectionProductHeader
          media={pathOr([], ["media"], selectedProduct)}
          title={pathOr("", ["title"], selectedProduct)}
          expense={pathOr(0, ["expense"], selectedProduct)}
          price={pathOr(0, ["price"], selectedProduct)}
          sizes={pathOr([], ["sizes"], selectedProduct)}
          ratings={pathOr(4.8, ["rating"], selectedProduct)}
          reviews={pathOr(56, ["reviews"], selectedProduct)}
          description={pathOr("", ["description"], selectedProduct)}
        />
      </div>

      <div className="mb-28">
        <SectionProductInfo
          overview={pathOr("", ["overview"], selectedProduct)}
          shipment_details={pathOr(
            shipment_details,
            ["shipment_details"],
            selectedProduct
          )}
          ratings={pathOr(4.8, ["rating"], selectedProduct)}
          reviews={pathOr(56, ["reviews"], selectedProduct)}
          note={pathOr(
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae, est eum magnam doloremque, at adipisci debitis, similique dolores ipsa unde necessitatibus vero quibusdam nostrum numquam!",
            ["notes"],
            selectedProduct
          )}
        />
      </div>

      <div className="mb-28">
        <SectionMoreRelatedProducts productId={props.params.productId} />
      </div>
    </div>
  );
};

export default SingleProductPage;

/**
 
<div class="font-sans">
          <div class="p-4 lg:max-w-5xl max-w-lg mx-auto">
              <div class="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">

                  <div class="w-full lg:sticky top-0 sm:flex gap-2">
                      <div class="sm:space-y-3 w-16 max-sm:w-12 max-sm:flex max-sm:mb-4 max-sm:gap-4">
                          <img src="https://readymadeui.com/images/product1.webp" alt="Product1" class="w-full cursor-pointer rounded-md outline" />
                          <img src="https://readymadeui.com/images/product6.webp" alt="Product2" class="w-full cursor-pointer rounded-md" />
                          <img src="https://readymadeui.com/images/product7.webp" alt="Product3" class="w-full cursor-pointer rounded-md" />
                          <img src="https://readymadeui.com/images/product3.webp" alt="Product4" class="w-full cursor-pointer rounded-md" />
                      </div>
                      <img src="https://readymadeui.com/images/product2.webp" alt="Product" class="w-4/5 rounded-md object-cover" />
                  </div>

                  <div>
                      <h2 class="text-2xl font-bold text-gray-800">Adjective Attire | T-shirt</h2>
                      <div class="flex flex-wrap gap-4 mt-4">
                          <p class="text-gray-800 text-xl font-bold">$12</p>
                          <p class="text-gray-400 text-xl"><strike>$16</strike> <span class="text-sm ml-1.5">Tax included</span></p>
                      </div>

                      <div class="flex space-x-2 mt-4">
                          <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                          <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                          <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                          <svg class="w-5 fill-blue-600" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                          <svg class="w-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                          </svg>
                      </div>

                      <div class="mt-8">
                          <h3 class="text-xl font-bold text-gray-800">Sizes</h3>
                          <div class="flex flex-wrap gap-4 mt-4">
                              <button type="button" class="w-10 h-10 border-2 hover:border-blue-600 font-semibold text-sm rounded-full flex items-center justify-center shrink-0">SM</button>
                              <button type="button" class="w-10 h-10 border-2 hover:border-blue-600 border-blue-600 font-semibold text-sm rounded-full flex items-center justify-center shrink-0">MD</button>
                              <button type="button" class="w-10 h-10 border-2 hover:border-blue-600 font-semibold text-sm rounded-full flex items-center justify-center shrink-0">LG</button>
                              <button type="button" class="w-10 h-10 border-2 hover:border-blue-600 font-semibold text-sm rounded-full flex items-center justify-center shrink-0">XL</button>
                          </div>
                      </div>

                      <button type="button" class="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md">Add to cart</button>

                      <div class="mt-8">
                          <h3 class="text-xl font-bold text-gray-800">About the item</h3>
                          <ul class="space-y-3 list-disc mt-4 pl-4 text-sm text-gray-800">
                              <li>A gray t-shirt is a wardrobe essential because it is so versatile.</li>
                              <li>Available in a wide range of sizes, from extra small to extra large, and even in tall and petite sizes.</li>
                              <li>This is easy to care for. They can usually be machine-washed and dried on low heat.</li>
                              <li>You can add your own designs, paintings, or embroidery to make it your own.</li>
                          </ul>
                      </div>

                      <div class="mt-8">
                          <h3 class="text-xl font-bold text-gray-800">Reviews(10)</h3>
                          <div class="space-y-3 mt-4">
                              <div class="flex items-center">
                                  <p class="text-sm text-gray-800 font-bold">5.0</p>
                                  <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                  </svg>
                                  <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                      <div class="w-2/3 h-full rounded-md bg-blue-600"></div>
                                  </div>
                                  <p class="text-sm text-gray-800 font-bold ml-3">66%</p>
                              </div>

                              <div class="flex items-center">
                                  <p class="text-sm text-gray-800 font-bold">4.0</p>
                                  <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                  </svg>
                                  <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                      <div class="w-1/3 h-full rounded-md bg-blue-600"></div>
                                  </div>
                                  <p class="text-sm text-gray-800 font-bold ml-3">33%</p>
                              </div>

                              <div class="flex items-center">
                                  <p class="text-sm text-gray-800 font-bold">3.0</p>
                                  <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                  </svg>
                                  <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                      <div class="w-1/6 h-full rounded-md bg-blue-600"></div>
                                  </div>
                                  <p class="text-sm text-gray-800 font-bold ml-3">16%</p>
                              </div>

                              <div class="flex items-center">
                                  <p class="text-sm text-gray-800 font-bold">2.0</p>
                                  <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                  </svg>
                                  <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                      <div class="w-1/12 h-full rounded-md bg-blue-600"></div>
                                  </div>
                                  <p class="text-sm text-gray-800 font-bold ml-3">8%</p>
                              </div>

                              <div class="flex items-center">
                                  <p class="text-sm text-gray-800 font-bold">1.0</p>
                                  <svg class="w-5 fill-blue-600 ml-1.5" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                  </svg>
                                  <div class="bg-gray-300 rounded-md w-full h-2 ml-3">
                                      <div class="w-[6%] h-full rounded-md bg-blue-600"></div>
                                  </div>
                                  <p class="text-sm text-gray-800 font-bold ml-3">6%</p>
                              </div>
                          </div>

                          <button type="button" class="w-full mt-8 px-6 py-2.5 border border-blue-600 bg-transparent text-gray-800 text-sm font-semibold rounded-md">Read all reviews</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
 */
