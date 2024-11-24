// "use client"

// import { useState } from "react"
// import { type CartItem, type ShippingInfo, type Customer, type OrderSummary } from "@/lib/utils/promotion-calculator"

// export function usePromotionCalculator() {
//   const [isCalculating, setIsCalculating] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   async function calculatePromotions(
//     cart: CartItem[],
//     shipping: ShippingInfo,
//     customer: Customer
//   ): Promise<OrderSummary | null> {
//     setIsCalculating(true)
//     setError(null)

//     try {
//       const response = await fetch("/api/promotions/calculate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           cart,
//           shipping,
//           customer,
//         }),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to calculate promotions")
//       }

//       const result = await response.json()
//       return result
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "An error occurred")
//       return null
//     } finally {
//       setIsCalculating(false)
//     }
//   }

//   return {
//     calculatePromotions,
//     isCalculating,
//     error,
//   }
// }
