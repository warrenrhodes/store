import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[500px] bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Un problème est survenu</h1>
      <Button
        className="bg-white text-center w-48 rounded-2xl h-14 relative group text-black items-center flex justify-center"
        asChild
      >
        <Link href="/">
          <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px]">
            <ChevronLeft />
          </div>
          <p className="translate-x-2 ">{"Page d'accueil"}</p>
        </Link>
      </Button>
    </div>
  )
}
