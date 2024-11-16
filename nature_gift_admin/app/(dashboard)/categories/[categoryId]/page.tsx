"use client";

import { useCallback, useEffect, useState } from "react";

import { Loader } from "@/components/custom-ui/Loader";
import CategoryForm from "@/components/categories/CategoryForm";
import { CategoryType } from "@/lib/types";

const CategoryDetails = ({ params }: { params: { categoryId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [categoryDetails, setCategoryDetails] = useState<CategoryType | null>(
    null
  );

  const getCategoryDetails = useCallback(async () => {
    try {
      const res = await fetch(`/api/categories/${params.categoryId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCategoryDetails(data);
      setLoading(false);
    } catch (err) {
      console.log("[categoryId_GET]", err);
    }
  }, [params.categoryId]);

  useEffect(() => {
    getCategoryDetails();
  }, [getCategoryDetails]);

  return loading ? <Loader /> : <CategoryForm initialData={categoryDetails} />;
};

export default CategoryDetails;
