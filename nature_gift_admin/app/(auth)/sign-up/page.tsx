import { AuthForm } from '@/components/auth/AuthForm'

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center px-4 py-12 w-full h-full">
      <div className="w-full flex items-center">
        <AuthForm isLogin={false} isResetting={false} />
      </div>
    </div>
  )
}
