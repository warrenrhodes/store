import BaseComponent from '@/components/BaseComponent'
import { BrandValues } from '@/components/Home/BrandValues'
import { CategoryShowcase } from '@/components/Home/CategoryShowcase'
import { FeaturedProducts } from '@/components/Home/FeaturedProducts'
import { HeroSection } from '@/components/Home/HeroSection'
import { NewArrivals } from '@/components/Home/NewArrivals'
import { PromotionBanner } from '@/components/Home/PromotionBanner'

export default function Home() {
  return (
    <main>
      <BaseComponent>
        <HeroSection />
        <CategoryShowcase />
        <FeaturedProducts />
        <PromotionBanner />
        <NewArrivals />
        <BrandValues />
      </BaseComponent>
    </main>
  )
}
