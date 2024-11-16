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
    title: 5.0,
    value: 100,
  },
  {
    title: 4.0,
    value: 56,
  },
  {
    title: 3.0,
    value: 22,
  },
  {
    title: 2.0,
    value: 14,
  },
  {
    title: 1.0,
    value: 2,
  },
];

const Ratings: FC<RatingsProps> = ({ rating, reviews }) => {
  return (
    <div className="mt-5">
      <Heading className="text-xl font-bold text-gray-800 mb-0">
        {`Reviews(${reviews})`}
      </Heading>
      <div className="flex items-center gap-5">
        <div className="w-full space-y-2">
          {ratingDetails.map((ratingItem) => (
            <div key={ratingItem.title} className="flex items-center gap-2">
              <div className="flex items-center gap-1 font-medium">
                {`${ratingItem.title}`}
                <Star size={16} fill="blue" color="blue" />
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
