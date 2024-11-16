import { ProductType } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import { RelatedProduct } from "./RelatedProduct";

const SectionMoreRelatedProducts = ({
  relatedProducts,
}: {
  relatedProducts: ProductType[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = 280;
      const scrollPosition =
        containerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  if (relatedProducts.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto mt-16 px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Related Products
          </h2>
          <p className="text-gray-500 mt-1">Products you might also like</p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Previous products"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Next products"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Products Slider */}
      <div
        ref={containerRef}
        className="overflow-x-auto hide-scrollbar"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex gap-6">
          {relatedProducts.map((product) => {
            return <RelatedProduct product={product} />;
          })}
        </div>
      </div>

      {/* Custom Scrollbar Style */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default SectionMoreRelatedProducts;
