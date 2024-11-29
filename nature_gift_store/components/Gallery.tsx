'use client'

import { IMedia } from '@/lib/types'
import Image from 'next/image'
import { useState } from 'react'

const Gallery = ({ productMedia }: { productMedia: IMedia[] }) => {
  const [mainImage, setMainImage] = useState(productMedia[0])

  return (
    <div className="flex flex-col gap-3 max-w-[500px">
      <Image
        src={`${process.env.NEXT_PUBLIC_SERVER_URL}${mainImage.url}`}
        width={500}
        height={500}
        alt="product"
        className="w-96 h-96 rounded-lg shadow-xl object-cover"
      />
      <div className="flex gap-2 overflow-auto tailwind-scrollbar-hide">
        {productMedia.map((image, index) => (
          <Image
            key={index}
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${image.url}`}
            height={200}
            width={200}
            alt="product"
            className={`w-20 h-20 rounded-lg object-cover cursor-pointer ${
              mainImage === image ? 'border-2 border-black' : ''
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  )
}

export default Gallery