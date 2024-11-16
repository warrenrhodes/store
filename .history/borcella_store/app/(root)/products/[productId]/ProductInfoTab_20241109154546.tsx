"use client";

import type { FC } from "react";
import { useState } from "react";

import Heading from "@/shared/Heading/Heading";
import { cn } from "@/lib/utils";

interface ProductInfoTabProps {
  overview?: string;
  note?: string;
  shipment_details: {
    icon: JSX.Element;
    title: string;
    description: string;
  }[];
}

const tabs = ["Description", "Shipment details"];

const ProductInfoTab: FC<ProductInfoTabProps> = ({
  overview,
  shipment_details,
  note,
}) => {
  const [activeTab, setActiveTab] = useState("Shipment details");

  return (
    <div>
      <Heading className="mb-0" title="Product Info" />
      <div className="mb-10 flex items-center border-b">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              {
                "border-b-2 border-gray-800": activeTab === tab,
              },
              "text-gray-800 font-semibold text-sm bg-gray-100 py-3 px-8  cursor-pointer transition-all"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab}
          className={`mb-10 ${activeTab === tab ? "block" : "hidden"}`}
        >
          {activeTab === "Description" ? (
            <p>{overview}</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {shipment_details.map((detail) => (
                <div key={detail.title} className="flex items-center gap-2">
                  <div className="flex w-12 h-12 bg-gray-200 rounded-full p-1 items-center justify-center">
                    {detail.icon}
                  </div>

                  <div>
                    <p className="text-sm text-neutral-500">{detail.title}</p>
                    <p>{detail.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {note && note.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Note*</h3>
          <p className="text-neutral-500">{note}</p>
        </div>
      )}
    </div>
  );
};

export default ProductInfoTab;
