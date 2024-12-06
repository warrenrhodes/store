"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState } from "react";
import Delete from "../custom-ui/Delete";
import { Camera, Loader2, Trash2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { uploadImages } from "@/lib/actions/actions";
import { IProduct } from "@/lib/models/Product";
import { useToast } from "@/hooks/use-toast";
import { reviewSchema, ReviewSchemaType } from "@/lib/validations/reviews";
import { IReview } from "@/lib/models/Reviews";
import { IShipment } from "@/lib/models/Shipment";
import { shipmentSchema, ShipmentSchemaType } from "@/lib/validations/shipment";
import MultiText from "../custom-ui/MultiText";
import { Switch } from "../ui/switch";

interface ShipmentFormProps {
  initialData?: IShipment | null;
}

const ShipmentForm: React.FC<ShipmentFormProps> = ({ initialData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setLoading] = useState(false);

  const form = useForm<ShipmentSchemaType>({
    resolver: zodResolver(shipmentSchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          locations: [],
          method: "DELIVERY",
          isActive: false,
          cost: 0,
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: ShipmentSchemaType) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/shipments/${initialData._id}`
        : "/api/shipments";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast({
          description: `shipments ${initialData ? "updated" : "created"}`,
          variant: "success",
        });
        window.location.href = "/shipments";
        router.push("/shipments");
      } else {
        setLoading(false);
        toast({
          description: "Something went wrong! Please try again.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log("[shipments_POST]", err);
      toast({
        description: "Something went wrong! Please try again.",
        variant: "destructive",
      });
    }
  };

  const onDelete = async (): Promise<boolean> => {
    const res = await fetch(`/api/shipments/${initialData?._id}`, {
      method: "DELETE",
    });
    return res.ok;
  };

  return (
    <div className="p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name={"method"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Method</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Method" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="DELIVERY">delivery</SelectItem>
                    <SelectItem value="EXPEDITION">expedition</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="locations"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Locations</FormLabel>
                <FormControl>
                  <MultiText
                    placeholder="Locations"
                    value={field.value || []}
                    onChange={(tag) =>
                      field.onChange([...(field.value || []), tag])
                    }
                    onRemove={(tagToRemove) =>
                      field.onChange([
                        ...(field.value || []).filter(
                          (tag) => tag !== tagToRemove
                        ),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cost</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value || "0"))
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="space-y-0 flex gap-3 items-center">
                <FormLabel className="mt-0">Is Active</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            <Button
              disabled={isLoading}
              onClick={() => onSubmit(form.getValues())}
            >
              {isLoading && <Loader2 className="animate-spin" />}
              {initialData ? "Update" : "Create"} Shipment
            </Button>
            {initialData && (
              <Button
                type="button"
                variant="destructive"
                disabled={isLoading}
                onClick={() => onDelete()}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Product
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShipmentForm;
