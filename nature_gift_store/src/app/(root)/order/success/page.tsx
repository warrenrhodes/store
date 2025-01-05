import { Check, Home, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const OrderSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <Check className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">Order Successful!</CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-4">
          <div className="space-y-2 text-gray-600">
            <p>Thank you for your purchase!</p>
            <p className="text-sm">A confirmation email has been sent with your order details.</p>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg mt-4">
            <p className="text-sm text-yellow-800">
              Create an account to track your orders and get exclusive offers!
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </Button>

          <Button variant="outline" className="w-full" asChild>
            <Link href="/sign-in">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Create Account
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default OrderSuccessPage
