'use client'

import { submitContactForm } from '@/actions/contact'
import { useToast } from '@/hooks/use-toast'
import { useLocalization } from '@/hooks/useLocalization'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { localization } = useLocalization()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Extract form data
    const formData = new FormData(e.target as HTMLFormElement)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    const result = await submitContactForm({
      name,
      email,
      subject,
      message,
    })

    if (result.success) {
      toast({
        variant: 'success',
        title: 'Message sent!',
        description: "We'll get back to you as soon as possible.",
      })
      ;(e.target as HTMLFormElement).reset()
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
      })
    }

    setIsSubmitting(false)
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Input type="text" placeholder="Your Name" required className="w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Input type="email" placeholder="Email Address" required className="w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Input type="text" placeholder="Subject" required className="w-full" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Textarea placeholder="Your Message" required className="w-full min-h-[150px]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              {localization.sendMessage}
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  )
}
