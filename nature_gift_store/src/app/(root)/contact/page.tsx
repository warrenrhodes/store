'use client'

import { ContactForm } from '@/components/ContactForm/Form'
import { useLocalization } from '@/hooks/useLocalization'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'
import { Toaster } from 'react-hot-toast'

export default function ContactPage() {
  const { localization } = useLocalization()

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{localization.getInTouch}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">{localization.contactDescription}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-slate-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{localization.ourLocation}</h3>
                  <p className="text-slate-600">{localization.locationAddress}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-slate-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{localization.phone}</h3>
                  <p className="text-slate-600">+237 (6) 78-56-99-20</p>
                  <p className="text-slate-600">+237 (6) 96-68-90-73</p>
                  <p className="text-slate-600">Mon-Fri 9am-6pm PST</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-slate-100 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{localization.email}</h3>
                  <p className="text-slate-600">natures.gift.237@gmail.com</p>
                  <p className="text-slate-600">webanalyse237@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-8 rounded-lg shadow-sm"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
