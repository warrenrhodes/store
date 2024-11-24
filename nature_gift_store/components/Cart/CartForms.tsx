"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { addDays, format, isBefore, isToday } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { calculateTotalPriceOfItemCart, cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { CartItem } from "@/lib/types";
import { useCart } from "@/lib/hooks/useCart";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useUser } from "@clerk/nextjs";
import { useTemporalUser } from "@/lib/hooks/useTemporalUser";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(9, "Phone number must be at least 10 digits")
    .transform((val) => val.replace(/\s+/g, "")) // Remove all spaces
    .pipe(
      z
        .string()
        .regex(
          /^(?:\+237|237)?6[2,5,8,9,7]\d{7}$/,
          "Invalid Cameroon phone number",
        ),
    ),
  phoneContainsWhatsApp: z.boolean(),
  whatsAppNumber: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .pipe(
      z
        .string()
        .regex(
          /^(?:\+237|237)?6[2,5,8,9,7]\d{7}$/,
          "Invalid Cameroon phone number",
        ),
    )
    .optional(),
  address: z.string().min(2, "Delivery address must be at least 2 characters"),
  deliveryDate: z.date({
    required_error: "Please select a delivery date",
  }),
  deliveryTime: z.string({
    required_error: "Please select a delivery time",
  }),
  city: z.string().min(2, "City is required"),
  notes: z.string().optional(),
});

export const CartForms = () => {
  const { user, isSignedIn } = useUser();
  const { temporalUser, setUserData, clearTemporalUser } = useTemporalUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const today = Date.now();
  const maxDate = addDays(today, 7);
  const cart = useCart();

  const total = cart.cartItems.reduce(
    (acc: number, cartItem: CartItem) =>
      acc + calculateTotalPriceOfItemCart(cartItem),
    0,
  );

  const totalRounded = parseFloat(total.toFixed(2));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:
      (isSignedIn && user) || temporalUser
        ? {
            fullName: temporalUser?.fullName || user?.firstName || "",
            phone:
              temporalUser?.phone || user?.phoneNumbers[0].phoneNumber || "",
            phoneContainsWhatsApp: temporalUser?.phoneContainsWhatsApp || true,
            whatsAppNumber: temporalUser?.whatsAppNumber,
            city: temporalUser?.city,
            address: temporalUser?.address,
            deliveryDate: undefined,
            deliveryTime: undefined,
          }
        : {
            fullName: "",
            phone: "",
            whatsAppNumber: undefined,
            address: "",
            deliveryDate: undefined,
            deliveryTime: "",
            city: "",
            notes: undefined,
            phoneContainsWhatsApp: true,
          },
  });
  const generateTimeSlots = (selectedDate: Date) => {
    const now = new Date();
    const startHour = isToday(selectedDate) ? now.getHours() + 1 : 9;
    const endHour = 19;

    const timeSlots: string[] = [];

    for (let hour = startHour; hour < endHour; hour++) {
      timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
      timeSlots.push(`${hour.toString().padStart(2, "0")}:30`);
    }

    if (isToday(selectedDate) && now.getHours() >= endHour - 1) {
      return [];
    }

    return timeSlots;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      console.log("Order details:", {
        items: cart.cartItems,
        customer: values,
        delivery: {
          date: format(values.deliveryDate, "PP"),
          time: values.deliveryTime,
        },
        total,
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));
      cart.clearCart();
      setUserData({
        fullName: values.fullName,
        phone: values.phone,
        phoneContainsWhatsApp: values.phoneContainsWhatsApp,
        whatsAppNumber: values.whatsAppNumber,
        address: values.address,
        city: values.city,
      });
      router.push("/order-success");
    } catch (error) {
      console.error("Order failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
          <CardDescription>Complete your order details</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+237 694-567-890"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.trim())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneContainsWhatsApp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Phone With WhatsApp Number
                        </label>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="whatsAppNumber"
                render={({ field }) => (
                  <div
                    className={cn({
                      hidden: form.watch("phoneContainsWhatsApp"),
                    })}
                  >
                    <FormItem>
                      <FormLabel>WhatsApp Phone</FormLabel>
                      <FormControl>
                        <Input placeholder="+237 694-567-890" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Street Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Your City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deliveryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Delivery Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            form.setValue("deliveryTime", "");
                          }}
                          disabled={(date) =>
                            isBefore(date, today) || isBefore(maxDate, date)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* New Delivery Time Field */}
              <FormField
                control={form.control}
                name="deliveryTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Time</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={!form.watch("deliveryDate")}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select time slot">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              <span>{field.value || "Select time"}</span>
                            </div>
                          </SelectValue>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {form.watch("deliveryDate") ? (
                          generateTimeSlots(form.watch("deliveryDate")).map(
                            (time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ),
                          )
                        ) : (
                          <SelectItem value="Time disabled" disabled>
                            Please select a date first
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Notes (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Additional instructions" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{totalRounded.toLocaleString()} FCFA</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : "Place Order"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push("/products")}
                >
                  Continue Shopping
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
