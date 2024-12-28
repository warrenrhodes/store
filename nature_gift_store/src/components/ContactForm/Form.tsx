'use client'

import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { sendEmailNotifications } from '@/lib/notifications/sendNotifications'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
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

    // Send notifications
    const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(',') || []

    if (adminEmails.length > 0) {
      const notificationData = {
        subject: subject,
        message: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      }

      try {
        await Promise.all(
          adminEmails.map(email =>
            sendEmailNotifications({
              email,
              notificationId: 'new_message',
              data: notificationData,
            }),
          ),
        )
        toast({
          variant: 'success',
          title: 'Message sent!',
          description: "We'll get back to you as soon as possible.",
        })
      } catch (error) {
        console.error('Failed to send email notifications:', error)
      }
    }

    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
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
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  )
}
