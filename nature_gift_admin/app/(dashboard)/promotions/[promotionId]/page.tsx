"use client";

import { useEffect, useState } from "react";

import { Loader } from "@/components/custom-ui/Loader";
import { PromotionType } from "@/lib/types";
import PromotionForm from "@/components/promotions/PromotionsForm";

const PromotionDetails = ({ params }: { params: { promotionId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [promotionDetails, setPromotionDetails] =
    useState<PromotionType | null>(null);

  const getPromotionDetails = async () => {
    try {
      const res = await fetch(`/api/promotions/${params.promotionId}`, {
        method: "GET",
      });
      const data = await res.json();
      setPromotionDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[promotionId_GET]", err);
    }
  };

  useEffect(() => {
    getPromotionDetails();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <PromotionForm initialData={promotionDetails} />
  );
};

export default PromotionDetails;
