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
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Shop Name</h3>
            <p className="text-sm">
              Your trusted destination for quality products and exceptional
              service.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-pink-400 transition-colors" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shop
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span>Ekoudoum, Face Hotel IRIS</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span>+237 (6) 94-57-95-19</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span>support@shopname.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Newsletter</h3>
            <p className="text-sm">
              Subscribe to receive updates and exclusive offers!
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center space-y-2">
              <Truck className="w-8 h-8 text-blue-500" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <CreditCard className="w-8 h-8 text-blue-500" />
              <span className="text-sm">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Lock className="w-8 h-8 text-blue-500" />
              <span className="text-sm">Safe Shopping</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <Truck className="w-8 h-8 text-blue-500" />
              <span className="text-sm">Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm">
              © {currentYear} Nature's Gift. All rights reserved.
            </div>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
