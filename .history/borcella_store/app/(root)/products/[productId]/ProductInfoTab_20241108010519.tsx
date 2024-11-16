"use client";

import type { FC } from "react";
import { useState } from "react";

import Heading from "@/shared/Heading/Heading";

interface ProductInfoTabProps {
  overview?: string;
  note?: string;
  shipment_details: {
    icon: JSX.Element;
    title: string;
    description: string;
  }[];
}

const tabs = ["Overview", "Shipment details"];

const ProductInfoTab: FC<ProductInfoTabProps> = ({
  overview,
  shipment_details,
  note,
}) => {
  const [activeTab, setActiveTab] = useState("Shipment details");

  return (
    <div>
      <Heading className="mb-0">Product Info</Heading>
      <div className="mb-10 flex items-center gap-5">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-4 ${
              activeTab === tab
                ? "border-b-2 border-primary"
                : "text-neutral-500"
            }`}
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
          {activeTab === "Overview" ? (
            <p>{overview}</p>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {shipment_details.map((detail) => (
                <div key={detail.title} className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-gray-200 rounded-full p-4 flex item-center ">
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
      {note && (
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Note*</h3>
          <p className="text-neutral-500">{note}</p>
        </div>
      )}
    </div>
  );
};

export default ProductInfoTab;
