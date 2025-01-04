import { connectToDB } from '../lib/mongoDB'
import { env } from '../envConfig'
import { faker } from '@faker-js/faker'
import { prisma } from '../lib/prisma'

// Verify env is loaded
console.log('Database URL exists:', !!env.DATABASE_URL)

const creatorId = '67678106df3a27e34e4e0501'
export async function getBlurDataUrl(imageUrl: string) {
  try {
    const res = await fetch(imageUrl)
    const buffer = await res.arrayBuffer()

    const { getPlaiceholder } = await import('plaiceholder')
    const { base64 } = await getPlaiceholder(Buffer.from(buffer))

    return base64
  } catch (err) {
    console.error('Error generating blur placeholder:', err)
    return
  }
}

/**
 * Main entry point for seeding the database with sample data.
 *
 * 1. Connects to the database using {@link connectToDB}.
 * 2. Runs the type-safe seeding function using {@link seedDatabase}.
 * 3. Closes the database connection and exits the process with a status code
 *    depending on whether the seeding was successful or not.
 *
 * @throws {Error} If the seeding fails, an error is thrown with a message
 * describing the failure.
 */
async function runSeed() {
  try {
    console.log('Starting database seeding...')
    await connectToDB()

    // Run seed function
    await seedDatabase()

    console.log('Seeding completed successfully.')

    // Close the connection
    process.exit(0)
  } catch (error) {
    console.error('Seeding failed:', error)
    process.exit(1)
  }
}

function randomArrayElements<T>(array: T[], options?: { min?: number; max?: number }): T[] {
  const min = options?.min ?? 1
  const max = options?.max ?? array.length
  const count = faker.number.int({ min, max })
  return faker.helpers.arrayElements(array, count)
}

// Type-safe seeding function with comprehensive error handling
async function seedDatabase() {
  try {
    // Clear existing data with type-safe delete operations
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.review.deleteMany()
    await prisma.comment.deleteMany()

    // Delete junction tables first
    await prisma.categoriesOnBlogs.deleteMany()
    await prisma.categoriesOnProducts.deleteMany()
    await prisma.mediasOnProducts.deleteMany()

    // Then delete dependent tables
    await prisma.comment.deleteMany()
    await prisma.review.deleteMany()
    await prisma.wishlist.deleteMany()

    // Handle self-referential relationship in Category
    // First set all parentId to null
    await prisma.category.updateMany({
      data: { parentId: null },
    })
    // Then delete all categories
    await prisma.category.deleteMany()

    // Finally delete main tables
    await prisma.blog.deleteMany()
    await prisma.product.deleteMany()
    await prisma.media.deleteMany()
    await prisma.promotion.deleteMany()
    await prisma.shipment.deleteMany()

    // Seed Media first
    const mediaRecords = await Promise.all(
      Array(20)
        .fill(null)
        .map(async () => {
          const image = faker.image.urlLoremFlickr()

          return prisma.media.create({
            data: {
              fileName: faker.system.fileName(),
              creatorId: creatorId,
              url: image,
              type: Math.random() > 0.5 ? 'IMAGE' : 'VIDEO',
              blurDataUrl: await getBlurDataUrl(image),
            },
          })
        }),
    )

    // Seed Categories with sequential creation
    const categoryRecords: any[] = []
    for (let i = 0; i < 10; i++) {
      const category = await prisma.category.create({
        data: {
          creatorId: creatorId,
          name: faker.commerce.department(),
          slug: faker.helpers.slugify(faker.commerce.department()),
          description: faker.commerce.productDescription(),
          featured: Math.random() > 0.7,
          // Optionally add parent if not first category
          ...(i > 0 && categoryRecords.length > 0
            ? {
                parent: {
                  connect: {
                    id: categoryRecords[
                      faker.number.int({ min: 0, max: categoryRecords.length - 1 })
                    ].id,
                  },
                },
              }
            : {}),
          // Optionally add image
          ...(mediaRecords.length > 0
            ? {
                image: {
                  connect: {
                    id: mediaRecords[faker.number.int({ min: 0, max: mediaRecords.length - 1 })].id,
                  },
                },
              }
            : {}),
          seoMetadata: {
            seoTitle: faker.lorem.words(3),
            seoDescription: faker.lorem.sentence(),
            keywords: faker.lorem.words(5).split(' '),
          },
        },
      })
      categoryRecords.push(category)
    }

    // Seed Products
    const productRecords = await Promise.all(
      Array(50)
        .fill(null)
        .map(async () => {
          const productMedias = randomArrayElements(mediaRecords, { min: 1, max: 3 })
          const productCategories = randomArrayElements(categoryRecords, { min: 1, max: 2 })

          return prisma.product.create({
            data: {
              creatorId: creatorId,
              title: faker.commerce.productName(),
              slug: faker.helpers.slugify(faker.commerce.productName()),
              description: {
                contentType: 'HTML',
                content: `<p>${faker.commerce.productDescription()}</p>`,
              },
              price: {
                regular: parseFloat(faker.commerce.price()),
                sale: Math.random() > 0.5 ? parseFloat(faker.commerce.price()) : undefined,
                saleStartDate: Math.random() > 0.5 ? faker.date.past() : undefined,
                saleEndDate: Math.random() > 0.5 ? faker.date.future() : undefined,
              },
              isFeature: Math.random() > 0.7,
              isNewProduct: Math.random() > 0.7,
              status: faker.helpers.arrayElement(['draft', 'published', 'archived']),
              inventory: {
                quantity: faker.number.int({ min: 0, max: 100 }),
                lowStockThreshold: 5,
                stockQuantity: faker.number.int({ min: 0, max: 100 }),
              },
              features: Array(faker.number.int({ min: 1, max: 3 }))
                .fill(null)
                .map(() => ({
                  title: faker.commerce.productAdjective(),
                  description: {
                    contentType: 'TEXT',
                    content: faker.lorem.sentence(),
                  },
                })),
              metadata: {
                seoTitle: faker.lorem.words(3),
                seoDescription: faker.lorem.sentence(),
                keywords: faker.lorem.words(5).split(' '),
              },
              partnerId: creatorId,
              media: {
                create: productMedias.map(media => ({
                  mediaId: media.id,
                  assignedAt: new Date(),
                })),
              },
              categories: {
                create: productCategories.map(category => ({
                  categoryId: category.id,
                  assignedAt: new Date(),
                })),
              },
            },
          })
        }),
    )

    // Seed Blogs
    const blogRecords = await Promise.all(
      Array(15)
        .fill(null)
        .map(async () => {
          const blogCategories = randomArrayElements(categoryRecords, { min: 1, max: 2 })
          const covertImageUrl = faker.image.urlLoremFlickr()

          return prisma.blog.create({
            data: {
              creatorId: creatorId,
              slug: faker.helpers.slugify(faker.lorem.words(3)),
              title: faker.lorem.words(5),
              content: {
                type: faker.helpers.arrayElement(['TEXT', 'HTML', 'MARKDOWN']),
                content: faker.lorem.paragraphs(3),
                excerpt: faker.lorem.paragraph(),
              },
              metadata: {
                title: faker.lorem.words(5),
                description: faker.lorem.sentence(),
                keywords: faker.lorem.words(5).split(' '),
                author: {
                  name: faker.person.fullName(),
                  bio: faker.lorem.sentence(),
                  avatar: faker.image.avatar(),
                },
                readingTime: faker.number.int({ min: 1, max: 15 }),
                coverImageURL: covertImageUrl,
                blurDataUrl: await getBlurDataUrl(covertImageUrl),
                featured: Math.random() > 0.7,
              },
              status: faker.helpers.arrayElement(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
              tags: faker.lorem.words(3).split(' '),
              layout: faker.helpers.arrayElement(['DEFAULT', 'FEATURED', 'MINIMAL']),
              categories: {
                create: blogCategories.map(category => ({
                  categoryId: category.id,
                  assignedAt: new Date(),
                })),
              },
              customFields: [
                { key: 'source', value: faker.lorem.word() },
                { key: 'topic', value: faker.lorem.word() },
              ],
            },
          })
        }),
    )

    // Seed Comments
    await Promise.all(
      blogRecords.flatMap(blog =>
        Array(faker.number.int({ min: 1, max: 5 }))
          .fill(null)
          .map(() =>
            prisma.comment.create({
              data: {
                blogId: blog.id,
                comment: faker.lorem.sentence(),
              },
            }),
          ),
      ),
    )

    // Seed Promotions
    await Promise.all(
      Array(5)
        .fill(null)
        .map(() =>
          prisma.promotion.create({
            data: {
              creatorId: creatorId,
              code: faker.string.alphanumeric(8).toUpperCase(),
              name: faker.commerce.productName(),
              description: faker.lorem.sentence(),
              startDate: faker.date.past(),
              endDate: faker.date.future(),
              conditions: [
                {
                  type: 'MINIMUM_QUANTITY',
                  value: faker.number.int({ min: 1, max: 10 }).toString(),
                },
              ],
              actions: [
                {
                  type: 'PERCENTAGE_DISCOUNT',
                  value: faker.number.int({ min: 5, max: 50 }).toString(),
                  maxDiscount: faker.number.float({ min: 10, max: 100 }),
                },
              ],
              status: faker.helpers.arrayElement(['DRAFT', 'ACTIVE', 'EXPIRED', 'DISABLED']),
              metadata: {
                createdBy: faker.person.fullName(),
                updatedBy: faker.person.fullName(),
                notes: faker.lorem.sentence(),
              },
            },
          }),
        ),
    )

    // Seed Shipments
    await Promise.all(
      Array(5)
        .fill(null)
        .map(() =>
          prisma.shipment.create({
            data: {
              creatorId: creatorId,
              method: faker.helpers.arrayElement(['DELIVERY', 'EXPEDITION']),
              cost: parseFloat(faker.commerce.price()),
              locations: [faker.location.city(), faker.location.city()],
              isActive: Math.random() > 0.2,
            },
          }),
        ),
    )

    // console.log('Database seeded successfully!')
  } catch (error) {
    console.error('Error during database seeding:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

export default seedDatabase

// If running as a script
if (require.main === module) {
  runSeed()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}
