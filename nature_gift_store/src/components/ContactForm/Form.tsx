'use client'

import { submitContactForm } from '@/actions/contact'
import { useToast } from '@/hooks/use-toast'
import { useLocalization } from '@/hooks/useLocalization'
import { Loader2, Send } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { localization } = useLocalization()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setIsSubmitting(true)
    const formData = new FormData(form)
    const result = await submitContactForm({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    })

    if (result.success) {
      toast({
        variant: 'success',
        title: localization.messageSent,
        description: localization.messageSentDescription,
      })
      form.reset()
    } else {
      toast({ variant: 'destructive', description: localization.messageError })
    }
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">{localization.yourName}</Label>
          <Input id="contact-name" name="name" autoComplete="name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">{localization.email}</Label>
          <Input id="contact-email" name="email" type="email" autoComplete="email" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-subject">{localization.subject}</Label>
        <Input id="contact-subject" name="subject" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contact-message">{localization.yourMessage}</Label>
        <Textarea id="contact-message" name="message" required className="min-h-[150px]" />
      </div>
      <Button type="submit" className="h-12 w-full text-base" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden />
            {localization.sending}
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" aria-hidden />
            {localization.sendMessage}
          </>
        )}
      </Button>
    </form>
  )
}
