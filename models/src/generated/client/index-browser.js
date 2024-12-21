
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.1.0
 * Query Engine version: 11f085a2012c0f4778414c8db2651556ee0ef959
 */
Prisma.prismaVersion = {
  client: "6.1.0",
  engine: "11f085a2012c0f4778414c8db2651556ee0ef959"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.MediaScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  fileName: 'fileName',
  type: 'type',
  updatedAt: 'updatedAt',
  url: 'url',
  blurDataUrl: 'blurDataUrl'
};

exports.Prisma.ShipmentScalarFieldEnum = {
  id: 'id',
  method: 'method',
  isActive: 'isActive',
  cost: 'cost',
  locations: 'locations',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CategoryScalarFieldEnum = {
  id: 'id',
  name: 'name',
  slug: 'slug',
  description: 'description',
  imageId: 'imageId',
  featured: 'featured',
  parentId: 'parentId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PromotionScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  description: 'description',
  startDate: 'startDate',
  endDate: 'endDate',
  status: 'status',
  priority: 'priority',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  comment: 'comment',
  blogId: 'blogId'
};

exports.Prisma.BlogScalarFieldEnum = {
  id: 'id',
  slug: 'slug',
  title: 'title',
  tags: 'tags',
  status: 'status',
  publishedAt: 'publishedAt',
  layout: 'layout',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  title: 'title',
  slug: 'slug',
  isFeature: 'isFeature',
  isNewProduct: 'isNewProduct',
  tags: 'tags',
  status: 'status',
  visibility: 'visibility',
  blogUrl: 'blogUrl',
  partnerId: 'partnerId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  userName: 'userName',
  rating: 'rating',
  comment: 'comment',
  imageUrl: 'imageUrl',
  helpful: 'helpful',
  notHelpful: 'notHelpful',
  verify: 'verify',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderItemScalarFieldEnum = {
  id: 'id',
  orderId: 'orderId',
  productId: 'productId',
  quantity: 'quantity',
  price: 'price',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  status: 'status',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  clerkId: 'clerkId',
  email: 'email',
  fullName: 'fullName',
  avatar: 'avatar',
  phone: 'phone',
  isAnonymous: 'isAnonymous'
};

exports.Prisma.CategoriesOnBlogsScalarFieldEnum = {
  id: 'id',
  blogId: 'blogId',
  categoryId: 'categoryId',
  assignedAt: 'assignedAt'
};

exports.Prisma.CategoriesOnProductsScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  categoryId: 'categoryId',
  assignedAt: 'assignedAt'
};

exports.Prisma.MediasOnProductsScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  mediaId: 'mediaId',
  assignedAt: 'assignedAt'
};

exports.Prisma.WishlistScalarFieldEnum = {
  id: 'id',
  productId: 'productId',
  userId: 'userId',
  assignedAt: 'assignedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};
exports.MediaType = exports.$Enums.MediaType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
};

exports.ShipmentMethod = exports.$Enums.ShipmentMethod = {
  DELIVERY: 'DELIVERY',
  EXPEDITION: 'EXPEDITION'
};

exports.PromotionStatus = exports.$Enums.PromotionStatus = {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  DISABLED: 'DISABLED'
};

exports.BlogStatus = exports.$Enums.BlogStatus = {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

exports.BlogLayout = exports.$Enums.BlogLayout = {
  DEFAULT: 'DEFAULT',
  FEATURED: 'FEATURED',
  MINIMAL: 'MINIMAL'
};

exports.ProductStatus = exports.$Enums.ProductStatus = {
  draft: 'draft',
  published: 'published',
  archived: 'archived'
};

exports.OrderStatus = exports.$Enums.OrderStatus = {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
  COMPLETED: 'COMPLETED'
};

exports.PromotionConditionType = exports.$Enums.PromotionConditionType = {
  MINIMUM_QUANTITY: 'MINIMUM_QUANTITY',
  SPECIFIC_PRODUCTS: 'SPECIFIC_PRODUCTS',
  DELIVERY_METHOD: 'DELIVERY_METHOD',
  LOCATION: 'LOCATION'
};

exports.PromotionActionType = exports.$Enums.PromotionActionType = {
  PERCENTAGE_DISCOUNT: 'PERCENTAGE_DISCOUNT',
  FIXED_DISCOUNT: 'FIXED_DISCOUNT',
  FREE_SHIPPING: 'FREE_SHIPPING',
  FREE_PRODUCT: 'FREE_PRODUCT',
  BUY_X_GET_Y: 'BUY_X_GET_Y'
};

exports.BlogContentType = exports.$Enums.BlogContentType = {
  TEXT: 'TEXT',
  HTML: 'HTML',
  MARKDOWN: 'MARKDOWN'
};

exports.ProductContentType = exports.$Enums.ProductContentType = {
  HTML: 'HTML',
  TEXT: 'TEXT'
};

exports.Prisma.ModelName = {
  Media: 'Media',
  Shipment: 'Shipment',
  Category: 'Category',
  Promotion: 'Promotion',
  Comment: 'Comment',
  Blog: 'Blog',
  Product: 'Product',
  Review: 'Review',
  OrderItem: 'OrderItem',
  Order: 'Order',
  User: 'User',
  CategoriesOnBlogs: 'CategoriesOnBlogs',
  CategoriesOnProducts: 'CategoriesOnProducts',
  MediasOnProducts: 'MediasOnProducts',
  Wishlist: 'Wishlist'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
