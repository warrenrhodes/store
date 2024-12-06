import BlogDetail from '@/components/Blogs/BlockDetail/BlockDetail'
import GeneralCTAComponent from '@/components/Cta/GeneralCta'
import NotFoundGameClient from '@/components/NotFound'
import { getBlog, getRelatedBlogs } from '@/lib/api/blogs'
import { notFound } from 'next/navigation'

// Mock data
const blog = {
  id: '1',
  title: 'The Future of Health Tech: AI-Powered Wellness',
  content: `
    <p>The intersection of artificial intelligence and healthcare is revolutionizing how we approach personal wellness. From smart wearables to AI-driven health recommendations, technology is becoming an integral part of our daily health routines.</p>
    <h2>The Rise of Smart Health Devices</h2>
    <p>Modern health devices are becoming increasingly sophisticated, offering features like:</p>
    <ul>
      <li>Real-time health monitoring</li>
      <li>AI-powered health insights</li>
      <li>Personalized wellness recommendations</li>
    </ul>
    <p>These advancements are making it easier than ever to take control of our health and make informed decisions about our wellness journey.</p>
  `,
  publishedAt: '2024-03-15',
  readingTime: 8,
  author: {
    name: 'Dr. Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    bio: 'Health Technology Researcher & Digital Health Advocate',
  },
  categories: ['Health Tech', 'Artificial Intelligence'],
  tags: ['health', 'technology', 'AI', 'wellness'],
  metadata: {
    featured: true,
  },
}

export default async function BlogDetailPage({ params }: { params: { slug: string } }) {
  const blog = await getBlog(params.slug)
  const relatedBlogs = await getRelatedBlogs(params.slug)

  if (!blog) {
    notFound()
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogDetail blog={blog} relatedBlogs={relatedBlogs || []} />
        <GeneralCTAComponent />
      </div>
    </div>
  )
}
