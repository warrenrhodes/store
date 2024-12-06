import ReviewForm from "@/components/reviews/ReviewFrom";
import ShipmentForm from "@/components/shipments/ShipmentForm";
import { getProducts } from "@/lib/actions/actions";

export default async function NewShipmentPage() {
  return (
    <div className="container py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Create New Shipment</h1>
        <p className="text-muted-foreground">
          Add a new shipment to your store
        </p>
      </div>
      <ShipmentForm />
    </div>
  );
}

export const dynamic = "force-dynamic";
