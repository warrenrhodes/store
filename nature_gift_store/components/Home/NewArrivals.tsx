"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"

const products = [
  {
    id: "1",
    name: "Merino Wool Sweater",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
  },
  {
    id: "2",
    name: "Cashmere Scarf",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9",
  },
  {
    id: "3",
    name: "Leather Ankle Boots",
    price: 189.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function NewArrivals() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              The latest additions to our collection
            </p>
          </div>
          <Button variant="ghost" className="group">
            View All
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className="group cursor-pointer">
                <CardHeader className="p-0">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="mt-2 font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button variant="outline" className="w-full group">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}