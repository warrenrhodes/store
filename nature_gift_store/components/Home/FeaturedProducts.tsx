"use client"

import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: "1",
    name: "Smart Fitness Watch Pro",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
    category: "Electronics",
    rating: 4.8,
    isNew: true,
  },
  {
    id: "2",
    name: "Organic Vitamin Complex",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc",
    category: "Health & Wellness",
    rating: 4.9,
    isNew: false,
  },
  {
    id: "3",
    name: "Wireless Noise-Canceling Earbuds",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df",
    category: "Electronics",
    rating: 4.7,
    isNew: true,
  },
  {
    id: "4",
    name: "Smart Air Purifier",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd",
    category: "Home & Living",
    rating: 4.6,
    isNew: false,
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export function FeaturedProducts() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Top-rated products chosen for quality and innovation
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <Card className="group">
                <CardHeader className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ backgroundImage: `url(${product.image})` }}
                    />
                    {product.isNew && (
                      <Badge className="absolute top-4 left-4">New</Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white"
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="line-clamp-1">{product.name}</CardTitle>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {product.category}
                  </p>
                  <div className="mt-2 flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                  </div>
                  <p className="mt-4 text-lg font-semibold">
                    ${product.price.toFixed(2)}
                  </p>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full group">
                    <ShoppingCart className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                    Add to Cart
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