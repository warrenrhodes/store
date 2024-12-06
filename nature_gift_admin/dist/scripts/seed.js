"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlurDataUrl = getBlurDataUrl;
const mongoDB_1 = require("../lib/mongoDB");
const envConfig_1 = require("../envConfig");
const faker_1 = require("@faker-js/faker");
const models_1 = require("@naturegift/models");
// Verify env is loaded
console.log('Database URL exists:', !!envConfig_1.env.DATABASE_URL);
const creatorId = '676401e855b3332c5701717c';
async function getBlurDataUrl(imageUrl) {
    try {
        const res = await fetch(imageUrl);
        const buffer = await res.arrayBuffer();
        const { getPlaiceholder } = await import('plaiceholder');
        const { base64 } = await getPlaiceholder(Buffer.from(buffer));
        return base64;
    }
    catch (err) {
        console.error('Error generating blur placeholder:', err);
        return;
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
        console.log('Starting database seeding...');
        await (0, mongoDB_1.connectToDB)();
        // Run seed function
        await seedDatabase();
        console.log('Seeding completed successfully.');
        // Close the connection
        process.exit(0);
    }
    catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}
function randomArrayElements(array, options) {
    const min = options?.min ?? 1;
    const max = options?.max ?? array.length;
    const count = faker_1.faker.number.int({ min, max });
    return faker_1.faker.helpers.arrayElements(array, count);
}
// Type-safe seeding function with comprehensive error handling
async function seedDatabase() {
    try {
        // Clear existing data with type-safe delete operations
        await models_1.prisma.orderItem.deleteMany();
        await models_1.prisma.order.deleteMany();
        await models_1.prisma.review.deleteMany();
        await models_1.prisma.comment.deleteMany();
        // Delete junction tables first
        await models_1.prisma.categoriesOnBlogs.deleteMany();
        await models_1.prisma.categoriesOnProducts.deleteMany();
        await models_1.prisma.mediasOnProducts.deleteMany();
        // Then delete dependent tables
        await models_1.prisma.comment.deleteMany();
        await models_1.prisma.review.deleteMany();
        await models_1.prisma.wishlist.deleteMany();
        // Handle self-referential relationship in Category
        // First set all parentId to null
        await models_1.prisma.category.updateMany({
            data: { parentId: null },
        });
        // Then delete all categories
        await models_1.prisma.category.deleteMany();
        // Finally delete main tables
        await models_1.prisma.blog.deleteMany();
        await models_1.prisma.product.deleteMany();
        await models_1.prisma.media.deleteMany();
        await models_1.prisma.promotion.deleteMany();
        await models_1.prisma.shipment.deleteMany();
        // Seed Media first
        const mediaRecords = await Promise.all(Array(20)
            .fill(null)
            .map(async () => {
            const image = faker_1.faker.image.urlLoremFlickr();
            return models_1.prisma.media.create({
                data: {
                    fileName: faker_1.faker.system.fileName(),
                    creatorId: creatorId,
                    url: image,
                    type: Math.random() > 0.5 ? 'IMAGE' : 'VIDEO',
                    blurDataUrl: await getBlurDataUrl(image),
                },
            });
        }));
        // Seed Categories with sequential creation
        const categoryRecords = [];
        for (let i = 0; i < 10; i++) {
            const category = await models_1.prisma.category.create({
                data: {
                    creatorId: creatorId,
                    name: faker_1.faker.commerce.department(),
                    slug: faker_1.faker.helpers.slugify(faker_1.faker.commerce.department()),
                    description: faker_1.faker.commerce.productDescription(),
                    featured: Math.random() > 0.7,
                    // Optionally add parent if not first category
                    ...(i > 0 && categoryRecords.length > 0
                        ? {
                            parent: {
                                connect: {
                                    id: categoryRecords[faker_1.faker.number.int({ min: 0, max: categoryRecords.length - 1 })].id,
                                },
                            },
                        }
                        : {}),
                    // Optionally add image
                    ...(mediaRecords.length > 0
                        ? {
                            image: {
                                connect: {
                                    id: mediaRecords[faker_1.faker.number.int({ min: 0, max: mediaRecords.length - 1 })].id,
                                },
                            },
                        }
                        : {}),
                    seoMetadata: {
                        seoTitle: faker_1.faker.lorem.words(3),
                        seoDescription: faker_1.faker.lorem.sentence(),
                        keywords: faker_1.faker.lorem.words(5).split(' '),
                    },
                },
            });
            categoryRecords.push(category);
        }
        // Seed Products
        const productRecords = await Promise.all(Array(50)
            .fill(null)
            .map(async () => {
            const productMedias = randomArrayElements(mediaRecords, { min: 1, max: 3 });
            const productCategories = randomArrayElements(categoryRecords, { min: 1, max: 2 });
            return models_1.prisma.product.create({
                data: {
                    creatorId: creatorId,
                    title: faker_1.faker.commerce.productName(),
                    slug: faker_1.faker.helpers.slugify(faker_1.faker.commerce.productName()),
                    description: {
                        contentType: 'HTML',
                        content: `<p>${faker_1.faker.commerce.productDescription()}</p>`,
                    },
                    price: {
                        regular: parseFloat(faker_1.faker.commerce.price()),
                        sale: Math.random() > 0.5 ? parseFloat(faker_1.faker.commerce.price()) : undefined,
                        saleStartDate: Math.random() > 0.5 ? faker_1.faker.date.past() : undefined,
                        saleEndDate: Math.random() > 0.5 ? faker_1.faker.date.future() : undefined,
                    },
                    isFeature: Math.random() > 0.7,
                    isNewProduct: Math.random() > 0.7,
                    status: faker_1.faker.helpers.arrayElement(['draft', 'published', 'archived']),
                    inventory: {
                        quantity: faker_1.faker.number.int({ min: 0, max: 100 }),
                        lowStockThreshold: 5,
                        stockQuantity: faker_1.faker.number.int({ min: 0, max: 100 }),
                    },
                    features: Array(faker_1.faker.number.int({ min: 1, max: 3 }))
                        .fill(null)
                        .map(() => ({
                        title: faker_1.faker.commerce.productAdjective(),
                        description: {
                            contentType: 'TEXT',
                            content: faker_1.faker.lorem.sentence(),
                        },
                    })),
                    metadata: {
                        seoTitle: faker_1.faker.lorem.words(3),
                        seoDescription: faker_1.faker.lorem.sentence(),
                        keywords: faker_1.faker.lorem.words(5).split(' '),
                    },
                    partnerId: faker_1.faker.string.uuid(),
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
            });
        }));
        // Seed Blogs
        const blogRecords = await Promise.all(Array(15)
            .fill(null)
            .map(async () => {
            const blogCategories = randomArrayElements(categoryRecords, { min: 1, max: 2 });
            const covertImageUrl = faker_1.faker.image.urlLoremFlickr();
            return models_1.prisma.blog.create({
                data: {
                    creatorId: creatorId,
                    slug: faker_1.faker.helpers.slugify(faker_1.faker.lorem.words(3)),
                    title: faker_1.faker.lorem.words(5),
                    content: {
                        type: faker_1.faker.helpers.arrayElement(['TEXT', 'HTML', 'MARKDOWN']),
                        content: faker_1.faker.lorem.paragraphs(3),
                        excerpt: faker_1.faker.lorem.paragraph(),
                    },
                    metadata: {
                        title: faker_1.faker.lorem.words(5),
                        description: faker_1.faker.lorem.sentence(),
                        keywords: faker_1.faker.lorem.words(5).split(' '),
                        author: {
                            name: faker_1.faker.person.fullName(),
                            bio: faker_1.faker.lorem.sentence(),
                            avatar: faker_1.faker.image.avatar(),
                        },
                        readingTime: faker_1.faker.number.int({ min: 1, max: 15 }),
                        coverImageURL: covertImageUrl,
                        blurDataUrl: await getBlurDataUrl(covertImageUrl),
                        featured: Math.random() > 0.7,
                    },
                    status: faker_1.faker.helpers.arrayElement(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
                    tags: faker_1.faker.lorem.words(3).split(' '),
                    layout: faker_1.faker.helpers.arrayElement(['DEFAULT', 'FEATURED', 'MINIMAL']),
                    categories: {
                        create: blogCategories.map(category => ({
                            categoryId: category.id,
                            assignedAt: new Date(),
                        })),
                    },
                    customFields: [
                        { key: 'source', value: faker_1.faker.lorem.word() },
                        { key: 'topic', value: faker_1.faker.lorem.word() },
                    ],
                },
            });
        }));
        // Seed Comments
        await Promise.all(blogRecords.flatMap(blog => Array(faker_1.faker.number.int({ min: 1, max: 5 }))
            .fill(null)
            .map(() => models_1.prisma.comment.create({
            data: {
                blogId: blog.id,
                comment: faker_1.faker.lorem.sentence(),
            },
        }))));
        // Seed Promotions
        await Promise.all(Array(5)
            .fill(null)
            .map(() => models_1.prisma.promotion.create({
            data: {
                creatorId: creatorId,
                code: faker_1.faker.string.alphanumeric(8).toUpperCase(),
                name: faker_1.faker.commerce.productName(),
                description: faker_1.faker.lorem.sentence(),
                startDate: faker_1.faker.date.past(),
                endDate: faker_1.faker.date.future(),
                conditions: [
                    {
                        type: 'MINIMUM_QUANTITY',
                        value: faker_1.faker.number.int({ min: 1, max: 10 }).toString(),
                    },
                ],
                actions: [
                    {
                        type: 'PERCENTAGE_DISCOUNT',
                        value: faker_1.faker.number.int({ min: 5, max: 50 }).toString(),
                        maxDiscount: faker_1.faker.number.float({ min: 10, max: 100 }),
                    },
                ],
                status: faker_1.faker.helpers.arrayElement(['DRAFT', 'ACTIVE', 'EXPIRED', 'DISABLED']),
                metadata: {
                    createdBy: faker_1.faker.person.fullName(),
                    updatedBy: faker_1.faker.person.fullName(),
                    notes: faker_1.faker.lorem.sentence(),
                },
            },
        })));
        // Seed Shipments
        await Promise.all(Array(5)
            .fill(null)
            .map(() => models_1.prisma.shipment.create({
            data: {
                creatorId: creatorId,
                method: faker_1.faker.helpers.arrayElement(['DELIVERY', 'EXPEDITION']),
                cost: parseFloat(faker_1.faker.commerce.price()),
                locations: [faker_1.faker.location.city(), faker_1.faker.location.city()],
                isActive: Math.random() > 0.2,
            },
        })));
        // console.log('Database seeded successfully!')
    }
    catch (error) {
        console.error('Error during database seeding:', error);
        throw error;
    }
    finally {
        await models_1.prisma.$disconnect();
    }
}
exports.default = seedDatabase;
// If running as a script
if (require.main === module) {
    runSeed()
        .then(() => process.exit(0))
        .catch(error => {
        console.error(error);
        process.exit(1);
    });
}
