import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

export default function NotFoundGameClient() {
  return (
    <div className="min-h-[500px] bg-gradient-to-br from-blue-900 to-purple-900 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">Resource Not Found</h1>
      <div className="bg-white text-center w-48 rounded-2xl h-14 relative group text-black items-center flex justify-center">
        <Link href="/">
          <div className="bg-green-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
            <ChevronLeft />
          </div>
        </Link>
        <p className="translate-x-2 ">Return Home</p>
      </div>
    </div>
  )
}
