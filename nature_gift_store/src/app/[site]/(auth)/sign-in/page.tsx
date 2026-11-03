import { AuthForm } from '@/components/Auth/AuthForm'

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center px-4 py-12 w-full h-full">
      <div className="w-full flex items-center">
        <AuthForm isLogin={true} isResetting={false} />
      </div>
    </div>
  )
}
