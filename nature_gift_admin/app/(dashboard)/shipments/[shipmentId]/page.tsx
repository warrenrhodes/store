import ShipmentForm from "@/components/shipments/ShipmentForm";
import { notFound } from "next/navigation";

async function getShipment(shipmentId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL}/api/shipments/${shipmentId}`
  );

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function EditShipmentPage({
  params,
}: {
  params: { shipmentId: string };
}) {
  const [shipment] = await Promise.all([getShipment(params.shipmentId)]);

  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Edit shipment</h1>
        <p className="text-muted-foreground">Make changes to your shipment</p>
      </div>
      <ShipmentForm initialData={shipment} />
    </div>
  );
}

export const dynamic = "force-dynamic";
