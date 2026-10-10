'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth'
import { auth } from '@/lib/firebase/firebase-client/firebase'
import { AuthCard } from '../Auth/AuthCard'
import { Label } from '@/components/ui/label'
import { useLocalization } from '@/hooks/useLocalization'

interface NewPasswordFormProps {
  token: string
}

export const NewPasswordForm = ({ token }: NewPasswordFormProps) => {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const { localization } = useLocalization()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        description: localization.passwordsDontMatch,
      })
      return
    }

    try {
      setLoading(true)
      await verifyPasswordResetCode(auth, token)
      await confirmPasswordReset(auth, token, password)

      toast({
        description: localization.passwordResetSuccess,
      })
      router.push('/sign-in')
    } catch (error) {
      toast({
        variant: 'destructive',
        description: localization.resetLinkInvalid,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthCard title={localization.newPassword}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="new-password">{localization.newPassword}</Label>
          <Input
            id="new-password"
            autoComplete="new-password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">{localization.confirmNewPassword}</Label>
          <Input
            id="confirm-password"
            autoComplete="new-password"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {localization.resetPassword}
        </Button>
        <div className="text-center">
          <button
            type="button"
            onClick={() => router.push('/sign-in')}
            className="text-sm text-muted-foreground/80 hover:text-muted-foreground"
          >
            {localization.backToSignIn}
          </button>
        </div>
      </form>
    </AuthCard>
  )
}
