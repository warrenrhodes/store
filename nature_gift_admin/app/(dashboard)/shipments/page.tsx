import { ShipmentList } from "@/components/shipments/ShipmentList";

async function getShipments() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/shipments`
  );
  if (!response.ok) {
    console.error("Failed to fetch reviews");
    return [];
  }
  const shipments = await response.json();
  return shipments;
}

export default async function ShipmentsPage() {
  const shipments = await getShipments();
  return (
    <div className="container py-10">
      <ShipmentList shipments={shipments} />
    </div>
  );
}

export const dynamic = "force-dynamic";
