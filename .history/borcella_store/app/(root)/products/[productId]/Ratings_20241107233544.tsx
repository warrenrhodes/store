import type { FC } from "react";

import Heading from "@/shared/Heading/Heading";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface RatingsProps {
  rating: number;
  reviews: number;
}

const ratingDetails = [
  {
    title: 5,
    value: 100,
  },
  {
    title: 4,
    value: 56,
  },
  {
    title: 3,
    value: 22,
  },
  {
    title: 2,
    value: 14,
  },
  {
    title: 1,
    value: 2,
  },
];

const Ratings: FC<RatingsProps> = ({ rating, reviews }) => {
  return (
    <div>
      <Heading className="mb-0">Ratings</Heading>

      <div className="flex items-center gap-5">
        <div className="space-y-3">
          <p className="text-[70px] font-semibold md:text-[100px]">
            {rating}
            <span className="text-base text-secondary">/5</span>
          </p>
          <p className="text-neutral-500">{`(${reviews} Reviews)`}</p>
        </div>

        <div className="w-full space-y-2">
          {ratingDetails.map((ratingItem) => (
            <div key={ratingItem.title} className="flex items-center gap-2">
              <div className="flex items-center gap-1 font-medium">
                <Star size={16} fill="#eab308" color="#eab308" />
                {ratingItem.title}
              </div>
              <Progress value={ratingItem.value} className="w-[60%]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ratings;
