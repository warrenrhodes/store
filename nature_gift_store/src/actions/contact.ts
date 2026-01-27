'use server'

import { sendEmailNotifications } from '@/lib/notifications/sendNotifications'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContactForm(data: ContactFormData) {
  const { name, email, subject, message } = data

  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.split(',') || []

  if (adminEmails.length === 0) {
    console.warn('No admin emails configured')
    return { success: true } // Return true to avoid showing error to user if config is missing but submission worked "technically"
  }

  const notificationData = {
    subject: subject,
    message: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  }

  try {
    await Promise.all(
      adminEmails.map((adminEmail) =>
        sendEmailNotifications({
          email: adminEmail,
          notificationId: 'new_message',
          data: notificationData,
        })
      )
    )
    return { success: true }
  } catch (error) {
    console.error('Failed to send email notifications:', error)
    return { success: false, error: 'Failed to send message' }
  }
}
