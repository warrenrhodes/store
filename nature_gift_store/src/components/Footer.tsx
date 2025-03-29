'use client'
import { useLocalization } from '@/hooks/useLocalization'
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Lock,
  Truck,
} from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { localization } = useLocalization()

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">{"Nature's Gift"}</h3>
            <p className="text-sm">{localization.footerDescription}</p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-400 transition-colors" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">{localization.quickLinks}</h3>
            <ul className="space-y-2">
              {/* <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li> */}
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="hover:text-white transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/profile?tab=orders" className="hover:text-white transition-colors">
                  Orders
                </Link>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">{localization.contactUs}</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span>
                  {
                    "Yaoundé, Carrefour Ekoudoum, lieu dis restaurant droit chemin, sis à coté de l'Hotel IRIS"
                  }
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <div className="flex flex-col">
                  <span> +237 (6) 96-68-90-73</span>
                  <span> +237 (6) 78-56-99-20</span>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>natures.gift.237@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Truck className="w-8 h-8 text-blue-500" />
              <span className="text-sm">{localization.freeShipping}</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <CreditCard className="w-8 h-8 text-blue-500" />
              <span className="text-sm">{localization.securePayment}</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Lock className="w-8 h-8 text-blue-500" />
              <span className="text-sm">{localization.safeShopping}</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Truck className="w-8 h-8 text-blue-500" />
              <span className="text-sm">{localization.fastDelivery}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm">
              © {currentYear} {localization.copyright}
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                {localization.privacyPolicy}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {localization.termsOfService}
              </a>
              <a href="#" className="hover:text-white transition-colors">
                {localization.cookiePolicy}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
