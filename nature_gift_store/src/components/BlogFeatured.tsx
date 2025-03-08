'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { format, subDays } from 'date-fns'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel'
import { useCallback, useEffect, useRef, useMemo } from 'react'
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'
import Image from 'next/image'
import { FAKE_BLUR } from '@/lib/utils/constants'
import { useLocalization } from '@/hooks/useLocalization'
import { Blog, BlogContent, BlogMetadata } from '@/lib/firebase/models'

interface FeaturedBlogCarouselProps {
  blogs: Blog[]
}

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
const TWEEN_FACTOR_BASE = 0.2

export function FeaturedBlogCarousel({ blogs }: FeaturedBlogCarouselProps) {
  const { localization } = useLocalization()
  const [emblaRef, emblaApi] = useEmblaCarousel(OPTIONS)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

  const { selectedIndex, onDotButtonClick } = useDotButton(emblaApi)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map(slideNode => {
      return slideNode.querySelector('.embla__parallax__layer') as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
  }, [])

  const tweenParallax = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine()
    const slidesInView = emblaApi.slidesInView()
    const isScrollEvent = eventName === 'scroll'

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      const slidesInSnap = engine.slideRegistry[snapIndex]

      slidesInSnap.forEach(slideIndex => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach(loopItem => {
            const target = loopItem.target()

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target)

              if (sign === -1) {
              }
              if (sign === 1) {
              }
            }
          })
        }
      })
    })
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    const setupCarousel = () => {
      setTweenNodes(emblaApi)
      setTweenFactor(emblaApi)
      tweenParallax(emblaApi)
    }

    setupCarousel()

    const cleanup = () => {
      emblaApi
        .off('reInit', setupCarousel)
        .off('scroll', tweenParallax)
        .off('slideFocus', tweenParallax)
    }

    emblaApi.on('reInit', setupCarousel).on('scroll', tweenParallax).on('slideFocus', tweenParallax)

    return cleanup
  }, [emblaApi, setTweenFactor, setTweenNodes, tweenParallax])

  const renderBlogCards = useMemo(() => {
    return blogs.map(blog => {
      const metadata = blog.metadata as BlogMetadata
      const content = blog.content as BlogContent
      return (
        <div key={`${blog.slug}`} className="relative flex-[0_0_100%] min-w-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-[2/1] overflow-hidden"
          >
            <div className="absolute inset-0  aspect-[16/9] overflow-hidden rounded-t-lg">
              <Image
                src={metadata.coverImage.url || ''}
                alt={blog.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                placeholder="blur"
                blurDataURL={metadata.coverImage.blurDataUrl || FAKE_BLUR}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>

            <div className="relative h-full flex flex-col justify-end p-8 bg-black/50">
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.categories.slice(0, 3).map(category => (
                  <Badge key={category as string} variant="secondary">
                    {category}
                  </Badge>
                ))}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                {blog.title}
              </h2>
              <p className="text-lg text-white/80 mb-6 max-w-3xl">{content.excerpt}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={metadata.author.avatar || undefined}
                      alt={metadata.author.name}
                    />
                    <AvatarFallback>
                      {metadata.author.name
                        .split(' ')
                        .map((n: string) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-white font-medium">{metadata.author.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-white/80">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{format(blog.publishedAt || subDays(new Date(), 4), 'PPP')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{metadata.readingTime} min read</span>
                  </div>
                </div>
              </div>
              <Button asChild className="absolute top-8 right-8" variant="secondary">
                <Link href={`/blogs/${blog.slug}`}>
                  {localization.readMore}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      )
    })
  }, [blogs])

  const renderDotButtons = useMemo(() => {
    return blogs.map((_, index) => (
      <DotButton
        key={index}
        onClick={() => onDotButtonClick(index)}
        className={`w-2 h-2 rounded-full transition-colors ${
          index === selectedIndex ? 'bg-white' : 'bg-white/50'
        }`}
      />
    ))
  }, [blogs.length, selectedIndex, onDotButtonClick])

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">{renderBlogCards}</div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {renderDotButtons}
      </div>
      {blogs.length > 1 && (
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
        />
      )}
      {blogs.length > 1 && (
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white"
        />
      )}
    </div>
  )
}
