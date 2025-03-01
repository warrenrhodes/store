import { NewPasswordForm } from '@/components/auth/NewPasswordForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Set New Password',
  description: 'Set your new password',
}

export default async function NewPasswordPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  return <NewPasswordForm token={token} />
}
