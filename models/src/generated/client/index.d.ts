
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model SeoMetadata
 * 
 */
export type SeoMetadata = $Result.DefaultSelection<Prisma.$SeoMetadataPayload>
/**
 * Model PromotionAction
 * 
 */
export type PromotionAction = $Result.DefaultSelection<Prisma.$PromotionActionPayload>
/**
 * Model PromotionCondition
 * 
 */
export type PromotionCondition = $Result.DefaultSelection<Prisma.$PromotionConditionPayload>
/**
 * Model Metadata
 * 
 */
export type Metadata = $Result.DefaultSelection<Prisma.$MetadataPayload>
/**
 * Model UsageLimit
 * 
 */
export type UsageLimit = $Result.DefaultSelection<Prisma.$UsageLimitPayload>
/**
 * Model BlogContent
 * 
 */
export type BlogContent = $Result.DefaultSelection<Prisma.$BlogContentPayload>
/**
 * Model BlogAuthor
 * 
 */
export type BlogAuthor = $Result.DefaultSelection<Prisma.$BlogAuthorPayload>
/**
 * Model BlogMetadata
 * 
 */
export type BlogMetadata = $Result.DefaultSelection<Prisma.$BlogMetadataPayload>
/**
 * Model CustomFields
 * 
 */
export type CustomFields = $Result.DefaultSelection<Prisma.$CustomFieldsPayload>
/**
 * Model ProductDescription
 * 
 */
export type ProductDescription = $Result.DefaultSelection<Prisma.$ProductDescriptionPayload>
/**
 * Model Feature
 * 
 */
export type Feature = $Result.DefaultSelection<Prisma.$FeaturePayload>
/**
 * Model Price
 * 
 */
export type Price = $Result.DefaultSelection<Prisma.$PricePayload>
/**
 * Model Inventory
 * 
 */
export type Inventory = $Result.DefaultSelection<Prisma.$InventoryPayload>
/**
 * Model ProductSeoMetadata
 * 
 */
export type ProductSeoMetadata = $Result.DefaultSelection<Prisma.$ProductSeoMetadataPayload>
/**
 * Model UserData
 * 
 */
export type UserData = $Result.DefaultSelection<Prisma.$UserDataPayload>
/**
 * Model OrderPromotion
 * 
 */
export type OrderPromotion = $Result.DefaultSelection<Prisma.$OrderPromotionPayload>
/**
 * Model OrderPrices
 * 
 */
export type OrderPrices = $Result.DefaultSelection<Prisma.$OrderPricesPayload>
/**
 * Model DeliveryInfo
 * 
 */
export type DeliveryInfo = $Result.DefaultSelection<Prisma.$DeliveryInfoPayload>
/**
 * Model Media
 * 
 */
export type Media = $Result.DefaultSelection<Prisma.$MediaPayload>
/**
 * Model Shipment
 * 
 */
export type Shipment = $Result.DefaultSelection<Prisma.$ShipmentPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Promotion
 * 
 */
export type Promotion = $Result.DefaultSelection<Prisma.$PromotionPayload>
/**
 * Model Comment
 * 
 */
export type Comment = $Result.DefaultSelection<Prisma.$CommentPayload>
/**
 * Model Blog
 * 
 */
export type Blog = $Result.DefaultSelection<Prisma.$BlogPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model Review
 * 
 */
export type Review = $Result.DefaultSelection<Prisma.$ReviewPayload>
/**
 * Model OrderItem
 * 
 */
export type OrderItem = $Result.DefaultSelection<Prisma.$OrderItemPayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model CategoriesOnBlogs
 * Many to many ( a blog can have 0 or more categories and categories can be link to 
 * one or more blog)
 */
export type CategoriesOnBlogs = $Result.DefaultSelection<Prisma.$CategoriesOnBlogsPayload>
/**
 * Model CategoriesOnProducts
 * 
 */
export type CategoriesOnProducts = $Result.DefaultSelection<Prisma.$CategoriesOnProductsPayload>
/**
 * Model MediasOnProducts
 * 
 */
export type MediasOnProducts = $Result.DefaultSelection<Prisma.$MediasOnProductsPayload>
/**
 * Model Wishlist
 * 
 */
export type Wishlist = $Result.DefaultSelection<Prisma.$WishlistPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const MediaType: {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
};

export type MediaType = (typeof MediaType)[keyof typeof MediaType]


export const ShipmentMethod: {
  DELIVERY: 'DELIVERY',
  EXPEDITION: 'EXPEDITION'
};

export type ShipmentMethod = (typeof ShipmentMethod)[keyof typeof ShipmentMethod]


export const PromotionStatus: {
  DRAFT: 'DRAFT',
  ACTIVE: 'ACTIVE',
  EXPIRED: 'EXPIRED',
  DISABLED: 'DISABLED'
};

export type PromotionStatus = (typeof PromotionStatus)[keyof typeof PromotionStatus]


export const PromotionActionType: {
  PERCENTAGE_DISCOUNT: 'PERCENTAGE_DISCOUNT',
  FIXED_DISCOUNT: 'FIXED_DISCOUNT',
  FREE_SHIPPING: 'FREE_SHIPPING',
  FREE_PRODUCT: 'FREE_PRODUCT',
  BUY_X_GET_Y: 'BUY_X_GET_Y'
};

export type PromotionActionType = (typeof PromotionActionType)[keyof typeof PromotionActionType]


export const PromotionConditionType: {
  MINIMUM_QUANTITY: 'MINIMUM_QUANTITY',
  SPECIFIC_PRODUCTS: 'SPECIFIC_PRODUCTS',
  DELIVERY_METHOD: 'DELIVERY_METHOD',
  LOCATION: 'LOCATION'
};

export type PromotionConditionType = (typeof PromotionConditionType)[keyof typeof PromotionConditionType]


export const BlogContentType: {
  TEXT: 'TEXT',
  HTML: 'HTML',
  MARKDOWN: 'MARKDOWN'
};

export type BlogContentType = (typeof BlogContentType)[keyof typeof BlogContentType]


export const BlogStatus: {
  DRAFT: 'DRAFT',
  PUBLISHED: 'PUBLISHED',
  ARCHIVED: 'ARCHIVED'
};

export type BlogStatus = (typeof BlogStatus)[keyof typeof BlogStatus]


export const BlogLayout: {
  DEFAULT: 'DEFAULT',
  FEATURED: 'FEATURED',
  MINIMAL: 'MINIMAL'
};

export type BlogLayout = (typeof BlogLayout)[keyof typeof BlogLayout]


export const ProductContentType: {
  HTML: 'HTML',
  TEXT: 'TEXT'
};

export type ProductContentType = (typeof ProductContentType)[keyof typeof ProductContentType]


export const ProductStatus: {
  draft: 'draft',
  published: 'published',
  archived: 'archived'
};

export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus]


export const OrderStatus: {
  PENDING: 'PENDING',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
  COMPLETED: 'COMPLETED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

}

export type MediaType = $Enums.MediaType

export const MediaType: typeof $Enums.MediaType

export type ShipmentMethod = $Enums.ShipmentMethod

export const ShipmentMethod: typeof $Enums.ShipmentMethod

export type PromotionStatus = $Enums.PromotionStatus

export const PromotionStatus: typeof $Enums.PromotionStatus

export type PromotionActionType = $Enums.PromotionActionType

export const PromotionActionType: typeof $Enums.PromotionActionType

export type PromotionConditionType = $Enums.PromotionConditionType

export const PromotionConditionType: typeof $Enums.PromotionConditionType

export type BlogContentType = $Enums.BlogContentType

export const BlogContentType: typeof $Enums.BlogContentType

export type BlogStatus = $Enums.BlogStatus

export const BlogStatus: typeof $Enums.BlogStatus

export type BlogLayout = $Enums.BlogLayout

export const BlogLayout: typeof $Enums.BlogLayout

export type ProductContentType = $Enums.ProductContentType

export const ProductContentType: typeof $Enums.ProductContentType

export type ProductStatus = $Enums.ProductStatus

export const ProductStatus: typeof $Enums.ProductStatus

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Media
 * const media = await prisma.media.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Media
   * const media = await prisma.media.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P]): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number }): $Utils.JsPromise<R>

  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): Prisma.PrismaPromise<Prisma.JsonObject>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.media`: Exposes CRUD operations for the **Media** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Media
    * const media = await prisma.media.findMany()
    * ```
    */
  get media(): Prisma.MediaDelegate<ExtArgs>;

  /**
   * `prisma.shipment`: Exposes CRUD operations for the **Shipment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shipments
    * const shipments = await prisma.shipment.findMany()
    * ```
    */
  get shipment(): Prisma.ShipmentDelegate<ExtArgs>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs>;

  /**
   * `prisma.promotion`: Exposes CRUD operations for the **Promotion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Promotions
    * const promotions = await prisma.promotion.findMany()
    * ```
    */
  get promotion(): Prisma.PromotionDelegate<ExtArgs>;

  /**
   * `prisma.comment`: Exposes CRUD operations for the **Comment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comments
    * const comments = await prisma.comment.findMany()
    * ```
    */
  get comment(): Prisma.CommentDelegate<ExtArgs>;

  /**
   * `prisma.blog`: Exposes CRUD operations for the **Blog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Blogs
    * const blogs = await prisma.blog.findMany()
    * ```
    */
  get blog(): Prisma.BlogDelegate<ExtArgs>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs>;

  /**
   * `prisma.review`: Exposes CRUD operations for the **Review** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reviews
    * const reviews = await prisma.review.findMany()
    * ```
    */
  get review(): Prisma.ReviewDelegate<ExtArgs>;

  /**
   * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderItems
    * const orderItems = await prisma.orderItem.findMany()
    * ```
    */
  get orderItem(): Prisma.OrderItemDelegate<ExtArgs>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.categoriesOnBlogs`: Exposes CRUD operations for the **CategoriesOnBlogs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CategoriesOnBlogs
    * const categoriesOnBlogs = await prisma.categoriesOnBlogs.findMany()
    * ```
    */
  get categoriesOnBlogs(): Prisma.CategoriesOnBlogsDelegate<ExtArgs>;

  /**
   * `prisma.categoriesOnProducts`: Exposes CRUD operations for the **CategoriesOnProducts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CategoriesOnProducts
    * const categoriesOnProducts = await prisma.categoriesOnProducts.findMany()
    * ```
    */
  get categoriesOnProducts(): Prisma.CategoriesOnProductsDelegate<ExtArgs>;

  /**
   * `prisma.mediasOnProducts`: Exposes CRUD operations for the **MediasOnProducts** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediasOnProducts
    * const mediasOnProducts = await prisma.mediasOnProducts.findMany()
    * ```
    */
  get mediasOnProducts(): Prisma.MediasOnProductsDelegate<ExtArgs>;

  /**
   * `prisma.wishlist`: Exposes CRUD operations for the **Wishlist** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Wishlists
    * const wishlists = await prisma.wishlist.findMany()
    * ```
    */
  get wishlist(): Prisma.WishlistDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.1.0
   * Query Engine version: 11f085a2012c0f4778414c8db2651556ee0ef959
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "media" | "shipment" | "category" | "promotion" | "comment" | "blog" | "product" | "review" | "orderItem" | "order" | "user" | "categoriesOnBlogs" | "categoriesOnProducts" | "mediasOnProducts" | "wishlist"
      txIsolationLevel: never
    }
    model: {
      Media: {
        payload: Prisma.$MediaPayload<ExtArgs>
        fields: Prisma.MediaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          findFirst: {
            args: Prisma.MediaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          findMany: {
            args: Prisma.MediaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>[]
          }
          create: {
            args: Prisma.MediaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          createMany: {
            args: Prisma.MediaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MediaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          update: {
            args: Prisma.MediaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          deleteMany: {
            args: Prisma.MediaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MediaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaPayload>
          }
          aggregate: {
            args: Prisma.MediaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedia>
          }
          groupBy: {
            args: Prisma.MediaGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MediaFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MediaAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MediaCountArgs<ExtArgs>
            result: $Utils.Optional<MediaCountAggregateOutputType> | number
          }
        }
      }
      Shipment: {
        payload: Prisma.$ShipmentPayload<ExtArgs>
        fields: Prisma.ShipmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ShipmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ShipmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          findFirst: {
            args: Prisma.ShipmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ShipmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          findMany: {
            args: Prisma.ShipmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>[]
          }
          create: {
            args: Prisma.ShipmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          createMany: {
            args: Prisma.ShipmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ShipmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          update: {
            args: Prisma.ShipmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          deleteMany: {
            args: Prisma.ShipmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ShipmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ShipmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ShipmentPayload>
          }
          aggregate: {
            args: Prisma.ShipmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShipment>
          }
          groupBy: {
            args: Prisma.ShipmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ShipmentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ShipmentFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ShipmentAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ShipmentCountArgs<ExtArgs>
            result: $Utils.Optional<ShipmentCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CategoryFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CategoryAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Promotion: {
        payload: Prisma.$PromotionPayload<ExtArgs>
        fields: Prisma.PromotionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromotionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromotionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>
          }
          findFirst: {
            args: Prisma.PromotionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromotionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>
          }
          findMany: {
            args: Prisma.PromotionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>[]
          }
          create: {
            args: Prisma.PromotionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>
          }
          createMany: {
            args: Prisma.PromotionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PromotionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>
          }
          update: {
            args: Prisma.PromotionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>
          }
          deleteMany: {
            args: Prisma.PromotionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromotionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PromotionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromotionPayload>
          }
          aggregate: {
            args: Prisma.PromotionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromotion>
          }
          groupBy: {
            args: Prisma.PromotionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromotionGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.PromotionFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.PromotionAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.PromotionCountArgs<ExtArgs>
            result: $Utils.Optional<PromotionCountAggregateOutputType> | number
          }
        }
      }
      Comment: {
        payload: Prisma.$CommentPayload<ExtArgs>
        fields: Prisma.CommentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findFirst: {
            args: Prisma.CommentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          findMany: {
            args: Prisma.CommentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>[]
          }
          create: {
            args: Prisma.CommentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          createMany: {
            args: Prisma.CommentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CommentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          update: {
            args: Prisma.CommentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          deleteMany: {
            args: Prisma.CommentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommentPayload>
          }
          aggregate: {
            args: Prisma.CommentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComment>
          }
          groupBy: {
            args: Prisma.CommentGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommentGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CommentFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CommentAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CommentCountArgs<ExtArgs>
            result: $Utils.Optional<CommentCountAggregateOutputType> | number
          }
        }
      }
      Blog: {
        payload: Prisma.$BlogPayload<ExtArgs>
        fields: Prisma.BlogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          findFirst: {
            args: Prisma.BlogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          findMany: {
            args: Prisma.BlogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>[]
          }
          create: {
            args: Prisma.BlogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          createMany: {
            args: Prisma.BlogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BlogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          update: {
            args: Prisma.BlogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          deleteMany: {
            args: Prisma.BlogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPayload>
          }
          aggregate: {
            args: Prisma.BlogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlog>
          }
          groupBy: {
            args: Prisma.BlogGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.BlogFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.BlogAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.BlogCountArgs<ExtArgs>
            result: $Utils.Optional<BlogCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ProductFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ProductAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      Review: {
        payload: Prisma.$ReviewPayload<ExtArgs>
        fields: Prisma.ReviewFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReviewFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReviewFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findFirst: {
            args: Prisma.ReviewFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReviewFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          findMany: {
            args: Prisma.ReviewFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>[]
          }
          create: {
            args: Prisma.ReviewCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          createMany: {
            args: Prisma.ReviewCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ReviewDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          update: {
            args: Prisma.ReviewUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          deleteMany: {
            args: Prisma.ReviewDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReviewUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ReviewUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReviewPayload>
          }
          aggregate: {
            args: Prisma.ReviewAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReview>
          }
          groupBy: {
            args: Prisma.ReviewGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReviewGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.ReviewFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.ReviewAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.ReviewCountArgs<ExtArgs>
            result: $Utils.Optional<ReviewCountAggregateOutputType> | number
          }
        }
      }
      OrderItem: {
        payload: Prisma.$OrderItemPayload<ExtArgs>
        fields: Prisma.OrderItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findFirst: {
            args: Prisma.OrderItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          findMany: {
            args: Prisma.OrderItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>[]
          }
          create: {
            args: Prisma.OrderItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          createMany: {
            args: Prisma.OrderItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          update: {
            args: Prisma.OrderItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          deleteMany: {
            args: Prisma.OrderItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderItemPayload>
          }
          aggregate: {
            args: Prisma.OrderItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderItem>
          }
          groupBy: {
            args: Prisma.OrderItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderItemGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.OrderItemFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.OrderItemAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.OrderItemCountArgs<ExtArgs>
            result: $Utils.Optional<OrderItemCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.OrderFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.OrderAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.UserFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.UserAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      CategoriesOnBlogs: {
        payload: Prisma.$CategoriesOnBlogsPayload<ExtArgs>
        fields: Prisma.CategoriesOnBlogsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoriesOnBlogsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnBlogsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoriesOnBlogsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnBlogsPayload>
          }
          findFirst: {
            args: Prisma.CategoriesOnBlogsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnBlogsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoriesOnBlogsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnBlogsPayload>
          }
          findMany: {
            args: Prisma.CategoriesOnBlogsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnBlogsPayload>[]
          }
          create: {
            args: Prisma.CategoriesOnBlogsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnBlogsPayload>
          }
          createMany: {
            args: Prisma.CategoriesOnBlogsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CategoriesOnBlogsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnBlogsPayload>
          }
          update: {
            args: Prisma.CategoriesOnBlogsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnBlogsPayload>
          }
          deleteMany: {
            args: Prisma.CategoriesOnBlogsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoriesOnBlogsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoriesOnBlogsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnBlogsPayload>
          }
          aggregate: {
            args: Prisma.CategoriesOnBlogsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoriesOnBlogs>
          }
          groupBy: {
            args: Prisma.CategoriesOnBlogsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriesOnBlogsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CategoriesOnBlogsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CategoriesOnBlogsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CategoriesOnBlogsCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriesOnBlogsCountAggregateOutputType> | number
          }
        }
      }
      CategoriesOnProducts: {
        payload: Prisma.$CategoriesOnProductsPayload<ExtArgs>
        fields: Prisma.CategoriesOnProductsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoriesOnProductsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnProductsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoriesOnProductsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnProductsPayload>
          }
          findFirst: {
            args: Prisma.CategoriesOnProductsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnProductsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoriesOnProductsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnProductsPayload>
          }
          findMany: {
            args: Prisma.CategoriesOnProductsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnProductsPayload>[]
          }
          create: {
            args: Prisma.CategoriesOnProductsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnProductsPayload>
          }
          createMany: {
            args: Prisma.CategoriesOnProductsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CategoriesOnProductsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnProductsPayload>
          }
          update: {
            args: Prisma.CategoriesOnProductsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnProductsPayload>
          }
          deleteMany: {
            args: Prisma.CategoriesOnProductsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoriesOnProductsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoriesOnProductsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoriesOnProductsPayload>
          }
          aggregate: {
            args: Prisma.CategoriesOnProductsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategoriesOnProducts>
          }
          groupBy: {
            args: Prisma.CategoriesOnProductsGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoriesOnProductsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.CategoriesOnProductsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.CategoriesOnProductsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.CategoriesOnProductsCountArgs<ExtArgs>
            result: $Utils.Optional<CategoriesOnProductsCountAggregateOutputType> | number
          }
        }
      }
      MediasOnProducts: {
        payload: Prisma.$MediasOnProductsPayload<ExtArgs>
        fields: Prisma.MediasOnProductsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediasOnProductsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediasOnProductsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediasOnProductsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediasOnProductsPayload>
          }
          findFirst: {
            args: Prisma.MediasOnProductsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediasOnProductsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediasOnProductsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediasOnProductsPayload>
          }
          findMany: {
            args: Prisma.MediasOnProductsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediasOnProductsPayload>[]
          }
          create: {
            args: Prisma.MediasOnProductsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediasOnProductsPayload>
          }
          createMany: {
            args: Prisma.MediasOnProductsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MediasOnProductsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediasOnProductsPayload>
          }
          update: {
            args: Prisma.MediasOnProductsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediasOnProductsPayload>
          }
          deleteMany: {
            args: Prisma.MediasOnProductsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediasOnProductsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MediasOnProductsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediasOnProductsPayload>
          }
          aggregate: {
            args: Prisma.MediasOnProductsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediasOnProducts>
          }
          groupBy: {
            args: Prisma.MediasOnProductsGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediasOnProductsGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.MediasOnProductsFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.MediasOnProductsAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.MediasOnProductsCountArgs<ExtArgs>
            result: $Utils.Optional<MediasOnProductsCountAggregateOutputType> | number
          }
        }
      }
      Wishlist: {
        payload: Prisma.$WishlistPayload<ExtArgs>
        fields: Prisma.WishlistFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WishlistFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WishlistFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>
          }
          findFirst: {
            args: Prisma.WishlistFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WishlistFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>
          }
          findMany: {
            args: Prisma.WishlistFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>[]
          }
          create: {
            args: Prisma.WishlistCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>
          }
          createMany: {
            args: Prisma.WishlistCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.WishlistDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>
          }
          update: {
            args: Prisma.WishlistUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>
          }
          deleteMany: {
            args: Prisma.WishlistDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WishlistUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WishlistUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WishlistPayload>
          }
          aggregate: {
            args: Prisma.WishlistAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWishlist>
          }
          groupBy: {
            args: Prisma.WishlistGroupByArgs<ExtArgs>
            result: $Utils.Optional<WishlistGroupByOutputType>[]
          }
          findRaw: {
            args: Prisma.WishlistFindRawArgs<ExtArgs>
            result: JsonObject
          }
          aggregateRaw: {
            args: Prisma.WishlistAggregateRawArgs<ExtArgs>
            result: JsonObject
          }
          count: {
            args: Prisma.WishlistCountArgs<ExtArgs>
            result: $Utils.Optional<WishlistCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $runCommandRaw: {
          args: Prisma.InputJsonObject,
          result: Prisma.JsonObject
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type MediaCountOutputType
   */

  export type MediaCountOutputType = {
    products: number
    categories: number
  }

  export type MediaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | MediaCountOutputTypeCountProductsArgs
    categories?: boolean | MediaCountOutputTypeCountCategoriesArgs
  }

  // Custom InputTypes
  /**
   * MediaCountOutputType without action
   */
  export type MediaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaCountOutputType
     */
    select?: MediaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MediaCountOutputType without action
   */
  export type MediaCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediasOnProductsWhereInput
  }

  /**
   * MediaCountOutputType without action
   */
  export type MediaCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    children: number
    blogs: number
    products: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | CategoryCountOutputTypeCountChildrenArgs
    blogs?: boolean | CategoryCountOutputTypeCountBlogsArgs
    products?: boolean | CategoryCountOutputTypeCountProductsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountBlogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriesOnBlogsWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProductsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriesOnProductsWhereInput
  }


  /**
   * Count Type BlogCountOutputType
   */

  export type BlogCountOutputType = {
    categories: number
    comments: number
  }

  export type BlogCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | BlogCountOutputTypeCountCategoriesArgs
    comments?: boolean | BlogCountOutputTypeCountCommentsArgs
  }

  // Custom InputTypes
  /**
   * BlogCountOutputType without action
   */
  export type BlogCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCountOutputType
     */
    select?: BlogCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BlogCountOutputType without action
   */
  export type BlogCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriesOnBlogsWhereInput
  }

  /**
   * BlogCountOutputType without action
   */
  export type BlogCountOutputTypeCountCommentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
  }


  /**
   * Count Type ProductCountOutputType
   */

  export type ProductCountOutputType = {
    media: number
    reviews: number
    categories: number
    OrderItem: number
    userWishlist: number
  }

  export type ProductCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | ProductCountOutputTypeCountMediaArgs
    reviews?: boolean | ProductCountOutputTypeCountReviewsArgs
    categories?: boolean | ProductCountOutputTypeCountCategoriesArgs
    OrderItem?: boolean | ProductCountOutputTypeCountOrderItemArgs
    userWishlist?: boolean | ProductCountOutputTypeCountUserWishlistArgs
  }

  // Custom InputTypes
  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductCountOutputType
     */
    select?: ProductCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediasOnProductsWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountReviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriesOnProductsWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountOrderItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }

  /**
   * ProductCountOutputType without action
   */
  export type ProductCountOutputTypeCountUserWishlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WishlistWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    items: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | OrderCountOutputTypeCountItemsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    productWishlist: number
    order: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productWishlist?: boolean | UserCountOutputTypeCountProductWishlistArgs
    order?: boolean | UserCountOutputTypeCountOrderArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProductWishlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WishlistWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOrderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Models
   */

  /**
   * Model SeoMetadata
   */





  export type SeoMetadataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seoTitle?: boolean
    seoDescription?: boolean
    keywords?: boolean
  }, ExtArgs["result"]["seoMetadata"]>


  export type SeoMetadataSelectScalar = {
    seoTitle?: boolean
    seoDescription?: boolean
    keywords?: boolean
  }


  export type $SeoMetadataPayload = {
    name: "SeoMetadata"
    objects: {}
    scalars: {
      seoTitle: string | null
      seoDescription: string | null
      keywords: string[]
    }
    composites: {}
  }

  type SeoMetadataGetPayload<S extends boolean | null | undefined | SeoMetadataDefaultArgs> = $Result.GetResult<Prisma.$SeoMetadataPayload, S>





  /**
   * Fields of the SeoMetadata model
   */ 
  interface SeoMetadataFieldRefs {
    readonly seoTitle: FieldRef<"SeoMetadata", 'String'>
    readonly seoDescription: FieldRef<"SeoMetadata", 'String'>
    readonly keywords: FieldRef<"SeoMetadata", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * SeoMetadata without action
   */
  export type SeoMetadataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeoMetadata
     */
    select?: SeoMetadataSelect<ExtArgs> | null
  }


  /**
   * Model PromotionAction
   */





  export type PromotionActionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    type?: boolean
    value?: boolean
    maxDiscount?: boolean
  }, ExtArgs["result"]["promotionAction"]>


  export type PromotionActionSelectScalar = {
    type?: boolean
    value?: boolean
    maxDiscount?: boolean
  }


  export type $PromotionActionPayload = {
    name: "PromotionAction"
    objects: {}
    scalars: {
      type: $Enums.PromotionActionType
      value: string
      maxDiscount: number | null
    }
    composites: {}
  }

  type PromotionActionGetPayload<S extends boolean | null | undefined | PromotionActionDefaultArgs> = $Result.GetResult<Prisma.$PromotionActionPayload, S>





  /**
   * Fields of the PromotionAction model
   */ 
  interface PromotionActionFieldRefs {
    readonly type: FieldRef<"PromotionAction", 'PromotionActionType'>
    readonly value: FieldRef<"PromotionAction", 'String'>
    readonly maxDiscount: FieldRef<"PromotionAction", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * PromotionAction without action
   */
  export type PromotionActionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionAction
     */
    select?: PromotionActionSelect<ExtArgs> | null
  }


  /**
   * Model PromotionCondition
   */





  export type PromotionConditionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    type?: boolean
    value?: boolean
  }, ExtArgs["result"]["promotionCondition"]>


  export type PromotionConditionSelectScalar = {
    type?: boolean
    value?: boolean
  }


  export type $PromotionConditionPayload = {
    name: "PromotionCondition"
    objects: {}
    scalars: {
      type: $Enums.PromotionConditionType
      value: string
    }
    composites: {}
  }

  type PromotionConditionGetPayload<S extends boolean | null | undefined | PromotionConditionDefaultArgs> = $Result.GetResult<Prisma.$PromotionConditionPayload, S>





  /**
   * Fields of the PromotionCondition model
   */ 
  interface PromotionConditionFieldRefs {
    readonly type: FieldRef<"PromotionCondition", 'PromotionConditionType'>
    readonly value: FieldRef<"PromotionCondition", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PromotionCondition without action
   */
  export type PromotionConditionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PromotionCondition
     */
    select?: PromotionConditionSelect<ExtArgs> | null
  }


  /**
   * Model Metadata
   */





  export type MetadataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    createdBy?: boolean
    updatedBy?: boolean
    notes?: boolean
  }, ExtArgs["result"]["metadata"]>


  export type MetadataSelectScalar = {
    createdBy?: boolean
    updatedBy?: boolean
    notes?: boolean
  }


  export type $MetadataPayload = {
    name: "Metadata"
    objects: {}
    scalars: {
      createdBy: string
      updatedBy: string
      notes: string | null
    }
    composites: {}
  }

  type MetadataGetPayload<S extends boolean | null | undefined | MetadataDefaultArgs> = $Result.GetResult<Prisma.$MetadataPayload, S>





  /**
   * Fields of the Metadata model
   */ 
  interface MetadataFieldRefs {
    readonly createdBy: FieldRef<"Metadata", 'String'>
    readonly updatedBy: FieldRef<"Metadata", 'String'>
    readonly notes: FieldRef<"Metadata", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Metadata without action
   */
  export type MetadataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Metadata
     */
    select?: MetadataSelect<ExtArgs> | null
  }


  /**
   * Model UsageLimit
   */





  export type UsageLimitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    perCustomer?: boolean
    total?: boolean
  }, ExtArgs["result"]["usageLimit"]>


  export type UsageLimitSelectScalar = {
    perCustomer?: boolean
    total?: boolean
  }


  export type $UsageLimitPayload = {
    name: "UsageLimit"
    objects: {}
    scalars: {
      perCustomer: number | null
      total: number | null
    }
    composites: {}
  }

  type UsageLimitGetPayload<S extends boolean | null | undefined | UsageLimitDefaultArgs> = $Result.GetResult<Prisma.$UsageLimitPayload, S>





  /**
   * Fields of the UsageLimit model
   */ 
  interface UsageLimitFieldRefs {
    readonly perCustomer: FieldRef<"UsageLimit", 'Int'>
    readonly total: FieldRef<"UsageLimit", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UsageLimit without action
   */
  export type UsageLimitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
  }


  /**
   * Model BlogContent
   */





  export type BlogContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    type?: boolean
    content?: boolean
    excerpt?: boolean
  }, ExtArgs["result"]["blogContent"]>


  export type BlogContentSelectScalar = {
    type?: boolean
    content?: boolean
    excerpt?: boolean
  }


  export type $BlogContentPayload = {
    name: "BlogContent"
    objects: {}
    scalars: {
      type: $Enums.BlogContentType
      content: string
      excerpt: string | null
    }
    composites: {}
  }

  type BlogContentGetPayload<S extends boolean | null | undefined | BlogContentDefaultArgs> = $Result.GetResult<Prisma.$BlogContentPayload, S>





  /**
   * Fields of the BlogContent model
   */ 
  interface BlogContentFieldRefs {
    readonly type: FieldRef<"BlogContent", 'BlogContentType'>
    readonly content: FieldRef<"BlogContent", 'String'>
    readonly excerpt: FieldRef<"BlogContent", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BlogContent without action
   */
  export type BlogContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogContent
     */
    select?: BlogContentSelect<ExtArgs> | null
  }


  /**
   * Model BlogAuthor
   */





  export type BlogAuthorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    name?: boolean
    bio?: boolean
    avatar?: boolean
  }, ExtArgs["result"]["blogAuthor"]>


  export type BlogAuthorSelectScalar = {
    name?: boolean
    bio?: boolean
    avatar?: boolean
  }


  export type $BlogAuthorPayload = {
    name: "BlogAuthor"
    objects: {}
    scalars: {
      name: string
      bio: string | null
      avatar: string | null
    }
    composites: {}
  }

  type BlogAuthorGetPayload<S extends boolean | null | undefined | BlogAuthorDefaultArgs> = $Result.GetResult<Prisma.$BlogAuthorPayload, S>





  /**
   * Fields of the BlogAuthor model
   */ 
  interface BlogAuthorFieldRefs {
    readonly name: FieldRef<"BlogAuthor", 'String'>
    readonly bio: FieldRef<"BlogAuthor", 'String'>
    readonly avatar: FieldRef<"BlogAuthor", 'String'>
  }
    

  // Custom InputTypes
  /**
   * BlogAuthor without action
   */
  export type BlogAuthorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogAuthor
     */
    select?: BlogAuthorSelect<ExtArgs> | null
  }


  /**
   * Model BlogMetadata
   */





  export type BlogMetadataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    title?: boolean
    description?: boolean
    keywords?: boolean
    author?: boolean | BlogAuthorDefaultArgs<ExtArgs>
    readingTime?: boolean
    coverImageURL?: boolean
    blurDataUrl?: boolean
    featured?: boolean
  }, ExtArgs["result"]["blogMetadata"]>


  export type BlogMetadataSelectScalar = {
    title?: boolean
    description?: boolean
    keywords?: boolean
    readingTime?: boolean
    coverImageURL?: boolean
    blurDataUrl?: boolean
    featured?: boolean
  }

  export type BlogMetadataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $BlogMetadataPayload = {
    name: "BlogMetadata"
    objects: {}
    scalars: {
      title: string
      description: string | null
      keywords: string[]
      readingTime: number | null
      coverImageURL: string | null
      blurDataUrl: string | null
      featured: boolean
    }
    composites: {
      author: Prisma.$BlogAuthorPayload
    }
  }

  type BlogMetadataGetPayload<S extends boolean | null | undefined | BlogMetadataDefaultArgs> = $Result.GetResult<Prisma.$BlogMetadataPayload, S>





  /**
   * Fields of the BlogMetadata model
   */ 
  interface BlogMetadataFieldRefs {
    readonly title: FieldRef<"BlogMetadata", 'String'>
    readonly description: FieldRef<"BlogMetadata", 'String'>
    readonly keywords: FieldRef<"BlogMetadata", 'String[]'>
    readonly readingTime: FieldRef<"BlogMetadata", 'Int'>
    readonly coverImageURL: FieldRef<"BlogMetadata", 'String'>
    readonly blurDataUrl: FieldRef<"BlogMetadata", 'String'>
    readonly featured: FieldRef<"BlogMetadata", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * BlogMetadata without action
   */
  export type BlogMetadataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMetadata
     */
    select?: BlogMetadataSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogMetadataInclude<ExtArgs> | null
  }


  /**
   * Model CustomFields
   */





  export type CustomFieldsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
  }, ExtArgs["result"]["customFields"]>


  export type CustomFieldsSelectScalar = {
    key?: boolean
    value?: boolean
  }


  export type $CustomFieldsPayload = {
    name: "CustomFields"
    objects: {}
    scalars: {
      key: string
      value: string
    }
    composites: {}
  }

  type CustomFieldsGetPayload<S extends boolean | null | undefined | CustomFieldsDefaultArgs> = $Result.GetResult<Prisma.$CustomFieldsPayload, S>





  /**
   * Fields of the CustomFields model
   */ 
  interface CustomFieldsFieldRefs {
    readonly key: FieldRef<"CustomFields", 'String'>
    readonly value: FieldRef<"CustomFields", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CustomFields without action
   */
  export type CustomFieldsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomFields
     */
    select?: CustomFieldsSelect<ExtArgs> | null
  }


  /**
   * Model ProductDescription
   */





  export type ProductDescriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    contentType?: boolean
    content?: boolean
  }, ExtArgs["result"]["productDescription"]>


  export type ProductDescriptionSelectScalar = {
    contentType?: boolean
    content?: boolean
  }


  export type $ProductDescriptionPayload = {
    name: "ProductDescription"
    objects: {}
    scalars: {
      contentType: $Enums.ProductContentType
      content: string
    }
    composites: {}
  }

  type ProductDescriptionGetPayload<S extends boolean | null | undefined | ProductDescriptionDefaultArgs> = $Result.GetResult<Prisma.$ProductDescriptionPayload, S>





  /**
   * Fields of the ProductDescription model
   */ 
  interface ProductDescriptionFieldRefs {
    readonly contentType: FieldRef<"ProductDescription", 'ProductContentType'>
    readonly content: FieldRef<"ProductDescription", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProductDescription without action
   */
  export type ProductDescriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductDescription
     */
    select?: ProductDescriptionSelect<ExtArgs> | null
  }


  /**
   * Model Feature
   */





  export type FeatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    icon?: boolean
    title?: boolean
    description?: boolean | ProductDescriptionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feature"]>


  export type FeatureSelectScalar = {
    icon?: boolean
    title?: boolean
  }

  export type FeatureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $FeaturePayload = {
    name: "Feature"
    objects: {}
    scalars: {
      icon: string | null
      title: string
    }
    composites: {
      description: Prisma.$ProductDescriptionPayload | null
    }
  }

  type FeatureGetPayload<S extends boolean | null | undefined | FeatureDefaultArgs> = $Result.GetResult<Prisma.$FeaturePayload, S>





  /**
   * Fields of the Feature model
   */ 
  interface FeatureFieldRefs {
    readonly icon: FieldRef<"Feature", 'String'>
    readonly title: FieldRef<"Feature", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Feature without action
   */
  export type FeatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeatureInclude<ExtArgs> | null
  }


  /**
   * Model Price
   */





  export type PriceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    regular?: boolean
    sale?: boolean
    saleStartDate?: boolean
    saleEndDate?: boolean
  }, ExtArgs["result"]["price"]>


  export type PriceSelectScalar = {
    regular?: boolean
    sale?: boolean
    saleStartDate?: boolean
    saleEndDate?: boolean
  }


  export type $PricePayload = {
    name: "Price"
    objects: {}
    scalars: {
      regular: number
      sale: number | null
      saleStartDate: Date | null
      saleEndDate: Date | null
    }
    composites: {}
  }

  type PriceGetPayload<S extends boolean | null | undefined | PriceDefaultArgs> = $Result.GetResult<Prisma.$PricePayload, S>





  /**
   * Fields of the Price model
   */ 
  interface PriceFieldRefs {
    readonly regular: FieldRef<"Price", 'Float'>
    readonly sale: FieldRef<"Price", 'Float'>
    readonly saleStartDate: FieldRef<"Price", 'DateTime'>
    readonly saleEndDate: FieldRef<"Price", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Price without action
   */
  export type PriceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Price
     */
    select?: PriceSelect<ExtArgs> | null
  }


  /**
   * Model Inventory
   */





  export type InventorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    quantity?: boolean
    lowStockThreshold?: boolean
    stockQuantity?: boolean
  }, ExtArgs["result"]["inventory"]>


  export type InventorySelectScalar = {
    quantity?: boolean
    lowStockThreshold?: boolean
    stockQuantity?: boolean
  }


  export type $InventoryPayload = {
    name: "Inventory"
    objects: {}
    scalars: {
      quantity: number
      lowStockThreshold: number
      stockQuantity: number
    }
    composites: {}
  }

  type InventoryGetPayload<S extends boolean | null | undefined | InventoryDefaultArgs> = $Result.GetResult<Prisma.$InventoryPayload, S>





  /**
   * Fields of the Inventory model
   */ 
  interface InventoryFieldRefs {
    readonly quantity: FieldRef<"Inventory", 'Int'>
    readonly lowStockThreshold: FieldRef<"Inventory", 'Int'>
    readonly stockQuantity: FieldRef<"Inventory", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Inventory without action
   */
  export type InventoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inventory
     */
    select?: InventorySelect<ExtArgs> | null
  }


  /**
   * Model ProductSeoMetadata
   */





  export type ProductSeoMetadataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seoTitle?: boolean
    seoDescription?: boolean
    keywords?: boolean
  }, ExtArgs["result"]["productSeoMetadata"]>


  export type ProductSeoMetadataSelectScalar = {
    seoTitle?: boolean
    seoDescription?: boolean
    keywords?: boolean
  }


  export type $ProductSeoMetadataPayload = {
    name: "ProductSeoMetadata"
    objects: {}
    scalars: {
      seoTitle: string
      seoDescription: string
      keywords: string[]
    }
    composites: {}
  }

  type ProductSeoMetadataGetPayload<S extends boolean | null | undefined | ProductSeoMetadataDefaultArgs> = $Result.GetResult<Prisma.$ProductSeoMetadataPayload, S>





  /**
   * Fields of the ProductSeoMetadata model
   */ 
  interface ProductSeoMetadataFieldRefs {
    readonly seoTitle: FieldRef<"ProductSeoMetadata", 'String'>
    readonly seoDescription: FieldRef<"ProductSeoMetadata", 'String'>
    readonly keywords: FieldRef<"ProductSeoMetadata", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * ProductSeoMetadata without action
   */
  export type ProductSeoMetadataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProductSeoMetadata
     */
    select?: ProductSeoMetadataSelect<ExtArgs> | null
  }


  /**
   * Model UserData
   */





  export type UserDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
  }, ExtArgs["result"]["userData"]>


  export type UserDataSelectScalar = {
    id?: boolean
    email?: boolean
    fullName?: boolean
    phone?: boolean
  }


  export type $UserDataPayload = {
    name: "UserData"
    objects: {}
    scalars: {
      id: string
      email: string
      fullName: string
      phone: string
    }
    composites: {}
  }

  type UserDataGetPayload<S extends boolean | null | undefined | UserDataDefaultArgs> = $Result.GetResult<Prisma.$UserDataPayload, S>





  /**
   * Fields of the UserData model
   */ 
  interface UserDataFieldRefs {
    readonly id: FieldRef<"UserData", 'String'>
    readonly email: FieldRef<"UserData", 'String'>
    readonly fullName: FieldRef<"UserData", 'String'>
    readonly phone: FieldRef<"UserData", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserData without action
   */
  export type UserDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserData
     */
    select?: UserDataSelect<ExtArgs> | null
  }


  /**
   * Model OrderPromotion
   */





  export type OrderPromotionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    promotionId?: boolean
    discountAmount?: boolean
    code?: boolean
  }, ExtArgs["result"]["orderPromotion"]>


  export type OrderPromotionSelectScalar = {
    promotionId?: boolean
    discountAmount?: boolean
    code?: boolean
  }


  export type $OrderPromotionPayload = {
    name: "OrderPromotion"
    objects: {}
    scalars: {
      promotionId: string
      discountAmount: number
      code: string
    }
    composites: {}
  }

  type OrderPromotionGetPayload<S extends boolean | null | undefined | OrderPromotionDefaultArgs> = $Result.GetResult<Prisma.$OrderPromotionPayload, S>





  /**
   * Fields of the OrderPromotion model
   */ 
  interface OrderPromotionFieldRefs {
    readonly promotionId: FieldRef<"OrderPromotion", 'String'>
    readonly discountAmount: FieldRef<"OrderPromotion", 'Float'>
    readonly code: FieldRef<"OrderPromotion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OrderPromotion without action
   */
  export type OrderPromotionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPromotion
     */
    select?: OrderPromotionSelect<ExtArgs> | null
  }


  /**
   * Model OrderPrices
   */





  export type OrderPricesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    subtotal?: boolean
    shipping?: boolean
    discount?: boolean
    total?: boolean
  }, ExtArgs["result"]["orderPrices"]>


  export type OrderPricesSelectScalar = {
    subtotal?: boolean
    shipping?: boolean
    discount?: boolean
    total?: boolean
  }


  export type $OrderPricesPayload = {
    name: "OrderPrices"
    objects: {}
    scalars: {
      subtotal: number
      shipping: number
      discount: number
      total: number
    }
    composites: {}
  }

  type OrderPricesGetPayload<S extends boolean | null | undefined | OrderPricesDefaultArgs> = $Result.GetResult<Prisma.$OrderPricesPayload, S>





  /**
   * Fields of the OrderPrices model
   */ 
  interface OrderPricesFieldRefs {
    readonly subtotal: FieldRef<"OrderPrices", 'Float'>
    readonly shipping: FieldRef<"OrderPrices", 'Float'>
    readonly discount: FieldRef<"OrderPrices", 'Float'>
    readonly total: FieldRef<"OrderPrices", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * OrderPrices without action
   */
  export type OrderPricesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPrices
     */
    select?: OrderPricesSelect<ExtArgs> | null
  }


  /**
   * Model DeliveryInfo
   */





  export type DeliveryInfoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    address?: boolean
    deliveryDate?: boolean
    deliveryTime?: boolean
    city?: boolean
    additionalNotes?: boolean
    deliveryMethod?: boolean
    location?: boolean
  }, ExtArgs["result"]["deliveryInfo"]>


  export type DeliveryInfoSelectScalar = {
    address?: boolean
    deliveryDate?: boolean
    deliveryTime?: boolean
    city?: boolean
    additionalNotes?: boolean
    deliveryMethod?: boolean
    location?: boolean
  }


  export type $DeliveryInfoPayload = {
    name: "DeliveryInfo"
    objects: {}
    scalars: {
      address: string
      deliveryDate: Date
      deliveryTime: string
      city: string | null
      additionalNotes: string | null
      deliveryMethod: string | null
      location: string | null
    }
    composites: {}
  }

  type DeliveryInfoGetPayload<S extends boolean | null | undefined | DeliveryInfoDefaultArgs> = $Result.GetResult<Prisma.$DeliveryInfoPayload, S>





  /**
   * Fields of the DeliveryInfo model
   */ 
  interface DeliveryInfoFieldRefs {
    readonly address: FieldRef<"DeliveryInfo", 'String'>
    readonly deliveryDate: FieldRef<"DeliveryInfo", 'DateTime'>
    readonly deliveryTime: FieldRef<"DeliveryInfo", 'String'>
    readonly city: FieldRef<"DeliveryInfo", 'String'>
    readonly additionalNotes: FieldRef<"DeliveryInfo", 'String'>
    readonly deliveryMethod: FieldRef<"DeliveryInfo", 'String'>
    readonly location: FieldRef<"DeliveryInfo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * DeliveryInfo without action
   */
  export type DeliveryInfoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DeliveryInfo
     */
    select?: DeliveryInfoSelect<ExtArgs> | null
  }


  /**
   * Model Media
   */

  export type AggregateMedia = {
    _count: MediaCountAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  export type MediaMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    fileName: string | null
    type: $Enums.MediaType | null
    updatedAt: Date | null
    url: string | null
    blurDataUrl: string | null
    creatorId: string | null
  }

  export type MediaMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    fileName: string | null
    type: $Enums.MediaType | null
    updatedAt: Date | null
    url: string | null
    blurDataUrl: string | null
    creatorId: string | null
  }

  export type MediaCountAggregateOutputType = {
    id: number
    createdAt: number
    fileName: number
    type: number
    updatedAt: number
    url: number
    blurDataUrl: number
    creatorId: number
    _all: number
  }


  export type MediaMinAggregateInputType = {
    id?: true
    createdAt?: true
    fileName?: true
    type?: true
    updatedAt?: true
    url?: true
    blurDataUrl?: true
    creatorId?: true
  }

  export type MediaMaxAggregateInputType = {
    id?: true
    createdAt?: true
    fileName?: true
    type?: true
    updatedAt?: true
    url?: true
    blurDataUrl?: true
    creatorId?: true
  }

  export type MediaCountAggregateInputType = {
    id?: true
    createdAt?: true
    fileName?: true
    type?: true
    updatedAt?: true
    url?: true
    blurDataUrl?: true
    creatorId?: true
    _all?: true
  }

  export type MediaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Media to aggregate.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Media
    **/
    _count?: true | MediaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaMaxAggregateInputType
  }

  export type GetMediaAggregateType<T extends MediaAggregateArgs> = {
        [P in keyof T & keyof AggregateMedia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedia[P]>
      : GetScalarType<T[P], AggregateMedia[P]>
  }




  export type MediaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaWhereInput
    orderBy?: MediaOrderByWithAggregationInput | MediaOrderByWithAggregationInput[]
    by: MediaScalarFieldEnum[] | MediaScalarFieldEnum
    having?: MediaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaCountAggregateInputType | true
    _min?: MediaMinAggregateInputType
    _max?: MediaMaxAggregateInputType
  }

  export type MediaGroupByOutputType = {
    id: string
    createdAt: Date
    fileName: string
    type: $Enums.MediaType
    updatedAt: Date
    url: string
    blurDataUrl: string | null
    creatorId: string
    _count: MediaCountAggregateOutputType | null
    _min: MediaMinAggregateOutputType | null
    _max: MediaMaxAggregateOutputType | null
  }

  type GetMediaGroupByPayload<T extends MediaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaGroupByOutputType[P]>
            : GetScalarType<T[P], MediaGroupByOutputType[P]>
        }
      >
    >


  export type MediaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    fileName?: boolean
    type?: boolean
    updatedAt?: boolean
    url?: boolean
    blurDataUrl?: boolean
    creatorId?: boolean
    products?: boolean | Media$productsArgs<ExtArgs>
    categories?: boolean | Media$categoriesArgs<ExtArgs>
    _count?: boolean | MediaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["media"]>


  export type MediaSelectScalar = {
    id?: boolean
    createdAt?: boolean
    fileName?: boolean
    type?: boolean
    updatedAt?: boolean
    url?: boolean
    blurDataUrl?: boolean
    creatorId?: boolean
  }

  export type MediaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    products?: boolean | Media$productsArgs<ExtArgs>
    categories?: boolean | Media$categoriesArgs<ExtArgs>
    _count?: boolean | MediaCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $MediaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Media"
    objects: {
      products: Prisma.$MediasOnProductsPayload<ExtArgs>[]
      categories: Prisma.$CategoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      fileName: string
      type: $Enums.MediaType
      updatedAt: Date
      url: string
      blurDataUrl: string | null
      creatorId: string
    }, ExtArgs["result"]["media"]>
    composites: {}
  }

  type MediaGetPayload<S extends boolean | null | undefined | MediaDefaultArgs> = $Result.GetResult<Prisma.$MediaPayload, S>

  type MediaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MediaFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MediaCountAggregateInputType | true
    }

  export interface MediaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Media'], meta: { name: 'Media' } }
    /**
     * Find zero or one Media that matches the filter.
     * @param {MediaFindUniqueArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaFindUniqueArgs>(args: SelectSubset<T, MediaFindUniqueArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Media that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MediaFindUniqueOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindFirstArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaFindFirstArgs>(args?: SelectSubset<T, MediaFindFirstArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Media that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindFirstOrThrowArgs} args - Arguments to find a Media
     * @example
     * // Get one Media
     * const media = await prisma.media.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Media that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Media
     * const media = await prisma.media.findMany()
     * 
     * // Get first 10 Media
     * const media = await prisma.media.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaWithIdOnly = await prisma.media.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaFindManyArgs>(args?: SelectSubset<T, MediaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Media.
     * @param {MediaCreateArgs} args - Arguments to create a Media.
     * @example
     * // Create one Media
     * const Media = await prisma.media.create({
     *   data: {
     *     // ... data to create a Media
     *   }
     * })
     * 
     */
    create<T extends MediaCreateArgs>(args: SelectSubset<T, MediaCreateArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Media.
     * @param {MediaCreateManyArgs} args - Arguments to create many Media.
     * @example
     * // Create many Media
     * const media = await prisma.media.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaCreateManyArgs>(args?: SelectSubset<T, MediaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Media.
     * @param {MediaDeleteArgs} args - Arguments to delete one Media.
     * @example
     * // Delete one Media
     * const Media = await prisma.media.delete({
     *   where: {
     *     // ... filter to delete one Media
     *   }
     * })
     * 
     */
    delete<T extends MediaDeleteArgs>(args: SelectSubset<T, MediaDeleteArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Media.
     * @param {MediaUpdateArgs} args - Arguments to update one Media.
     * @example
     * // Update one Media
     * const media = await prisma.media.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaUpdateArgs>(args: SelectSubset<T, MediaUpdateArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Media.
     * @param {MediaDeleteManyArgs} args - Arguments to filter Media to delete.
     * @example
     * // Delete a few Media
     * const { count } = await prisma.media.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaDeleteManyArgs>(args?: SelectSubset<T, MediaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Media
     * const media = await prisma.media.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaUpdateManyArgs>(args: SelectSubset<T, MediaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Media.
     * @param {MediaUpsertArgs} args - Arguments to update or create a Media.
     * @example
     * // Update or create a Media
     * const media = await prisma.media.upsert({
     *   create: {
     *     // ... data to create a Media
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Media we want to update
     *   }
     * })
     */
    upsert<T extends MediaUpsertArgs>(args: SelectSubset<T, MediaUpsertArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Media that matches the filter.
     * @param {MediaFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const media = await prisma.media.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: MediaFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Media.
     * @param {MediaAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const media = await prisma.media.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MediaAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaCountArgs} args - Arguments to filter Media to count.
     * @example
     * // Count the number of Media
     * const count = await prisma.media.count({
     *   where: {
     *     // ... the filter for the Media we want to count
     *   }
     * })
    **/
    count<T extends MediaCountArgs>(
      args?: Subset<T, MediaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaAggregateArgs>(args: Subset<T, MediaAggregateArgs>): Prisma.PrismaPromise<GetMediaAggregateType<T>>

    /**
     * Group by Media.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaGroupByArgs['orderBy'] }
        : { orderBy?: MediaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Media model
   */
  readonly fields: MediaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Media.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    products<T extends Media$productsArgs<ExtArgs> = {}>(args?: Subset<T, Media$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediasOnProductsPayload<ExtArgs>, T, "findMany"> | Null>
    categories<T extends Media$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Media$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Media model
   */ 
  interface MediaFieldRefs {
    readonly id: FieldRef<"Media", 'String'>
    readonly createdAt: FieldRef<"Media", 'DateTime'>
    readonly fileName: FieldRef<"Media", 'String'>
    readonly type: FieldRef<"Media", 'MediaType'>
    readonly updatedAt: FieldRef<"Media", 'DateTime'>
    readonly url: FieldRef<"Media", 'String'>
    readonly blurDataUrl: FieldRef<"Media", 'String'>
    readonly creatorId: FieldRef<"Media", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Media findUnique
   */
  export type MediaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media findUniqueOrThrow
   */
  export type MediaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media findFirst
   */
  export type MediaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media findFirstOrThrow
   */
  export type MediaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Media.
     */
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media findMany
   */
  export type MediaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter, which Media to fetch.
     */
    where?: MediaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Media to fetch.
     */
    orderBy?: MediaOrderByWithRelationInput | MediaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Media.
     */
    cursor?: MediaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Media from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Media.
     */
    skip?: number
    distinct?: MediaScalarFieldEnum | MediaScalarFieldEnum[]
  }

  /**
   * Media create
   */
  export type MediaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The data needed to create a Media.
     */
    data: XOR<MediaCreateInput, MediaUncheckedCreateInput>
  }

  /**
   * Media createMany
   */
  export type MediaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Media.
     */
    data: MediaCreateManyInput | MediaCreateManyInput[]
  }

  /**
   * Media update
   */
  export type MediaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The data needed to update a Media.
     */
    data: XOR<MediaUpdateInput, MediaUncheckedUpdateInput>
    /**
     * Choose, which Media to update.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media updateMany
   */
  export type MediaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Media.
     */
    data: XOR<MediaUpdateManyMutationInput, MediaUncheckedUpdateManyInput>
    /**
     * Filter which Media to update
     */
    where?: MediaWhereInput
  }

  /**
   * Media upsert
   */
  export type MediaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * The filter to search for the Media to update in case it exists.
     */
    where: MediaWhereUniqueInput
    /**
     * In case the Media found by the `where` argument doesn't exist, create a new Media with this data.
     */
    create: XOR<MediaCreateInput, MediaUncheckedCreateInput>
    /**
     * In case the Media was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaUpdateInput, MediaUncheckedUpdateInput>
  }

  /**
   * Media delete
   */
  export type MediaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    /**
     * Filter which Media to delete.
     */
    where: MediaWhereUniqueInput
  }

  /**
   * Media deleteMany
   */
  export type MediaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Media to delete
     */
    where?: MediaWhereInput
  }

  /**
   * Media findRaw
   */
  export type MediaFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Media aggregateRaw
   */
  export type MediaAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Media.products
   */
  export type Media$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediasOnProducts
     */
    select?: MediasOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediasOnProductsInclude<ExtArgs> | null
    where?: MediasOnProductsWhereInput
    orderBy?: MediasOnProductsOrderByWithRelationInput | MediasOnProductsOrderByWithRelationInput[]
    cursor?: MediasOnProductsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediasOnProductsScalarFieldEnum | MediasOnProductsScalarFieldEnum[]
  }

  /**
   * Media.categories
   */
  export type Media$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Media without action
   */
  export type MediaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
  }


  /**
   * Model Shipment
   */

  export type AggregateShipment = {
    _count: ShipmentCountAggregateOutputType | null
    _avg: ShipmentAvgAggregateOutputType | null
    _sum: ShipmentSumAggregateOutputType | null
    _min: ShipmentMinAggregateOutputType | null
    _max: ShipmentMaxAggregateOutputType | null
  }

  export type ShipmentAvgAggregateOutputType = {
    cost: number | null
  }

  export type ShipmentSumAggregateOutputType = {
    cost: number | null
  }

  export type ShipmentMinAggregateOutputType = {
    id: string | null
    method: $Enums.ShipmentMethod | null
    isActive: boolean | null
    cost: number | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: string | null
  }

  export type ShipmentMaxAggregateOutputType = {
    id: string | null
    method: $Enums.ShipmentMethod | null
    isActive: boolean | null
    cost: number | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: string | null
  }

  export type ShipmentCountAggregateOutputType = {
    id: number
    method: number
    isActive: number
    cost: number
    locations: number
    createdAt: number
    updatedAt: number
    creatorId: number
    _all: number
  }


  export type ShipmentAvgAggregateInputType = {
    cost?: true
  }

  export type ShipmentSumAggregateInputType = {
    cost?: true
  }

  export type ShipmentMinAggregateInputType = {
    id?: true
    method?: true
    isActive?: true
    cost?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
  }

  export type ShipmentMaxAggregateInputType = {
    id?: true
    method?: true
    isActive?: true
    cost?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
  }

  export type ShipmentCountAggregateInputType = {
    id?: true
    method?: true
    isActive?: true
    cost?: true
    locations?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
    _all?: true
  }

  export type ShipmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shipment to aggregate.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Shipments
    **/
    _count?: true | ShipmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ShipmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ShipmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ShipmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ShipmentMaxAggregateInputType
  }

  export type GetShipmentAggregateType<T extends ShipmentAggregateArgs> = {
        [P in keyof T & keyof AggregateShipment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShipment[P]>
      : GetScalarType<T[P], AggregateShipment[P]>
  }




  export type ShipmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ShipmentWhereInput
    orderBy?: ShipmentOrderByWithAggregationInput | ShipmentOrderByWithAggregationInput[]
    by: ShipmentScalarFieldEnum[] | ShipmentScalarFieldEnum
    having?: ShipmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ShipmentCountAggregateInputType | true
    _avg?: ShipmentAvgAggregateInputType
    _sum?: ShipmentSumAggregateInputType
    _min?: ShipmentMinAggregateInputType
    _max?: ShipmentMaxAggregateInputType
  }

  export type ShipmentGroupByOutputType = {
    id: string
    method: $Enums.ShipmentMethod
    isActive: boolean
    cost: number
    locations: string[]
    createdAt: Date
    updatedAt: Date
    creatorId: string
    _count: ShipmentCountAggregateOutputType | null
    _avg: ShipmentAvgAggregateOutputType | null
    _sum: ShipmentSumAggregateOutputType | null
    _min: ShipmentMinAggregateOutputType | null
    _max: ShipmentMaxAggregateOutputType | null
  }

  type GetShipmentGroupByPayload<T extends ShipmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ShipmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ShipmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ShipmentGroupByOutputType[P]>
            : GetScalarType<T[P], ShipmentGroupByOutputType[P]>
        }
      >
    >


  export type ShipmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    method?: boolean
    isActive?: boolean
    cost?: boolean
    locations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
  }, ExtArgs["result"]["shipment"]>


  export type ShipmentSelectScalar = {
    id?: boolean
    method?: boolean
    isActive?: boolean
    cost?: boolean
    locations?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
  }


  export type $ShipmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Shipment"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      method: $Enums.ShipmentMethod
      isActive: boolean
      cost: number
      locations: string[]
      createdAt: Date
      updatedAt: Date
      creatorId: string
    }, ExtArgs["result"]["shipment"]>
    composites: {}
  }

  type ShipmentGetPayload<S extends boolean | null | undefined | ShipmentDefaultArgs> = $Result.GetResult<Prisma.$ShipmentPayload, S>

  type ShipmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ShipmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ShipmentCountAggregateInputType | true
    }

  export interface ShipmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Shipment'], meta: { name: 'Shipment' } }
    /**
     * Find zero or one Shipment that matches the filter.
     * @param {ShipmentFindUniqueArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShipmentFindUniqueArgs>(args: SelectSubset<T, ShipmentFindUniqueArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Shipment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ShipmentFindUniqueOrThrowArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShipmentFindUniqueOrThrowArgs>(args: SelectSubset<T, ShipmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Shipment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindFirstArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShipmentFindFirstArgs>(args?: SelectSubset<T, ShipmentFindFirstArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Shipment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindFirstOrThrowArgs} args - Arguments to find a Shipment
     * @example
     * // Get one Shipment
     * const shipment = await prisma.shipment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShipmentFindFirstOrThrowArgs>(args?: SelectSubset<T, ShipmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Shipments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shipments
     * const shipments = await prisma.shipment.findMany()
     * 
     * // Get first 10 Shipments
     * const shipments = await prisma.shipment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const shipmentWithIdOnly = await prisma.shipment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ShipmentFindManyArgs>(args?: SelectSubset<T, ShipmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Shipment.
     * @param {ShipmentCreateArgs} args - Arguments to create a Shipment.
     * @example
     * // Create one Shipment
     * const Shipment = await prisma.shipment.create({
     *   data: {
     *     // ... data to create a Shipment
     *   }
     * })
     * 
     */
    create<T extends ShipmentCreateArgs>(args: SelectSubset<T, ShipmentCreateArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Shipments.
     * @param {ShipmentCreateManyArgs} args - Arguments to create many Shipments.
     * @example
     * // Create many Shipments
     * const shipment = await prisma.shipment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ShipmentCreateManyArgs>(args?: SelectSubset<T, ShipmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Shipment.
     * @param {ShipmentDeleteArgs} args - Arguments to delete one Shipment.
     * @example
     * // Delete one Shipment
     * const Shipment = await prisma.shipment.delete({
     *   where: {
     *     // ... filter to delete one Shipment
     *   }
     * })
     * 
     */
    delete<T extends ShipmentDeleteArgs>(args: SelectSubset<T, ShipmentDeleteArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Shipment.
     * @param {ShipmentUpdateArgs} args - Arguments to update one Shipment.
     * @example
     * // Update one Shipment
     * const shipment = await prisma.shipment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ShipmentUpdateArgs>(args: SelectSubset<T, ShipmentUpdateArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Shipments.
     * @param {ShipmentDeleteManyArgs} args - Arguments to filter Shipments to delete.
     * @example
     * // Delete a few Shipments
     * const { count } = await prisma.shipment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ShipmentDeleteManyArgs>(args?: SelectSubset<T, ShipmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shipments
     * const shipment = await prisma.shipment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ShipmentUpdateManyArgs>(args: SelectSubset<T, ShipmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Shipment.
     * @param {ShipmentUpsertArgs} args - Arguments to update or create a Shipment.
     * @example
     * // Update or create a Shipment
     * const shipment = await prisma.shipment.upsert({
     *   create: {
     *     // ... data to create a Shipment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shipment we want to update
     *   }
     * })
     */
    upsert<T extends ShipmentUpsertArgs>(args: SelectSubset<T, ShipmentUpsertArgs<ExtArgs>>): Prisma__ShipmentClient<$Result.GetResult<Prisma.$ShipmentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Shipments that matches the filter.
     * @param {ShipmentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const shipment = await prisma.shipment.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: ShipmentFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Shipment.
     * @param {ShipmentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const shipment = await prisma.shipment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ShipmentAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Shipments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentCountArgs} args - Arguments to filter Shipments to count.
     * @example
     * // Count the number of Shipments
     * const count = await prisma.shipment.count({
     *   where: {
     *     // ... the filter for the Shipments we want to count
     *   }
     * })
    **/
    count<T extends ShipmentCountArgs>(
      args?: Subset<T, ShipmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ShipmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShipmentAggregateArgs>(args: Subset<T, ShipmentAggregateArgs>): Prisma.PrismaPromise<GetShipmentAggregateType<T>>

    /**
     * Group by Shipment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShipmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ShipmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ShipmentGroupByArgs['orderBy'] }
        : { orderBy?: ShipmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ShipmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShipmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Shipment model
   */
  readonly fields: ShipmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Shipment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ShipmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Shipment model
   */ 
  interface ShipmentFieldRefs {
    readonly id: FieldRef<"Shipment", 'String'>
    readonly method: FieldRef<"Shipment", 'ShipmentMethod'>
    readonly isActive: FieldRef<"Shipment", 'Boolean'>
    readonly cost: FieldRef<"Shipment", 'Float'>
    readonly locations: FieldRef<"Shipment", 'String[]'>
    readonly createdAt: FieldRef<"Shipment", 'DateTime'>
    readonly updatedAt: FieldRef<"Shipment", 'DateTime'>
    readonly creatorId: FieldRef<"Shipment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Shipment findUnique
   */
  export type ShipmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment findUniqueOrThrow
   */
  export type ShipmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment findFirst
   */
  export type ShipmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shipments.
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shipments.
     */
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[]
  }

  /**
   * Shipment findFirstOrThrow
   */
  export type ShipmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Filter, which Shipment to fetch.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Shipments.
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Shipments.
     */
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[]
  }

  /**
   * Shipment findMany
   */
  export type ShipmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Filter, which Shipments to fetch.
     */
    where?: ShipmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Shipments to fetch.
     */
    orderBy?: ShipmentOrderByWithRelationInput | ShipmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Shipments.
     */
    cursor?: ShipmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Shipments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Shipments.
     */
    skip?: number
    distinct?: ShipmentScalarFieldEnum | ShipmentScalarFieldEnum[]
  }

  /**
   * Shipment create
   */
  export type ShipmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * The data needed to create a Shipment.
     */
    data: XOR<ShipmentCreateInput, ShipmentUncheckedCreateInput>
  }

  /**
   * Shipment createMany
   */
  export type ShipmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Shipments.
     */
    data: ShipmentCreateManyInput | ShipmentCreateManyInput[]
  }

  /**
   * Shipment update
   */
  export type ShipmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * The data needed to update a Shipment.
     */
    data: XOR<ShipmentUpdateInput, ShipmentUncheckedUpdateInput>
    /**
     * Choose, which Shipment to update.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment updateMany
   */
  export type ShipmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Shipments.
     */
    data: XOR<ShipmentUpdateManyMutationInput, ShipmentUncheckedUpdateManyInput>
    /**
     * Filter which Shipments to update
     */
    where?: ShipmentWhereInput
  }

  /**
   * Shipment upsert
   */
  export type ShipmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * The filter to search for the Shipment to update in case it exists.
     */
    where: ShipmentWhereUniqueInput
    /**
     * In case the Shipment found by the `where` argument doesn't exist, create a new Shipment with this data.
     */
    create: XOR<ShipmentCreateInput, ShipmentUncheckedCreateInput>
    /**
     * In case the Shipment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ShipmentUpdateInput, ShipmentUncheckedUpdateInput>
  }

  /**
   * Shipment delete
   */
  export type ShipmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
    /**
     * Filter which Shipment to delete.
     */
    where: ShipmentWhereUniqueInput
  }

  /**
   * Shipment deleteMany
   */
  export type ShipmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Shipments to delete
     */
    where?: ShipmentWhereInput
  }

  /**
   * Shipment findRaw
   */
  export type ShipmentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Shipment aggregateRaw
   */
  export type ShipmentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Shipment without action
   */
  export type ShipmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Shipment
     */
    select?: ShipmentSelect<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    imageId: string | null
    featured: boolean | null
    parentId: string | null
    creatorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    imageId: string | null
    featured: boolean | null
    parentId: string | null
    creatorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    imageId: number
    featured: number
    parentId: number
    creatorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    imageId?: true
    featured?: true
    parentId?: true
    creatorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    imageId?: true
    featured?: true
    parentId?: true
    creatorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    imageId?: true
    featured?: true
    parentId?: true
    creatorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    imageId: string | null
    featured: boolean
    parentId: string | null
    creatorId: string
    createdAt: Date
    updatedAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    imageId?: boolean
    featured?: boolean
    parentId?: boolean
    seoMetadata?: boolean | SeoMetadataDefaultArgs<ExtArgs>
    creatorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    image?: boolean | Category$imageArgs<ExtArgs>
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    blogs?: boolean | Category$blogsArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>


  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    imageId?: boolean
    featured?: boolean
    parentId?: boolean
    creatorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    image?: boolean | Category$imageArgs<ExtArgs>
    parent?: boolean | Category$parentArgs<ExtArgs>
    children?: boolean | Category$childrenArgs<ExtArgs>
    blogs?: boolean | Category$blogsArgs<ExtArgs>
    products?: boolean | Category$productsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      image: Prisma.$MediaPayload<ExtArgs> | null
      parent: Prisma.$CategoryPayload<ExtArgs> | null
      children: Prisma.$CategoryPayload<ExtArgs>[]
      blogs: Prisma.$CategoriesOnBlogsPayload<ExtArgs>[]
      products: Prisma.$CategoriesOnProductsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      imageId: string | null
      featured: boolean
      parentId: string | null
      creatorId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {
      seoMetadata: Prisma.$SeoMetadataPayload | null
    }
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Categories that matches the filter.
     * @param {CategoryFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const category = await prisma.category.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: CategoryFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Category.
     * @param {CategoryAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const category = await prisma.category.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CategoryAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    image<T extends Category$imageArgs<ExtArgs> = {}>(args?: Subset<T, Category$imageArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    parent<T extends Category$parentArgs<ExtArgs> = {}>(args?: Subset<T, Category$parentArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    children<T extends Category$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Category$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany"> | Null>
    blogs<T extends Category$blogsArgs<ExtArgs> = {}>(args?: Subset<T, Category$blogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriesOnBlogsPayload<ExtArgs>, T, "findMany"> | Null>
    products<T extends Category$productsArgs<ExtArgs> = {}>(args?: Subset<T, Category$productsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriesOnProductsPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */ 
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly imageId: FieldRef<"Category", 'String'>
    readonly featured: FieldRef<"Category", 'Boolean'>
    readonly parentId: FieldRef<"Category", 'String'>
    readonly creatorId: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
    readonly updatedAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
  }

  /**
   * Category findRaw
   */
  export type CategoryFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Category aggregateRaw
   */
  export type CategoryAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Category.image
   */
  export type Category$imageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Media
     */
    select?: MediaSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaInclude<ExtArgs> | null
    where?: MediaWhereInput
  }

  /**
   * Category.parent
   */
  export type Category$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Category.children
   */
  export type Category$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category.blogs
   */
  export type Category$blogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnBlogs
     */
    select?: CategoriesOnBlogsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnBlogsInclude<ExtArgs> | null
    where?: CategoriesOnBlogsWhereInput
    orderBy?: CategoriesOnBlogsOrderByWithRelationInput | CategoriesOnBlogsOrderByWithRelationInput[]
    cursor?: CategoriesOnBlogsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoriesOnBlogsScalarFieldEnum | CategoriesOnBlogsScalarFieldEnum[]
  }

  /**
   * Category.products
   */
  export type Category$productsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnProducts
     */
    select?: CategoriesOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnProductsInclude<ExtArgs> | null
    where?: CategoriesOnProductsWhereInput
    orderBy?: CategoriesOnProductsOrderByWithRelationInput | CategoriesOnProductsOrderByWithRelationInput[]
    cursor?: CategoriesOnProductsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoriesOnProductsScalarFieldEnum | CategoriesOnProductsScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Promotion
   */

  export type AggregatePromotion = {
    _count: PromotionCountAggregateOutputType | null
    _avg: PromotionAvgAggregateOutputType | null
    _sum: PromotionSumAggregateOutputType | null
    _min: PromotionMinAggregateOutputType | null
    _max: PromotionMaxAggregateOutputType | null
  }

  export type PromotionAvgAggregateOutputType = {
    priority: number | null
  }

  export type PromotionSumAggregateOutputType = {
    priority: number | null
  }

  export type PromotionMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    status: $Enums.PromotionStatus | null
    priority: number | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: string | null
  }

  export type PromotionMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    description: string | null
    startDate: Date | null
    endDate: Date | null
    status: $Enums.PromotionStatus | null
    priority: number | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: string | null
  }

  export type PromotionCountAggregateOutputType = {
    id: number
    code: number
    name: number
    description: number
    startDate: number
    endDate: number
    status: number
    priority: number
    createdAt: number
    updatedAt: number
    creatorId: number
    _all: number
  }


  export type PromotionAvgAggregateInputType = {
    priority?: true
  }

  export type PromotionSumAggregateInputType = {
    priority?: true
  }

  export type PromotionMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    startDate?: true
    endDate?: true
    status?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
  }

  export type PromotionMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    startDate?: true
    endDate?: true
    status?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
  }

  export type PromotionCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    description?: true
    startDate?: true
    endDate?: true
    status?: true
    priority?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
    _all?: true
  }

  export type PromotionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Promotion to aggregate.
     */
    where?: PromotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotions to fetch.
     */
    orderBy?: PromotionOrderByWithRelationInput | PromotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Promotions
    **/
    _count?: true | PromotionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PromotionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PromotionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromotionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromotionMaxAggregateInputType
  }

  export type GetPromotionAggregateType<T extends PromotionAggregateArgs> = {
        [P in keyof T & keyof AggregatePromotion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromotion[P]>
      : GetScalarType<T[P], AggregatePromotion[P]>
  }




  export type PromotionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromotionWhereInput
    orderBy?: PromotionOrderByWithAggregationInput | PromotionOrderByWithAggregationInput[]
    by: PromotionScalarFieldEnum[] | PromotionScalarFieldEnum
    having?: PromotionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromotionCountAggregateInputType | true
    _avg?: PromotionAvgAggregateInputType
    _sum?: PromotionSumAggregateInputType
    _min?: PromotionMinAggregateInputType
    _max?: PromotionMaxAggregateInputType
  }

  export type PromotionGroupByOutputType = {
    id: string
    code: string
    name: string
    description: string | null
    startDate: Date
    endDate: Date
    status: $Enums.PromotionStatus
    priority: number
    createdAt: Date
    updatedAt: Date
    creatorId: string
    _count: PromotionCountAggregateOutputType | null
    _avg: PromotionAvgAggregateOutputType | null
    _sum: PromotionSumAggregateOutputType | null
    _min: PromotionMinAggregateOutputType | null
    _max: PromotionMaxAggregateOutputType | null
  }

  type GetPromotionGroupByPayload<T extends PromotionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromotionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromotionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromotionGroupByOutputType[P]>
            : GetScalarType<T[P], PromotionGroupByOutputType[P]>
        }
      >
    >


  export type PromotionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    conditions?: boolean | PromotionConditionDefaultArgs<ExtArgs>
    actions?: boolean | PromotionActionDefaultArgs<ExtArgs>
    usageLimit?: boolean | UsageLimitDefaultArgs<ExtArgs>
    status?: boolean
    priority?: boolean
    metadata?: boolean | MetadataDefaultArgs<ExtArgs>
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
  }, ExtArgs["result"]["promotion"]>


  export type PromotionSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    description?: boolean
    startDate?: boolean
    endDate?: boolean
    status?: boolean
    priority?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
  }

  export type PromotionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PromotionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Promotion"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      description: string | null
      startDate: Date
      endDate: Date
      status: $Enums.PromotionStatus
      priority: number
      createdAt: Date
      updatedAt: Date
      creatorId: string
    }, ExtArgs["result"]["promotion"]>
    composites: {
      conditions: Prisma.$PromotionConditionPayload[]
      actions: Prisma.$PromotionActionPayload[]
      usageLimit: Prisma.$UsageLimitPayload | null
      metadata: Prisma.$MetadataPayload
    }
  }

  type PromotionGetPayload<S extends boolean | null | undefined | PromotionDefaultArgs> = $Result.GetResult<Prisma.$PromotionPayload, S>

  type PromotionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PromotionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PromotionCountAggregateInputType | true
    }

  export interface PromotionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Promotion'], meta: { name: 'Promotion' } }
    /**
     * Find zero or one Promotion that matches the filter.
     * @param {PromotionFindUniqueArgs} args - Arguments to find a Promotion
     * @example
     * // Get one Promotion
     * const promotion = await prisma.promotion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromotionFindUniqueArgs>(args: SelectSubset<T, PromotionFindUniqueArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Promotion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PromotionFindUniqueOrThrowArgs} args - Arguments to find a Promotion
     * @example
     * // Get one Promotion
     * const promotion = await prisma.promotion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromotionFindUniqueOrThrowArgs>(args: SelectSubset<T, PromotionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Promotion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionFindFirstArgs} args - Arguments to find a Promotion
     * @example
     * // Get one Promotion
     * const promotion = await prisma.promotion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromotionFindFirstArgs>(args?: SelectSubset<T, PromotionFindFirstArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Promotion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionFindFirstOrThrowArgs} args - Arguments to find a Promotion
     * @example
     * // Get one Promotion
     * const promotion = await prisma.promotion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromotionFindFirstOrThrowArgs>(args?: SelectSubset<T, PromotionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Promotions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Promotions
     * const promotions = await prisma.promotion.findMany()
     * 
     * // Get first 10 Promotions
     * const promotions = await prisma.promotion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promotionWithIdOnly = await prisma.promotion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PromotionFindManyArgs>(args?: SelectSubset<T, PromotionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Promotion.
     * @param {PromotionCreateArgs} args - Arguments to create a Promotion.
     * @example
     * // Create one Promotion
     * const Promotion = await prisma.promotion.create({
     *   data: {
     *     // ... data to create a Promotion
     *   }
     * })
     * 
     */
    create<T extends PromotionCreateArgs>(args: SelectSubset<T, PromotionCreateArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Promotions.
     * @param {PromotionCreateManyArgs} args - Arguments to create many Promotions.
     * @example
     * // Create many Promotions
     * const promotion = await prisma.promotion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromotionCreateManyArgs>(args?: SelectSubset<T, PromotionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Promotion.
     * @param {PromotionDeleteArgs} args - Arguments to delete one Promotion.
     * @example
     * // Delete one Promotion
     * const Promotion = await prisma.promotion.delete({
     *   where: {
     *     // ... filter to delete one Promotion
     *   }
     * })
     * 
     */
    delete<T extends PromotionDeleteArgs>(args: SelectSubset<T, PromotionDeleteArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Promotion.
     * @param {PromotionUpdateArgs} args - Arguments to update one Promotion.
     * @example
     * // Update one Promotion
     * const promotion = await prisma.promotion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromotionUpdateArgs>(args: SelectSubset<T, PromotionUpdateArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Promotions.
     * @param {PromotionDeleteManyArgs} args - Arguments to filter Promotions to delete.
     * @example
     * // Delete a few Promotions
     * const { count } = await prisma.promotion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromotionDeleteManyArgs>(args?: SelectSubset<T, PromotionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promotions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Promotions
     * const promotion = await prisma.promotion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromotionUpdateManyArgs>(args: SelectSubset<T, PromotionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Promotion.
     * @param {PromotionUpsertArgs} args - Arguments to update or create a Promotion.
     * @example
     * // Update or create a Promotion
     * const promotion = await prisma.promotion.upsert({
     *   create: {
     *     // ... data to create a Promotion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Promotion we want to update
     *   }
     * })
     */
    upsert<T extends PromotionUpsertArgs>(args: SelectSubset<T, PromotionUpsertArgs<ExtArgs>>): Prisma__PromotionClient<$Result.GetResult<Prisma.$PromotionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Promotions that matches the filter.
     * @param {PromotionFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const promotion = await prisma.promotion.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: PromotionFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Promotion.
     * @param {PromotionAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const promotion = await prisma.promotion.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: PromotionAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Promotions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionCountArgs} args - Arguments to filter Promotions to count.
     * @example
     * // Count the number of Promotions
     * const count = await prisma.promotion.count({
     *   where: {
     *     // ... the filter for the Promotions we want to count
     *   }
     * })
    **/
    count<T extends PromotionCountArgs>(
      args?: Subset<T, PromotionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromotionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Promotion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromotionAggregateArgs>(args: Subset<T, PromotionAggregateArgs>): Prisma.PrismaPromise<GetPromotionAggregateType<T>>

    /**
     * Group by Promotion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromotionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PromotionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromotionGroupByArgs['orderBy'] }
        : { orderBy?: PromotionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PromotionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromotionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Promotion model
   */
  readonly fields: PromotionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Promotion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromotionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Promotion model
   */ 
  interface PromotionFieldRefs {
    readonly id: FieldRef<"Promotion", 'String'>
    readonly code: FieldRef<"Promotion", 'String'>
    readonly name: FieldRef<"Promotion", 'String'>
    readonly description: FieldRef<"Promotion", 'String'>
    readonly startDate: FieldRef<"Promotion", 'DateTime'>
    readonly endDate: FieldRef<"Promotion", 'DateTime'>
    readonly status: FieldRef<"Promotion", 'PromotionStatus'>
    readonly priority: FieldRef<"Promotion", 'Int'>
    readonly createdAt: FieldRef<"Promotion", 'DateTime'>
    readonly updatedAt: FieldRef<"Promotion", 'DateTime'>
    readonly creatorId: FieldRef<"Promotion", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Promotion findUnique
   */
  export type PromotionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * Filter, which Promotion to fetch.
     */
    where: PromotionWhereUniqueInput
  }

  /**
   * Promotion findUniqueOrThrow
   */
  export type PromotionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * Filter, which Promotion to fetch.
     */
    where: PromotionWhereUniqueInput
  }

  /**
   * Promotion findFirst
   */
  export type PromotionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * Filter, which Promotion to fetch.
     */
    where?: PromotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotions to fetch.
     */
    orderBy?: PromotionOrderByWithRelationInput | PromotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Promotions.
     */
    cursor?: PromotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promotions.
     */
    distinct?: PromotionScalarFieldEnum | PromotionScalarFieldEnum[]
  }

  /**
   * Promotion findFirstOrThrow
   */
  export type PromotionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * Filter, which Promotion to fetch.
     */
    where?: PromotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotions to fetch.
     */
    orderBy?: PromotionOrderByWithRelationInput | PromotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Promotions.
     */
    cursor?: PromotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promotions.
     */
    distinct?: PromotionScalarFieldEnum | PromotionScalarFieldEnum[]
  }

  /**
   * Promotion findMany
   */
  export type PromotionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * Filter, which Promotions to fetch.
     */
    where?: PromotionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promotions to fetch.
     */
    orderBy?: PromotionOrderByWithRelationInput | PromotionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Promotions.
     */
    cursor?: PromotionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promotions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promotions.
     */
    skip?: number
    distinct?: PromotionScalarFieldEnum | PromotionScalarFieldEnum[]
  }

  /**
   * Promotion create
   */
  export type PromotionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * The data needed to create a Promotion.
     */
    data: XOR<PromotionCreateInput, PromotionUncheckedCreateInput>
  }

  /**
   * Promotion createMany
   */
  export type PromotionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Promotions.
     */
    data: PromotionCreateManyInput | PromotionCreateManyInput[]
  }

  /**
   * Promotion update
   */
  export type PromotionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * The data needed to update a Promotion.
     */
    data: XOR<PromotionUpdateInput, PromotionUncheckedUpdateInput>
    /**
     * Choose, which Promotion to update.
     */
    where: PromotionWhereUniqueInput
  }

  /**
   * Promotion updateMany
   */
  export type PromotionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Promotions.
     */
    data: XOR<PromotionUpdateManyMutationInput, PromotionUncheckedUpdateManyInput>
    /**
     * Filter which Promotions to update
     */
    where?: PromotionWhereInput
  }

  /**
   * Promotion upsert
   */
  export type PromotionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * The filter to search for the Promotion to update in case it exists.
     */
    where: PromotionWhereUniqueInput
    /**
     * In case the Promotion found by the `where` argument doesn't exist, create a new Promotion with this data.
     */
    create: XOR<PromotionCreateInput, PromotionUncheckedCreateInput>
    /**
     * In case the Promotion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromotionUpdateInput, PromotionUncheckedUpdateInput>
  }

  /**
   * Promotion delete
   */
  export type PromotionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
    /**
     * Filter which Promotion to delete.
     */
    where: PromotionWhereUniqueInput
  }

  /**
   * Promotion deleteMany
   */
  export type PromotionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Promotions to delete
     */
    where?: PromotionWhereInput
  }

  /**
   * Promotion findRaw
   */
  export type PromotionFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Promotion aggregateRaw
   */
  export type PromotionAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Promotion without action
   */
  export type PromotionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promotion
     */
    select?: PromotionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromotionInclude<ExtArgs> | null
  }


  /**
   * Model Comment
   */

  export type AggregateComment = {
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  export type CommentMinAggregateOutputType = {
    id: string | null
    comment: string | null
    blogId: string | null
  }

  export type CommentMaxAggregateOutputType = {
    id: string | null
    comment: string | null
    blogId: string | null
  }

  export type CommentCountAggregateOutputType = {
    id: number
    comment: number
    blogId: number
    _all: number
  }


  export type CommentMinAggregateInputType = {
    id?: true
    comment?: true
    blogId?: true
  }

  export type CommentMaxAggregateInputType = {
    id?: true
    comment?: true
    blogId?: true
  }

  export type CommentCountAggregateInputType = {
    id?: true
    comment?: true
    blogId?: true
    _all?: true
  }

  export type CommentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comment to aggregate.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comments
    **/
    _count?: true | CommentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommentMaxAggregateInputType
  }

  export type GetCommentAggregateType<T extends CommentAggregateArgs> = {
        [P in keyof T & keyof AggregateComment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComment[P]>
      : GetScalarType<T[P], AggregateComment[P]>
  }




  export type CommentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithAggregationInput | CommentOrderByWithAggregationInput[]
    by: CommentScalarFieldEnum[] | CommentScalarFieldEnum
    having?: CommentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommentCountAggregateInputType | true
    _min?: CommentMinAggregateInputType
    _max?: CommentMaxAggregateInputType
  }

  export type CommentGroupByOutputType = {
    id: string
    comment: string
    blogId: string
    _count: CommentCountAggregateOutputType | null
    _min: CommentMinAggregateOutputType | null
    _max: CommentMaxAggregateOutputType | null
  }

  type GetCommentGroupByPayload<T extends CommentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommentGroupByOutputType[P]>
            : GetScalarType<T[P], CommentGroupByOutputType[P]>
        }
      >
    >


  export type CommentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    comment?: boolean
    blogId?: boolean
    blog?: boolean | BlogDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comment"]>


  export type CommentSelectScalar = {
    id?: boolean
    comment?: boolean
    blogId?: boolean
  }

  export type CommentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blog?: boolean | BlogDefaultArgs<ExtArgs>
  }

  export type $CommentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comment"
    objects: {
      blog: Prisma.$BlogPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      comment: string
      blogId: string
    }, ExtArgs["result"]["comment"]>
    composites: {}
  }

  type CommentGetPayload<S extends boolean | null | undefined | CommentDefaultArgs> = $Result.GetResult<Prisma.$CommentPayload, S>

  type CommentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CommentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CommentCountAggregateInputType | true
    }

  export interface CommentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comment'], meta: { name: 'Comment' } }
    /**
     * Find zero or one Comment that matches the filter.
     * @param {CommentFindUniqueArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommentFindUniqueArgs>(args: SelectSubset<T, CommentFindUniqueArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Comment that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CommentFindUniqueOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommentFindUniqueOrThrowArgs>(args: SelectSubset<T, CommentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Comment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommentFindFirstArgs>(args?: SelectSubset<T, CommentFindFirstArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Comment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindFirstOrThrowArgs} args - Arguments to find a Comment
     * @example
     * // Get one Comment
     * const comment = await prisma.comment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommentFindFirstOrThrowArgs>(args?: SelectSubset<T, CommentFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Comments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comments
     * const comments = await prisma.comment.findMany()
     * 
     * // Get first 10 Comments
     * const comments = await prisma.comment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const commentWithIdOnly = await prisma.comment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommentFindManyArgs>(args?: SelectSubset<T, CommentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Comment.
     * @param {CommentCreateArgs} args - Arguments to create a Comment.
     * @example
     * // Create one Comment
     * const Comment = await prisma.comment.create({
     *   data: {
     *     // ... data to create a Comment
     *   }
     * })
     * 
     */
    create<T extends CommentCreateArgs>(args: SelectSubset<T, CommentCreateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Comments.
     * @param {CommentCreateManyArgs} args - Arguments to create many Comments.
     * @example
     * // Create many Comments
     * const comment = await prisma.comment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommentCreateManyArgs>(args?: SelectSubset<T, CommentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Comment.
     * @param {CommentDeleteArgs} args - Arguments to delete one Comment.
     * @example
     * // Delete one Comment
     * const Comment = await prisma.comment.delete({
     *   where: {
     *     // ... filter to delete one Comment
     *   }
     * })
     * 
     */
    delete<T extends CommentDeleteArgs>(args: SelectSubset<T, CommentDeleteArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Comment.
     * @param {CommentUpdateArgs} args - Arguments to update one Comment.
     * @example
     * // Update one Comment
     * const comment = await prisma.comment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommentUpdateArgs>(args: SelectSubset<T, CommentUpdateArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Comments.
     * @param {CommentDeleteManyArgs} args - Arguments to filter Comments to delete.
     * @example
     * // Delete a few Comments
     * const { count } = await prisma.comment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommentDeleteManyArgs>(args?: SelectSubset<T, CommentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comments
     * const comment = await prisma.comment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommentUpdateManyArgs>(args: SelectSubset<T, CommentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Comment.
     * @param {CommentUpsertArgs} args - Arguments to update or create a Comment.
     * @example
     * // Update or create a Comment
     * const comment = await prisma.comment.upsert({
     *   create: {
     *     // ... data to create a Comment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comment we want to update
     *   }
     * })
     */
    upsert<T extends CommentUpsertArgs>(args: SelectSubset<T, CommentUpsertArgs<ExtArgs>>): Prisma__CommentClient<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Comments that matches the filter.
     * @param {CommentFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const comment = await prisma.comment.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: CommentFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Comment.
     * @param {CommentAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const comment = await prisma.comment.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CommentAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Comments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentCountArgs} args - Arguments to filter Comments to count.
     * @example
     * // Count the number of Comments
     * const count = await prisma.comment.count({
     *   where: {
     *     // ... the filter for the Comments we want to count
     *   }
     * })
    **/
    count<T extends CommentCountArgs>(
      args?: Subset<T, CommentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommentAggregateArgs>(args: Subset<T, CommentAggregateArgs>): Prisma.PrismaPromise<GetCommentAggregateType<T>>

    /**
     * Group by Comment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommentGroupByArgs['orderBy'] }
        : { orderBy?: CommentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comment model
   */
  readonly fields: CommentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    blog<T extends BlogDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BlogDefaultArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comment model
   */ 
  interface CommentFieldRefs {
    readonly id: FieldRef<"Comment", 'String'>
    readonly comment: FieldRef<"Comment", 'String'>
    readonly blogId: FieldRef<"Comment", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Comment findUnique
   */
  export type CommentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findUniqueOrThrow
   */
  export type CommentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment findFirst
   */
  export type CommentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findFirstOrThrow
   */
  export type CommentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comment to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comments.
     */
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment findMany
   */
  export type CommentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter, which Comments to fetch.
     */
    where?: CommentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comments to fetch.
     */
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comments.
     */
    cursor?: CommentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comments.
     */
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Comment create
   */
  export type CommentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to create a Comment.
     */
    data: XOR<CommentCreateInput, CommentUncheckedCreateInput>
  }

  /**
   * Comment createMany
   */
  export type CommentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comments.
     */
    data: CommentCreateManyInput | CommentCreateManyInput[]
  }

  /**
   * Comment update
   */
  export type CommentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The data needed to update a Comment.
     */
    data: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
    /**
     * Choose, which Comment to update.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment updateMany
   */
  export type CommentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comments.
     */
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyInput>
    /**
     * Filter which Comments to update
     */
    where?: CommentWhereInput
  }

  /**
   * Comment upsert
   */
  export type CommentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * The filter to search for the Comment to update in case it exists.
     */
    where: CommentWhereUniqueInput
    /**
     * In case the Comment found by the `where` argument doesn't exist, create a new Comment with this data.
     */
    create: XOR<CommentCreateInput, CommentUncheckedCreateInput>
    /**
     * In case the Comment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommentUpdateInput, CommentUncheckedUpdateInput>
  }

  /**
   * Comment delete
   */
  export type CommentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    /**
     * Filter which Comment to delete.
     */
    where: CommentWhereUniqueInput
  }

  /**
   * Comment deleteMany
   */
  export type CommentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comments to delete
     */
    where?: CommentWhereInput
  }

  /**
   * Comment findRaw
   */
  export type CommentFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Comment aggregateRaw
   */
  export type CommentAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Comment without action
   */
  export type CommentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
  }


  /**
   * Model Blog
   */

  export type AggregateBlog = {
    _count: BlogCountAggregateOutputType | null
    _min: BlogMinAggregateOutputType | null
    _max: BlogMaxAggregateOutputType | null
  }

  export type BlogMinAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    status: $Enums.BlogStatus | null
    publishedAt: Date | null
    layout: $Enums.BlogLayout | null
    creatorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    title: string | null
    status: $Enums.BlogStatus | null
    publishedAt: Date | null
    layout: $Enums.BlogLayout | null
    creatorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type BlogCountAggregateOutputType = {
    id: number
    slug: number
    title: number
    tags: number
    status: number
    publishedAt: number
    layout: number
    creatorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type BlogMinAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    status?: true
    publishedAt?: true
    layout?: true
    creatorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogMaxAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    status?: true
    publishedAt?: true
    layout?: true
    creatorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type BlogCountAggregateInputType = {
    id?: true
    slug?: true
    title?: true
    tags?: true
    status?: true
    publishedAt?: true
    layout?: true
    creatorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type BlogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blog to aggregate.
     */
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogOrderByWithRelationInput | BlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Blogs
    **/
    _count?: true | BlogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogMaxAggregateInputType
  }

  export type GetBlogAggregateType<T extends BlogAggregateArgs> = {
        [P in keyof T & keyof AggregateBlog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlog[P]>
      : GetScalarType<T[P], AggregateBlog[P]>
  }




  export type BlogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogWhereInput
    orderBy?: BlogOrderByWithAggregationInput | BlogOrderByWithAggregationInput[]
    by: BlogScalarFieldEnum[] | BlogScalarFieldEnum
    having?: BlogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogCountAggregateInputType | true
    _min?: BlogMinAggregateInputType
    _max?: BlogMaxAggregateInputType
  }

  export type BlogGroupByOutputType = {
    id: string
    slug: string
    title: string
    tags: string[]
    status: $Enums.BlogStatus
    publishedAt: Date | null
    layout: $Enums.BlogLayout
    creatorId: string
    createdAt: Date
    updatedAt: Date
    _count: BlogCountAggregateOutputType | null
    _min: BlogMinAggregateOutputType | null
    _max: BlogMaxAggregateOutputType | null
  }

  type GetBlogGroupByPayload<T extends BlogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogGroupByOutputType[P]>
            : GetScalarType<T[P], BlogGroupByOutputType[P]>
        }
      >
    >


  export type BlogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    title?: boolean
    content?: boolean | BlogContentDefaultArgs<ExtArgs>
    metadata?: boolean | BlogMetadataDefaultArgs<ExtArgs>
    tags?: boolean
    status?: boolean
    publishedAt?: boolean
    customFields?: boolean | CustomFieldsDefaultArgs<ExtArgs>
    layout?: boolean
    creatorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    categories?: boolean | Blog$categoriesArgs<ExtArgs>
    comments?: boolean | Blog$commentsArgs<ExtArgs>
    _count?: boolean | BlogCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blog"]>


  export type BlogSelectScalar = {
    id?: boolean
    slug?: boolean
    title?: boolean
    tags?: boolean
    status?: boolean
    publishedAt?: boolean
    layout?: boolean
    creatorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type BlogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | Blog$categoriesArgs<ExtArgs>
    comments?: boolean | Blog$commentsArgs<ExtArgs>
    _count?: boolean | BlogCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BlogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Blog"
    objects: {
      categories: Prisma.$CategoriesOnBlogsPayload<ExtArgs>[]
      comments: Prisma.$CommentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      title: string
      tags: string[]
      status: $Enums.BlogStatus
      publishedAt: Date | null
      layout: $Enums.BlogLayout
      creatorId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["blog"]>
    composites: {
      content: Prisma.$BlogContentPayload
      metadata: Prisma.$BlogMetadataPayload
      customFields: Prisma.$CustomFieldsPayload[]
    }
  }

  type BlogGetPayload<S extends boolean | null | undefined | BlogDefaultArgs> = $Result.GetResult<Prisma.$BlogPayload, S>

  type BlogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BlogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BlogCountAggregateInputType | true
    }

  export interface BlogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Blog'], meta: { name: 'Blog' } }
    /**
     * Find zero or one Blog that matches the filter.
     * @param {BlogFindUniqueArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogFindUniqueArgs>(args: SelectSubset<T, BlogFindUniqueArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Blog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BlogFindUniqueOrThrowArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Blog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogFindFirstArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogFindFirstArgs>(args?: SelectSubset<T, BlogFindFirstArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Blog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogFindFirstOrThrowArgs} args - Arguments to find a Blog
     * @example
     * // Get one Blog
     * const blog = await prisma.blog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Blogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Blogs
     * const blogs = await prisma.blog.findMany()
     * 
     * // Get first 10 Blogs
     * const blogs = await prisma.blog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogWithIdOnly = await prisma.blog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogFindManyArgs>(args?: SelectSubset<T, BlogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Blog.
     * @param {BlogCreateArgs} args - Arguments to create a Blog.
     * @example
     * // Create one Blog
     * const Blog = await prisma.blog.create({
     *   data: {
     *     // ... data to create a Blog
     *   }
     * })
     * 
     */
    create<T extends BlogCreateArgs>(args: SelectSubset<T, BlogCreateArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Blogs.
     * @param {BlogCreateManyArgs} args - Arguments to create many Blogs.
     * @example
     * // Create many Blogs
     * const blog = await prisma.blog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogCreateManyArgs>(args?: SelectSubset<T, BlogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Blog.
     * @param {BlogDeleteArgs} args - Arguments to delete one Blog.
     * @example
     * // Delete one Blog
     * const Blog = await prisma.blog.delete({
     *   where: {
     *     // ... filter to delete one Blog
     *   }
     * })
     * 
     */
    delete<T extends BlogDeleteArgs>(args: SelectSubset<T, BlogDeleteArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Blog.
     * @param {BlogUpdateArgs} args - Arguments to update one Blog.
     * @example
     * // Update one Blog
     * const blog = await prisma.blog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogUpdateArgs>(args: SelectSubset<T, BlogUpdateArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Blogs.
     * @param {BlogDeleteManyArgs} args - Arguments to filter Blogs to delete.
     * @example
     * // Delete a few Blogs
     * const { count } = await prisma.blog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogDeleteManyArgs>(args?: SelectSubset<T, BlogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Blogs
     * const blog = await prisma.blog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogUpdateManyArgs>(args: SelectSubset<T, BlogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Blog.
     * @param {BlogUpsertArgs} args - Arguments to update or create a Blog.
     * @example
     * // Update or create a Blog
     * const blog = await prisma.blog.upsert({
     *   create: {
     *     // ... data to create a Blog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Blog we want to update
     *   }
     * })
     */
    upsert<T extends BlogUpsertArgs>(args: SelectSubset<T, BlogUpsertArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Blogs that matches the filter.
     * @param {BlogFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const blog = await prisma.blog.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: BlogFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Blog.
     * @param {BlogAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const blog = await prisma.blog.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: BlogAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Blogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogCountArgs} args - Arguments to filter Blogs to count.
     * @example
     * // Count the number of Blogs
     * const count = await prisma.blog.count({
     *   where: {
     *     // ... the filter for the Blogs we want to count
     *   }
     * })
    **/
    count<T extends BlogCountArgs>(
      args?: Subset<T, BlogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Blog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BlogAggregateArgs>(args: Subset<T, BlogAggregateArgs>): Prisma.PrismaPromise<GetBlogAggregateType<T>>

    /**
     * Group by Blog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BlogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogGroupByArgs['orderBy'] }
        : { orderBy?: BlogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BlogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Blog model
   */
  readonly fields: BlogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Blog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categories<T extends Blog$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Blog$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriesOnBlogsPayload<ExtArgs>, T, "findMany"> | Null>
    comments<T extends Blog$commentsArgs<ExtArgs> = {}>(args?: Subset<T, Blog$commentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommentPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Blog model
   */ 
  interface BlogFieldRefs {
    readonly id: FieldRef<"Blog", 'String'>
    readonly slug: FieldRef<"Blog", 'String'>
    readonly title: FieldRef<"Blog", 'String'>
    readonly tags: FieldRef<"Blog", 'String[]'>
    readonly status: FieldRef<"Blog", 'BlogStatus'>
    readonly publishedAt: FieldRef<"Blog", 'DateTime'>
    readonly layout: FieldRef<"Blog", 'BlogLayout'>
    readonly creatorId: FieldRef<"Blog", 'String'>
    readonly createdAt: FieldRef<"Blog", 'DateTime'>
    readonly updatedAt: FieldRef<"Blog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Blog findUnique
   */
  export type BlogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * Filter, which Blog to fetch.
     */
    where: BlogWhereUniqueInput
  }

  /**
   * Blog findUniqueOrThrow
   */
  export type BlogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * Filter, which Blog to fetch.
     */
    where: BlogWhereUniqueInput
  }

  /**
   * Blog findFirst
   */
  export type BlogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * Filter, which Blog to fetch.
     */
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogOrderByWithRelationInput | BlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blogs.
     */
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blogs.
     */
    distinct?: BlogScalarFieldEnum | BlogScalarFieldEnum[]
  }

  /**
   * Blog findFirstOrThrow
   */
  export type BlogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * Filter, which Blog to fetch.
     */
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogOrderByWithRelationInput | BlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blogs.
     */
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blogs.
     */
    distinct?: BlogScalarFieldEnum | BlogScalarFieldEnum[]
  }

  /**
   * Blog findMany
   */
  export type BlogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * Filter, which Blogs to fetch.
     */
    where?: BlogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blogs to fetch.
     */
    orderBy?: BlogOrderByWithRelationInput | BlogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Blogs.
     */
    cursor?: BlogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blogs.
     */
    skip?: number
    distinct?: BlogScalarFieldEnum | BlogScalarFieldEnum[]
  }

  /**
   * Blog create
   */
  export type BlogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * The data needed to create a Blog.
     */
    data: XOR<BlogCreateInput, BlogUncheckedCreateInput>
  }

  /**
   * Blog createMany
   */
  export type BlogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Blogs.
     */
    data: BlogCreateManyInput | BlogCreateManyInput[]
  }

  /**
   * Blog update
   */
  export type BlogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * The data needed to update a Blog.
     */
    data: XOR<BlogUpdateInput, BlogUncheckedUpdateInput>
    /**
     * Choose, which Blog to update.
     */
    where: BlogWhereUniqueInput
  }

  /**
   * Blog updateMany
   */
  export type BlogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Blogs.
     */
    data: XOR<BlogUpdateManyMutationInput, BlogUncheckedUpdateManyInput>
    /**
     * Filter which Blogs to update
     */
    where?: BlogWhereInput
  }

  /**
   * Blog upsert
   */
  export type BlogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * The filter to search for the Blog to update in case it exists.
     */
    where: BlogWhereUniqueInput
    /**
     * In case the Blog found by the `where` argument doesn't exist, create a new Blog with this data.
     */
    create: XOR<BlogCreateInput, BlogUncheckedCreateInput>
    /**
     * In case the Blog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogUpdateInput, BlogUncheckedUpdateInput>
  }

  /**
   * Blog delete
   */
  export type BlogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
    /**
     * Filter which Blog to delete.
     */
    where: BlogWhereUniqueInput
  }

  /**
   * Blog deleteMany
   */
  export type BlogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blogs to delete
     */
    where?: BlogWhereInput
  }

  /**
   * Blog findRaw
   */
  export type BlogFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Blog aggregateRaw
   */
  export type BlogAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Blog.categories
   */
  export type Blog$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnBlogs
     */
    select?: CategoriesOnBlogsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnBlogsInclude<ExtArgs> | null
    where?: CategoriesOnBlogsWhereInput
    orderBy?: CategoriesOnBlogsOrderByWithRelationInput | CategoriesOnBlogsOrderByWithRelationInput[]
    cursor?: CategoriesOnBlogsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoriesOnBlogsScalarFieldEnum | CategoriesOnBlogsScalarFieldEnum[]
  }

  /**
   * Blog.comments
   */
  export type Blog$commentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comment
     */
    select?: CommentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommentInclude<ExtArgs> | null
    where?: CommentWhereInput
    orderBy?: CommentOrderByWithRelationInput | CommentOrderByWithRelationInput[]
    cursor?: CommentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommentScalarFieldEnum | CommentScalarFieldEnum[]
  }

  /**
   * Blog without action
   */
  export type BlogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Blog
     */
    select?: BlogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogInclude<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    isFeature: boolean | null
    isNewProduct: boolean | null
    status: $Enums.ProductStatus | null
    visibility: boolean | null
    blogUrl: string | null
    partnerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: string | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    title: string | null
    slug: string | null
    isFeature: boolean | null
    isNewProduct: boolean | null
    status: $Enums.ProductStatus | null
    visibility: boolean | null
    blogUrl: string | null
    partnerId: string | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: string | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    isFeature: number
    isNewProduct: number
    tags: number
    status: number
    visibility: number
    blogUrl: number
    partnerId: number
    createdAt: number
    updatedAt: number
    creatorId: number
    _all: number
  }


  export type ProductMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    isFeature?: true
    isNewProduct?: true
    status?: true
    visibility?: true
    blogUrl?: true
    partnerId?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    isFeature?: true
    isNewProduct?: true
    status?: true
    visibility?: true
    blogUrl?: true
    partnerId?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    isFeature?: true
    isNewProduct?: true
    tags?: true
    status?: true
    visibility?: true
    blogUrl?: true
    partnerId?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    title: string
    slug: string
    isFeature: boolean
    isNewProduct: boolean
    tags: string[]
    status: $Enums.ProductStatus
    visibility: boolean
    blogUrl: string | null
    partnerId: string
    createdAt: Date
    updatedAt: Date
    creatorId: string
    _count: ProductCountAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    description?: boolean | ProductDescriptionDefaultArgs<ExtArgs>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: boolean
    price?: boolean | PriceDefaultArgs<ExtArgs>
    features?: boolean | FeatureDefaultArgs<ExtArgs>
    status?: boolean
    visibility?: boolean
    inventory?: boolean | InventoryDefaultArgs<ExtArgs>
    blogUrl?: boolean
    partnerId?: boolean
    metadata?: boolean | ProductSeoMetadataDefaultArgs<ExtArgs>
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
    media?: boolean | Product$mediaArgs<ExtArgs>
    reviews?: boolean | Product$reviewsArgs<ExtArgs>
    categories?: boolean | Product$categoriesArgs<ExtArgs>
    OrderItem?: boolean | Product$OrderItemArgs<ExtArgs>
    userWishlist?: boolean | Product$userWishlistArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["product"]>


  export type ProductSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: boolean
    status?: boolean
    visibility?: boolean
    blogUrl?: boolean
    partnerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
  }

  export type ProductInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | Product$mediaArgs<ExtArgs>
    reviews?: boolean | Product$reviewsArgs<ExtArgs>
    categories?: boolean | Product$categoriesArgs<ExtArgs>
    OrderItem?: boolean | Product$OrderItemArgs<ExtArgs>
    userWishlist?: boolean | Product$userWishlistArgs<ExtArgs>
    _count?: boolean | ProductCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {
      media: Prisma.$MediasOnProductsPayload<ExtArgs>[]
      reviews: Prisma.$ReviewPayload<ExtArgs>[]
      categories: Prisma.$CategoriesOnProductsPayload<ExtArgs>[]
      OrderItem: Prisma.$OrderItemPayload<ExtArgs>[]
      userWishlist: Prisma.$WishlistPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      slug: string
      isFeature: boolean
      isNewProduct: boolean
      tags: string[]
      status: $Enums.ProductStatus
      visibility: boolean
      blogUrl: string | null
      partnerId: string
      createdAt: Date
      updatedAt: Date
      creatorId: string
    }, ExtArgs["result"]["product"]>
    composites: {
      description: Prisma.$ProductDescriptionPayload
      price: Prisma.$PricePayload
      features: Prisma.$FeaturePayload[]
      inventory: Prisma.$InventoryPayload
      metadata: Prisma.$ProductSeoMetadataPayload
    }
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Products that matches the filter.
     * @param {ProductFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const product = await prisma.product.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: ProductFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Product.
     * @param {ProductAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const product = await prisma.product.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ProductAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    media<T extends Product$mediaArgs<ExtArgs> = {}>(args?: Subset<T, Product$mediaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediasOnProductsPayload<ExtArgs>, T, "findMany"> | Null>
    reviews<T extends Product$reviewsArgs<ExtArgs> = {}>(args?: Subset<T, Product$reviewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany"> | Null>
    categories<T extends Product$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Product$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriesOnProductsPayload<ExtArgs>, T, "findMany"> | Null>
    OrderItem<T extends Product$OrderItemArgs<ExtArgs> = {}>(args?: Subset<T, Product$OrderItemArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany"> | Null>
    userWishlist<T extends Product$userWishlistArgs<ExtArgs> = {}>(args?: Subset<T, Product$userWishlistArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */ 
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly title: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly isFeature: FieldRef<"Product", 'Boolean'>
    readonly isNewProduct: FieldRef<"Product", 'Boolean'>
    readonly tags: FieldRef<"Product", 'String[]'>
    readonly status: FieldRef<"Product", 'ProductStatus'>
    readonly visibility: FieldRef<"Product", 'Boolean'>
    readonly blogUrl: FieldRef<"Product", 'String'>
    readonly partnerId: FieldRef<"Product", 'String'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
    readonly creatorId: FieldRef<"Product", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
  }

  /**
   * Product findRaw
   */
  export type ProductFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Product aggregateRaw
   */
  export type ProductAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Product.media
   */
  export type Product$mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediasOnProducts
     */
    select?: MediasOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediasOnProductsInclude<ExtArgs> | null
    where?: MediasOnProductsWhereInput
    orderBy?: MediasOnProductsOrderByWithRelationInput | MediasOnProductsOrderByWithRelationInput[]
    cursor?: MediasOnProductsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediasOnProductsScalarFieldEnum | MediasOnProductsScalarFieldEnum[]
  }

  /**
   * Product.reviews
   */
  export type Product$reviewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    cursor?: ReviewWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Product.categories
   */
  export type Product$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnProducts
     */
    select?: CategoriesOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnProductsInclude<ExtArgs> | null
    where?: CategoriesOnProductsWhereInput
    orderBy?: CategoriesOnProductsOrderByWithRelationInput | CategoriesOnProductsOrderByWithRelationInput[]
    cursor?: CategoriesOnProductsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoriesOnProductsScalarFieldEnum | CategoriesOnProductsScalarFieldEnum[]
  }

  /**
   * Product.OrderItem
   */
  export type Product$OrderItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Product.userWishlist
   */
  export type Product$userWishlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    where?: WishlistWhereInput
    orderBy?: WishlistOrderByWithRelationInput | WishlistOrderByWithRelationInput[]
    cursor?: WishlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WishlistScalarFieldEnum | WishlistScalarFieldEnum[]
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProductInclude<ExtArgs> | null
  }


  /**
   * Model Review
   */

  export type AggregateReview = {
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  export type ReviewAvgAggregateOutputType = {
    rating: number | null
    helpful: number | null
    notHelpful: number | null
  }

  export type ReviewSumAggregateOutputType = {
    rating: number | null
    helpful: number | null
    notHelpful: number | null
  }

  export type ReviewMinAggregateOutputType = {
    id: string | null
    productId: string | null
    userName: string | null
    rating: number | null
    comment: string | null
    imageUrl: string | null
    helpful: number | null
    notHelpful: number | null
    verify: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: string | null
  }

  export type ReviewMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    userName: string | null
    rating: number | null
    comment: string | null
    imageUrl: string | null
    helpful: number | null
    notHelpful: number | null
    verify: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    creatorId: string | null
  }

  export type ReviewCountAggregateOutputType = {
    id: number
    productId: number
    userName: number
    rating: number
    comment: number
    imageUrl: number
    helpful: number
    notHelpful: number
    verify: number
    createdAt: number
    updatedAt: number
    creatorId: number
    _all: number
  }


  export type ReviewAvgAggregateInputType = {
    rating?: true
    helpful?: true
    notHelpful?: true
  }

  export type ReviewSumAggregateInputType = {
    rating?: true
    helpful?: true
    notHelpful?: true
  }

  export type ReviewMinAggregateInputType = {
    id?: true
    productId?: true
    userName?: true
    rating?: true
    comment?: true
    imageUrl?: true
    helpful?: true
    notHelpful?: true
    verify?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
  }

  export type ReviewMaxAggregateInputType = {
    id?: true
    productId?: true
    userName?: true
    rating?: true
    comment?: true
    imageUrl?: true
    helpful?: true
    notHelpful?: true
    verify?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
  }

  export type ReviewCountAggregateInputType = {
    id?: true
    productId?: true
    userName?: true
    rating?: true
    comment?: true
    imageUrl?: true
    helpful?: true
    notHelpful?: true
    verify?: true
    createdAt?: true
    updatedAt?: true
    creatorId?: true
    _all?: true
  }

  export type ReviewAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Review to aggregate.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reviews
    **/
    _count?: true | ReviewCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReviewAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReviewSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReviewMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReviewMaxAggregateInputType
  }

  export type GetReviewAggregateType<T extends ReviewAggregateArgs> = {
        [P in keyof T & keyof AggregateReview]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReview[P]>
      : GetScalarType<T[P], AggregateReview[P]>
  }




  export type ReviewGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReviewWhereInput
    orderBy?: ReviewOrderByWithAggregationInput | ReviewOrderByWithAggregationInput[]
    by: ReviewScalarFieldEnum[] | ReviewScalarFieldEnum
    having?: ReviewScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReviewCountAggregateInputType | true
    _avg?: ReviewAvgAggregateInputType
    _sum?: ReviewSumAggregateInputType
    _min?: ReviewMinAggregateInputType
    _max?: ReviewMaxAggregateInputType
  }

  export type ReviewGroupByOutputType = {
    id: string
    productId: string
    userName: string
    rating: number
    comment: string
    imageUrl: string | null
    helpful: number
    notHelpful: number
    verify: boolean
    createdAt: Date
    updatedAt: Date
    creatorId: string
    _count: ReviewCountAggregateOutputType | null
    _avg: ReviewAvgAggregateOutputType | null
    _sum: ReviewSumAggregateOutputType | null
    _min: ReviewMinAggregateOutputType | null
    _max: ReviewMaxAggregateOutputType | null
  }

  type GetReviewGroupByPayload<T extends ReviewGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReviewGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReviewGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReviewGroupByOutputType[P]>
            : GetScalarType<T[P], ReviewGroupByOutputType[P]>
        }
      >
    >


  export type ReviewSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    userName?: boolean
    rating?: boolean
    comment?: boolean
    imageUrl?: boolean
    helpful?: boolean
    notHelpful?: boolean
    verify?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["review"]>


  export type ReviewSelectScalar = {
    id?: boolean
    productId?: boolean
    userName?: boolean
    rating?: boolean
    comment?: boolean
    imageUrl?: boolean
    helpful?: boolean
    notHelpful?: boolean
    verify?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    creatorId?: boolean
  }

  export type ReviewInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $ReviewPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Review"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      userName: string
      rating: number
      comment: string
      imageUrl: string | null
      helpful: number
      notHelpful: number
      verify: boolean
      createdAt: Date
      updatedAt: Date
      creatorId: string
    }, ExtArgs["result"]["review"]>
    composites: {}
  }

  type ReviewGetPayload<S extends boolean | null | undefined | ReviewDefaultArgs> = $Result.GetResult<Prisma.$ReviewPayload, S>

  type ReviewCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ReviewFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ReviewCountAggregateInputType | true
    }

  export interface ReviewDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Review'], meta: { name: 'Review' } }
    /**
     * Find zero or one Review that matches the filter.
     * @param {ReviewFindUniqueArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReviewFindUniqueArgs>(args: SelectSubset<T, ReviewFindUniqueArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Review that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ReviewFindUniqueOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReviewFindUniqueOrThrowArgs>(args: SelectSubset<T, ReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Review that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReviewFindFirstArgs>(args?: SelectSubset<T, ReviewFindFirstArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Review that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindFirstOrThrowArgs} args - Arguments to find a Review
     * @example
     * // Get one Review
     * const review = await prisma.review.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReviewFindFirstOrThrowArgs>(args?: SelectSubset<T, ReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Reviews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reviews
     * const reviews = await prisma.review.findMany()
     * 
     * // Get first 10 Reviews
     * const reviews = await prisma.review.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reviewWithIdOnly = await prisma.review.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ReviewFindManyArgs>(args?: SelectSubset<T, ReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Review.
     * @param {ReviewCreateArgs} args - Arguments to create a Review.
     * @example
     * // Create one Review
     * const Review = await prisma.review.create({
     *   data: {
     *     // ... data to create a Review
     *   }
     * })
     * 
     */
    create<T extends ReviewCreateArgs>(args: SelectSubset<T, ReviewCreateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Reviews.
     * @param {ReviewCreateManyArgs} args - Arguments to create many Reviews.
     * @example
     * // Create many Reviews
     * const review = await prisma.review.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReviewCreateManyArgs>(args?: SelectSubset<T, ReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Review.
     * @param {ReviewDeleteArgs} args - Arguments to delete one Review.
     * @example
     * // Delete one Review
     * const Review = await prisma.review.delete({
     *   where: {
     *     // ... filter to delete one Review
     *   }
     * })
     * 
     */
    delete<T extends ReviewDeleteArgs>(args: SelectSubset<T, ReviewDeleteArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Review.
     * @param {ReviewUpdateArgs} args - Arguments to update one Review.
     * @example
     * // Update one Review
     * const review = await prisma.review.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReviewUpdateArgs>(args: SelectSubset<T, ReviewUpdateArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Reviews.
     * @param {ReviewDeleteManyArgs} args - Arguments to filter Reviews to delete.
     * @example
     * // Delete a few Reviews
     * const { count } = await prisma.review.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReviewDeleteManyArgs>(args?: SelectSubset<T, ReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reviews
     * const review = await prisma.review.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReviewUpdateManyArgs>(args: SelectSubset<T, ReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Review.
     * @param {ReviewUpsertArgs} args - Arguments to update or create a Review.
     * @example
     * // Update or create a Review
     * const review = await prisma.review.upsert({
     *   create: {
     *     // ... data to create a Review
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Review we want to update
     *   }
     * })
     */
    upsert<T extends ReviewUpsertArgs>(args: SelectSubset<T, ReviewUpsertArgs<ExtArgs>>): Prisma__ReviewClient<$Result.GetResult<Prisma.$ReviewPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Reviews that matches the filter.
     * @param {ReviewFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const review = await prisma.review.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: ReviewFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Review.
     * @param {ReviewAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const review = await prisma.review.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: ReviewAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Reviews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewCountArgs} args - Arguments to filter Reviews to count.
     * @example
     * // Count the number of Reviews
     * const count = await prisma.review.count({
     *   where: {
     *     // ... the filter for the Reviews we want to count
     *   }
     * })
    **/
    count<T extends ReviewCountArgs>(
      args?: Subset<T, ReviewCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReviewCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReviewAggregateArgs>(args: Subset<T, ReviewAggregateArgs>): Prisma.PrismaPromise<GetReviewAggregateType<T>>

    /**
     * Group by Review.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReviewGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReviewGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReviewGroupByArgs['orderBy'] }
        : { orderBy?: ReviewGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Review model
   */
  readonly fields: ReviewFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Review.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReviewClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Review model
   */ 
  interface ReviewFieldRefs {
    readonly id: FieldRef<"Review", 'String'>
    readonly productId: FieldRef<"Review", 'String'>
    readonly userName: FieldRef<"Review", 'String'>
    readonly rating: FieldRef<"Review", 'Int'>
    readonly comment: FieldRef<"Review", 'String'>
    readonly imageUrl: FieldRef<"Review", 'String'>
    readonly helpful: FieldRef<"Review", 'Int'>
    readonly notHelpful: FieldRef<"Review", 'Int'>
    readonly verify: FieldRef<"Review", 'Boolean'>
    readonly createdAt: FieldRef<"Review", 'DateTime'>
    readonly updatedAt: FieldRef<"Review", 'DateTime'>
    readonly creatorId: FieldRef<"Review", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Review findUnique
   */
  export type ReviewFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findUniqueOrThrow
   */
  export type ReviewFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review findFirst
   */
  export type ReviewFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findFirstOrThrow
   */
  export type ReviewFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Review to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reviews.
     */
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review findMany
   */
  export type ReviewFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter, which Reviews to fetch.
     */
    where?: ReviewWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reviews to fetch.
     */
    orderBy?: ReviewOrderByWithRelationInput | ReviewOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reviews.
     */
    cursor?: ReviewWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reviews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reviews.
     */
    skip?: number
    distinct?: ReviewScalarFieldEnum | ReviewScalarFieldEnum[]
  }

  /**
   * Review create
   */
  export type ReviewCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to create a Review.
     */
    data: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
  }

  /**
   * Review createMany
   */
  export type ReviewCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reviews.
     */
    data: ReviewCreateManyInput | ReviewCreateManyInput[]
  }

  /**
   * Review update
   */
  export type ReviewUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The data needed to update a Review.
     */
    data: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
    /**
     * Choose, which Review to update.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review updateMany
   */
  export type ReviewUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reviews.
     */
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyInput>
    /**
     * Filter which Reviews to update
     */
    where?: ReviewWhereInput
  }

  /**
   * Review upsert
   */
  export type ReviewUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * The filter to search for the Review to update in case it exists.
     */
    where: ReviewWhereUniqueInput
    /**
     * In case the Review found by the `where` argument doesn't exist, create a new Review with this data.
     */
    create: XOR<ReviewCreateInput, ReviewUncheckedCreateInput>
    /**
     * In case the Review was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReviewUpdateInput, ReviewUncheckedUpdateInput>
  }

  /**
   * Review delete
   */
  export type ReviewDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
    /**
     * Filter which Review to delete.
     */
    where: ReviewWhereUniqueInput
  }

  /**
   * Review deleteMany
   */
  export type ReviewDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reviews to delete
     */
    where?: ReviewWhereInput
  }

  /**
   * Review findRaw
   */
  export type ReviewFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Review aggregateRaw
   */
  export type ReviewAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Review without action
   */
  export type ReviewDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Review
     */
    select?: ReviewSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReviewInclude<ExtArgs> | null
  }


  /**
   * Model OrderItem
   */

  export type AggregateOrderItem = {
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  export type OrderItemAvgAggregateOutputType = {
    quantity: number | null
    price: number | null
  }

  export type OrderItemSumAggregateOutputType = {
    quantity: number | null
    price: number | null
  }

  export type OrderItemMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    quantity: number | null
    price: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderItemMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    productId: string | null
    quantity: number | null
    price: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderItemCountAggregateOutputType = {
    id: number
    orderId: number
    productId: number
    quantity: number
    price: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderItemAvgAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type OrderItemSumAggregateInputType = {
    quantity?: true
    price?: true
  }

  export type OrderItemMinAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderItemMaxAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    price?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderItemCountAggregateInputType = {
    id?: true
    orderId?: true
    productId?: true
    quantity?: true
    price?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItem to aggregate.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderItems
    **/
    _count?: true | OrderItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderItemMaxAggregateInputType
  }

  export type GetOrderItemAggregateType<T extends OrderItemAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderItem[P]>
      : GetScalarType<T[P], AggregateOrderItem[P]>
  }




  export type OrderItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithAggregationInput | OrderItemOrderByWithAggregationInput[]
    by: OrderItemScalarFieldEnum[] | OrderItemScalarFieldEnum
    having?: OrderItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderItemCountAggregateInputType | true
    _avg?: OrderItemAvgAggregateInputType
    _sum?: OrderItemSumAggregateInputType
    _min?: OrderItemMinAggregateInputType
    _max?: OrderItemMaxAggregateInputType
  }

  export type OrderItemGroupByOutputType = {
    id: string
    orderId: string
    productId: string
    quantity: number
    price: number
    createdAt: Date
    updatedAt: Date
    _count: OrderItemCountAggregateOutputType | null
    _avg: OrderItemAvgAggregateOutputType | null
    _sum: OrderItemSumAggregateOutputType | null
    _min: OrderItemMinAggregateOutputType | null
    _max: OrderItemMaxAggregateOutputType | null
  }

  type GetOrderItemGroupByPayload<T extends OrderItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
            : GetScalarType<T[P], OrderItemGroupByOutputType[P]>
        }
      >
    >


  export type OrderItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderItem"]>


  export type OrderItemSelectScalar = {
    id?: boolean
    orderId?: boolean
    productId?: boolean
    quantity?: boolean
    price?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | OrderDefaultArgs<ExtArgs>
    product?: boolean | ProductDefaultArgs<ExtArgs>
  }

  export type $OrderItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderItem"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs>
      product: Prisma.$ProductPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string
      productId: string
      quantity: number
      price: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["orderItem"]>
    composites: {}
  }

  type OrderItemGetPayload<S extends boolean | null | undefined | OrderItemDefaultArgs> = $Result.GetResult<Prisma.$OrderItemPayload, S>

  type OrderItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrderItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrderItemCountAggregateInputType | true
    }

  export interface OrderItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderItem'], meta: { name: 'OrderItem' } }
    /**
     * Find zero or one OrderItem that matches the filter.
     * @param {OrderItemFindUniqueArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderItemFindUniqueArgs>(args: SelectSubset<T, OrderItemFindUniqueArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one OrderItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrderItemFindUniqueOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderItemFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first OrderItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderItemFindFirstArgs>(args?: SelectSubset<T, OrderItemFindFirstArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first OrderItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindFirstOrThrowArgs} args - Arguments to find a OrderItem
     * @example
     * // Get one OrderItem
     * const orderItem = await prisma.orderItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderItemFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more OrderItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderItems
     * const orderItems = await prisma.orderItem.findMany()
     * 
     * // Get first 10 OrderItems
     * const orderItems = await prisma.orderItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderItemWithIdOnly = await prisma.orderItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderItemFindManyArgs>(args?: SelectSubset<T, OrderItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a OrderItem.
     * @param {OrderItemCreateArgs} args - Arguments to create a OrderItem.
     * @example
     * // Create one OrderItem
     * const OrderItem = await prisma.orderItem.create({
     *   data: {
     *     // ... data to create a OrderItem
     *   }
     * })
     * 
     */
    create<T extends OrderItemCreateArgs>(args: SelectSubset<T, OrderItemCreateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many OrderItems.
     * @param {OrderItemCreateManyArgs} args - Arguments to create many OrderItems.
     * @example
     * // Create many OrderItems
     * const orderItem = await prisma.orderItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderItemCreateManyArgs>(args?: SelectSubset<T, OrderItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a OrderItem.
     * @param {OrderItemDeleteArgs} args - Arguments to delete one OrderItem.
     * @example
     * // Delete one OrderItem
     * const OrderItem = await prisma.orderItem.delete({
     *   where: {
     *     // ... filter to delete one OrderItem
     *   }
     * })
     * 
     */
    delete<T extends OrderItemDeleteArgs>(args: SelectSubset<T, OrderItemDeleteArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one OrderItem.
     * @param {OrderItemUpdateArgs} args - Arguments to update one OrderItem.
     * @example
     * // Update one OrderItem
     * const orderItem = await prisma.orderItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderItemUpdateArgs>(args: SelectSubset<T, OrderItemUpdateArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more OrderItems.
     * @param {OrderItemDeleteManyArgs} args - Arguments to filter OrderItems to delete.
     * @example
     * // Delete a few OrderItems
     * const { count } = await prisma.orderItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderItemDeleteManyArgs>(args?: SelectSubset<T, OrderItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderItems
     * const orderItem = await prisma.orderItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderItemUpdateManyArgs>(args: SelectSubset<T, OrderItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one OrderItem.
     * @param {OrderItemUpsertArgs} args - Arguments to update or create a OrderItem.
     * @example
     * // Update or create a OrderItem
     * const orderItem = await prisma.orderItem.upsert({
     *   create: {
     *     // ... data to create a OrderItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderItem we want to update
     *   }
     * })
     */
    upsert<T extends OrderItemUpsertArgs>(args: SelectSubset<T, OrderItemUpsertArgs<ExtArgs>>): Prisma__OrderItemClient<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more OrderItems that matches the filter.
     * @param {OrderItemFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const orderItem = await prisma.orderItem.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: OrderItemFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a OrderItem.
     * @param {OrderItemAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const orderItem = await prisma.orderItem.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: OrderItemAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of OrderItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemCountArgs} args - Arguments to filter OrderItems to count.
     * @example
     * // Count the number of OrderItems
     * const count = await prisma.orderItem.count({
     *   where: {
     *     // ... the filter for the OrderItems we want to count
     *   }
     * })
    **/
    count<T extends OrderItemCountArgs>(
      args?: Subset<T, OrderItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderItemAggregateArgs>(args: Subset<T, OrderItemAggregateArgs>): Prisma.PrismaPromise<GetOrderItemAggregateType<T>>

    /**
     * Group by OrderItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderItemGroupByArgs['orderBy'] }
        : { orderBy?: OrderItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderItem model
   */
  readonly fields: OrderItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends OrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OrderDefaultArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderItem model
   */ 
  interface OrderItemFieldRefs {
    readonly id: FieldRef<"OrderItem", 'String'>
    readonly orderId: FieldRef<"OrderItem", 'String'>
    readonly productId: FieldRef<"OrderItem", 'String'>
    readonly quantity: FieldRef<"OrderItem", 'Int'>
    readonly price: FieldRef<"OrderItem", 'Float'>
    readonly createdAt: FieldRef<"OrderItem", 'DateTime'>
    readonly updatedAt: FieldRef<"OrderItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * OrderItem findUnique
   */
  export type OrderItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findUniqueOrThrow
   */
  export type OrderItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem findFirst
   */
  export type OrderItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findFirstOrThrow
   */
  export type OrderItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItem to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderItems.
     */
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem findMany
   */
  export type OrderItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter, which OrderItems to fetch.
     */
    where?: OrderItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderItems to fetch.
     */
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderItems.
     */
    cursor?: OrderItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderItems.
     */
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * OrderItem create
   */
  export type OrderItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderItem.
     */
    data: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
  }

  /**
   * OrderItem createMany
   */
  export type OrderItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderItems.
     */
    data: OrderItemCreateManyInput | OrderItemCreateManyInput[]
  }

  /**
   * OrderItem update
   */
  export type OrderItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderItem.
     */
    data: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
    /**
     * Choose, which OrderItem to update.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem updateMany
   */
  export type OrderItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderItems.
     */
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyInput>
    /**
     * Filter which OrderItems to update
     */
    where?: OrderItemWhereInput
  }

  /**
   * OrderItem upsert
   */
  export type OrderItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderItem to update in case it exists.
     */
    where: OrderItemWhereUniqueInput
    /**
     * In case the OrderItem found by the `where` argument doesn't exist, create a new OrderItem with this data.
     */
    create: XOR<OrderItemCreateInput, OrderItemUncheckedCreateInput>
    /**
     * In case the OrderItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderItemUpdateInput, OrderItemUncheckedUpdateInput>
  }

  /**
   * OrderItem delete
   */
  export type OrderItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    /**
     * Filter which OrderItem to delete.
     */
    where: OrderItemWhereUniqueInput
  }

  /**
   * OrderItem deleteMany
   */
  export type OrderItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderItems to delete
     */
    where?: OrderItemWhereInput
  }

  /**
   * OrderItem findRaw
   */
  export type OrderItemFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OrderItem aggregateRaw
   */
  export type OrderItemAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * OrderItem without action
   */
  export type OrderItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    status: $Enums.OrderStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    status: $Enums.OrderStatus | null
    createdAt: Date | null
    updatedAt: Date | null
    userId: string | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    status: number
    createdAt: number
    updatedAt: number
    userId: number
    _all: number
  }


  export type OrderMinAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    userId?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    status: $Enums.OrderStatus
    createdAt: Date
    updatedAt: Date
    userId: string
    _count: OrderCountAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    deliveryInfo?: boolean | DeliveryInfoDefaultArgs<ExtArgs>
    userData?: boolean | UserDataDefaultArgs<ExtArgs>
    promotions?: boolean | OrderPromotionDefaultArgs<ExtArgs>
    orderPrices?: boolean | OrderPricesDefaultArgs<ExtArgs>
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
    items?: boolean | Order$itemsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>


  export type OrderSelectScalar = {
    id?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    userId?: boolean
  }

  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | Order$itemsArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      items: Prisma.$OrderItemPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      status: $Enums.OrderStatus
      createdAt: Date
      updatedAt: Date
      userId: string
    }, ExtArgs["result"]["order"]>
    composites: {
      deliveryInfo: Prisma.$DeliveryInfoPayload
      userData: Prisma.$UserDataPayload
      promotions: Prisma.$OrderPromotionPayload[]
      orderPrices: Prisma.$OrderPricesPayload
    }
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Orders that matches the filter.
     * @param {OrderFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const order = await prisma.order.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: OrderFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Order.
     * @param {OrderAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const order = await prisma.order.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: OrderAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    items<T extends Order$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Order$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderItemPayload<ExtArgs>, T, "findMany"> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */ 
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
    readonly userId: FieldRef<"Order", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
  }

  /**
   * Order findRaw
   */
  export type OrderFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Order aggregateRaw
   */
  export type OrderAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Order.items
   */
  export type Order$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderItem
     */
    select?: OrderItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderItemInclude<ExtArgs> | null
    where?: OrderItemWhereInput
    orderBy?: OrderItemOrderByWithRelationInput | OrderItemOrderByWithRelationInput[]
    cursor?: OrderItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderItemScalarFieldEnum | OrderItemScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    fullName: string | null
    avatar: string | null
    phone: string | null
    isAnonymous: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    clerkId: string | null
    email: string | null
    fullName: string | null
    avatar: string | null
    phone: string | null
    isAnonymous: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    clerkId: number
    email: number
    fullName: number
    avatar: number
    phone: number
    isAnonymous: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    fullName?: true
    avatar?: true
    phone?: true
    isAnonymous?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    fullName?: true
    avatar?: true
    phone?: true
    isAnonymous?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    clerkId?: true
    email?: true
    fullName?: true
    avatar?: true
    phone?: true
    isAnonymous?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    clerkId: string | null
    email: string | null
    fullName: string | null
    avatar: string | null
    phone: string | null
    isAnonymous: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clerkId?: boolean
    email?: boolean
    fullName?: boolean
    avatar?: boolean
    phone?: boolean
    isAnonymous?: boolean
    productWishlist?: boolean | User$productWishlistArgs<ExtArgs>
    order?: boolean | User$orderArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>


  export type UserSelectScalar = {
    id?: boolean
    clerkId?: boolean
    email?: boolean
    fullName?: boolean
    avatar?: boolean
    phone?: boolean
    isAnonymous?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    productWishlist?: boolean | User$productWishlistArgs<ExtArgs>
    order?: boolean | User$orderArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      productWishlist: Prisma.$WishlistPayload<ExtArgs>[]
      order: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clerkId: string | null
      email: string | null
      fullName: string | null
      avatar: string | null
      phone: string | null
      isAnonymous: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * @param {UserFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const user = await prisma.user.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: UserFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a User.
     * @param {UserAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const user = await prisma.user.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: UserAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    productWishlist<T extends User$productWishlistArgs<ExtArgs> = {}>(args?: Subset<T, User$productWishlistArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findMany"> | Null>
    order<T extends User$orderArgs<ExtArgs> = {}>(args?: Subset<T, User$orderArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly clerkId: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly isAnonymous: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User findRaw
   */
  export type UserFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User aggregateRaw
   */
  export type UserAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * User.productWishlist
   */
  export type User$productWishlistArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    where?: WishlistWhereInput
    orderBy?: WishlistOrderByWithRelationInput | WishlistOrderByWithRelationInput[]
    cursor?: WishlistWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WishlistScalarFieldEnum | WishlistScalarFieldEnum[]
  }

  /**
   * User.order
   */
  export type User$orderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model CategoriesOnBlogs
   */

  export type AggregateCategoriesOnBlogs = {
    _count: CategoriesOnBlogsCountAggregateOutputType | null
    _min: CategoriesOnBlogsMinAggregateOutputType | null
    _max: CategoriesOnBlogsMaxAggregateOutputType | null
  }

  export type CategoriesOnBlogsMinAggregateOutputType = {
    id: string | null
    blogId: string | null
    categoryId: string | null
    assignedAt: Date | null
  }

  export type CategoriesOnBlogsMaxAggregateOutputType = {
    id: string | null
    blogId: string | null
    categoryId: string | null
    assignedAt: Date | null
  }

  export type CategoriesOnBlogsCountAggregateOutputType = {
    id: number
    blogId: number
    categoryId: number
    assignedAt: number
    _all: number
  }


  export type CategoriesOnBlogsMinAggregateInputType = {
    id?: true
    blogId?: true
    categoryId?: true
    assignedAt?: true
  }

  export type CategoriesOnBlogsMaxAggregateInputType = {
    id?: true
    blogId?: true
    categoryId?: true
    assignedAt?: true
  }

  export type CategoriesOnBlogsCountAggregateInputType = {
    id?: true
    blogId?: true
    categoryId?: true
    assignedAt?: true
    _all?: true
  }

  export type CategoriesOnBlogsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoriesOnBlogs to aggregate.
     */
    where?: CategoriesOnBlogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoriesOnBlogs to fetch.
     */
    orderBy?: CategoriesOnBlogsOrderByWithRelationInput | CategoriesOnBlogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoriesOnBlogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoriesOnBlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoriesOnBlogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CategoriesOnBlogs
    **/
    _count?: true | CategoriesOnBlogsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriesOnBlogsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriesOnBlogsMaxAggregateInputType
  }

  export type GetCategoriesOnBlogsAggregateType<T extends CategoriesOnBlogsAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoriesOnBlogs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoriesOnBlogs[P]>
      : GetScalarType<T[P], AggregateCategoriesOnBlogs[P]>
  }




  export type CategoriesOnBlogsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriesOnBlogsWhereInput
    orderBy?: CategoriesOnBlogsOrderByWithAggregationInput | CategoriesOnBlogsOrderByWithAggregationInput[]
    by: CategoriesOnBlogsScalarFieldEnum[] | CategoriesOnBlogsScalarFieldEnum
    having?: CategoriesOnBlogsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriesOnBlogsCountAggregateInputType | true
    _min?: CategoriesOnBlogsMinAggregateInputType
    _max?: CategoriesOnBlogsMaxAggregateInputType
  }

  export type CategoriesOnBlogsGroupByOutputType = {
    id: string
    blogId: string
    categoryId: string
    assignedAt: Date
    _count: CategoriesOnBlogsCountAggregateOutputType | null
    _min: CategoriesOnBlogsMinAggregateOutputType | null
    _max: CategoriesOnBlogsMaxAggregateOutputType | null
  }

  type GetCategoriesOnBlogsGroupByPayload<T extends CategoriesOnBlogsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriesOnBlogsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriesOnBlogsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriesOnBlogsGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriesOnBlogsGroupByOutputType[P]>
        }
      >
    >


  export type CategoriesOnBlogsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blogId?: boolean
    categoryId?: boolean
    assignedAt?: boolean
    blog?: boolean | BlogDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoriesOnBlogs"]>


  export type CategoriesOnBlogsSelectScalar = {
    id?: boolean
    blogId?: boolean
    categoryId?: boolean
    assignedAt?: boolean
  }

  export type CategoriesOnBlogsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blog?: boolean | BlogDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $CategoriesOnBlogsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CategoriesOnBlogs"
    objects: {
      blog: Prisma.$BlogPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      blogId: string
      categoryId: string
      assignedAt: Date
    }, ExtArgs["result"]["categoriesOnBlogs"]>
    composites: {}
  }

  type CategoriesOnBlogsGetPayload<S extends boolean | null | undefined | CategoriesOnBlogsDefaultArgs> = $Result.GetResult<Prisma.$CategoriesOnBlogsPayload, S>

  type CategoriesOnBlogsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoriesOnBlogsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoriesOnBlogsCountAggregateInputType | true
    }

  export interface CategoriesOnBlogsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CategoriesOnBlogs'], meta: { name: 'CategoriesOnBlogs' } }
    /**
     * Find zero or one CategoriesOnBlogs that matches the filter.
     * @param {CategoriesOnBlogsFindUniqueArgs} args - Arguments to find a CategoriesOnBlogs
     * @example
     * // Get one CategoriesOnBlogs
     * const categoriesOnBlogs = await prisma.categoriesOnBlogs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriesOnBlogsFindUniqueArgs>(args: SelectSubset<T, CategoriesOnBlogsFindUniqueArgs<ExtArgs>>): Prisma__CategoriesOnBlogsClient<$Result.GetResult<Prisma.$CategoriesOnBlogsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CategoriesOnBlogs that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoriesOnBlogsFindUniqueOrThrowArgs} args - Arguments to find a CategoriesOnBlogs
     * @example
     * // Get one CategoriesOnBlogs
     * const categoriesOnBlogs = await prisma.categoriesOnBlogs.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriesOnBlogsFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoriesOnBlogsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoriesOnBlogsClient<$Result.GetResult<Prisma.$CategoriesOnBlogsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CategoriesOnBlogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnBlogsFindFirstArgs} args - Arguments to find a CategoriesOnBlogs
     * @example
     * // Get one CategoriesOnBlogs
     * const categoriesOnBlogs = await prisma.categoriesOnBlogs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriesOnBlogsFindFirstArgs>(args?: SelectSubset<T, CategoriesOnBlogsFindFirstArgs<ExtArgs>>): Prisma__CategoriesOnBlogsClient<$Result.GetResult<Prisma.$CategoriesOnBlogsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CategoriesOnBlogs that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnBlogsFindFirstOrThrowArgs} args - Arguments to find a CategoriesOnBlogs
     * @example
     * // Get one CategoriesOnBlogs
     * const categoriesOnBlogs = await prisma.categoriesOnBlogs.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriesOnBlogsFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoriesOnBlogsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoriesOnBlogsClient<$Result.GetResult<Prisma.$CategoriesOnBlogsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CategoriesOnBlogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnBlogsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CategoriesOnBlogs
     * const categoriesOnBlogs = await prisma.categoriesOnBlogs.findMany()
     * 
     * // Get first 10 CategoriesOnBlogs
     * const categoriesOnBlogs = await prisma.categoriesOnBlogs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriesOnBlogsWithIdOnly = await prisma.categoriesOnBlogs.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoriesOnBlogsFindManyArgs>(args?: SelectSubset<T, CategoriesOnBlogsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriesOnBlogsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CategoriesOnBlogs.
     * @param {CategoriesOnBlogsCreateArgs} args - Arguments to create a CategoriesOnBlogs.
     * @example
     * // Create one CategoriesOnBlogs
     * const CategoriesOnBlogs = await prisma.categoriesOnBlogs.create({
     *   data: {
     *     // ... data to create a CategoriesOnBlogs
     *   }
     * })
     * 
     */
    create<T extends CategoriesOnBlogsCreateArgs>(args: SelectSubset<T, CategoriesOnBlogsCreateArgs<ExtArgs>>): Prisma__CategoriesOnBlogsClient<$Result.GetResult<Prisma.$CategoriesOnBlogsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CategoriesOnBlogs.
     * @param {CategoriesOnBlogsCreateManyArgs} args - Arguments to create many CategoriesOnBlogs.
     * @example
     * // Create many CategoriesOnBlogs
     * const categoriesOnBlogs = await prisma.categoriesOnBlogs.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoriesOnBlogsCreateManyArgs>(args?: SelectSubset<T, CategoriesOnBlogsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CategoriesOnBlogs.
     * @param {CategoriesOnBlogsDeleteArgs} args - Arguments to delete one CategoriesOnBlogs.
     * @example
     * // Delete one CategoriesOnBlogs
     * const CategoriesOnBlogs = await prisma.categoriesOnBlogs.delete({
     *   where: {
     *     // ... filter to delete one CategoriesOnBlogs
     *   }
     * })
     * 
     */
    delete<T extends CategoriesOnBlogsDeleteArgs>(args: SelectSubset<T, CategoriesOnBlogsDeleteArgs<ExtArgs>>): Prisma__CategoriesOnBlogsClient<$Result.GetResult<Prisma.$CategoriesOnBlogsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CategoriesOnBlogs.
     * @param {CategoriesOnBlogsUpdateArgs} args - Arguments to update one CategoriesOnBlogs.
     * @example
     * // Update one CategoriesOnBlogs
     * const categoriesOnBlogs = await prisma.categoriesOnBlogs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoriesOnBlogsUpdateArgs>(args: SelectSubset<T, CategoriesOnBlogsUpdateArgs<ExtArgs>>): Prisma__CategoriesOnBlogsClient<$Result.GetResult<Prisma.$CategoriesOnBlogsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CategoriesOnBlogs.
     * @param {CategoriesOnBlogsDeleteManyArgs} args - Arguments to filter CategoriesOnBlogs to delete.
     * @example
     * // Delete a few CategoriesOnBlogs
     * const { count } = await prisma.categoriesOnBlogs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoriesOnBlogsDeleteManyArgs>(args?: SelectSubset<T, CategoriesOnBlogsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategoriesOnBlogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnBlogsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CategoriesOnBlogs
     * const categoriesOnBlogs = await prisma.categoriesOnBlogs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoriesOnBlogsUpdateManyArgs>(args: SelectSubset<T, CategoriesOnBlogsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CategoriesOnBlogs.
     * @param {CategoriesOnBlogsUpsertArgs} args - Arguments to update or create a CategoriesOnBlogs.
     * @example
     * // Update or create a CategoriesOnBlogs
     * const categoriesOnBlogs = await prisma.categoriesOnBlogs.upsert({
     *   create: {
     *     // ... data to create a CategoriesOnBlogs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CategoriesOnBlogs we want to update
     *   }
     * })
     */
    upsert<T extends CategoriesOnBlogsUpsertArgs>(args: SelectSubset<T, CategoriesOnBlogsUpsertArgs<ExtArgs>>): Prisma__CategoriesOnBlogsClient<$Result.GetResult<Prisma.$CategoriesOnBlogsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more CategoriesOnBlogs that matches the filter.
     * @param {CategoriesOnBlogsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const categoriesOnBlogs = await prisma.categoriesOnBlogs.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: CategoriesOnBlogsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a CategoriesOnBlogs.
     * @param {CategoriesOnBlogsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const categoriesOnBlogs = await prisma.categoriesOnBlogs.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CategoriesOnBlogsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of CategoriesOnBlogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnBlogsCountArgs} args - Arguments to filter CategoriesOnBlogs to count.
     * @example
     * // Count the number of CategoriesOnBlogs
     * const count = await prisma.categoriesOnBlogs.count({
     *   where: {
     *     // ... the filter for the CategoriesOnBlogs we want to count
     *   }
     * })
    **/
    count<T extends CategoriesOnBlogsCountArgs>(
      args?: Subset<T, CategoriesOnBlogsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriesOnBlogsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CategoriesOnBlogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnBlogsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriesOnBlogsAggregateArgs>(args: Subset<T, CategoriesOnBlogsAggregateArgs>): Prisma.PrismaPromise<GetCategoriesOnBlogsAggregateType<T>>

    /**
     * Group by CategoriesOnBlogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnBlogsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoriesOnBlogsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriesOnBlogsGroupByArgs['orderBy'] }
        : { orderBy?: CategoriesOnBlogsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoriesOnBlogsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriesOnBlogsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CategoriesOnBlogs model
   */
  readonly fields: CategoriesOnBlogsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CategoriesOnBlogs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriesOnBlogsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    blog<T extends BlogDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BlogDefaultArgs<ExtArgs>>): Prisma__BlogClient<$Result.GetResult<Prisma.$BlogPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CategoriesOnBlogs model
   */ 
  interface CategoriesOnBlogsFieldRefs {
    readonly id: FieldRef<"CategoriesOnBlogs", 'String'>
    readonly blogId: FieldRef<"CategoriesOnBlogs", 'String'>
    readonly categoryId: FieldRef<"CategoriesOnBlogs", 'String'>
    readonly assignedAt: FieldRef<"CategoriesOnBlogs", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CategoriesOnBlogs findUnique
   */
  export type CategoriesOnBlogsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnBlogs
     */
    select?: CategoriesOnBlogsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnBlogsInclude<ExtArgs> | null
    /**
     * Filter, which CategoriesOnBlogs to fetch.
     */
    where: CategoriesOnBlogsWhereUniqueInput
  }

  /**
   * CategoriesOnBlogs findUniqueOrThrow
   */
  export type CategoriesOnBlogsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnBlogs
     */
    select?: CategoriesOnBlogsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnBlogsInclude<ExtArgs> | null
    /**
     * Filter, which CategoriesOnBlogs to fetch.
     */
    where: CategoriesOnBlogsWhereUniqueInput
  }

  /**
   * CategoriesOnBlogs findFirst
   */
  export type CategoriesOnBlogsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnBlogs
     */
    select?: CategoriesOnBlogsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnBlogsInclude<ExtArgs> | null
    /**
     * Filter, which CategoriesOnBlogs to fetch.
     */
    where?: CategoriesOnBlogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoriesOnBlogs to fetch.
     */
    orderBy?: CategoriesOnBlogsOrderByWithRelationInput | CategoriesOnBlogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoriesOnBlogs.
     */
    cursor?: CategoriesOnBlogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoriesOnBlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoriesOnBlogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoriesOnBlogs.
     */
    distinct?: CategoriesOnBlogsScalarFieldEnum | CategoriesOnBlogsScalarFieldEnum[]
  }

  /**
   * CategoriesOnBlogs findFirstOrThrow
   */
  export type CategoriesOnBlogsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnBlogs
     */
    select?: CategoriesOnBlogsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnBlogsInclude<ExtArgs> | null
    /**
     * Filter, which CategoriesOnBlogs to fetch.
     */
    where?: CategoriesOnBlogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoriesOnBlogs to fetch.
     */
    orderBy?: CategoriesOnBlogsOrderByWithRelationInput | CategoriesOnBlogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoriesOnBlogs.
     */
    cursor?: CategoriesOnBlogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoriesOnBlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoriesOnBlogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoriesOnBlogs.
     */
    distinct?: CategoriesOnBlogsScalarFieldEnum | CategoriesOnBlogsScalarFieldEnum[]
  }

  /**
   * CategoriesOnBlogs findMany
   */
  export type CategoriesOnBlogsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnBlogs
     */
    select?: CategoriesOnBlogsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnBlogsInclude<ExtArgs> | null
    /**
     * Filter, which CategoriesOnBlogs to fetch.
     */
    where?: CategoriesOnBlogsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoriesOnBlogs to fetch.
     */
    orderBy?: CategoriesOnBlogsOrderByWithRelationInput | CategoriesOnBlogsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CategoriesOnBlogs.
     */
    cursor?: CategoriesOnBlogsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoriesOnBlogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoriesOnBlogs.
     */
    skip?: number
    distinct?: CategoriesOnBlogsScalarFieldEnum | CategoriesOnBlogsScalarFieldEnum[]
  }

  /**
   * CategoriesOnBlogs create
   */
  export type CategoriesOnBlogsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnBlogs
     */
    select?: CategoriesOnBlogsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnBlogsInclude<ExtArgs> | null
    /**
     * The data needed to create a CategoriesOnBlogs.
     */
    data: XOR<CategoriesOnBlogsCreateInput, CategoriesOnBlogsUncheckedCreateInput>
  }

  /**
   * CategoriesOnBlogs createMany
   */
  export type CategoriesOnBlogsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CategoriesOnBlogs.
     */
    data: CategoriesOnBlogsCreateManyInput | CategoriesOnBlogsCreateManyInput[]
  }

  /**
   * CategoriesOnBlogs update
   */
  export type CategoriesOnBlogsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnBlogs
     */
    select?: CategoriesOnBlogsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnBlogsInclude<ExtArgs> | null
    /**
     * The data needed to update a CategoriesOnBlogs.
     */
    data: XOR<CategoriesOnBlogsUpdateInput, CategoriesOnBlogsUncheckedUpdateInput>
    /**
     * Choose, which CategoriesOnBlogs to update.
     */
    where: CategoriesOnBlogsWhereUniqueInput
  }

  /**
   * CategoriesOnBlogs updateMany
   */
  export type CategoriesOnBlogsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CategoriesOnBlogs.
     */
    data: XOR<CategoriesOnBlogsUpdateManyMutationInput, CategoriesOnBlogsUncheckedUpdateManyInput>
    /**
     * Filter which CategoriesOnBlogs to update
     */
    where?: CategoriesOnBlogsWhereInput
  }

  /**
   * CategoriesOnBlogs upsert
   */
  export type CategoriesOnBlogsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnBlogs
     */
    select?: CategoriesOnBlogsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnBlogsInclude<ExtArgs> | null
    /**
     * The filter to search for the CategoriesOnBlogs to update in case it exists.
     */
    where: CategoriesOnBlogsWhereUniqueInput
    /**
     * In case the CategoriesOnBlogs found by the `where` argument doesn't exist, create a new CategoriesOnBlogs with this data.
     */
    create: XOR<CategoriesOnBlogsCreateInput, CategoriesOnBlogsUncheckedCreateInput>
    /**
     * In case the CategoriesOnBlogs was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriesOnBlogsUpdateInput, CategoriesOnBlogsUncheckedUpdateInput>
  }

  /**
   * CategoriesOnBlogs delete
   */
  export type CategoriesOnBlogsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnBlogs
     */
    select?: CategoriesOnBlogsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnBlogsInclude<ExtArgs> | null
    /**
     * Filter which CategoriesOnBlogs to delete.
     */
    where: CategoriesOnBlogsWhereUniqueInput
  }

  /**
   * CategoriesOnBlogs deleteMany
   */
  export type CategoriesOnBlogsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoriesOnBlogs to delete
     */
    where?: CategoriesOnBlogsWhereInput
  }

  /**
   * CategoriesOnBlogs findRaw
   */
  export type CategoriesOnBlogsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CategoriesOnBlogs aggregateRaw
   */
  export type CategoriesOnBlogsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CategoriesOnBlogs without action
   */
  export type CategoriesOnBlogsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnBlogs
     */
    select?: CategoriesOnBlogsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnBlogsInclude<ExtArgs> | null
  }


  /**
   * Model CategoriesOnProducts
   */

  export type AggregateCategoriesOnProducts = {
    _count: CategoriesOnProductsCountAggregateOutputType | null
    _min: CategoriesOnProductsMinAggregateOutputType | null
    _max: CategoriesOnProductsMaxAggregateOutputType | null
  }

  export type CategoriesOnProductsMinAggregateOutputType = {
    id: string | null
    productId: string | null
    categoryId: string | null
    assignedAt: Date | null
  }

  export type CategoriesOnProductsMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    categoryId: string | null
    assignedAt: Date | null
  }

  export type CategoriesOnProductsCountAggregateOutputType = {
    id: number
    productId: number
    categoryId: number
    assignedAt: number
    _all: number
  }


  export type CategoriesOnProductsMinAggregateInputType = {
    id?: true
    productId?: true
    categoryId?: true
    assignedAt?: true
  }

  export type CategoriesOnProductsMaxAggregateInputType = {
    id?: true
    productId?: true
    categoryId?: true
    assignedAt?: true
  }

  export type CategoriesOnProductsCountAggregateInputType = {
    id?: true
    productId?: true
    categoryId?: true
    assignedAt?: true
    _all?: true
  }

  export type CategoriesOnProductsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoriesOnProducts to aggregate.
     */
    where?: CategoriesOnProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoriesOnProducts to fetch.
     */
    orderBy?: CategoriesOnProductsOrderByWithRelationInput | CategoriesOnProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoriesOnProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoriesOnProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoriesOnProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CategoriesOnProducts
    **/
    _count?: true | CategoriesOnProductsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoriesOnProductsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoriesOnProductsMaxAggregateInputType
  }

  export type GetCategoriesOnProductsAggregateType<T extends CategoriesOnProductsAggregateArgs> = {
        [P in keyof T & keyof AggregateCategoriesOnProducts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategoriesOnProducts[P]>
      : GetScalarType<T[P], AggregateCategoriesOnProducts[P]>
  }




  export type CategoriesOnProductsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoriesOnProductsWhereInput
    orderBy?: CategoriesOnProductsOrderByWithAggregationInput | CategoriesOnProductsOrderByWithAggregationInput[]
    by: CategoriesOnProductsScalarFieldEnum[] | CategoriesOnProductsScalarFieldEnum
    having?: CategoriesOnProductsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoriesOnProductsCountAggregateInputType | true
    _min?: CategoriesOnProductsMinAggregateInputType
    _max?: CategoriesOnProductsMaxAggregateInputType
  }

  export type CategoriesOnProductsGroupByOutputType = {
    id: string
    productId: string
    categoryId: string
    assignedAt: Date
    _count: CategoriesOnProductsCountAggregateOutputType | null
    _min: CategoriesOnProductsMinAggregateOutputType | null
    _max: CategoriesOnProductsMaxAggregateOutputType | null
  }

  type GetCategoriesOnProductsGroupByPayload<T extends CategoriesOnProductsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoriesOnProductsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoriesOnProductsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoriesOnProductsGroupByOutputType[P]>
            : GetScalarType<T[P], CategoriesOnProductsGroupByOutputType[P]>
        }
      >
    >


  export type CategoriesOnProductsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    categoryId?: boolean
    assignedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["categoriesOnProducts"]>


  export type CategoriesOnProductsSelectScalar = {
    id?: boolean
    productId?: boolean
    categoryId?: boolean
    assignedAt?: boolean
  }

  export type CategoriesOnProductsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $CategoriesOnProductsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CategoriesOnProducts"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      categoryId: string
      assignedAt: Date
    }, ExtArgs["result"]["categoriesOnProducts"]>
    composites: {}
  }

  type CategoriesOnProductsGetPayload<S extends boolean | null | undefined | CategoriesOnProductsDefaultArgs> = $Result.GetResult<Prisma.$CategoriesOnProductsPayload, S>

  type CategoriesOnProductsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CategoriesOnProductsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CategoriesOnProductsCountAggregateInputType | true
    }

  export interface CategoriesOnProductsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CategoriesOnProducts'], meta: { name: 'CategoriesOnProducts' } }
    /**
     * Find zero or one CategoriesOnProducts that matches the filter.
     * @param {CategoriesOnProductsFindUniqueArgs} args - Arguments to find a CategoriesOnProducts
     * @example
     * // Get one CategoriesOnProducts
     * const categoriesOnProducts = await prisma.categoriesOnProducts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoriesOnProductsFindUniqueArgs>(args: SelectSubset<T, CategoriesOnProductsFindUniqueArgs<ExtArgs>>): Prisma__CategoriesOnProductsClient<$Result.GetResult<Prisma.$CategoriesOnProductsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CategoriesOnProducts that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CategoriesOnProductsFindUniqueOrThrowArgs} args - Arguments to find a CategoriesOnProducts
     * @example
     * // Get one CategoriesOnProducts
     * const categoriesOnProducts = await prisma.categoriesOnProducts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoriesOnProductsFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoriesOnProductsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoriesOnProductsClient<$Result.GetResult<Prisma.$CategoriesOnProductsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CategoriesOnProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnProductsFindFirstArgs} args - Arguments to find a CategoriesOnProducts
     * @example
     * // Get one CategoriesOnProducts
     * const categoriesOnProducts = await prisma.categoriesOnProducts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoriesOnProductsFindFirstArgs>(args?: SelectSubset<T, CategoriesOnProductsFindFirstArgs<ExtArgs>>): Prisma__CategoriesOnProductsClient<$Result.GetResult<Prisma.$CategoriesOnProductsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CategoriesOnProducts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnProductsFindFirstOrThrowArgs} args - Arguments to find a CategoriesOnProducts
     * @example
     * // Get one CategoriesOnProducts
     * const categoriesOnProducts = await prisma.categoriesOnProducts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoriesOnProductsFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoriesOnProductsFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoriesOnProductsClient<$Result.GetResult<Prisma.$CategoriesOnProductsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CategoriesOnProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnProductsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CategoriesOnProducts
     * const categoriesOnProducts = await prisma.categoriesOnProducts.findMany()
     * 
     * // Get first 10 CategoriesOnProducts
     * const categoriesOnProducts = await prisma.categoriesOnProducts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoriesOnProductsWithIdOnly = await prisma.categoriesOnProducts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoriesOnProductsFindManyArgs>(args?: SelectSubset<T, CategoriesOnProductsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoriesOnProductsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CategoriesOnProducts.
     * @param {CategoriesOnProductsCreateArgs} args - Arguments to create a CategoriesOnProducts.
     * @example
     * // Create one CategoriesOnProducts
     * const CategoriesOnProducts = await prisma.categoriesOnProducts.create({
     *   data: {
     *     // ... data to create a CategoriesOnProducts
     *   }
     * })
     * 
     */
    create<T extends CategoriesOnProductsCreateArgs>(args: SelectSubset<T, CategoriesOnProductsCreateArgs<ExtArgs>>): Prisma__CategoriesOnProductsClient<$Result.GetResult<Prisma.$CategoriesOnProductsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CategoriesOnProducts.
     * @param {CategoriesOnProductsCreateManyArgs} args - Arguments to create many CategoriesOnProducts.
     * @example
     * // Create many CategoriesOnProducts
     * const categoriesOnProducts = await prisma.categoriesOnProducts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoriesOnProductsCreateManyArgs>(args?: SelectSubset<T, CategoriesOnProductsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a CategoriesOnProducts.
     * @param {CategoriesOnProductsDeleteArgs} args - Arguments to delete one CategoriesOnProducts.
     * @example
     * // Delete one CategoriesOnProducts
     * const CategoriesOnProducts = await prisma.categoriesOnProducts.delete({
     *   where: {
     *     // ... filter to delete one CategoriesOnProducts
     *   }
     * })
     * 
     */
    delete<T extends CategoriesOnProductsDeleteArgs>(args: SelectSubset<T, CategoriesOnProductsDeleteArgs<ExtArgs>>): Prisma__CategoriesOnProductsClient<$Result.GetResult<Prisma.$CategoriesOnProductsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CategoriesOnProducts.
     * @param {CategoriesOnProductsUpdateArgs} args - Arguments to update one CategoriesOnProducts.
     * @example
     * // Update one CategoriesOnProducts
     * const categoriesOnProducts = await prisma.categoriesOnProducts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoriesOnProductsUpdateArgs>(args: SelectSubset<T, CategoriesOnProductsUpdateArgs<ExtArgs>>): Prisma__CategoriesOnProductsClient<$Result.GetResult<Prisma.$CategoriesOnProductsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CategoriesOnProducts.
     * @param {CategoriesOnProductsDeleteManyArgs} args - Arguments to filter CategoriesOnProducts to delete.
     * @example
     * // Delete a few CategoriesOnProducts
     * const { count } = await prisma.categoriesOnProducts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoriesOnProductsDeleteManyArgs>(args?: SelectSubset<T, CategoriesOnProductsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CategoriesOnProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnProductsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CategoriesOnProducts
     * const categoriesOnProducts = await prisma.categoriesOnProducts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoriesOnProductsUpdateManyArgs>(args: SelectSubset<T, CategoriesOnProductsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CategoriesOnProducts.
     * @param {CategoriesOnProductsUpsertArgs} args - Arguments to update or create a CategoriesOnProducts.
     * @example
     * // Update or create a CategoriesOnProducts
     * const categoriesOnProducts = await prisma.categoriesOnProducts.upsert({
     *   create: {
     *     // ... data to create a CategoriesOnProducts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CategoriesOnProducts we want to update
     *   }
     * })
     */
    upsert<T extends CategoriesOnProductsUpsertArgs>(args: SelectSubset<T, CategoriesOnProductsUpsertArgs<ExtArgs>>): Prisma__CategoriesOnProductsClient<$Result.GetResult<Prisma.$CategoriesOnProductsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more CategoriesOnProducts that matches the filter.
     * @param {CategoriesOnProductsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const categoriesOnProducts = await prisma.categoriesOnProducts.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: CategoriesOnProductsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a CategoriesOnProducts.
     * @param {CategoriesOnProductsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const categoriesOnProducts = await prisma.categoriesOnProducts.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: CategoriesOnProductsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of CategoriesOnProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnProductsCountArgs} args - Arguments to filter CategoriesOnProducts to count.
     * @example
     * // Count the number of CategoriesOnProducts
     * const count = await prisma.categoriesOnProducts.count({
     *   where: {
     *     // ... the filter for the CategoriesOnProducts we want to count
     *   }
     * })
    **/
    count<T extends CategoriesOnProductsCountArgs>(
      args?: Subset<T, CategoriesOnProductsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoriesOnProductsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CategoriesOnProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnProductsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoriesOnProductsAggregateArgs>(args: Subset<T, CategoriesOnProductsAggregateArgs>): Prisma.PrismaPromise<GetCategoriesOnProductsAggregateType<T>>

    /**
     * Group by CategoriesOnProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoriesOnProductsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoriesOnProductsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoriesOnProductsGroupByArgs['orderBy'] }
        : { orderBy?: CategoriesOnProductsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoriesOnProductsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoriesOnProductsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CategoriesOnProducts model
   */
  readonly fields: CategoriesOnProductsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CategoriesOnProducts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoriesOnProductsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CategoriesOnProducts model
   */ 
  interface CategoriesOnProductsFieldRefs {
    readonly id: FieldRef<"CategoriesOnProducts", 'String'>
    readonly productId: FieldRef<"CategoriesOnProducts", 'String'>
    readonly categoryId: FieldRef<"CategoriesOnProducts", 'String'>
    readonly assignedAt: FieldRef<"CategoriesOnProducts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CategoriesOnProducts findUnique
   */
  export type CategoriesOnProductsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnProducts
     */
    select?: CategoriesOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnProductsInclude<ExtArgs> | null
    /**
     * Filter, which CategoriesOnProducts to fetch.
     */
    where: CategoriesOnProductsWhereUniqueInput
  }

  /**
   * CategoriesOnProducts findUniqueOrThrow
   */
  export type CategoriesOnProductsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnProducts
     */
    select?: CategoriesOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnProductsInclude<ExtArgs> | null
    /**
     * Filter, which CategoriesOnProducts to fetch.
     */
    where: CategoriesOnProductsWhereUniqueInput
  }

  /**
   * CategoriesOnProducts findFirst
   */
  export type CategoriesOnProductsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnProducts
     */
    select?: CategoriesOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnProductsInclude<ExtArgs> | null
    /**
     * Filter, which CategoriesOnProducts to fetch.
     */
    where?: CategoriesOnProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoriesOnProducts to fetch.
     */
    orderBy?: CategoriesOnProductsOrderByWithRelationInput | CategoriesOnProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoriesOnProducts.
     */
    cursor?: CategoriesOnProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoriesOnProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoriesOnProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoriesOnProducts.
     */
    distinct?: CategoriesOnProductsScalarFieldEnum | CategoriesOnProductsScalarFieldEnum[]
  }

  /**
   * CategoriesOnProducts findFirstOrThrow
   */
  export type CategoriesOnProductsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnProducts
     */
    select?: CategoriesOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnProductsInclude<ExtArgs> | null
    /**
     * Filter, which CategoriesOnProducts to fetch.
     */
    where?: CategoriesOnProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoriesOnProducts to fetch.
     */
    orderBy?: CategoriesOnProductsOrderByWithRelationInput | CategoriesOnProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CategoriesOnProducts.
     */
    cursor?: CategoriesOnProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoriesOnProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoriesOnProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CategoriesOnProducts.
     */
    distinct?: CategoriesOnProductsScalarFieldEnum | CategoriesOnProductsScalarFieldEnum[]
  }

  /**
   * CategoriesOnProducts findMany
   */
  export type CategoriesOnProductsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnProducts
     */
    select?: CategoriesOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnProductsInclude<ExtArgs> | null
    /**
     * Filter, which CategoriesOnProducts to fetch.
     */
    where?: CategoriesOnProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CategoriesOnProducts to fetch.
     */
    orderBy?: CategoriesOnProductsOrderByWithRelationInput | CategoriesOnProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CategoriesOnProducts.
     */
    cursor?: CategoriesOnProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CategoriesOnProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CategoriesOnProducts.
     */
    skip?: number
    distinct?: CategoriesOnProductsScalarFieldEnum | CategoriesOnProductsScalarFieldEnum[]
  }

  /**
   * CategoriesOnProducts create
   */
  export type CategoriesOnProductsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnProducts
     */
    select?: CategoriesOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnProductsInclude<ExtArgs> | null
    /**
     * The data needed to create a CategoriesOnProducts.
     */
    data: XOR<CategoriesOnProductsCreateInput, CategoriesOnProductsUncheckedCreateInput>
  }

  /**
   * CategoriesOnProducts createMany
   */
  export type CategoriesOnProductsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CategoriesOnProducts.
     */
    data: CategoriesOnProductsCreateManyInput | CategoriesOnProductsCreateManyInput[]
  }

  /**
   * CategoriesOnProducts update
   */
  export type CategoriesOnProductsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnProducts
     */
    select?: CategoriesOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnProductsInclude<ExtArgs> | null
    /**
     * The data needed to update a CategoriesOnProducts.
     */
    data: XOR<CategoriesOnProductsUpdateInput, CategoriesOnProductsUncheckedUpdateInput>
    /**
     * Choose, which CategoriesOnProducts to update.
     */
    where: CategoriesOnProductsWhereUniqueInput
  }

  /**
   * CategoriesOnProducts updateMany
   */
  export type CategoriesOnProductsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CategoriesOnProducts.
     */
    data: XOR<CategoriesOnProductsUpdateManyMutationInput, CategoriesOnProductsUncheckedUpdateManyInput>
    /**
     * Filter which CategoriesOnProducts to update
     */
    where?: CategoriesOnProductsWhereInput
  }

  /**
   * CategoriesOnProducts upsert
   */
  export type CategoriesOnProductsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnProducts
     */
    select?: CategoriesOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnProductsInclude<ExtArgs> | null
    /**
     * The filter to search for the CategoriesOnProducts to update in case it exists.
     */
    where: CategoriesOnProductsWhereUniqueInput
    /**
     * In case the CategoriesOnProducts found by the `where` argument doesn't exist, create a new CategoriesOnProducts with this data.
     */
    create: XOR<CategoriesOnProductsCreateInput, CategoriesOnProductsUncheckedCreateInput>
    /**
     * In case the CategoriesOnProducts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoriesOnProductsUpdateInput, CategoriesOnProductsUncheckedUpdateInput>
  }

  /**
   * CategoriesOnProducts delete
   */
  export type CategoriesOnProductsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnProducts
     */
    select?: CategoriesOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnProductsInclude<ExtArgs> | null
    /**
     * Filter which CategoriesOnProducts to delete.
     */
    where: CategoriesOnProductsWhereUniqueInput
  }

  /**
   * CategoriesOnProducts deleteMany
   */
  export type CategoriesOnProductsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CategoriesOnProducts to delete
     */
    where?: CategoriesOnProductsWhereInput
  }

  /**
   * CategoriesOnProducts findRaw
   */
  export type CategoriesOnProductsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CategoriesOnProducts aggregateRaw
   */
  export type CategoriesOnProductsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * CategoriesOnProducts without action
   */
  export type CategoriesOnProductsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoriesOnProducts
     */
    select?: CategoriesOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoriesOnProductsInclude<ExtArgs> | null
  }


  /**
   * Model MediasOnProducts
   */

  export type AggregateMediasOnProducts = {
    _count: MediasOnProductsCountAggregateOutputType | null
    _min: MediasOnProductsMinAggregateOutputType | null
    _max: MediasOnProductsMaxAggregateOutputType | null
  }

  export type MediasOnProductsMinAggregateOutputType = {
    id: string | null
    productId: string | null
    mediaId: string | null
    assignedAt: Date | null
  }

  export type MediasOnProductsMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    mediaId: string | null
    assignedAt: Date | null
  }

  export type MediasOnProductsCountAggregateOutputType = {
    id: number
    productId: number
    mediaId: number
    assignedAt: number
    _all: number
  }


  export type MediasOnProductsMinAggregateInputType = {
    id?: true
    productId?: true
    mediaId?: true
    assignedAt?: true
  }

  export type MediasOnProductsMaxAggregateInputType = {
    id?: true
    productId?: true
    mediaId?: true
    assignedAt?: true
  }

  export type MediasOnProductsCountAggregateInputType = {
    id?: true
    productId?: true
    mediaId?: true
    assignedAt?: true
    _all?: true
  }

  export type MediasOnProductsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediasOnProducts to aggregate.
     */
    where?: MediasOnProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediasOnProducts to fetch.
     */
    orderBy?: MediasOnProductsOrderByWithRelationInput | MediasOnProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediasOnProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediasOnProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediasOnProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediasOnProducts
    **/
    _count?: true | MediasOnProductsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediasOnProductsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediasOnProductsMaxAggregateInputType
  }

  export type GetMediasOnProductsAggregateType<T extends MediasOnProductsAggregateArgs> = {
        [P in keyof T & keyof AggregateMediasOnProducts]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediasOnProducts[P]>
      : GetScalarType<T[P], AggregateMediasOnProducts[P]>
  }




  export type MediasOnProductsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediasOnProductsWhereInput
    orderBy?: MediasOnProductsOrderByWithAggregationInput | MediasOnProductsOrderByWithAggregationInput[]
    by: MediasOnProductsScalarFieldEnum[] | MediasOnProductsScalarFieldEnum
    having?: MediasOnProductsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediasOnProductsCountAggregateInputType | true
    _min?: MediasOnProductsMinAggregateInputType
    _max?: MediasOnProductsMaxAggregateInputType
  }

  export type MediasOnProductsGroupByOutputType = {
    id: string
    productId: string
    mediaId: string
    assignedAt: Date
    _count: MediasOnProductsCountAggregateOutputType | null
    _min: MediasOnProductsMinAggregateOutputType | null
    _max: MediasOnProductsMaxAggregateOutputType | null
  }

  type GetMediasOnProductsGroupByPayload<T extends MediasOnProductsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediasOnProductsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediasOnProductsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediasOnProductsGroupByOutputType[P]>
            : GetScalarType<T[P], MediasOnProductsGroupByOutputType[P]>
        }
      >
    >


  export type MediasOnProductsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    mediaId?: boolean
    assignedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    media?: boolean | MediaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mediasOnProducts"]>


  export type MediasOnProductsSelectScalar = {
    id?: boolean
    productId?: boolean
    mediaId?: boolean
    assignedAt?: boolean
  }

  export type MediasOnProductsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    media?: boolean | MediaDefaultArgs<ExtArgs>
  }

  export type $MediasOnProductsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediasOnProducts"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      media: Prisma.$MediaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      mediaId: string
      assignedAt: Date
    }, ExtArgs["result"]["mediasOnProducts"]>
    composites: {}
  }

  type MediasOnProductsGetPayload<S extends boolean | null | undefined | MediasOnProductsDefaultArgs> = $Result.GetResult<Prisma.$MediasOnProductsPayload, S>

  type MediasOnProductsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MediasOnProductsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MediasOnProductsCountAggregateInputType | true
    }

  export interface MediasOnProductsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediasOnProducts'], meta: { name: 'MediasOnProducts' } }
    /**
     * Find zero or one MediasOnProducts that matches the filter.
     * @param {MediasOnProductsFindUniqueArgs} args - Arguments to find a MediasOnProducts
     * @example
     * // Get one MediasOnProducts
     * const mediasOnProducts = await prisma.mediasOnProducts.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediasOnProductsFindUniqueArgs>(args: SelectSubset<T, MediasOnProductsFindUniqueArgs<ExtArgs>>): Prisma__MediasOnProductsClient<$Result.GetResult<Prisma.$MediasOnProductsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MediasOnProducts that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MediasOnProductsFindUniqueOrThrowArgs} args - Arguments to find a MediasOnProducts
     * @example
     * // Get one MediasOnProducts
     * const mediasOnProducts = await prisma.mediasOnProducts.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediasOnProductsFindUniqueOrThrowArgs>(args: SelectSubset<T, MediasOnProductsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediasOnProductsClient<$Result.GetResult<Prisma.$MediasOnProductsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MediasOnProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediasOnProductsFindFirstArgs} args - Arguments to find a MediasOnProducts
     * @example
     * // Get one MediasOnProducts
     * const mediasOnProducts = await prisma.mediasOnProducts.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediasOnProductsFindFirstArgs>(args?: SelectSubset<T, MediasOnProductsFindFirstArgs<ExtArgs>>): Prisma__MediasOnProductsClient<$Result.GetResult<Prisma.$MediasOnProductsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MediasOnProducts that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediasOnProductsFindFirstOrThrowArgs} args - Arguments to find a MediasOnProducts
     * @example
     * // Get one MediasOnProducts
     * const mediasOnProducts = await prisma.mediasOnProducts.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediasOnProductsFindFirstOrThrowArgs>(args?: SelectSubset<T, MediasOnProductsFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediasOnProductsClient<$Result.GetResult<Prisma.$MediasOnProductsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MediasOnProducts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediasOnProductsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediasOnProducts
     * const mediasOnProducts = await prisma.mediasOnProducts.findMany()
     * 
     * // Get first 10 MediasOnProducts
     * const mediasOnProducts = await prisma.mediasOnProducts.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediasOnProductsWithIdOnly = await prisma.mediasOnProducts.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediasOnProductsFindManyArgs>(args?: SelectSubset<T, MediasOnProductsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediasOnProductsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MediasOnProducts.
     * @param {MediasOnProductsCreateArgs} args - Arguments to create a MediasOnProducts.
     * @example
     * // Create one MediasOnProducts
     * const MediasOnProducts = await prisma.mediasOnProducts.create({
     *   data: {
     *     // ... data to create a MediasOnProducts
     *   }
     * })
     * 
     */
    create<T extends MediasOnProductsCreateArgs>(args: SelectSubset<T, MediasOnProductsCreateArgs<ExtArgs>>): Prisma__MediasOnProductsClient<$Result.GetResult<Prisma.$MediasOnProductsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MediasOnProducts.
     * @param {MediasOnProductsCreateManyArgs} args - Arguments to create many MediasOnProducts.
     * @example
     * // Create many MediasOnProducts
     * const mediasOnProducts = await prisma.mediasOnProducts.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediasOnProductsCreateManyArgs>(args?: SelectSubset<T, MediasOnProductsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MediasOnProducts.
     * @param {MediasOnProductsDeleteArgs} args - Arguments to delete one MediasOnProducts.
     * @example
     * // Delete one MediasOnProducts
     * const MediasOnProducts = await prisma.mediasOnProducts.delete({
     *   where: {
     *     // ... filter to delete one MediasOnProducts
     *   }
     * })
     * 
     */
    delete<T extends MediasOnProductsDeleteArgs>(args: SelectSubset<T, MediasOnProductsDeleteArgs<ExtArgs>>): Prisma__MediasOnProductsClient<$Result.GetResult<Prisma.$MediasOnProductsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MediasOnProducts.
     * @param {MediasOnProductsUpdateArgs} args - Arguments to update one MediasOnProducts.
     * @example
     * // Update one MediasOnProducts
     * const mediasOnProducts = await prisma.mediasOnProducts.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediasOnProductsUpdateArgs>(args: SelectSubset<T, MediasOnProductsUpdateArgs<ExtArgs>>): Prisma__MediasOnProductsClient<$Result.GetResult<Prisma.$MediasOnProductsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MediasOnProducts.
     * @param {MediasOnProductsDeleteManyArgs} args - Arguments to filter MediasOnProducts to delete.
     * @example
     * // Delete a few MediasOnProducts
     * const { count } = await prisma.mediasOnProducts.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediasOnProductsDeleteManyArgs>(args?: SelectSubset<T, MediasOnProductsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediasOnProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediasOnProductsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediasOnProducts
     * const mediasOnProducts = await prisma.mediasOnProducts.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediasOnProductsUpdateManyArgs>(args: SelectSubset<T, MediasOnProductsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MediasOnProducts.
     * @param {MediasOnProductsUpsertArgs} args - Arguments to update or create a MediasOnProducts.
     * @example
     * // Update or create a MediasOnProducts
     * const mediasOnProducts = await prisma.mediasOnProducts.upsert({
     *   create: {
     *     // ... data to create a MediasOnProducts
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediasOnProducts we want to update
     *   }
     * })
     */
    upsert<T extends MediasOnProductsUpsertArgs>(args: SelectSubset<T, MediasOnProductsUpsertArgs<ExtArgs>>): Prisma__MediasOnProductsClient<$Result.GetResult<Prisma.$MediasOnProductsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more MediasOnProducts that matches the filter.
     * @param {MediasOnProductsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const mediasOnProducts = await prisma.mediasOnProducts.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: MediasOnProductsFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a MediasOnProducts.
     * @param {MediasOnProductsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const mediasOnProducts = await prisma.mediasOnProducts.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: MediasOnProductsAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of MediasOnProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediasOnProductsCountArgs} args - Arguments to filter MediasOnProducts to count.
     * @example
     * // Count the number of MediasOnProducts
     * const count = await prisma.mediasOnProducts.count({
     *   where: {
     *     // ... the filter for the MediasOnProducts we want to count
     *   }
     * })
    **/
    count<T extends MediasOnProductsCountArgs>(
      args?: Subset<T, MediasOnProductsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediasOnProductsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediasOnProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediasOnProductsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediasOnProductsAggregateArgs>(args: Subset<T, MediasOnProductsAggregateArgs>): Prisma.PrismaPromise<GetMediasOnProductsAggregateType<T>>

    /**
     * Group by MediasOnProducts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediasOnProductsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediasOnProductsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediasOnProductsGroupByArgs['orderBy'] }
        : { orderBy?: MediasOnProductsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediasOnProductsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediasOnProductsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediasOnProducts model
   */
  readonly fields: MediasOnProductsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediasOnProducts.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediasOnProductsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    media<T extends MediaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MediaDefaultArgs<ExtArgs>>): Prisma__MediaClient<$Result.GetResult<Prisma.$MediaPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MediasOnProducts model
   */ 
  interface MediasOnProductsFieldRefs {
    readonly id: FieldRef<"MediasOnProducts", 'String'>
    readonly productId: FieldRef<"MediasOnProducts", 'String'>
    readonly mediaId: FieldRef<"MediasOnProducts", 'String'>
    readonly assignedAt: FieldRef<"MediasOnProducts", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediasOnProducts findUnique
   */
  export type MediasOnProductsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediasOnProducts
     */
    select?: MediasOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediasOnProductsInclude<ExtArgs> | null
    /**
     * Filter, which MediasOnProducts to fetch.
     */
    where: MediasOnProductsWhereUniqueInput
  }

  /**
   * MediasOnProducts findUniqueOrThrow
   */
  export type MediasOnProductsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediasOnProducts
     */
    select?: MediasOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediasOnProductsInclude<ExtArgs> | null
    /**
     * Filter, which MediasOnProducts to fetch.
     */
    where: MediasOnProductsWhereUniqueInput
  }

  /**
   * MediasOnProducts findFirst
   */
  export type MediasOnProductsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediasOnProducts
     */
    select?: MediasOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediasOnProductsInclude<ExtArgs> | null
    /**
     * Filter, which MediasOnProducts to fetch.
     */
    where?: MediasOnProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediasOnProducts to fetch.
     */
    orderBy?: MediasOnProductsOrderByWithRelationInput | MediasOnProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediasOnProducts.
     */
    cursor?: MediasOnProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediasOnProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediasOnProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediasOnProducts.
     */
    distinct?: MediasOnProductsScalarFieldEnum | MediasOnProductsScalarFieldEnum[]
  }

  /**
   * MediasOnProducts findFirstOrThrow
   */
  export type MediasOnProductsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediasOnProducts
     */
    select?: MediasOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediasOnProductsInclude<ExtArgs> | null
    /**
     * Filter, which MediasOnProducts to fetch.
     */
    where?: MediasOnProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediasOnProducts to fetch.
     */
    orderBy?: MediasOnProductsOrderByWithRelationInput | MediasOnProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediasOnProducts.
     */
    cursor?: MediasOnProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediasOnProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediasOnProducts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediasOnProducts.
     */
    distinct?: MediasOnProductsScalarFieldEnum | MediasOnProductsScalarFieldEnum[]
  }

  /**
   * MediasOnProducts findMany
   */
  export type MediasOnProductsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediasOnProducts
     */
    select?: MediasOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediasOnProductsInclude<ExtArgs> | null
    /**
     * Filter, which MediasOnProducts to fetch.
     */
    where?: MediasOnProductsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediasOnProducts to fetch.
     */
    orderBy?: MediasOnProductsOrderByWithRelationInput | MediasOnProductsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediasOnProducts.
     */
    cursor?: MediasOnProductsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediasOnProducts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediasOnProducts.
     */
    skip?: number
    distinct?: MediasOnProductsScalarFieldEnum | MediasOnProductsScalarFieldEnum[]
  }

  /**
   * MediasOnProducts create
   */
  export type MediasOnProductsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediasOnProducts
     */
    select?: MediasOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediasOnProductsInclude<ExtArgs> | null
    /**
     * The data needed to create a MediasOnProducts.
     */
    data: XOR<MediasOnProductsCreateInput, MediasOnProductsUncheckedCreateInput>
  }

  /**
   * MediasOnProducts createMany
   */
  export type MediasOnProductsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediasOnProducts.
     */
    data: MediasOnProductsCreateManyInput | MediasOnProductsCreateManyInput[]
  }

  /**
   * MediasOnProducts update
   */
  export type MediasOnProductsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediasOnProducts
     */
    select?: MediasOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediasOnProductsInclude<ExtArgs> | null
    /**
     * The data needed to update a MediasOnProducts.
     */
    data: XOR<MediasOnProductsUpdateInput, MediasOnProductsUncheckedUpdateInput>
    /**
     * Choose, which MediasOnProducts to update.
     */
    where: MediasOnProductsWhereUniqueInput
  }

  /**
   * MediasOnProducts updateMany
   */
  export type MediasOnProductsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediasOnProducts.
     */
    data: XOR<MediasOnProductsUpdateManyMutationInput, MediasOnProductsUncheckedUpdateManyInput>
    /**
     * Filter which MediasOnProducts to update
     */
    where?: MediasOnProductsWhereInput
  }

  /**
   * MediasOnProducts upsert
   */
  export type MediasOnProductsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediasOnProducts
     */
    select?: MediasOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediasOnProductsInclude<ExtArgs> | null
    /**
     * The filter to search for the MediasOnProducts to update in case it exists.
     */
    where: MediasOnProductsWhereUniqueInput
    /**
     * In case the MediasOnProducts found by the `where` argument doesn't exist, create a new MediasOnProducts with this data.
     */
    create: XOR<MediasOnProductsCreateInput, MediasOnProductsUncheckedCreateInput>
    /**
     * In case the MediasOnProducts was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediasOnProductsUpdateInput, MediasOnProductsUncheckedUpdateInput>
  }

  /**
   * MediasOnProducts delete
   */
  export type MediasOnProductsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediasOnProducts
     */
    select?: MediasOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediasOnProductsInclude<ExtArgs> | null
    /**
     * Filter which MediasOnProducts to delete.
     */
    where: MediasOnProductsWhereUniqueInput
  }

  /**
   * MediasOnProducts deleteMany
   */
  export type MediasOnProductsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediasOnProducts to delete
     */
    where?: MediasOnProductsWhereInput
  }

  /**
   * MediasOnProducts findRaw
   */
  export type MediasOnProductsFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MediasOnProducts aggregateRaw
   */
  export type MediasOnProductsAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * MediasOnProducts without action
   */
  export type MediasOnProductsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediasOnProducts
     */
    select?: MediasOnProductsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediasOnProductsInclude<ExtArgs> | null
  }


  /**
   * Model Wishlist
   */

  export type AggregateWishlist = {
    _count: WishlistCountAggregateOutputType | null
    _min: WishlistMinAggregateOutputType | null
    _max: WishlistMaxAggregateOutputType | null
  }

  export type WishlistMinAggregateOutputType = {
    id: string | null
    productId: string | null
    userId: string | null
    assignedAt: Date | null
  }

  export type WishlistMaxAggregateOutputType = {
    id: string | null
    productId: string | null
    userId: string | null
    assignedAt: Date | null
  }

  export type WishlistCountAggregateOutputType = {
    id: number
    productId: number
    userId: number
    assignedAt: number
    _all: number
  }


  export type WishlistMinAggregateInputType = {
    id?: true
    productId?: true
    userId?: true
    assignedAt?: true
  }

  export type WishlistMaxAggregateInputType = {
    id?: true
    productId?: true
    userId?: true
    assignedAt?: true
  }

  export type WishlistCountAggregateInputType = {
    id?: true
    productId?: true
    userId?: true
    assignedAt?: true
    _all?: true
  }

  export type WishlistAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wishlist to aggregate.
     */
    where?: WishlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wishlists to fetch.
     */
    orderBy?: WishlistOrderByWithRelationInput | WishlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WishlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wishlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wishlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Wishlists
    **/
    _count?: true | WishlistCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WishlistMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WishlistMaxAggregateInputType
  }

  export type GetWishlistAggregateType<T extends WishlistAggregateArgs> = {
        [P in keyof T & keyof AggregateWishlist]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWishlist[P]>
      : GetScalarType<T[P], AggregateWishlist[P]>
  }




  export type WishlistGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WishlistWhereInput
    orderBy?: WishlistOrderByWithAggregationInput | WishlistOrderByWithAggregationInput[]
    by: WishlistScalarFieldEnum[] | WishlistScalarFieldEnum
    having?: WishlistScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WishlistCountAggregateInputType | true
    _min?: WishlistMinAggregateInputType
    _max?: WishlistMaxAggregateInputType
  }

  export type WishlistGroupByOutputType = {
    id: string
    productId: string
    userId: string
    assignedAt: Date
    _count: WishlistCountAggregateOutputType | null
    _min: WishlistMinAggregateOutputType | null
    _max: WishlistMaxAggregateOutputType | null
  }

  type GetWishlistGroupByPayload<T extends WishlistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WishlistGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WishlistGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WishlistGroupByOutputType[P]>
            : GetScalarType<T[P], WishlistGroupByOutputType[P]>
        }
      >
    >


  export type WishlistSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    productId?: boolean
    userId?: boolean
    assignedAt?: boolean
    product?: boolean | ProductDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wishlist"]>


  export type WishlistSelectScalar = {
    id?: boolean
    productId?: boolean
    userId?: boolean
    assignedAt?: boolean
  }

  export type WishlistInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    product?: boolean | ProductDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WishlistPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Wishlist"
    objects: {
      product: Prisma.$ProductPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      productId: string
      userId: string
      assignedAt: Date
    }, ExtArgs["result"]["wishlist"]>
    composites: {}
  }

  type WishlistGetPayload<S extends boolean | null | undefined | WishlistDefaultArgs> = $Result.GetResult<Prisma.$WishlistPayload, S>

  type WishlistCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WishlistFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WishlistCountAggregateInputType | true
    }

  export interface WishlistDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Wishlist'], meta: { name: 'Wishlist' } }
    /**
     * Find zero or one Wishlist that matches the filter.
     * @param {WishlistFindUniqueArgs} args - Arguments to find a Wishlist
     * @example
     * // Get one Wishlist
     * const wishlist = await prisma.wishlist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WishlistFindUniqueArgs>(args: SelectSubset<T, WishlistFindUniqueArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Wishlist that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WishlistFindUniqueOrThrowArgs} args - Arguments to find a Wishlist
     * @example
     * // Get one Wishlist
     * const wishlist = await prisma.wishlist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WishlistFindUniqueOrThrowArgs>(args: SelectSubset<T, WishlistFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Wishlist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistFindFirstArgs} args - Arguments to find a Wishlist
     * @example
     * // Get one Wishlist
     * const wishlist = await prisma.wishlist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WishlistFindFirstArgs>(args?: SelectSubset<T, WishlistFindFirstArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Wishlist that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistFindFirstOrThrowArgs} args - Arguments to find a Wishlist
     * @example
     * // Get one Wishlist
     * const wishlist = await prisma.wishlist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WishlistFindFirstOrThrowArgs>(args?: SelectSubset<T, WishlistFindFirstOrThrowArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Wishlists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Wishlists
     * const wishlists = await prisma.wishlist.findMany()
     * 
     * // Get first 10 Wishlists
     * const wishlists = await prisma.wishlist.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wishlistWithIdOnly = await prisma.wishlist.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WishlistFindManyArgs>(args?: SelectSubset<T, WishlistFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Wishlist.
     * @param {WishlistCreateArgs} args - Arguments to create a Wishlist.
     * @example
     * // Create one Wishlist
     * const Wishlist = await prisma.wishlist.create({
     *   data: {
     *     // ... data to create a Wishlist
     *   }
     * })
     * 
     */
    create<T extends WishlistCreateArgs>(args: SelectSubset<T, WishlistCreateArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Wishlists.
     * @param {WishlistCreateManyArgs} args - Arguments to create many Wishlists.
     * @example
     * // Create many Wishlists
     * const wishlist = await prisma.wishlist.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WishlistCreateManyArgs>(args?: SelectSubset<T, WishlistCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Wishlist.
     * @param {WishlistDeleteArgs} args - Arguments to delete one Wishlist.
     * @example
     * // Delete one Wishlist
     * const Wishlist = await prisma.wishlist.delete({
     *   where: {
     *     // ... filter to delete one Wishlist
     *   }
     * })
     * 
     */
    delete<T extends WishlistDeleteArgs>(args: SelectSubset<T, WishlistDeleteArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Wishlist.
     * @param {WishlistUpdateArgs} args - Arguments to update one Wishlist.
     * @example
     * // Update one Wishlist
     * const wishlist = await prisma.wishlist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WishlistUpdateArgs>(args: SelectSubset<T, WishlistUpdateArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Wishlists.
     * @param {WishlistDeleteManyArgs} args - Arguments to filter Wishlists to delete.
     * @example
     * // Delete a few Wishlists
     * const { count } = await prisma.wishlist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WishlistDeleteManyArgs>(args?: SelectSubset<T, WishlistDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Wishlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Wishlists
     * const wishlist = await prisma.wishlist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WishlistUpdateManyArgs>(args: SelectSubset<T, WishlistUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Wishlist.
     * @param {WishlistUpsertArgs} args - Arguments to update or create a Wishlist.
     * @example
     * // Update or create a Wishlist
     * const wishlist = await prisma.wishlist.upsert({
     *   create: {
     *     // ... data to create a Wishlist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Wishlist we want to update
     *   }
     * })
     */
    upsert<T extends WishlistUpsertArgs>(args: SelectSubset<T, WishlistUpsertArgs<ExtArgs>>): Prisma__WishlistClient<$Result.GetResult<Prisma.$WishlistPayload<ExtArgs>, T, "upsert">, never, ExtArgs>

    /**
     * Find zero or more Wishlists that matches the filter.
     * @param {WishlistFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const wishlist = await prisma.wishlist.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
     */
    findRaw(args?: WishlistFindRawArgs): Prisma.PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Wishlist.
     * @param {WishlistAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const wishlist = await prisma.wishlist.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
     */
    aggregateRaw(args?: WishlistAggregateRawArgs): Prisma.PrismaPromise<JsonObject>


    /**
     * Count the number of Wishlists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistCountArgs} args - Arguments to filter Wishlists to count.
     * @example
     * // Count the number of Wishlists
     * const count = await prisma.wishlist.count({
     *   where: {
     *     // ... the filter for the Wishlists we want to count
     *   }
     * })
    **/
    count<T extends WishlistCountArgs>(
      args?: Subset<T, WishlistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WishlistCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Wishlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WishlistAggregateArgs>(args: Subset<T, WishlistAggregateArgs>): Prisma.PrismaPromise<GetWishlistAggregateType<T>>

    /**
     * Group by Wishlist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WishlistGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WishlistGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WishlistGroupByArgs['orderBy'] }
        : { orderBy?: WishlistGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WishlistGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWishlistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Wishlist model
   */
  readonly fields: WishlistFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Wishlist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WishlistClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    product<T extends ProductDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProductDefaultArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Wishlist model
   */ 
  interface WishlistFieldRefs {
    readonly id: FieldRef<"Wishlist", 'String'>
    readonly productId: FieldRef<"Wishlist", 'String'>
    readonly userId: FieldRef<"Wishlist", 'String'>
    readonly assignedAt: FieldRef<"Wishlist", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Wishlist findUnique
   */
  export type WishlistFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * Filter, which Wishlist to fetch.
     */
    where: WishlistWhereUniqueInput
  }

  /**
   * Wishlist findUniqueOrThrow
   */
  export type WishlistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * Filter, which Wishlist to fetch.
     */
    where: WishlistWhereUniqueInput
  }

  /**
   * Wishlist findFirst
   */
  export type WishlistFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * Filter, which Wishlist to fetch.
     */
    where?: WishlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wishlists to fetch.
     */
    orderBy?: WishlistOrderByWithRelationInput | WishlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wishlists.
     */
    cursor?: WishlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wishlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wishlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wishlists.
     */
    distinct?: WishlistScalarFieldEnum | WishlistScalarFieldEnum[]
  }

  /**
   * Wishlist findFirstOrThrow
   */
  export type WishlistFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * Filter, which Wishlist to fetch.
     */
    where?: WishlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wishlists to fetch.
     */
    orderBy?: WishlistOrderByWithRelationInput | WishlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Wishlists.
     */
    cursor?: WishlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wishlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wishlists.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Wishlists.
     */
    distinct?: WishlistScalarFieldEnum | WishlistScalarFieldEnum[]
  }

  /**
   * Wishlist findMany
   */
  export type WishlistFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * Filter, which Wishlists to fetch.
     */
    where?: WishlistWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Wishlists to fetch.
     */
    orderBy?: WishlistOrderByWithRelationInput | WishlistOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Wishlists.
     */
    cursor?: WishlistWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Wishlists from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Wishlists.
     */
    skip?: number
    distinct?: WishlistScalarFieldEnum | WishlistScalarFieldEnum[]
  }

  /**
   * Wishlist create
   */
  export type WishlistCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * The data needed to create a Wishlist.
     */
    data: XOR<WishlistCreateInput, WishlistUncheckedCreateInput>
  }

  /**
   * Wishlist createMany
   */
  export type WishlistCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Wishlists.
     */
    data: WishlistCreateManyInput | WishlistCreateManyInput[]
  }

  /**
   * Wishlist update
   */
  export type WishlistUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * The data needed to update a Wishlist.
     */
    data: XOR<WishlistUpdateInput, WishlistUncheckedUpdateInput>
    /**
     * Choose, which Wishlist to update.
     */
    where: WishlistWhereUniqueInput
  }

  /**
   * Wishlist updateMany
   */
  export type WishlistUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Wishlists.
     */
    data: XOR<WishlistUpdateManyMutationInput, WishlistUncheckedUpdateManyInput>
    /**
     * Filter which Wishlists to update
     */
    where?: WishlistWhereInput
  }

  /**
   * Wishlist upsert
   */
  export type WishlistUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * The filter to search for the Wishlist to update in case it exists.
     */
    where: WishlistWhereUniqueInput
    /**
     * In case the Wishlist found by the `where` argument doesn't exist, create a new Wishlist with this data.
     */
    create: XOR<WishlistCreateInput, WishlistUncheckedCreateInput>
    /**
     * In case the Wishlist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WishlistUpdateInput, WishlistUncheckedUpdateInput>
  }

  /**
   * Wishlist delete
   */
  export type WishlistDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
    /**
     * Filter which Wishlist to delete.
     */
    where: WishlistWhereUniqueInput
  }

  /**
   * Wishlist deleteMany
   */
  export type WishlistDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Wishlists to delete
     */
    where?: WishlistWhereInput
  }

  /**
   * Wishlist findRaw
   */
  export type WishlistFindRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     */
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Wishlist aggregateRaw
   */
  export type WishlistAggregateRawArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     */
    pipeline?: InputJsonValue[]
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     */
    options?: InputJsonValue
  }

  /**
   * Wishlist without action
   */
  export type WishlistDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Wishlist
     */
    select?: WishlistSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WishlistInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const MediaScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    fileName: 'fileName',
    type: 'type',
    updatedAt: 'updatedAt',
    url: 'url',
    blurDataUrl: 'blurDataUrl',
    creatorId: 'creatorId'
  };

  export type MediaScalarFieldEnum = (typeof MediaScalarFieldEnum)[keyof typeof MediaScalarFieldEnum]


  export const ShipmentScalarFieldEnum: {
    id: 'id',
    method: 'method',
    isActive: 'isActive',
    cost: 'cost',
    locations: 'locations',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    creatorId: 'creatorId'
  };

  export type ShipmentScalarFieldEnum = (typeof ShipmentScalarFieldEnum)[keyof typeof ShipmentScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    imageId: 'imageId',
    featured: 'featured',
    parentId: 'parentId',
    creatorId: 'creatorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const PromotionScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    description: 'description',
    startDate: 'startDate',
    endDate: 'endDate',
    status: 'status',
    priority: 'priority',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    creatorId: 'creatorId'
  };

  export type PromotionScalarFieldEnum = (typeof PromotionScalarFieldEnum)[keyof typeof PromotionScalarFieldEnum]


  export const CommentScalarFieldEnum: {
    id: 'id',
    comment: 'comment',
    blogId: 'blogId'
  };

  export type CommentScalarFieldEnum = (typeof CommentScalarFieldEnum)[keyof typeof CommentScalarFieldEnum]


  export const BlogScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    title: 'title',
    tags: 'tags',
    status: 'status',
    publishedAt: 'publishedAt',
    layout: 'layout',
    creatorId: 'creatorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type BlogScalarFieldEnum = (typeof BlogScalarFieldEnum)[keyof typeof BlogScalarFieldEnum]


  export const ProductScalarFieldEnum: {
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
    updatedAt: 'updatedAt',
    creatorId: 'creatorId'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const ReviewScalarFieldEnum: {
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
    updatedAt: 'updatedAt',
    creatorId: 'creatorId'
  };

  export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum]


  export const OrderItemScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    productId: 'productId',
    quantity: 'quantity',
    price: 'price',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    userId: 'userId'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    clerkId: 'clerkId',
    email: 'email',
    fullName: 'fullName',
    avatar: 'avatar',
    phone: 'phone',
    isAnonymous: 'isAnonymous'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CategoriesOnBlogsScalarFieldEnum: {
    id: 'id',
    blogId: 'blogId',
    categoryId: 'categoryId',
    assignedAt: 'assignedAt'
  };

  export type CategoriesOnBlogsScalarFieldEnum = (typeof CategoriesOnBlogsScalarFieldEnum)[keyof typeof CategoriesOnBlogsScalarFieldEnum]


  export const CategoriesOnProductsScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    categoryId: 'categoryId',
    assignedAt: 'assignedAt'
  };

  export type CategoriesOnProductsScalarFieldEnum = (typeof CategoriesOnProductsScalarFieldEnum)[keyof typeof CategoriesOnProductsScalarFieldEnum]


  export const MediasOnProductsScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    mediaId: 'mediaId',
    assignedAt: 'assignedAt'
  };

  export type MediasOnProductsScalarFieldEnum = (typeof MediasOnProductsScalarFieldEnum)[keyof typeof MediasOnProductsScalarFieldEnum]


  export const WishlistScalarFieldEnum: {
    id: 'id',
    productId: 'productId',
    userId: 'userId',
    assignedAt: 'assignedAt'
  };

  export type WishlistScalarFieldEnum = (typeof WishlistScalarFieldEnum)[keyof typeof WishlistScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'MediaType'
   */
  export type EnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType'>
    


  /**
   * Reference to a field of type 'MediaType[]'
   */
  export type ListEnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType[]'>
    


  /**
   * Reference to a field of type 'ShipmentMethod'
   */
  export type EnumShipmentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentMethod'>
    


  /**
   * Reference to a field of type 'ShipmentMethod[]'
   */
  export type ListEnumShipmentMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ShipmentMethod[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'PromotionStatus'
   */
  export type EnumPromotionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionStatus'>
    


  /**
   * Reference to a field of type 'PromotionStatus[]'
   */
  export type ListEnumPromotionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionStatus[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'BlogStatus'
   */
  export type EnumBlogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogStatus'>
    


  /**
   * Reference to a field of type 'BlogStatus[]'
   */
  export type ListEnumBlogStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogStatus[]'>
    


  /**
   * Reference to a field of type 'BlogLayout'
   */
  export type EnumBlogLayoutFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogLayout'>
    


  /**
   * Reference to a field of type 'BlogLayout[]'
   */
  export type ListEnumBlogLayoutFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogLayout[]'>
    


  /**
   * Reference to a field of type 'ProductStatus'
   */
  export type EnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus'>
    


  /**
   * Reference to a field of type 'ProductStatus[]'
   */
  export type ListEnumProductStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductStatus[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'PromotionConditionType'
   */
  export type EnumPromotionConditionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionConditionType'>
    


  /**
   * Reference to a field of type 'PromotionConditionType[]'
   */
  export type ListEnumPromotionConditionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionConditionType[]'>
    


  /**
   * Reference to a field of type 'PromotionActionType'
   */
  export type EnumPromotionActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionActionType'>
    


  /**
   * Reference to a field of type 'PromotionActionType[]'
   */
  export type ListEnumPromotionActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PromotionActionType[]'>
    


  /**
   * Reference to a field of type 'BlogContentType'
   */
  export type EnumBlogContentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogContentType'>
    


  /**
   * Reference to a field of type 'BlogContentType[]'
   */
  export type ListEnumBlogContentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogContentType[]'>
    


  /**
   * Reference to a field of type 'ProductContentType'
   */
  export type EnumProductContentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductContentType'>
    


  /**
   * Reference to a field of type 'ProductContentType[]'
   */
  export type ListEnumProductContentTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProductContentType[]'>
    
  /**
   * Deep Input Types
   */


  export type MediaWhereInput = {
    AND?: MediaWhereInput | MediaWhereInput[]
    OR?: MediaWhereInput[]
    NOT?: MediaWhereInput | MediaWhereInput[]
    id?: StringFilter<"Media"> | string
    createdAt?: DateTimeFilter<"Media"> | Date | string
    fileName?: StringFilter<"Media"> | string
    type?: EnumMediaTypeFilter<"Media"> | $Enums.MediaType
    updatedAt?: DateTimeFilter<"Media"> | Date | string
    url?: StringFilter<"Media"> | string
    blurDataUrl?: StringNullableFilter<"Media"> | string | null
    creatorId?: StringFilter<"Media"> | string
    products?: MediasOnProductsListRelationFilter
    categories?: CategoryListRelationFilter
  }

  export type MediaOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    fileName?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
    url?: SortOrder
    blurDataUrl?: SortOrder
    creatorId?: SortOrder
    products?: MediasOnProductsOrderByRelationAggregateInput
    categories?: CategoryOrderByRelationAggregateInput
  }

  export type MediaWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    fileName?: string
    AND?: MediaWhereInput | MediaWhereInput[]
    OR?: MediaWhereInput[]
    NOT?: MediaWhereInput | MediaWhereInput[]
    createdAt?: DateTimeFilter<"Media"> | Date | string
    type?: EnumMediaTypeFilter<"Media"> | $Enums.MediaType
    updatedAt?: DateTimeFilter<"Media"> | Date | string
    url?: StringFilter<"Media"> | string
    blurDataUrl?: StringNullableFilter<"Media"> | string | null
    creatorId?: StringFilter<"Media"> | string
    products?: MediasOnProductsListRelationFilter
    categories?: CategoryListRelationFilter
  }, "id" | "fileName">

  export type MediaOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    fileName?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
    url?: SortOrder
    blurDataUrl?: SortOrder
    creatorId?: SortOrder
    _count?: MediaCountOrderByAggregateInput
    _max?: MediaMaxOrderByAggregateInput
    _min?: MediaMinOrderByAggregateInput
  }

  export type MediaScalarWhereWithAggregatesInput = {
    AND?: MediaScalarWhereWithAggregatesInput | MediaScalarWhereWithAggregatesInput[]
    OR?: MediaScalarWhereWithAggregatesInput[]
    NOT?: MediaScalarWhereWithAggregatesInput | MediaScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Media"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Media"> | Date | string
    fileName?: StringWithAggregatesFilter<"Media"> | string
    type?: EnumMediaTypeWithAggregatesFilter<"Media"> | $Enums.MediaType
    updatedAt?: DateTimeWithAggregatesFilter<"Media"> | Date | string
    url?: StringWithAggregatesFilter<"Media"> | string
    blurDataUrl?: StringNullableWithAggregatesFilter<"Media"> | string | null
    creatorId?: StringWithAggregatesFilter<"Media"> | string
  }

  export type ShipmentWhereInput = {
    AND?: ShipmentWhereInput | ShipmentWhereInput[]
    OR?: ShipmentWhereInput[]
    NOT?: ShipmentWhereInput | ShipmentWhereInput[]
    id?: StringFilter<"Shipment"> | string
    method?: EnumShipmentMethodFilter<"Shipment"> | $Enums.ShipmentMethod
    isActive?: BoolFilter<"Shipment"> | boolean
    cost?: FloatFilter<"Shipment"> | number
    locations?: StringNullableListFilter<"Shipment">
    createdAt?: DateTimeFilter<"Shipment"> | Date | string
    updatedAt?: DateTimeFilter<"Shipment"> | Date | string
    creatorId?: StringFilter<"Shipment"> | string
  }

  export type ShipmentOrderByWithRelationInput = {
    id?: SortOrder
    method?: SortOrder
    isActive?: SortOrder
    cost?: SortOrder
    locations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type ShipmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ShipmentWhereInput | ShipmentWhereInput[]
    OR?: ShipmentWhereInput[]
    NOT?: ShipmentWhereInput | ShipmentWhereInput[]
    method?: EnumShipmentMethodFilter<"Shipment"> | $Enums.ShipmentMethod
    isActive?: BoolFilter<"Shipment"> | boolean
    cost?: FloatFilter<"Shipment"> | number
    locations?: StringNullableListFilter<"Shipment">
    createdAt?: DateTimeFilter<"Shipment"> | Date | string
    updatedAt?: DateTimeFilter<"Shipment"> | Date | string
    creatorId?: StringFilter<"Shipment"> | string
  }, "id">

  export type ShipmentOrderByWithAggregationInput = {
    id?: SortOrder
    method?: SortOrder
    isActive?: SortOrder
    cost?: SortOrder
    locations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    _count?: ShipmentCountOrderByAggregateInput
    _avg?: ShipmentAvgOrderByAggregateInput
    _max?: ShipmentMaxOrderByAggregateInput
    _min?: ShipmentMinOrderByAggregateInput
    _sum?: ShipmentSumOrderByAggregateInput
  }

  export type ShipmentScalarWhereWithAggregatesInput = {
    AND?: ShipmentScalarWhereWithAggregatesInput | ShipmentScalarWhereWithAggregatesInput[]
    OR?: ShipmentScalarWhereWithAggregatesInput[]
    NOT?: ShipmentScalarWhereWithAggregatesInput | ShipmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Shipment"> | string
    method?: EnumShipmentMethodWithAggregatesFilter<"Shipment"> | $Enums.ShipmentMethod
    isActive?: BoolWithAggregatesFilter<"Shipment"> | boolean
    cost?: FloatWithAggregatesFilter<"Shipment"> | number
    locations?: StringNullableListFilter<"Shipment">
    createdAt?: DateTimeWithAggregatesFilter<"Shipment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Shipment"> | Date | string
    creatorId?: StringWithAggregatesFilter<"Shipment"> | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    imageId?: StringNullableFilter<"Category"> | string | null
    featured?: BoolFilter<"Category"> | boolean
    parentId?: StringNullableFilter<"Category"> | string | null
    seoMetadata?: XOR<SeoMetadataNullableCompositeFilter, SeoMetadataObjectEqualityInput> | null
    creatorId?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    image?: XOR<MediaNullableScalarRelationFilter, MediaWhereInput> | null
    parent?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    blogs?: CategoriesOnBlogsListRelationFilter
    products?: CategoriesOnProductsListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    imageId?: SortOrder
    featured?: SortOrder
    parentId?: SortOrder
    seoMetadata?: SeoMetadataOrderByInput
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    image?: MediaOrderByWithRelationInput
    parent?: CategoryOrderByWithRelationInput
    children?: CategoryOrderByRelationAggregateInput
    blogs?: CategoriesOnBlogsOrderByRelationAggregateInput
    products?: CategoriesOnProductsOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    imageId?: StringNullableFilter<"Category"> | string | null
    featured?: BoolFilter<"Category"> | boolean
    parentId?: StringNullableFilter<"Category"> | string | null
    seoMetadata?: XOR<SeoMetadataNullableCompositeFilter, SeoMetadataObjectEqualityInput> | null
    creatorId?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
    image?: XOR<MediaNullableScalarRelationFilter, MediaWhereInput> | null
    parent?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    children?: CategoryListRelationFilter
    blogs?: CategoriesOnBlogsListRelationFilter
    products?: CategoriesOnProductsListRelationFilter
  }, "id" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    imageId?: SortOrder
    featured?: SortOrder
    parentId?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    slug?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    imageId?: StringNullableWithAggregatesFilter<"Category"> | string | null
    featured?: BoolWithAggregatesFilter<"Category"> | boolean
    parentId?: StringNullableWithAggregatesFilter<"Category"> | string | null
    creatorId?: StringWithAggregatesFilter<"Category"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type PromotionWhereInput = {
    AND?: PromotionWhereInput | PromotionWhereInput[]
    OR?: PromotionWhereInput[]
    NOT?: PromotionWhereInput | PromotionWhereInput[]
    id?: StringFilter<"Promotion"> | string
    code?: StringFilter<"Promotion"> | string
    name?: StringFilter<"Promotion"> | string
    description?: StringNullableFilter<"Promotion"> | string | null
    startDate?: DateTimeFilter<"Promotion"> | Date | string
    endDate?: DateTimeFilter<"Promotion"> | Date | string
    conditions?: PromotionConditionCompositeListFilter | PromotionConditionObjectEqualityInput[]
    actions?: PromotionActionCompositeListFilter | PromotionActionObjectEqualityInput[]
    usageLimit?: XOR<UsageLimitNullableCompositeFilter, UsageLimitObjectEqualityInput> | null
    status?: EnumPromotionStatusFilter<"Promotion"> | $Enums.PromotionStatus
    priority?: IntFilter<"Promotion"> | number
    metadata?: XOR<MetadataCompositeFilter, MetadataObjectEqualityInput>
    createdAt?: DateTimeFilter<"Promotion"> | Date | string
    updatedAt?: DateTimeFilter<"Promotion"> | Date | string
    creatorId?: StringFilter<"Promotion"> | string
  }

  export type PromotionOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    conditions?: PromotionConditionOrderByCompositeAggregateInput
    actions?: PromotionActionOrderByCompositeAggregateInput
    usageLimit?: UsageLimitOrderByInput
    status?: SortOrder
    priority?: SortOrder
    metadata?: MetadataOrderByInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type PromotionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: PromotionWhereInput | PromotionWhereInput[]
    OR?: PromotionWhereInput[]
    NOT?: PromotionWhereInput | PromotionWhereInput[]
    name?: StringFilter<"Promotion"> | string
    description?: StringNullableFilter<"Promotion"> | string | null
    startDate?: DateTimeFilter<"Promotion"> | Date | string
    endDate?: DateTimeFilter<"Promotion"> | Date | string
    conditions?: PromotionConditionCompositeListFilter | PromotionConditionObjectEqualityInput[]
    actions?: PromotionActionCompositeListFilter | PromotionActionObjectEqualityInput[]
    usageLimit?: XOR<UsageLimitNullableCompositeFilter, UsageLimitObjectEqualityInput> | null
    status?: EnumPromotionStatusFilter<"Promotion"> | $Enums.PromotionStatus
    priority?: IntFilter<"Promotion"> | number
    metadata?: XOR<MetadataCompositeFilter, MetadataObjectEqualityInput>
    createdAt?: DateTimeFilter<"Promotion"> | Date | string
    updatedAt?: DateTimeFilter<"Promotion"> | Date | string
    creatorId?: StringFilter<"Promotion"> | string
  }, "id" | "code">

  export type PromotionOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    _count?: PromotionCountOrderByAggregateInput
    _avg?: PromotionAvgOrderByAggregateInput
    _max?: PromotionMaxOrderByAggregateInput
    _min?: PromotionMinOrderByAggregateInput
    _sum?: PromotionSumOrderByAggregateInput
  }

  export type PromotionScalarWhereWithAggregatesInput = {
    AND?: PromotionScalarWhereWithAggregatesInput | PromotionScalarWhereWithAggregatesInput[]
    OR?: PromotionScalarWhereWithAggregatesInput[]
    NOT?: PromotionScalarWhereWithAggregatesInput | PromotionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Promotion"> | string
    code?: StringWithAggregatesFilter<"Promotion"> | string
    name?: StringWithAggregatesFilter<"Promotion"> | string
    description?: StringNullableWithAggregatesFilter<"Promotion"> | string | null
    startDate?: DateTimeWithAggregatesFilter<"Promotion"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"Promotion"> | Date | string
    status?: EnumPromotionStatusWithAggregatesFilter<"Promotion"> | $Enums.PromotionStatus
    priority?: IntWithAggregatesFilter<"Promotion"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Promotion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Promotion"> | Date | string
    creatorId?: StringWithAggregatesFilter<"Promotion"> | string
  }

  export type CommentWhereInput = {
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    id?: StringFilter<"Comment"> | string
    comment?: StringFilter<"Comment"> | string
    blogId?: StringFilter<"Comment"> | string
    blog?: XOR<BlogScalarRelationFilter, BlogWhereInput>
  }

  export type CommentOrderByWithRelationInput = {
    id?: SortOrder
    comment?: SortOrder
    blogId?: SortOrder
    blog?: BlogOrderByWithRelationInput
  }

  export type CommentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CommentWhereInput | CommentWhereInput[]
    OR?: CommentWhereInput[]
    NOT?: CommentWhereInput | CommentWhereInput[]
    comment?: StringFilter<"Comment"> | string
    blogId?: StringFilter<"Comment"> | string
    blog?: XOR<BlogScalarRelationFilter, BlogWhereInput>
  }, "id">

  export type CommentOrderByWithAggregationInput = {
    id?: SortOrder
    comment?: SortOrder
    blogId?: SortOrder
    _count?: CommentCountOrderByAggregateInput
    _max?: CommentMaxOrderByAggregateInput
    _min?: CommentMinOrderByAggregateInput
  }

  export type CommentScalarWhereWithAggregatesInput = {
    AND?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    OR?: CommentScalarWhereWithAggregatesInput[]
    NOT?: CommentScalarWhereWithAggregatesInput | CommentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Comment"> | string
    comment?: StringWithAggregatesFilter<"Comment"> | string
    blogId?: StringWithAggregatesFilter<"Comment"> | string
  }

  export type BlogWhereInput = {
    AND?: BlogWhereInput | BlogWhereInput[]
    OR?: BlogWhereInput[]
    NOT?: BlogWhereInput | BlogWhereInput[]
    id?: StringFilter<"Blog"> | string
    slug?: StringFilter<"Blog"> | string
    title?: StringFilter<"Blog"> | string
    content?: XOR<BlogContentCompositeFilter, BlogContentObjectEqualityInput>
    metadata?: XOR<BlogMetadataCompositeFilter, BlogMetadataObjectEqualityInput>
    tags?: StringNullableListFilter<"Blog">
    status?: EnumBlogStatusFilter<"Blog"> | $Enums.BlogStatus
    publishedAt?: DateTimeNullableFilter<"Blog"> | Date | string | null
    customFields?: CustomFieldsCompositeListFilter | CustomFieldsObjectEqualityInput[]
    layout?: EnumBlogLayoutFilter<"Blog"> | $Enums.BlogLayout
    creatorId?: StringFilter<"Blog"> | string
    createdAt?: DateTimeFilter<"Blog"> | Date | string
    updatedAt?: DateTimeFilter<"Blog"> | Date | string
    categories?: CategoriesOnBlogsListRelationFilter
    comments?: CommentListRelationFilter
  }

  export type BlogOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    content?: BlogContentOrderByInput
    metadata?: BlogMetadataOrderByInput
    tags?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrder
    customFields?: CustomFieldsOrderByCompositeAggregateInput
    layout?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    categories?: CategoriesOnBlogsOrderByRelationAggregateInput
    comments?: CommentOrderByRelationAggregateInput
  }

  export type BlogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: BlogWhereInput | BlogWhereInput[]
    OR?: BlogWhereInput[]
    NOT?: BlogWhereInput | BlogWhereInput[]
    title?: StringFilter<"Blog"> | string
    content?: XOR<BlogContentCompositeFilter, BlogContentObjectEqualityInput>
    metadata?: XOR<BlogMetadataCompositeFilter, BlogMetadataObjectEqualityInput>
    tags?: StringNullableListFilter<"Blog">
    status?: EnumBlogStatusFilter<"Blog"> | $Enums.BlogStatus
    publishedAt?: DateTimeNullableFilter<"Blog"> | Date | string | null
    customFields?: CustomFieldsCompositeListFilter | CustomFieldsObjectEqualityInput[]
    layout?: EnumBlogLayoutFilter<"Blog"> | $Enums.BlogLayout
    creatorId?: StringFilter<"Blog"> | string
    createdAt?: DateTimeFilter<"Blog"> | Date | string
    updatedAt?: DateTimeFilter<"Blog"> | Date | string
    categories?: CategoriesOnBlogsListRelationFilter
    comments?: CommentListRelationFilter
  }, "id" | "slug">

  export type BlogOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    tags?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrder
    layout?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: BlogCountOrderByAggregateInput
    _max?: BlogMaxOrderByAggregateInput
    _min?: BlogMinOrderByAggregateInput
  }

  export type BlogScalarWhereWithAggregatesInput = {
    AND?: BlogScalarWhereWithAggregatesInput | BlogScalarWhereWithAggregatesInput[]
    OR?: BlogScalarWhereWithAggregatesInput[]
    NOT?: BlogScalarWhereWithAggregatesInput | BlogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Blog"> | string
    slug?: StringWithAggregatesFilter<"Blog"> | string
    title?: StringWithAggregatesFilter<"Blog"> | string
    tags?: StringNullableListFilter<"Blog">
    status?: EnumBlogStatusWithAggregatesFilter<"Blog"> | $Enums.BlogStatus
    publishedAt?: DateTimeNullableWithAggregatesFilter<"Blog"> | Date | string | null
    layout?: EnumBlogLayoutWithAggregatesFilter<"Blog"> | $Enums.BlogLayout
    creatorId?: StringWithAggregatesFilter<"Blog"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Blog"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Blog"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    title?: StringFilter<"Product"> | string
    slug?: StringFilter<"Product"> | string
    description?: XOR<ProductDescriptionCompositeFilter, ProductDescriptionObjectEqualityInput>
    isFeature?: BoolFilter<"Product"> | boolean
    isNewProduct?: BoolFilter<"Product"> | boolean
    tags?: StringNullableListFilter<"Product">
    price?: XOR<PriceCompositeFilter, PriceObjectEqualityInput>
    features?: FeatureCompositeListFilter | FeatureObjectEqualityInput[]
    status?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus
    visibility?: BoolFilter<"Product"> | boolean
    inventory?: XOR<InventoryCompositeFilter, InventoryObjectEqualityInput>
    blogUrl?: StringNullableFilter<"Product"> | string | null
    partnerId?: StringFilter<"Product"> | string
    metadata?: XOR<ProductSeoMetadataCompositeFilter, ProductSeoMetadataObjectEqualityInput>
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    creatorId?: StringFilter<"Product"> | string
    media?: MediasOnProductsListRelationFilter
    reviews?: ReviewListRelationFilter
    categories?: CategoriesOnProductsListRelationFilter
    OrderItem?: OrderItemListRelationFilter
    userWishlist?: WishlistListRelationFilter
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    description?: ProductDescriptionOrderByInput
    isFeature?: SortOrder
    isNewProduct?: SortOrder
    tags?: SortOrder
    price?: PriceOrderByInput
    features?: FeatureOrderByCompositeAggregateInput
    status?: SortOrder
    visibility?: SortOrder
    inventory?: InventoryOrderByInput
    blogUrl?: SortOrder
    partnerId?: SortOrder
    metadata?: ProductSeoMetadataOrderByInput
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    media?: MediasOnProductsOrderByRelationAggregateInput
    reviews?: ReviewOrderByRelationAggregateInput
    categories?: CategoriesOnProductsOrderByRelationAggregateInput
    OrderItem?: OrderItemOrderByRelationAggregateInput
    userWishlist?: WishlistOrderByRelationAggregateInput
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    title?: StringFilter<"Product"> | string
    description?: XOR<ProductDescriptionCompositeFilter, ProductDescriptionObjectEqualityInput>
    isFeature?: BoolFilter<"Product"> | boolean
    isNewProduct?: BoolFilter<"Product"> | boolean
    tags?: StringNullableListFilter<"Product">
    price?: XOR<PriceCompositeFilter, PriceObjectEqualityInput>
    features?: FeatureCompositeListFilter | FeatureObjectEqualityInput[]
    status?: EnumProductStatusFilter<"Product"> | $Enums.ProductStatus
    visibility?: BoolFilter<"Product"> | boolean
    inventory?: XOR<InventoryCompositeFilter, InventoryObjectEqualityInput>
    blogUrl?: StringNullableFilter<"Product"> | string | null
    partnerId?: StringFilter<"Product"> | string
    metadata?: XOR<ProductSeoMetadataCompositeFilter, ProductSeoMetadataObjectEqualityInput>
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
    creatorId?: StringFilter<"Product"> | string
    media?: MediasOnProductsListRelationFilter
    reviews?: ReviewListRelationFilter
    categories?: CategoriesOnProductsListRelationFilter
    OrderItem?: OrderItemListRelationFilter
    userWishlist?: WishlistListRelationFilter
  }, "id" | "slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    isFeature?: SortOrder
    isNewProduct?: SortOrder
    tags?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    blogUrl?: SortOrder
    partnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    title?: StringWithAggregatesFilter<"Product"> | string
    slug?: StringWithAggregatesFilter<"Product"> | string
    isFeature?: BoolWithAggregatesFilter<"Product"> | boolean
    isNewProduct?: BoolWithAggregatesFilter<"Product"> | boolean
    tags?: StringNullableListFilter<"Product">
    status?: EnumProductStatusWithAggregatesFilter<"Product"> | $Enums.ProductStatus
    visibility?: BoolWithAggregatesFilter<"Product"> | boolean
    blogUrl?: StringNullableWithAggregatesFilter<"Product"> | string | null
    partnerId?: StringWithAggregatesFilter<"Product"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    creatorId?: StringWithAggregatesFilter<"Product"> | string
  }

  export type ReviewWhereInput = {
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    id?: StringFilter<"Review"> | string
    productId?: StringFilter<"Review"> | string
    userName?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    imageUrl?: StringNullableFilter<"Review"> | string | null
    helpful?: IntFilter<"Review"> | number
    notHelpful?: IntFilter<"Review"> | number
    verify?: BoolFilter<"Review"> | boolean
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    creatorId?: StringFilter<"Review"> | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type ReviewOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    userName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    imageUrl?: SortOrder
    helpful?: SortOrder
    notHelpful?: SortOrder
    verify?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    product?: ProductOrderByWithRelationInput
  }

  export type ReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ReviewWhereInput | ReviewWhereInput[]
    OR?: ReviewWhereInput[]
    NOT?: ReviewWhereInput | ReviewWhereInput[]
    productId?: StringFilter<"Review"> | string
    userName?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    imageUrl?: StringNullableFilter<"Review"> | string | null
    helpful?: IntFilter<"Review"> | number
    notHelpful?: IntFilter<"Review"> | number
    verify?: BoolFilter<"Review"> | boolean
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    creatorId?: StringFilter<"Review"> | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id">

  export type ReviewOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    userName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    imageUrl?: SortOrder
    helpful?: SortOrder
    notHelpful?: SortOrder
    verify?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
    _count?: ReviewCountOrderByAggregateInput
    _avg?: ReviewAvgOrderByAggregateInput
    _max?: ReviewMaxOrderByAggregateInput
    _min?: ReviewMinOrderByAggregateInput
    _sum?: ReviewSumOrderByAggregateInput
  }

  export type ReviewScalarWhereWithAggregatesInput = {
    AND?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    OR?: ReviewScalarWhereWithAggregatesInput[]
    NOT?: ReviewScalarWhereWithAggregatesInput | ReviewScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Review"> | string
    productId?: StringWithAggregatesFilter<"Review"> | string
    userName?: StringWithAggregatesFilter<"Review"> | string
    rating?: IntWithAggregatesFilter<"Review"> | number
    comment?: StringWithAggregatesFilter<"Review"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Review"> | string | null
    helpful?: IntWithAggregatesFilter<"Review"> | number
    notHelpful?: IntWithAggregatesFilter<"Review"> | number
    verify?: BoolWithAggregatesFilter<"Review"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Review"> | Date | string
    creatorId?: StringWithAggregatesFilter<"Review"> | string
  }

  export type OrderItemWhereInput = {
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    price?: FloatFilter<"OrderItem"> | number
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    updatedAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }

  export type OrderItemOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    product?: ProductOrderByWithRelationInput
  }

  export type OrderItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    orderId_productId?: OrderItemOrderIdProductIdCompoundUniqueInput
    AND?: OrderItemWhereInput | OrderItemWhereInput[]
    OR?: OrderItemWhereInput[]
    NOT?: OrderItemWhereInput | OrderItemWhereInput[]
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    price?: FloatFilter<"OrderItem"> | number
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    updatedAt?: DateTimeFilter<"OrderItem"> | Date | string
    order?: XOR<OrderScalarRelationFilter, OrderWhereInput>
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
  }, "id" | "orderId_productId">

  export type OrderItemOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderItemCountOrderByAggregateInput
    _avg?: OrderItemAvgOrderByAggregateInput
    _max?: OrderItemMaxOrderByAggregateInput
    _min?: OrderItemMinOrderByAggregateInput
    _sum?: OrderItemSumOrderByAggregateInput
  }

  export type OrderItemScalarWhereWithAggregatesInput = {
    AND?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    OR?: OrderItemScalarWhereWithAggregatesInput[]
    NOT?: OrderItemScalarWhereWithAggregatesInput | OrderItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderItem"> | string
    orderId?: StringWithAggregatesFilter<"OrderItem"> | string
    productId?: StringWithAggregatesFilter<"OrderItem"> | string
    quantity?: IntWithAggregatesFilter<"OrderItem"> | number
    price?: FloatWithAggregatesFilter<"OrderItem"> | number
    createdAt?: DateTimeWithAggregatesFilter<"OrderItem"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"OrderItem"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    deliveryInfo?: XOR<DeliveryInfoCompositeFilter, DeliveryInfoObjectEqualityInput>
    userData?: XOR<UserDataCompositeFilter, UserDataObjectEqualityInput>
    promotions?: OrderPromotionCompositeListFilter | OrderPromotionObjectEqualityInput[]
    orderPrices?: XOR<OrderPricesCompositeFilter, OrderPricesObjectEqualityInput>
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    userId?: StringFilter<"Order"> | string
    items?: OrderItemListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    deliveryInfo?: DeliveryInfoOrderByInput
    userData?: UserDataOrderByInput
    promotions?: OrderPromotionOrderByCompositeAggregateInput
    orderPrices?: OrderPricesOrderByInput
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    items?: OrderItemOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    deliveryInfo?: XOR<DeliveryInfoCompositeFilter, DeliveryInfoObjectEqualityInput>
    userData?: XOR<UserDataCompositeFilter, UserDataObjectEqualityInput>
    promotions?: OrderPromotionCompositeListFilter | OrderPromotionObjectEqualityInput[]
    orderPrices?: XOR<OrderPricesCompositeFilter, OrderPricesObjectEqualityInput>
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    userId?: StringFilter<"Order"> | string
    items?: OrderItemListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    userId?: StringWithAggregatesFilter<"Order"> | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    clerkId?: StringNullableFilter<"User"> | string | null
    email?: StringNullableFilter<"User"> | string | null
    fullName?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    isAnonymous?: BoolFilter<"User"> | boolean
    productWishlist?: WishlistListRelationFilter
    order?: OrderListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    avatar?: SortOrder
    phone?: SortOrder
    isAnonymous?: SortOrder
    productWishlist?: WishlistOrderByRelationAggregateInput
    order?: OrderOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    clerkId?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringNullableFilter<"User"> | string | null
    avatar?: StringNullableFilter<"User"> | string | null
    phone?: StringNullableFilter<"User"> | string | null
    isAnonymous?: BoolFilter<"User"> | boolean
    productWishlist?: WishlistListRelationFilter
    order?: OrderListRelationFilter
  }, "id" | "clerkId" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    avatar?: SortOrder
    phone?: SortOrder
    isAnonymous?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    clerkId?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    fullName?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    isAnonymous?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type CategoriesOnBlogsWhereInput = {
    AND?: CategoriesOnBlogsWhereInput | CategoriesOnBlogsWhereInput[]
    OR?: CategoriesOnBlogsWhereInput[]
    NOT?: CategoriesOnBlogsWhereInput | CategoriesOnBlogsWhereInput[]
    id?: StringFilter<"CategoriesOnBlogs"> | string
    blogId?: StringFilter<"CategoriesOnBlogs"> | string
    categoryId?: StringFilter<"CategoriesOnBlogs"> | string
    assignedAt?: DateTimeFilter<"CategoriesOnBlogs"> | Date | string
    blog?: XOR<BlogScalarRelationFilter, BlogWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type CategoriesOnBlogsOrderByWithRelationInput = {
    id?: SortOrder
    blogId?: SortOrder
    categoryId?: SortOrder
    assignedAt?: SortOrder
    blog?: BlogOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type CategoriesOnBlogsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    blogId_categoryId?: CategoriesOnBlogsBlogIdCategoryIdCompoundUniqueInput
    AND?: CategoriesOnBlogsWhereInput | CategoriesOnBlogsWhereInput[]
    OR?: CategoriesOnBlogsWhereInput[]
    NOT?: CategoriesOnBlogsWhereInput | CategoriesOnBlogsWhereInput[]
    blogId?: StringFilter<"CategoriesOnBlogs"> | string
    categoryId?: StringFilter<"CategoriesOnBlogs"> | string
    assignedAt?: DateTimeFilter<"CategoriesOnBlogs"> | Date | string
    blog?: XOR<BlogScalarRelationFilter, BlogWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "id" | "blogId_categoryId">

  export type CategoriesOnBlogsOrderByWithAggregationInput = {
    id?: SortOrder
    blogId?: SortOrder
    categoryId?: SortOrder
    assignedAt?: SortOrder
    _count?: CategoriesOnBlogsCountOrderByAggregateInput
    _max?: CategoriesOnBlogsMaxOrderByAggregateInput
    _min?: CategoriesOnBlogsMinOrderByAggregateInput
  }

  export type CategoriesOnBlogsScalarWhereWithAggregatesInput = {
    AND?: CategoriesOnBlogsScalarWhereWithAggregatesInput | CategoriesOnBlogsScalarWhereWithAggregatesInput[]
    OR?: CategoriesOnBlogsScalarWhereWithAggregatesInput[]
    NOT?: CategoriesOnBlogsScalarWhereWithAggregatesInput | CategoriesOnBlogsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CategoriesOnBlogs"> | string
    blogId?: StringWithAggregatesFilter<"CategoriesOnBlogs"> | string
    categoryId?: StringWithAggregatesFilter<"CategoriesOnBlogs"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"CategoriesOnBlogs"> | Date | string
  }

  export type CategoriesOnProductsWhereInput = {
    AND?: CategoriesOnProductsWhereInput | CategoriesOnProductsWhereInput[]
    OR?: CategoriesOnProductsWhereInput[]
    NOT?: CategoriesOnProductsWhereInput | CategoriesOnProductsWhereInput[]
    id?: StringFilter<"CategoriesOnProducts"> | string
    productId?: StringFilter<"CategoriesOnProducts"> | string
    categoryId?: StringFilter<"CategoriesOnProducts"> | string
    assignedAt?: DateTimeFilter<"CategoriesOnProducts"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type CategoriesOnProductsOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    categoryId?: SortOrder
    assignedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type CategoriesOnProductsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    productId_categoryId?: CategoriesOnProductsProductIdCategoryIdCompoundUniqueInput
    AND?: CategoriesOnProductsWhereInput | CategoriesOnProductsWhereInput[]
    OR?: CategoriesOnProductsWhereInput[]
    NOT?: CategoriesOnProductsWhereInput | CategoriesOnProductsWhereInput[]
    productId?: StringFilter<"CategoriesOnProducts"> | string
    categoryId?: StringFilter<"CategoriesOnProducts"> | string
    assignedAt?: DateTimeFilter<"CategoriesOnProducts"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "id" | "productId_categoryId">

  export type CategoriesOnProductsOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    categoryId?: SortOrder
    assignedAt?: SortOrder
    _count?: CategoriesOnProductsCountOrderByAggregateInput
    _max?: CategoriesOnProductsMaxOrderByAggregateInput
    _min?: CategoriesOnProductsMinOrderByAggregateInput
  }

  export type CategoriesOnProductsScalarWhereWithAggregatesInput = {
    AND?: CategoriesOnProductsScalarWhereWithAggregatesInput | CategoriesOnProductsScalarWhereWithAggregatesInput[]
    OR?: CategoriesOnProductsScalarWhereWithAggregatesInput[]
    NOT?: CategoriesOnProductsScalarWhereWithAggregatesInput | CategoriesOnProductsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CategoriesOnProducts"> | string
    productId?: StringWithAggregatesFilter<"CategoriesOnProducts"> | string
    categoryId?: StringWithAggregatesFilter<"CategoriesOnProducts"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"CategoriesOnProducts"> | Date | string
  }

  export type MediasOnProductsWhereInput = {
    AND?: MediasOnProductsWhereInput | MediasOnProductsWhereInput[]
    OR?: MediasOnProductsWhereInput[]
    NOT?: MediasOnProductsWhereInput | MediasOnProductsWhereInput[]
    id?: StringFilter<"MediasOnProducts"> | string
    productId?: StringFilter<"MediasOnProducts"> | string
    mediaId?: StringFilter<"MediasOnProducts"> | string
    assignedAt?: DateTimeFilter<"MediasOnProducts"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    media?: XOR<MediaScalarRelationFilter, MediaWhereInput>
  }

  export type MediasOnProductsOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    mediaId?: SortOrder
    assignedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    media?: MediaOrderByWithRelationInput
  }

  export type MediasOnProductsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    productId_mediaId?: MediasOnProductsProductIdMediaIdCompoundUniqueInput
    AND?: MediasOnProductsWhereInput | MediasOnProductsWhereInput[]
    OR?: MediasOnProductsWhereInput[]
    NOT?: MediasOnProductsWhereInput | MediasOnProductsWhereInput[]
    productId?: StringFilter<"MediasOnProducts"> | string
    mediaId?: StringFilter<"MediasOnProducts"> | string
    assignedAt?: DateTimeFilter<"MediasOnProducts"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    media?: XOR<MediaScalarRelationFilter, MediaWhereInput>
  }, "id" | "productId_mediaId">

  export type MediasOnProductsOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    mediaId?: SortOrder
    assignedAt?: SortOrder
    _count?: MediasOnProductsCountOrderByAggregateInput
    _max?: MediasOnProductsMaxOrderByAggregateInput
    _min?: MediasOnProductsMinOrderByAggregateInput
  }

  export type MediasOnProductsScalarWhereWithAggregatesInput = {
    AND?: MediasOnProductsScalarWhereWithAggregatesInput | MediasOnProductsScalarWhereWithAggregatesInput[]
    OR?: MediasOnProductsScalarWhereWithAggregatesInput[]
    NOT?: MediasOnProductsScalarWhereWithAggregatesInput | MediasOnProductsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MediasOnProducts"> | string
    productId?: StringWithAggregatesFilter<"MediasOnProducts"> | string
    mediaId?: StringWithAggregatesFilter<"MediasOnProducts"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"MediasOnProducts"> | Date | string
  }

  export type WishlistWhereInput = {
    AND?: WishlistWhereInput | WishlistWhereInput[]
    OR?: WishlistWhereInput[]
    NOT?: WishlistWhereInput | WishlistWhereInput[]
    id?: StringFilter<"Wishlist"> | string
    productId?: StringFilter<"Wishlist"> | string
    userId?: StringFilter<"Wishlist"> | string
    assignedAt?: DateTimeFilter<"Wishlist"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type WishlistOrderByWithRelationInput = {
    id?: SortOrder
    productId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
    product?: ProductOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type WishlistWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    productId_userId?: WishlistProductIdUserIdCompoundUniqueInput
    AND?: WishlistWhereInput | WishlistWhereInput[]
    OR?: WishlistWhereInput[]
    NOT?: WishlistWhereInput | WishlistWhereInput[]
    productId?: StringFilter<"Wishlist"> | string
    userId?: StringFilter<"Wishlist"> | string
    assignedAt?: DateTimeFilter<"Wishlist"> | Date | string
    product?: XOR<ProductScalarRelationFilter, ProductWhereInput>
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "productId_userId">

  export type WishlistOrderByWithAggregationInput = {
    id?: SortOrder
    productId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
    _count?: WishlistCountOrderByAggregateInput
    _max?: WishlistMaxOrderByAggregateInput
    _min?: WishlistMinOrderByAggregateInput
  }

  export type WishlistScalarWhereWithAggregatesInput = {
    AND?: WishlistScalarWhereWithAggregatesInput | WishlistScalarWhereWithAggregatesInput[]
    OR?: WishlistScalarWhereWithAggregatesInput[]
    NOT?: WishlistScalarWhereWithAggregatesInput | WishlistScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Wishlist"> | string
    productId?: StringWithAggregatesFilter<"Wishlist"> | string
    userId?: StringWithAggregatesFilter<"Wishlist"> | string
    assignedAt?: DateTimeWithAggregatesFilter<"Wishlist"> | Date | string
  }

  export type MediaCreateInput = {
    id?: string
    createdAt?: Date | string
    fileName: string
    type: $Enums.MediaType
    updatedAt?: Date | string
    url: string
    blurDataUrl?: string | null
    creatorId: string
    products?: MediasOnProductsCreateNestedManyWithoutMediaInput
    categories?: CategoryCreateNestedManyWithoutImageInput
  }

  export type MediaUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    fileName: string
    type: $Enums.MediaType
    updatedAt?: Date | string
    url: string
    blurDataUrl?: string | null
    creatorId: string
    products?: MediasOnProductsUncheckedCreateNestedManyWithoutMediaInput
    categories?: CategoryUncheckedCreateNestedManyWithoutImageInput
  }

  export type MediaUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    blurDataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    products?: MediasOnProductsUpdateManyWithoutMediaNestedInput
    categories?: CategoryUpdateManyWithoutImageNestedInput
  }

  export type MediaUncheckedUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    blurDataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    products?: MediasOnProductsUncheckedUpdateManyWithoutMediaNestedInput
    categories?: CategoryUncheckedUpdateManyWithoutImageNestedInput
  }

  export type MediaCreateManyInput = {
    id?: string
    createdAt?: Date | string
    fileName: string
    type: $Enums.MediaType
    updatedAt?: Date | string
    url: string
    blurDataUrl?: string | null
    creatorId: string
  }

  export type MediaUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    blurDataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type MediaUncheckedUpdateManyInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    blurDataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type ShipmentCreateInput = {
    id?: string
    method?: $Enums.ShipmentMethod
    isActive?: boolean
    cost: number
    locations?: ShipmentCreatelocationsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type ShipmentUncheckedCreateInput = {
    id?: string
    method?: $Enums.ShipmentMethod
    isActive?: boolean
    cost: number
    locations?: ShipmentCreatelocationsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type ShipmentUpdateInput = {
    method?: EnumShipmentMethodFieldUpdateOperationsInput | $Enums.ShipmentMethod
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cost?: FloatFieldUpdateOperationsInput | number
    locations?: ShipmentUpdatelocationsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type ShipmentUncheckedUpdateInput = {
    method?: EnumShipmentMethodFieldUpdateOperationsInput | $Enums.ShipmentMethod
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cost?: FloatFieldUpdateOperationsInput | number
    locations?: ShipmentUpdatelocationsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type ShipmentCreateManyInput = {
    id?: string
    method?: $Enums.ShipmentMethod
    isActive?: boolean
    cost: number
    locations?: ShipmentCreatelocationsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type ShipmentUpdateManyMutationInput = {
    method?: EnumShipmentMethodFieldUpdateOperationsInput | $Enums.ShipmentMethod
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cost?: FloatFieldUpdateOperationsInput | number
    locations?: ShipmentUpdatelocationsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type ShipmentUncheckedUpdateManyInput = {
    method?: EnumShipmentMethodFieldUpdateOperationsInput | $Enums.ShipmentMethod
    isActive?: BoolFieldUpdateOperationsInput | boolean
    cost?: FloatFieldUpdateOperationsInput | number
    locations?: ShipmentUpdatelocationsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    featured?: boolean
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: MediaCreateNestedOneWithoutCategoriesInput
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
    blogs?: CategoriesOnBlogsCreateNestedManyWithoutCategoryInput
    products?: CategoriesOnProductsCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageId?: string | null
    featured?: boolean
    parentId?: string | null
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    blogs?: CategoriesOnBlogsUncheckedCreateNestedManyWithoutCategoryInput
    products?: CategoriesOnProductsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: MediaUpdateOneWithoutCategoriesNestedInput
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    blogs?: CategoriesOnBlogsUpdateManyWithoutCategoryNestedInput
    products?: CategoriesOnProductsUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    blogs?: CategoriesOnBlogsUncheckedUpdateManyWithoutCategoryNestedInput
    products?: CategoriesOnProductsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageId?: string | null
    featured?: boolean
    parentId?: string | null
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromotionCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    conditions?: XOR<PromotionConditionListCreateEnvelopeInput, PromotionConditionCreateInput> | PromotionConditionCreateInput[]
    actions?: XOR<PromotionActionListCreateEnvelopeInput, PromotionActionCreateInput> | PromotionActionCreateInput[]
    usageLimit?: XOR<UsageLimitNullableCreateEnvelopeInput, UsageLimitCreateInput> | null
    status?: $Enums.PromotionStatus
    priority?: number
    metadata: XOR<MetadataCreateEnvelopeInput, MetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type PromotionUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    conditions?: XOR<PromotionConditionListCreateEnvelopeInput, PromotionConditionCreateInput> | PromotionConditionCreateInput[]
    actions?: XOR<PromotionActionListCreateEnvelopeInput, PromotionActionCreateInput> | PromotionActionCreateInput[]
    usageLimit?: XOR<UsageLimitNullableCreateEnvelopeInput, UsageLimitCreateInput> | null
    status?: $Enums.PromotionStatus
    priority?: number
    metadata: XOR<MetadataCreateEnvelopeInput, MetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type PromotionUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    conditions?: XOR<PromotionConditionListUpdateEnvelopeInput, PromotionConditionCreateInput> | PromotionConditionCreateInput[]
    actions?: XOR<PromotionActionListUpdateEnvelopeInput, PromotionActionCreateInput> | PromotionActionCreateInput[]
    usageLimit?: XOR<UsageLimitNullableUpdateEnvelopeInput, UsageLimitCreateInput> | null
    status?: EnumPromotionStatusFieldUpdateOperationsInput | $Enums.PromotionStatus
    priority?: IntFieldUpdateOperationsInput | number
    metadata?: XOR<MetadataUpdateEnvelopeInput, MetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type PromotionUncheckedUpdateInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    conditions?: XOR<PromotionConditionListUpdateEnvelopeInput, PromotionConditionCreateInput> | PromotionConditionCreateInput[]
    actions?: XOR<PromotionActionListUpdateEnvelopeInput, PromotionActionCreateInput> | PromotionActionCreateInput[]
    usageLimit?: XOR<UsageLimitNullableUpdateEnvelopeInput, UsageLimitCreateInput> | null
    status?: EnumPromotionStatusFieldUpdateOperationsInput | $Enums.PromotionStatus
    priority?: IntFieldUpdateOperationsInput | number
    metadata?: XOR<MetadataUpdateEnvelopeInput, MetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type PromotionCreateManyInput = {
    id?: string
    code: string
    name: string
    description?: string | null
    startDate: Date | string
    endDate: Date | string
    conditions?: XOR<PromotionConditionListCreateEnvelopeInput, PromotionConditionCreateInput> | PromotionConditionCreateInput[]
    actions?: XOR<PromotionActionListCreateEnvelopeInput, PromotionActionCreateInput> | PromotionActionCreateInput[]
    usageLimit?: XOR<UsageLimitNullableCreateEnvelopeInput, UsageLimitCreateInput> | null
    status?: $Enums.PromotionStatus
    priority?: number
    metadata: XOR<MetadataCreateEnvelopeInput, MetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type PromotionUpdateManyMutationInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    conditions?: XOR<PromotionConditionListUpdateEnvelopeInput, PromotionConditionCreateInput> | PromotionConditionCreateInput[]
    actions?: XOR<PromotionActionListUpdateEnvelopeInput, PromotionActionCreateInput> | PromotionActionCreateInput[]
    usageLimit?: XOR<UsageLimitNullableUpdateEnvelopeInput, UsageLimitCreateInput> | null
    status?: EnumPromotionStatusFieldUpdateOperationsInput | $Enums.PromotionStatus
    priority?: IntFieldUpdateOperationsInput | number
    metadata?: XOR<MetadataUpdateEnvelopeInput, MetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type PromotionUncheckedUpdateManyInput = {
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    conditions?: XOR<PromotionConditionListUpdateEnvelopeInput, PromotionConditionCreateInput> | PromotionConditionCreateInput[]
    actions?: XOR<PromotionActionListUpdateEnvelopeInput, PromotionActionCreateInput> | PromotionActionCreateInput[]
    usageLimit?: XOR<UsageLimitNullableUpdateEnvelopeInput, UsageLimitCreateInput> | null
    status?: EnumPromotionStatusFieldUpdateOperationsInput | $Enums.PromotionStatus
    priority?: IntFieldUpdateOperationsInput | number
    metadata?: XOR<MetadataUpdateEnvelopeInput, MetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentCreateInput = {
    id?: string
    comment: string
    blog: BlogCreateNestedOneWithoutCommentsInput
  }

  export type CommentUncheckedCreateInput = {
    id?: string
    comment: string
    blogId: string
  }

  export type CommentUpdateInput = {
    comment?: StringFieldUpdateOperationsInput | string
    blog?: BlogUpdateOneRequiredWithoutCommentsNestedInput
  }

  export type CommentUncheckedUpdateInput = {
    comment?: StringFieldUpdateOperationsInput | string
    blogId?: StringFieldUpdateOperationsInput | string
  }

  export type CommentCreateManyInput = {
    id?: string
    comment: string
    blogId: string
  }

  export type CommentUpdateManyMutationInput = {
    comment?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUncheckedUpdateManyInput = {
    comment?: StringFieldUpdateOperationsInput | string
    blogId?: StringFieldUpdateOperationsInput | string
  }

  export type BlogCreateInput = {
    id?: string
    slug: string
    title: string
    content: XOR<BlogContentCreateEnvelopeInput, BlogContentCreateInput>
    metadata: XOR<BlogMetadataCreateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogCreatetagsInput | string[]
    status?: $Enums.BlogStatus
    publishedAt?: Date | string | null
    customFields?: XOR<CustomFieldsListCreateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: $Enums.BlogLayout
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoriesOnBlogsCreateNestedManyWithoutBlogInput
    comments?: CommentCreateNestedManyWithoutBlogInput
  }

  export type BlogUncheckedCreateInput = {
    id?: string
    slug: string
    title: string
    content: XOR<BlogContentCreateEnvelopeInput, BlogContentCreateInput>
    metadata: XOR<BlogMetadataCreateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogCreatetagsInput | string[]
    status?: $Enums.BlogStatus
    publishedAt?: Date | string | null
    customFields?: XOR<CustomFieldsListCreateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: $Enums.BlogLayout
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoriesOnBlogsUncheckedCreateNestedManyWithoutBlogInput
    comments?: CommentUncheckedCreateNestedManyWithoutBlogInput
  }

  export type BlogUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: XOR<BlogContentUpdateEnvelopeInput, BlogContentCreateInput>
    metadata?: XOR<BlogMetadataUpdateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogUpdatetagsInput | string[]
    status?: EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customFields?: XOR<CustomFieldsListUpdateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: EnumBlogLayoutFieldUpdateOperationsInput | $Enums.BlogLayout
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoriesOnBlogsUpdateManyWithoutBlogNestedInput
    comments?: CommentUpdateManyWithoutBlogNestedInput
  }

  export type BlogUncheckedUpdateInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: XOR<BlogContentUpdateEnvelopeInput, BlogContentCreateInput>
    metadata?: XOR<BlogMetadataUpdateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogUpdatetagsInput | string[]
    status?: EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customFields?: XOR<CustomFieldsListUpdateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: EnumBlogLayoutFieldUpdateOperationsInput | $Enums.BlogLayout
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoriesOnBlogsUncheckedUpdateManyWithoutBlogNestedInput
    comments?: CommentUncheckedUpdateManyWithoutBlogNestedInput
  }

  export type BlogCreateManyInput = {
    id?: string
    slug: string
    title: string
    content: XOR<BlogContentCreateEnvelopeInput, BlogContentCreateInput>
    metadata: XOR<BlogMetadataCreateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogCreatetagsInput | string[]
    status?: $Enums.BlogStatus
    publishedAt?: Date | string | null
    customFields?: XOR<CustomFieldsListCreateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: $Enums.BlogLayout
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlogUpdateManyMutationInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: XOR<BlogContentUpdateEnvelopeInput, BlogContentCreateInput>
    metadata?: XOR<BlogMetadataUpdateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogUpdatetagsInput | string[]
    status?: EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customFields?: XOR<CustomFieldsListUpdateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: EnumBlogLayoutFieldUpdateOperationsInput | $Enums.BlogLayout
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogUncheckedUpdateManyInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: XOR<BlogContentUpdateEnvelopeInput, BlogContentCreateInput>
    metadata?: XOR<BlogMetadataUpdateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogUpdatetagsInput | string[]
    status?: EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customFields?: XOR<CustomFieldsListUpdateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: EnumBlogLayoutFieldUpdateOperationsInput | $Enums.BlogLayout
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    media?: MediasOnProductsCreateNestedManyWithoutProductInput
    reviews?: ReviewCreateNestedManyWithoutProductInput
    categories?: CategoriesOnProductsCreateNestedManyWithoutProductInput
    OrderItem?: OrderItemCreateNestedManyWithoutProductInput
    userWishlist?: WishlistCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    media?: MediasOnProductsUncheckedCreateNestedManyWithoutProductInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
    categories?: CategoriesOnProductsUncheckedCreateNestedManyWithoutProductInput
    OrderItem?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    userWishlist?: WishlistUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    media?: MediasOnProductsUpdateManyWithoutProductNestedInput
    reviews?: ReviewUpdateManyWithoutProductNestedInput
    categories?: CategoriesOnProductsUpdateManyWithoutProductNestedInput
    OrderItem?: OrderItemUpdateManyWithoutProductNestedInput
    userWishlist?: WishlistUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    media?: MediasOnProductsUncheckedUpdateManyWithoutProductNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
    categories?: CategoriesOnProductsUncheckedUpdateManyWithoutProductNestedInput
    OrderItem?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    userWishlist?: WishlistUncheckedUpdateManyWithoutProductNestedInput
  }

  export type ProductCreateManyInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type ProductUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductUncheckedUpdateManyInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewCreateInput = {
    id?: string
    userName: string
    rating: number
    comment: string
    imageUrl?: string | null
    helpful?: number
    notHelpful?: number
    verify?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    product: ProductCreateNestedOneWithoutReviewsInput
  }

  export type ReviewUncheckedCreateInput = {
    id?: string
    productId: string
    userName: string
    rating: number
    comment: string
    imageUrl?: string | null
    helpful?: number
    notHelpful?: number
    verify?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type ReviewUpdateInput = {
    userName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    helpful?: IntFieldUpdateOperationsInput | number
    notHelpful?: IntFieldUpdateOperationsInput | number
    verify?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    product?: ProductUpdateOneRequiredWithoutReviewsNestedInput
  }

  export type ReviewUncheckedUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    helpful?: IntFieldUpdateOperationsInput | number
    notHelpful?: IntFieldUpdateOperationsInput | number
    verify?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewCreateManyInput = {
    id?: string
    productId: string
    userName: string
    rating: number
    comment: string
    imageUrl?: string | null
    helpful?: number
    notHelpful?: number
    verify?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type ReviewUpdateManyMutationInput = {
    userName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    helpful?: IntFieldUpdateOperationsInput | number
    notHelpful?: IntFieldUpdateOperationsInput | number
    verify?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUncheckedUpdateManyInput = {
    productId?: StringFieldUpdateOperationsInput | string
    userName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    helpful?: IntFieldUpdateOperationsInput | number
    notHelpful?: IntFieldUpdateOperationsInput | number
    verify?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderItemCreateInput = {
    id?: string
    quantity: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
    product: ProductCreateNestedOneWithoutOrderItemInput
  }

  export type OrderItemUncheckedCreateInput = {
    id?: string
    orderId: string
    productId: string
    quantity: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderItemUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
    product?: ProductUpdateOneRequiredWithoutOrderItemNestedInput
  }

  export type OrderItemUncheckedUpdateInput = {
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyInput = {
    id?: string
    orderId: string
    productId: string
    quantity: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderItemUpdateManyMutationInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyInput = {
    orderId?: StringFieldUpdateOperationsInput | string
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    deliveryInfo: XOR<DeliveryInfoCreateEnvelopeInput, DeliveryInfoCreateInput>
    userData: XOR<UserDataCreateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListCreateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices: XOR<OrderPricesCreateEnvelopeInput, OrderPricesCreateInput>
    status?: $Enums.OrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
    user: UserCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    deliveryInfo: XOR<DeliveryInfoCreateEnvelopeInput, DeliveryInfoCreateInput>
    userData: XOR<UserDataCreateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListCreateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices: XOR<OrderPricesCreateEnvelopeInput, OrderPricesCreateInput>
    status?: $Enums.OrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    deliveryInfo?: XOR<DeliveryInfoUpdateEnvelopeInput, DeliveryInfoCreateInput>
    userData?: XOR<UserDataUpdateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListUpdateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices?: XOR<OrderPricesUpdateEnvelopeInput, OrderPricesCreateInput>
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
    user?: UserUpdateOneRequiredWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    deliveryInfo?: XOR<DeliveryInfoUpdateEnvelopeInput, DeliveryInfoCreateInput>
    userData?: XOR<UserDataUpdateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListUpdateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices?: XOR<OrderPricesUpdateEnvelopeInput, OrderPricesCreateInput>
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    deliveryInfo: XOR<DeliveryInfoCreateEnvelopeInput, DeliveryInfoCreateInput>
    userData: XOR<UserDataCreateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListCreateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices: XOR<OrderPricesCreateEnvelopeInput, OrderPricesCreateInput>
    status?: $Enums.OrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type OrderUpdateManyMutationInput = {
    deliveryInfo?: XOR<DeliveryInfoUpdateEnvelopeInput, DeliveryInfoCreateInput>
    userData?: XOR<UserDataUpdateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListUpdateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices?: XOR<OrderPricesUpdateEnvelopeInput, OrderPricesCreateInput>
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    deliveryInfo?: XOR<DeliveryInfoUpdateEnvelopeInput, DeliveryInfoCreateInput>
    userData?: XOR<UserDataUpdateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListUpdateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices?: XOR<OrderPricesUpdateEnvelopeInput, OrderPricesCreateInput>
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    fullName?: string | null
    avatar?: string | null
    phone?: string | null
    isAnonymous?: boolean
    productWishlist?: WishlistCreateNestedManyWithoutUserInput
    order?: OrderCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    fullName?: string | null
    avatar?: string | null
    phone?: string | null
    isAnonymous?: boolean
    productWishlist?: WishlistUncheckedCreateNestedManyWithoutUserInput
    order?: OrderUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    productWishlist?: WishlistUpdateManyWithoutUserNestedInput
    order?: OrderUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    productWishlist?: WishlistUncheckedUpdateManyWithoutUserNestedInput
    order?: OrderUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    fullName?: string | null
    avatar?: string | null
    phone?: string | null
    isAnonymous?: boolean
  }

  export type UserUpdateManyMutationInput = {
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CategoriesOnBlogsCreateInput = {
    id?: string
    assignedAt?: Date | string
    blog: BlogCreateNestedOneWithoutCategoriesInput
    category: CategoryCreateNestedOneWithoutBlogsInput
  }

  export type CategoriesOnBlogsUncheckedCreateInput = {
    id?: string
    blogId: string
    categoryId: string
    assignedAt?: Date | string
  }

  export type CategoriesOnBlogsUpdateInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blog?: BlogUpdateOneRequiredWithoutCategoriesNestedInput
    category?: CategoryUpdateOneRequiredWithoutBlogsNestedInput
  }

  export type CategoriesOnBlogsUncheckedUpdateInput = {
    blogId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriesOnBlogsCreateManyInput = {
    id?: string
    blogId: string
    categoryId: string
    assignedAt?: Date | string
  }

  export type CategoriesOnBlogsUpdateManyMutationInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriesOnBlogsUncheckedUpdateManyInput = {
    blogId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriesOnProductsCreateInput = {
    id?: string
    assignedAt?: Date | string
    product: ProductCreateNestedOneWithoutCategoriesInput
    category: CategoryCreateNestedOneWithoutProductsInput
  }

  export type CategoriesOnProductsUncheckedCreateInput = {
    id?: string
    productId: string
    categoryId: string
    assignedAt?: Date | string
  }

  export type CategoriesOnProductsUpdateInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutCategoriesNestedInput
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
  }

  export type CategoriesOnProductsUncheckedUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriesOnProductsCreateManyInput = {
    id?: string
    productId: string
    categoryId: string
    assignedAt?: Date | string
  }

  export type CategoriesOnProductsUpdateManyMutationInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriesOnProductsUncheckedUpdateManyInput = {
    productId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediasOnProductsCreateInput = {
    id?: string
    assignedAt?: Date | string
    product: ProductCreateNestedOneWithoutMediaInput
    media: MediaCreateNestedOneWithoutProductsInput
  }

  export type MediasOnProductsUncheckedCreateInput = {
    id?: string
    productId: string
    mediaId: string
    assignedAt?: Date | string
  }

  export type MediasOnProductsUpdateInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutMediaNestedInput
    media?: MediaUpdateOneRequiredWithoutProductsNestedInput
  }

  export type MediasOnProductsUncheckedUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediasOnProductsCreateManyInput = {
    id?: string
    productId: string
    mediaId: string
    assignedAt?: Date | string
  }

  export type MediasOnProductsUpdateManyMutationInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediasOnProductsUncheckedUpdateManyInput = {
    productId?: StringFieldUpdateOperationsInput | string
    mediaId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishlistCreateInput = {
    id?: string
    assignedAt?: Date | string
    product: ProductCreateNestedOneWithoutUserWishlistInput
    user: UserCreateNestedOneWithoutProductWishlistInput
  }

  export type WishlistUncheckedCreateInput = {
    id?: string
    productId: string
    userId: string
    assignedAt?: Date | string
  }

  export type WishlistUpdateInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutUserWishlistNestedInput
    user?: UserUpdateOneRequiredWithoutProductWishlistNestedInput
  }

  export type WishlistUncheckedUpdateInput = {
    productId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishlistCreateManyInput = {
    id?: string
    productId: string
    userId: string
    assignedAt?: Date | string
  }

  export type WishlistUpdateManyMutationInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishlistUncheckedUpdateManyInput = {
    productId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type EnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type MediasOnProductsListRelationFilter = {
    every?: MediasOnProductsWhereInput
    some?: MediasOnProductsWhereInput
    none?: MediasOnProductsWhereInput
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type MediasOnProductsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MediaCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    fileName?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
    url?: SortOrder
    blurDataUrl?: SortOrder
    creatorId?: SortOrder
  }

  export type MediaMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    fileName?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
    url?: SortOrder
    blurDataUrl?: SortOrder
    creatorId?: SortOrder
  }

  export type MediaMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    fileName?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
    url?: SortOrder
    blurDataUrl?: SortOrder
    creatorId?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumShipmentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentMethod | EnumShipmentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentMethod[] | ListEnumShipmentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentMethod[] | ListEnumShipmentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentMethodFilter<$PrismaModel> | $Enums.ShipmentMethod
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ShipmentCountOrderByAggregateInput = {
    id?: SortOrder
    method?: SortOrder
    isActive?: SortOrder
    cost?: SortOrder
    locations?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type ShipmentAvgOrderByAggregateInput = {
    cost?: SortOrder
  }

  export type ShipmentMaxOrderByAggregateInput = {
    id?: SortOrder
    method?: SortOrder
    isActive?: SortOrder
    cost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type ShipmentMinOrderByAggregateInput = {
    id?: SortOrder
    method?: SortOrder
    isActive?: SortOrder
    cost?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type ShipmentSumOrderByAggregateInput = {
    cost?: SortOrder
  }

  export type EnumShipmentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentMethod | EnumShipmentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentMethod[] | ListEnumShipmentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentMethod[] | ListEnumShipmentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentMethodWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShipmentMethodFilter<$PrismaModel>
    _max?: NestedEnumShipmentMethodFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type SeoMetadataNullableCompositeFilter = {
    equals?: SeoMetadataObjectEqualityInput | null
    is?: SeoMetadataWhereInput | null
    isNot?: SeoMetadataWhereInput | null
    isSet?: boolean
  }

  export type SeoMetadataObjectEqualityInput = {
    seoTitle?: string | null
    seoDescription?: string | null
    keywords?: string[]
  }

  export type MediaNullableScalarRelationFilter = {
    is?: MediaWhereInput | null
    isNot?: MediaWhereInput | null
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type CategoriesOnBlogsListRelationFilter = {
    every?: CategoriesOnBlogsWhereInput
    some?: CategoriesOnBlogsWhereInput
    none?: CategoriesOnBlogsWhereInput
  }

  export type CategoriesOnProductsListRelationFilter = {
    every?: CategoriesOnProductsWhereInput
    some?: CategoriesOnProductsWhereInput
    none?: CategoriesOnProductsWhereInput
  }

  export type SeoMetadataOrderByInput = {
    seoTitle?: SortOrder
    seoDescription?: SortOrder
    keywords?: SortOrder
  }

  export type CategoriesOnBlogsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoriesOnProductsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    imageId?: SortOrder
    featured?: SortOrder
    parentId?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    imageId?: SortOrder
    featured?: SortOrder
    parentId?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    imageId?: SortOrder
    featured?: SortOrder
    parentId?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PromotionConditionCompositeListFilter = {
    equals?: PromotionConditionObjectEqualityInput[]
    every?: PromotionConditionWhereInput
    some?: PromotionConditionWhereInput
    none?: PromotionConditionWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type PromotionConditionObjectEqualityInput = {
    type: $Enums.PromotionConditionType
    value: string
  }

  export type PromotionActionCompositeListFilter = {
    equals?: PromotionActionObjectEqualityInput[]
    every?: PromotionActionWhereInput
    some?: PromotionActionWhereInput
    none?: PromotionActionWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type PromotionActionObjectEqualityInput = {
    type: $Enums.PromotionActionType
    value: string
    maxDiscount?: number | null
  }

  export type UsageLimitNullableCompositeFilter = {
    equals?: UsageLimitObjectEqualityInput | null
    is?: UsageLimitWhereInput | null
    isNot?: UsageLimitWhereInput | null
    isSet?: boolean
  }

  export type UsageLimitObjectEqualityInput = {
    perCustomer?: number | null
    total?: number | null
  }

  export type EnumPromotionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionStatus | EnumPromotionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PromotionStatus[] | ListEnumPromotionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromotionStatus[] | ListEnumPromotionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPromotionStatusFilter<$PrismaModel> | $Enums.PromotionStatus
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MetadataCompositeFilter = {
    equals?: MetadataObjectEqualityInput
    is?: MetadataWhereInput
    isNot?: MetadataWhereInput
  }

  export type MetadataObjectEqualityInput = {
    createdBy: string
    updatedBy: string
    notes?: string | null
  }

  export type PromotionConditionOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type PromotionActionOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type UsageLimitOrderByInput = {
    perCustomer?: SortOrder
    total?: SortOrder
  }

  export type MetadataOrderByInput = {
    createdBy?: SortOrder
    updatedBy?: SortOrder
    notes?: SortOrder
  }

  export type PromotionCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type PromotionAvgOrderByAggregateInput = {
    priority?: SortOrder
  }

  export type PromotionMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type PromotionMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    description?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    status?: SortOrder
    priority?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type PromotionSumOrderByAggregateInput = {
    priority?: SortOrder
  }

  export type EnumPromotionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionStatus | EnumPromotionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PromotionStatus[] | ListEnumPromotionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromotionStatus[] | ListEnumPromotionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPromotionStatusWithAggregatesFilter<$PrismaModel> | $Enums.PromotionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPromotionStatusFilter<$PrismaModel>
    _max?: NestedEnumPromotionStatusFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BlogScalarRelationFilter = {
    is?: BlogWhereInput
    isNot?: BlogWhereInput
  }

  export type CommentCountOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    blogId?: SortOrder
  }

  export type CommentMaxOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    blogId?: SortOrder
  }

  export type CommentMinOrderByAggregateInput = {
    id?: SortOrder
    comment?: SortOrder
    blogId?: SortOrder
  }

  export type BlogContentCompositeFilter = {
    equals?: BlogContentObjectEqualityInput
    is?: BlogContentWhereInput
    isNot?: BlogContentWhereInput
  }

  export type BlogContentObjectEqualityInput = {
    type: $Enums.BlogContentType
    content: string
    excerpt?: string | null
  }

  export type BlogMetadataCompositeFilter = {
    equals?: BlogMetadataObjectEqualityInput
    is?: BlogMetadataWhereInput
    isNot?: BlogMetadataWhereInput
  }

  export type BlogMetadataObjectEqualityInput = {
    title: string
    description?: string | null
    keywords?: string[]
    author: BlogAuthorObjectEqualityInput
    readingTime?: number | null
    coverImageURL?: string | null
    blurDataUrl?: string | null
    featured: boolean
  }

  export type EnumBlogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogStatus | EnumBlogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BlogStatus[] | ListEnumBlogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogStatus[] | ListEnumBlogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogStatusFilter<$PrismaModel> | $Enums.BlogStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type CustomFieldsCompositeListFilter = {
    equals?: CustomFieldsObjectEqualityInput[]
    every?: CustomFieldsWhereInput
    some?: CustomFieldsWhereInput
    none?: CustomFieldsWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type CustomFieldsObjectEqualityInput = {
    key: string
    value: string
  }

  export type EnumBlogLayoutFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogLayout | EnumBlogLayoutFieldRefInput<$PrismaModel>
    in?: $Enums.BlogLayout[] | ListEnumBlogLayoutFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogLayout[] | ListEnumBlogLayoutFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogLayoutFilter<$PrismaModel> | $Enums.BlogLayout
  }

  export type CommentListRelationFilter = {
    every?: CommentWhereInput
    some?: CommentWhereInput
    none?: CommentWhereInput
  }

  export type BlogContentOrderByInput = {
    type?: SortOrder
    content?: SortOrder
    excerpt?: SortOrder
  }

  export type BlogMetadataOrderByInput = {
    title?: SortOrder
    description?: SortOrder
    keywords?: SortOrder
    author?: BlogAuthorOrderByInput
    readingTime?: SortOrder
    coverImageURL?: SortOrder
    blurDataUrl?: SortOrder
    featured?: SortOrder
  }

  export type CustomFieldsOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type CommentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BlogCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    tags?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrder
    layout?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrder
    layout?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BlogMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    title?: SortOrder
    status?: SortOrder
    publishedAt?: SortOrder
    layout?: SortOrder
    creatorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumBlogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogStatus | EnumBlogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BlogStatus[] | ListEnumBlogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogStatus[] | ListEnumBlogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogStatusWithAggregatesFilter<$PrismaModel> | $Enums.BlogStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBlogStatusFilter<$PrismaModel>
    _max?: NestedEnumBlogStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type EnumBlogLayoutWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogLayout | EnumBlogLayoutFieldRefInput<$PrismaModel>
    in?: $Enums.BlogLayout[] | ListEnumBlogLayoutFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogLayout[] | ListEnumBlogLayoutFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogLayoutWithAggregatesFilter<$PrismaModel> | $Enums.BlogLayout
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBlogLayoutFilter<$PrismaModel>
    _max?: NestedEnumBlogLayoutFilter<$PrismaModel>
  }

  export type ProductDescriptionCompositeFilter = {
    equals?: ProductDescriptionObjectEqualityInput
    is?: ProductDescriptionWhereInput
    isNot?: ProductDescriptionWhereInput
  }

  export type ProductDescriptionObjectEqualityInput = {
    contentType: $Enums.ProductContentType
    content: string
  }

  export type PriceCompositeFilter = {
    equals?: PriceObjectEqualityInput
    is?: PriceWhereInput
    isNot?: PriceWhereInput
  }

  export type PriceObjectEqualityInput = {
    regular: number
    sale?: number | null
    saleStartDate?: Date | string | null
    saleEndDate?: Date | string | null
  }

  export type FeatureCompositeListFilter = {
    equals?: FeatureObjectEqualityInput[]
    every?: FeatureWhereInput
    some?: FeatureWhereInput
    none?: FeatureWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type FeatureObjectEqualityInput = {
    icon?: string | null
    title: string
    description?: ProductDescriptionObjectEqualityInput | null
  }

  export type EnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus
  }

  export type InventoryCompositeFilter = {
    equals?: InventoryObjectEqualityInput
    is?: InventoryWhereInput
    isNot?: InventoryWhereInput
  }

  export type InventoryObjectEqualityInput = {
    quantity: number
    lowStockThreshold: number
    stockQuantity: number
  }

  export type ProductSeoMetadataCompositeFilter = {
    equals?: ProductSeoMetadataObjectEqualityInput
    is?: ProductSeoMetadataWhereInput
    isNot?: ProductSeoMetadataWhereInput
  }

  export type ProductSeoMetadataObjectEqualityInput = {
    seoTitle: string
    seoDescription: string
    keywords?: string[]
  }

  export type ReviewListRelationFilter = {
    every?: ReviewWhereInput
    some?: ReviewWhereInput
    none?: ReviewWhereInput
  }

  export type OrderItemListRelationFilter = {
    every?: OrderItemWhereInput
    some?: OrderItemWhereInput
    none?: OrderItemWhereInput
  }

  export type WishlistListRelationFilter = {
    every?: WishlistWhereInput
    some?: WishlistWhereInput
    none?: WishlistWhereInput
  }

  export type ProductDescriptionOrderByInput = {
    contentType?: SortOrder
    content?: SortOrder
  }

  export type PriceOrderByInput = {
    regular?: SortOrder
    sale?: SortOrder
    saleStartDate?: SortOrder
    saleEndDate?: SortOrder
  }

  export type FeatureOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type InventoryOrderByInput = {
    quantity?: SortOrder
    lowStockThreshold?: SortOrder
    stockQuantity?: SortOrder
  }

  export type ProductSeoMetadataOrderByInput = {
    seoTitle?: SortOrder
    seoDescription?: SortOrder
    keywords?: SortOrder
  }

  export type ReviewOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OrderItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WishlistOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    isFeature?: SortOrder
    isNewProduct?: SortOrder
    tags?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    blogUrl?: SortOrder
    partnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    isFeature?: SortOrder
    isNewProduct?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    blogUrl?: SortOrder
    partnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    isFeature?: SortOrder
    isNewProduct?: SortOrder
    status?: SortOrder
    visibility?: SortOrder
    blogUrl?: SortOrder
    partnerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type EnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductStatusFilter<$PrismaModel>
    _max?: NestedEnumProductStatusFilter<$PrismaModel>
  }

  export type ProductScalarRelationFilter = {
    is?: ProductWhereInput
    isNot?: ProductWhereInput
  }

  export type ReviewCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    userName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    imageUrl?: SortOrder
    helpful?: SortOrder
    notHelpful?: SortOrder
    verify?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type ReviewAvgOrderByAggregateInput = {
    rating?: SortOrder
    helpful?: SortOrder
    notHelpful?: SortOrder
  }

  export type ReviewMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    userName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    imageUrl?: SortOrder
    helpful?: SortOrder
    notHelpful?: SortOrder
    verify?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type ReviewMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    userName?: SortOrder
    rating?: SortOrder
    comment?: SortOrder
    imageUrl?: SortOrder
    helpful?: SortOrder
    notHelpful?: SortOrder
    verify?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    creatorId?: SortOrder
  }

  export type ReviewSumOrderByAggregateInput = {
    rating?: SortOrder
    helpful?: SortOrder
    notHelpful?: SortOrder
  }

  export type OrderScalarRelationFilter = {
    is?: OrderWhereInput
    isNot?: OrderWhereInput
  }

  export type OrderItemOrderIdProductIdCompoundUniqueInput = {
    orderId: string
    productId: string
  }

  export type OrderItemCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderItemAvgOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  export type OrderItemMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderItemMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    productId?: SortOrder
    quantity?: SortOrder
    price?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderItemSumOrderByAggregateInput = {
    quantity?: SortOrder
    price?: SortOrder
  }

  export type DeliveryInfoCompositeFilter = {
    equals?: DeliveryInfoObjectEqualityInput
    is?: DeliveryInfoWhereInput
    isNot?: DeliveryInfoWhereInput
  }

  export type DeliveryInfoObjectEqualityInput = {
    address: string
    deliveryDate: Date | string
    deliveryTime: string
    city?: string | null
    additionalNotes?: string | null
    deliveryMethod?: string | null
    location?: string | null
  }

  export type UserDataCompositeFilter = {
    equals?: UserDataObjectEqualityInput
    is?: UserDataWhereInput
    isNot?: UserDataWhereInput
  }

  export type UserDataObjectEqualityInput = {
    id: string
    email: string
    fullName: string
    phone: string
  }

  export type OrderPromotionCompositeListFilter = {
    equals?: OrderPromotionObjectEqualityInput[]
    every?: OrderPromotionWhereInput
    some?: OrderPromotionWhereInput
    none?: OrderPromotionWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type OrderPromotionObjectEqualityInput = {
    promotionId: string
    discountAmount: number
    code: string
  }

  export type OrderPricesCompositeFilter = {
    equals?: OrderPricesObjectEqualityInput
    is?: OrderPricesWhereInput
    isNot?: OrderPricesWhereInput
  }

  export type OrderPricesObjectEqualityInput = {
    subtotal: number
    shipping: number
    discount: number
    total: number
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type DeliveryInfoOrderByInput = {
    address?: SortOrder
    deliveryDate?: SortOrder
    deliveryTime?: SortOrder
    city?: SortOrder
    additionalNotes?: SortOrder
    deliveryMethod?: SortOrder
    location?: SortOrder
  }

  export type UserDataOrderByInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    phone?: SortOrder
  }

  export type OrderPromotionOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type OrderPricesOrderByInput = {
    subtotal?: SortOrder
    shipping?: SortOrder
    discount?: SortOrder
    total?: SortOrder
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    userId?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    avatar?: SortOrder
    phone?: SortOrder
    isAnonymous?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    avatar?: SortOrder
    phone?: SortOrder
    isAnonymous?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    clerkId?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    avatar?: SortOrder
    phone?: SortOrder
    isAnonymous?: SortOrder
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type CategoriesOnBlogsBlogIdCategoryIdCompoundUniqueInput = {
    blogId: string
    categoryId: string
  }

  export type CategoriesOnBlogsCountOrderByAggregateInput = {
    id?: SortOrder
    blogId?: SortOrder
    categoryId?: SortOrder
    assignedAt?: SortOrder
  }

  export type CategoriesOnBlogsMaxOrderByAggregateInput = {
    id?: SortOrder
    blogId?: SortOrder
    categoryId?: SortOrder
    assignedAt?: SortOrder
  }

  export type CategoriesOnBlogsMinOrderByAggregateInput = {
    id?: SortOrder
    blogId?: SortOrder
    categoryId?: SortOrder
    assignedAt?: SortOrder
  }

  export type CategoriesOnProductsProductIdCategoryIdCompoundUniqueInput = {
    productId: string
    categoryId: string
  }

  export type CategoriesOnProductsCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    categoryId?: SortOrder
    assignedAt?: SortOrder
  }

  export type CategoriesOnProductsMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    categoryId?: SortOrder
    assignedAt?: SortOrder
  }

  export type CategoriesOnProductsMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    categoryId?: SortOrder
    assignedAt?: SortOrder
  }

  export type MediaScalarRelationFilter = {
    is?: MediaWhereInput
    isNot?: MediaWhereInput
  }

  export type MediasOnProductsProductIdMediaIdCompoundUniqueInput = {
    productId: string
    mediaId: string
  }

  export type MediasOnProductsCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    mediaId?: SortOrder
    assignedAt?: SortOrder
  }

  export type MediasOnProductsMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    mediaId?: SortOrder
    assignedAt?: SortOrder
  }

  export type MediasOnProductsMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    mediaId?: SortOrder
    assignedAt?: SortOrder
  }

  export type WishlistProductIdUserIdCompoundUniqueInput = {
    productId: string
    userId: string
  }

  export type WishlistCountOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
  }

  export type WishlistMaxOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
  }

  export type WishlistMinOrderByAggregateInput = {
    id?: SortOrder
    productId?: SortOrder
    userId?: SortOrder
    assignedAt?: SortOrder
  }

  export type MediasOnProductsCreateNestedManyWithoutMediaInput = {
    create?: XOR<MediasOnProductsCreateWithoutMediaInput, MediasOnProductsUncheckedCreateWithoutMediaInput> | MediasOnProductsCreateWithoutMediaInput[] | MediasOnProductsUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: MediasOnProductsCreateOrConnectWithoutMediaInput | MediasOnProductsCreateOrConnectWithoutMediaInput[]
    createMany?: MediasOnProductsCreateManyMediaInputEnvelope
    connect?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
  }

  export type CategoryCreateNestedManyWithoutImageInput = {
    create?: XOR<CategoryCreateWithoutImageInput, CategoryUncheckedCreateWithoutImageInput> | CategoryCreateWithoutImageInput[] | CategoryUncheckedCreateWithoutImageInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutImageInput | CategoryCreateOrConnectWithoutImageInput[]
    createMany?: CategoryCreateManyImageInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type MediasOnProductsUncheckedCreateNestedManyWithoutMediaInput = {
    create?: XOR<MediasOnProductsCreateWithoutMediaInput, MediasOnProductsUncheckedCreateWithoutMediaInput> | MediasOnProductsCreateWithoutMediaInput[] | MediasOnProductsUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: MediasOnProductsCreateOrConnectWithoutMediaInput | MediasOnProductsCreateOrConnectWithoutMediaInput[]
    createMany?: MediasOnProductsCreateManyMediaInputEnvelope
    connect?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutImageInput = {
    create?: XOR<CategoryCreateWithoutImageInput, CategoryUncheckedCreateWithoutImageInput> | CategoryCreateWithoutImageInput[] | CategoryUncheckedCreateWithoutImageInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutImageInput | CategoryCreateOrConnectWithoutImageInput[]
    createMany?: CategoryCreateManyImageInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumMediaTypeFieldUpdateOperationsInput = {
    set?: $Enums.MediaType
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type MediasOnProductsUpdateManyWithoutMediaNestedInput = {
    create?: XOR<MediasOnProductsCreateWithoutMediaInput, MediasOnProductsUncheckedCreateWithoutMediaInput> | MediasOnProductsCreateWithoutMediaInput[] | MediasOnProductsUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: MediasOnProductsCreateOrConnectWithoutMediaInput | MediasOnProductsCreateOrConnectWithoutMediaInput[]
    upsert?: MediasOnProductsUpsertWithWhereUniqueWithoutMediaInput | MediasOnProductsUpsertWithWhereUniqueWithoutMediaInput[]
    createMany?: MediasOnProductsCreateManyMediaInputEnvelope
    set?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    disconnect?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    delete?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    connect?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    update?: MediasOnProductsUpdateWithWhereUniqueWithoutMediaInput | MediasOnProductsUpdateWithWhereUniqueWithoutMediaInput[]
    updateMany?: MediasOnProductsUpdateManyWithWhereWithoutMediaInput | MediasOnProductsUpdateManyWithWhereWithoutMediaInput[]
    deleteMany?: MediasOnProductsScalarWhereInput | MediasOnProductsScalarWhereInput[]
  }

  export type CategoryUpdateManyWithoutImageNestedInput = {
    create?: XOR<CategoryCreateWithoutImageInput, CategoryUncheckedCreateWithoutImageInput> | CategoryCreateWithoutImageInput[] | CategoryUncheckedCreateWithoutImageInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutImageInput | CategoryCreateOrConnectWithoutImageInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutImageInput | CategoryUpsertWithWhereUniqueWithoutImageInput[]
    createMany?: CategoryCreateManyImageInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutImageInput | CategoryUpdateWithWhereUniqueWithoutImageInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutImageInput | CategoryUpdateManyWithWhereWithoutImageInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type MediasOnProductsUncheckedUpdateManyWithoutMediaNestedInput = {
    create?: XOR<MediasOnProductsCreateWithoutMediaInput, MediasOnProductsUncheckedCreateWithoutMediaInput> | MediasOnProductsCreateWithoutMediaInput[] | MediasOnProductsUncheckedCreateWithoutMediaInput[]
    connectOrCreate?: MediasOnProductsCreateOrConnectWithoutMediaInput | MediasOnProductsCreateOrConnectWithoutMediaInput[]
    upsert?: MediasOnProductsUpsertWithWhereUniqueWithoutMediaInput | MediasOnProductsUpsertWithWhereUniqueWithoutMediaInput[]
    createMany?: MediasOnProductsCreateManyMediaInputEnvelope
    set?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    disconnect?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    delete?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    connect?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    update?: MediasOnProductsUpdateWithWhereUniqueWithoutMediaInput | MediasOnProductsUpdateWithWhereUniqueWithoutMediaInput[]
    updateMany?: MediasOnProductsUpdateManyWithWhereWithoutMediaInput | MediasOnProductsUpdateManyWithWhereWithoutMediaInput[]
    deleteMany?: MediasOnProductsScalarWhereInput | MediasOnProductsScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutImageNestedInput = {
    create?: XOR<CategoryCreateWithoutImageInput, CategoryUncheckedCreateWithoutImageInput> | CategoryCreateWithoutImageInput[] | CategoryUncheckedCreateWithoutImageInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutImageInput | CategoryCreateOrConnectWithoutImageInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutImageInput | CategoryUpsertWithWhereUniqueWithoutImageInput[]
    createMany?: CategoryCreateManyImageInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutImageInput | CategoryUpdateWithWhereUniqueWithoutImageInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutImageInput | CategoryUpdateManyWithWhereWithoutImageInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type ShipmentCreatelocationsInput = {
    set: string[]
  }

  export type EnumShipmentMethodFieldUpdateOperationsInput = {
    set?: $Enums.ShipmentMethod
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ShipmentUpdatelocationsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type SeoMetadataNullableCreateEnvelopeInput = {
    set?: SeoMetadataCreateInput | null
  }

  export type SeoMetadataCreateInput = {
    seoTitle?: string | null
    seoDescription?: string | null
    keywords?: SeoMetadataCreatekeywordsInput | string[]
  }

  export type MediaCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<MediaCreateWithoutCategoriesInput, MediaUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: MediaCreateOrConnectWithoutCategoriesInput
    connect?: MediaWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutChildrenInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    connect?: CategoryWhereUniqueInput
  }

  export type CategoryCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type CategoriesOnBlogsCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoriesOnBlogsCreateWithoutCategoryInput, CategoriesOnBlogsUncheckedCreateWithoutCategoryInput> | CategoriesOnBlogsCreateWithoutCategoryInput[] | CategoriesOnBlogsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoriesOnBlogsCreateOrConnectWithoutCategoryInput | CategoriesOnBlogsCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoriesOnBlogsCreateManyCategoryInputEnvelope
    connect?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
  }

  export type CategoriesOnProductsCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoriesOnProductsCreateWithoutCategoryInput, CategoriesOnProductsUncheckedCreateWithoutCategoryInput> | CategoriesOnProductsCreateWithoutCategoryInput[] | CategoriesOnProductsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoriesOnProductsCreateOrConnectWithoutCategoryInput | CategoriesOnProductsCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoriesOnProductsCreateManyCategoryInputEnvelope
    connect?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type CategoriesOnBlogsUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoriesOnBlogsCreateWithoutCategoryInput, CategoriesOnBlogsUncheckedCreateWithoutCategoryInput> | CategoriesOnBlogsCreateWithoutCategoryInput[] | CategoriesOnBlogsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoriesOnBlogsCreateOrConnectWithoutCategoryInput | CategoriesOnBlogsCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoriesOnBlogsCreateManyCategoryInputEnvelope
    connect?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
  }

  export type CategoriesOnProductsUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<CategoriesOnProductsCreateWithoutCategoryInput, CategoriesOnProductsUncheckedCreateWithoutCategoryInput> | CategoriesOnProductsCreateWithoutCategoryInput[] | CategoriesOnProductsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoriesOnProductsCreateOrConnectWithoutCategoryInput | CategoriesOnProductsCreateOrConnectWithoutCategoryInput[]
    createMany?: CategoriesOnProductsCreateManyCategoryInputEnvelope
    connect?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
  }

  export type SeoMetadataNullableUpdateEnvelopeInput = {
    set?: SeoMetadataCreateInput | null
    upsert?: SeoMetadataUpsertInput
    unset?: boolean
  }

  export type MediaUpdateOneWithoutCategoriesNestedInput = {
    create?: XOR<MediaCreateWithoutCategoriesInput, MediaUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: MediaCreateOrConnectWithoutCategoriesInput
    upsert?: MediaUpsertWithoutCategoriesInput
    disconnect?: boolean
    delete?: MediaWhereInput | boolean
    connect?: MediaWhereUniqueInput
    update?: XOR<XOR<MediaUpdateToOneWithWhereWithoutCategoriesInput, MediaUpdateWithoutCategoriesInput>, MediaUncheckedUpdateWithoutCategoriesInput>
  }

  export type CategoryUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutChildrenInput
    upsert?: CategoryUpsertWithoutChildrenInput
    disconnect?: boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutChildrenInput, CategoryUpdateWithoutChildrenInput>, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type CategoriesOnBlogsUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoriesOnBlogsCreateWithoutCategoryInput, CategoriesOnBlogsUncheckedCreateWithoutCategoryInput> | CategoriesOnBlogsCreateWithoutCategoryInput[] | CategoriesOnBlogsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoriesOnBlogsCreateOrConnectWithoutCategoryInput | CategoriesOnBlogsCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoriesOnBlogsUpsertWithWhereUniqueWithoutCategoryInput | CategoriesOnBlogsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoriesOnBlogsCreateManyCategoryInputEnvelope
    set?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    disconnect?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    delete?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    connect?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    update?: CategoriesOnBlogsUpdateWithWhereUniqueWithoutCategoryInput | CategoriesOnBlogsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoriesOnBlogsUpdateManyWithWhereWithoutCategoryInput | CategoriesOnBlogsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoriesOnBlogsScalarWhereInput | CategoriesOnBlogsScalarWhereInput[]
  }

  export type CategoriesOnProductsUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoriesOnProductsCreateWithoutCategoryInput, CategoriesOnProductsUncheckedCreateWithoutCategoryInput> | CategoriesOnProductsCreateWithoutCategoryInput[] | CategoriesOnProductsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoriesOnProductsCreateOrConnectWithoutCategoryInput | CategoriesOnProductsCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoriesOnProductsUpsertWithWhereUniqueWithoutCategoryInput | CategoriesOnProductsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoriesOnProductsCreateManyCategoryInputEnvelope
    set?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    disconnect?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    delete?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    connect?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    update?: CategoriesOnProductsUpdateWithWhereUniqueWithoutCategoryInput | CategoriesOnProductsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoriesOnProductsUpdateManyWithWhereWithoutCategoryInput | CategoriesOnProductsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoriesOnProductsScalarWhereInput | CategoriesOnProductsScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput> | CategoryCreateWithoutParentInput[] | CategoryUncheckedCreateWithoutParentInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutParentInput | CategoryCreateOrConnectWithoutParentInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutParentInput | CategoryUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: CategoryCreateManyParentInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutParentInput | CategoryUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutParentInput | CategoryUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type CategoriesOnBlogsUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoriesOnBlogsCreateWithoutCategoryInput, CategoriesOnBlogsUncheckedCreateWithoutCategoryInput> | CategoriesOnBlogsCreateWithoutCategoryInput[] | CategoriesOnBlogsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoriesOnBlogsCreateOrConnectWithoutCategoryInput | CategoriesOnBlogsCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoriesOnBlogsUpsertWithWhereUniqueWithoutCategoryInput | CategoriesOnBlogsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoriesOnBlogsCreateManyCategoryInputEnvelope
    set?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    disconnect?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    delete?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    connect?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    update?: CategoriesOnBlogsUpdateWithWhereUniqueWithoutCategoryInput | CategoriesOnBlogsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoriesOnBlogsUpdateManyWithWhereWithoutCategoryInput | CategoriesOnBlogsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoriesOnBlogsScalarWhereInput | CategoriesOnBlogsScalarWhereInput[]
  }

  export type CategoriesOnProductsUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<CategoriesOnProductsCreateWithoutCategoryInput, CategoriesOnProductsUncheckedCreateWithoutCategoryInput> | CategoriesOnProductsCreateWithoutCategoryInput[] | CategoriesOnProductsUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: CategoriesOnProductsCreateOrConnectWithoutCategoryInput | CategoriesOnProductsCreateOrConnectWithoutCategoryInput[]
    upsert?: CategoriesOnProductsUpsertWithWhereUniqueWithoutCategoryInput | CategoriesOnProductsUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: CategoriesOnProductsCreateManyCategoryInputEnvelope
    set?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    disconnect?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    delete?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    connect?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    update?: CategoriesOnProductsUpdateWithWhereUniqueWithoutCategoryInput | CategoriesOnProductsUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: CategoriesOnProductsUpdateManyWithWhereWithoutCategoryInput | CategoriesOnProductsUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: CategoriesOnProductsScalarWhereInput | CategoriesOnProductsScalarWhereInput[]
  }

  export type PromotionConditionListCreateEnvelopeInput = {
    set?: PromotionConditionCreateInput | PromotionConditionCreateInput[]
  }

  export type PromotionConditionCreateInput = {
    type: $Enums.PromotionConditionType
    value: string
  }

  export type PromotionActionListCreateEnvelopeInput = {
    set?: PromotionActionCreateInput | PromotionActionCreateInput[]
  }

  export type PromotionActionCreateInput = {
    type: $Enums.PromotionActionType
    value: string
    maxDiscount?: number | null
  }

  export type UsageLimitNullableCreateEnvelopeInput = {
    set?: UsageLimitCreateInput | null
  }

  export type UsageLimitCreateInput = {
    perCustomer?: number | null
    total?: number | null
  }

  export type MetadataCreateEnvelopeInput = {
    set?: MetadataCreateInput
  }

  export type MetadataCreateInput = {
    createdBy: string
    updatedBy: string
    notes?: string | null
  }

  export type PromotionConditionListUpdateEnvelopeInput = {
    set?: PromotionConditionCreateInput | PromotionConditionCreateInput[]
    push?: PromotionConditionCreateInput | PromotionConditionCreateInput[]
    updateMany?: PromotionConditionUpdateManyInput
    deleteMany?: PromotionConditionDeleteManyInput
  }

  export type PromotionActionListUpdateEnvelopeInput = {
    set?: PromotionActionCreateInput | PromotionActionCreateInput[]
    push?: PromotionActionCreateInput | PromotionActionCreateInput[]
    updateMany?: PromotionActionUpdateManyInput
    deleteMany?: PromotionActionDeleteManyInput
  }

  export type UsageLimitNullableUpdateEnvelopeInput = {
    set?: UsageLimitCreateInput | null
    upsert?: UsageLimitUpsertInput
    unset?: boolean
  }

  export type EnumPromotionStatusFieldUpdateOperationsInput = {
    set?: $Enums.PromotionStatus
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MetadataUpdateEnvelopeInput = {
    set?: MetadataCreateInput
    update?: MetadataUpdateInput
  }

  export type BlogCreateNestedOneWithoutCommentsInput = {
    create?: XOR<BlogCreateWithoutCommentsInput, BlogUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: BlogCreateOrConnectWithoutCommentsInput
    connect?: BlogWhereUniqueInput
  }

  export type BlogUpdateOneRequiredWithoutCommentsNestedInput = {
    create?: XOR<BlogCreateWithoutCommentsInput, BlogUncheckedCreateWithoutCommentsInput>
    connectOrCreate?: BlogCreateOrConnectWithoutCommentsInput
    upsert?: BlogUpsertWithoutCommentsInput
    connect?: BlogWhereUniqueInput
    update?: XOR<XOR<BlogUpdateToOneWithWhereWithoutCommentsInput, BlogUpdateWithoutCommentsInput>, BlogUncheckedUpdateWithoutCommentsInput>
  }

  export type BlogContentCreateEnvelopeInput = {
    set?: BlogContentCreateInput
  }

  export type BlogContentCreateInput = {
    type: $Enums.BlogContentType
    content: string
    excerpt?: string | null
  }

  export type BlogMetadataCreateEnvelopeInput = {
    set?: BlogMetadataCreateInput
  }

  export type BlogMetadataCreateInput = {
    title: string
    description?: string | null
    keywords?: BlogMetadataCreatekeywordsInput | string[]
    author: BlogAuthorCreateInput
    readingTime?: number | null
    coverImageURL?: string | null
    blurDataUrl?: string | null
    featured?: boolean
  }

  export type BlogCreatetagsInput = {
    set: string[]
  }

  export type CustomFieldsListCreateEnvelopeInput = {
    set?: CustomFieldsCreateInput | CustomFieldsCreateInput[]
  }

  export type CustomFieldsCreateInput = {
    key: string
    value: string
  }

  export type CategoriesOnBlogsCreateNestedManyWithoutBlogInput = {
    create?: XOR<CategoriesOnBlogsCreateWithoutBlogInput, CategoriesOnBlogsUncheckedCreateWithoutBlogInput> | CategoriesOnBlogsCreateWithoutBlogInput[] | CategoriesOnBlogsUncheckedCreateWithoutBlogInput[]
    connectOrCreate?: CategoriesOnBlogsCreateOrConnectWithoutBlogInput | CategoriesOnBlogsCreateOrConnectWithoutBlogInput[]
    createMany?: CategoriesOnBlogsCreateManyBlogInputEnvelope
    connect?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
  }

  export type CommentCreateNestedManyWithoutBlogInput = {
    create?: XOR<CommentCreateWithoutBlogInput, CommentUncheckedCreateWithoutBlogInput> | CommentCreateWithoutBlogInput[] | CommentUncheckedCreateWithoutBlogInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutBlogInput | CommentCreateOrConnectWithoutBlogInput[]
    createMany?: CommentCreateManyBlogInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type CategoriesOnBlogsUncheckedCreateNestedManyWithoutBlogInput = {
    create?: XOR<CategoriesOnBlogsCreateWithoutBlogInput, CategoriesOnBlogsUncheckedCreateWithoutBlogInput> | CategoriesOnBlogsCreateWithoutBlogInput[] | CategoriesOnBlogsUncheckedCreateWithoutBlogInput[]
    connectOrCreate?: CategoriesOnBlogsCreateOrConnectWithoutBlogInput | CategoriesOnBlogsCreateOrConnectWithoutBlogInput[]
    createMany?: CategoriesOnBlogsCreateManyBlogInputEnvelope
    connect?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
  }

  export type CommentUncheckedCreateNestedManyWithoutBlogInput = {
    create?: XOR<CommentCreateWithoutBlogInput, CommentUncheckedCreateWithoutBlogInput> | CommentCreateWithoutBlogInput[] | CommentUncheckedCreateWithoutBlogInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutBlogInput | CommentCreateOrConnectWithoutBlogInput[]
    createMany?: CommentCreateManyBlogInputEnvelope
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
  }

  export type BlogContentUpdateEnvelopeInput = {
    set?: BlogContentCreateInput
    update?: BlogContentUpdateInput
  }

  export type BlogMetadataUpdateEnvelopeInput = {
    set?: BlogMetadataCreateInput
    update?: BlogMetadataUpdateInput
  }

  export type BlogUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumBlogStatusFieldUpdateOperationsInput = {
    set?: $Enums.BlogStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type CustomFieldsListUpdateEnvelopeInput = {
    set?: CustomFieldsCreateInput | CustomFieldsCreateInput[]
    push?: CustomFieldsCreateInput | CustomFieldsCreateInput[]
    updateMany?: CustomFieldsUpdateManyInput
    deleteMany?: CustomFieldsDeleteManyInput
  }

  export type EnumBlogLayoutFieldUpdateOperationsInput = {
    set?: $Enums.BlogLayout
  }

  export type CategoriesOnBlogsUpdateManyWithoutBlogNestedInput = {
    create?: XOR<CategoriesOnBlogsCreateWithoutBlogInput, CategoriesOnBlogsUncheckedCreateWithoutBlogInput> | CategoriesOnBlogsCreateWithoutBlogInput[] | CategoriesOnBlogsUncheckedCreateWithoutBlogInput[]
    connectOrCreate?: CategoriesOnBlogsCreateOrConnectWithoutBlogInput | CategoriesOnBlogsCreateOrConnectWithoutBlogInput[]
    upsert?: CategoriesOnBlogsUpsertWithWhereUniqueWithoutBlogInput | CategoriesOnBlogsUpsertWithWhereUniqueWithoutBlogInput[]
    createMany?: CategoriesOnBlogsCreateManyBlogInputEnvelope
    set?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    disconnect?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    delete?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    connect?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    update?: CategoriesOnBlogsUpdateWithWhereUniqueWithoutBlogInput | CategoriesOnBlogsUpdateWithWhereUniqueWithoutBlogInput[]
    updateMany?: CategoriesOnBlogsUpdateManyWithWhereWithoutBlogInput | CategoriesOnBlogsUpdateManyWithWhereWithoutBlogInput[]
    deleteMany?: CategoriesOnBlogsScalarWhereInput | CategoriesOnBlogsScalarWhereInput[]
  }

  export type CommentUpdateManyWithoutBlogNestedInput = {
    create?: XOR<CommentCreateWithoutBlogInput, CommentUncheckedCreateWithoutBlogInput> | CommentCreateWithoutBlogInput[] | CommentUncheckedCreateWithoutBlogInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutBlogInput | CommentCreateOrConnectWithoutBlogInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutBlogInput | CommentUpsertWithWhereUniqueWithoutBlogInput[]
    createMany?: CommentCreateManyBlogInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutBlogInput | CommentUpdateWithWhereUniqueWithoutBlogInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutBlogInput | CommentUpdateManyWithWhereWithoutBlogInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type CategoriesOnBlogsUncheckedUpdateManyWithoutBlogNestedInput = {
    create?: XOR<CategoriesOnBlogsCreateWithoutBlogInput, CategoriesOnBlogsUncheckedCreateWithoutBlogInput> | CategoriesOnBlogsCreateWithoutBlogInput[] | CategoriesOnBlogsUncheckedCreateWithoutBlogInput[]
    connectOrCreate?: CategoriesOnBlogsCreateOrConnectWithoutBlogInput | CategoriesOnBlogsCreateOrConnectWithoutBlogInput[]
    upsert?: CategoriesOnBlogsUpsertWithWhereUniqueWithoutBlogInput | CategoriesOnBlogsUpsertWithWhereUniqueWithoutBlogInput[]
    createMany?: CategoriesOnBlogsCreateManyBlogInputEnvelope
    set?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    disconnect?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    delete?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    connect?: CategoriesOnBlogsWhereUniqueInput | CategoriesOnBlogsWhereUniqueInput[]
    update?: CategoriesOnBlogsUpdateWithWhereUniqueWithoutBlogInput | CategoriesOnBlogsUpdateWithWhereUniqueWithoutBlogInput[]
    updateMany?: CategoriesOnBlogsUpdateManyWithWhereWithoutBlogInput | CategoriesOnBlogsUpdateManyWithWhereWithoutBlogInput[]
    deleteMany?: CategoriesOnBlogsScalarWhereInput | CategoriesOnBlogsScalarWhereInput[]
  }

  export type CommentUncheckedUpdateManyWithoutBlogNestedInput = {
    create?: XOR<CommentCreateWithoutBlogInput, CommentUncheckedCreateWithoutBlogInput> | CommentCreateWithoutBlogInput[] | CommentUncheckedCreateWithoutBlogInput[]
    connectOrCreate?: CommentCreateOrConnectWithoutBlogInput | CommentCreateOrConnectWithoutBlogInput[]
    upsert?: CommentUpsertWithWhereUniqueWithoutBlogInput | CommentUpsertWithWhereUniqueWithoutBlogInput[]
    createMany?: CommentCreateManyBlogInputEnvelope
    set?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    disconnect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    delete?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    connect?: CommentWhereUniqueInput | CommentWhereUniqueInput[]
    update?: CommentUpdateWithWhereUniqueWithoutBlogInput | CommentUpdateWithWhereUniqueWithoutBlogInput[]
    updateMany?: CommentUpdateManyWithWhereWithoutBlogInput | CommentUpdateManyWithWhereWithoutBlogInput[]
    deleteMany?: CommentScalarWhereInput | CommentScalarWhereInput[]
  }

  export type ProductDescriptionCreateEnvelopeInput = {
    set?: ProductDescriptionCreateInput
  }

  export type ProductDescriptionCreateInput = {
    contentType: $Enums.ProductContentType
    content: string
  }

  export type ProductCreatetagsInput = {
    set: string[]
  }

  export type PriceCreateEnvelopeInput = {
    set?: PriceCreateInput
  }

  export type PriceCreateInput = {
    regular: number
    sale?: number | null
    saleStartDate?: Date | string | null
    saleEndDate?: Date | string | null
  }

  export type FeatureListCreateEnvelopeInput = {
    set?: FeatureCreateInput | FeatureCreateInput[]
  }

  export type FeatureCreateInput = {
    icon?: string | null
    title: string
    description?: ProductDescriptionCreateInput | null
  }

  export type InventoryCreateEnvelopeInput = {
    set?: InventoryCreateInput
  }

  export type InventoryCreateInput = {
    quantity?: number
    lowStockThreshold?: number
    stockQuantity?: number
  }

  export type ProductSeoMetadataCreateEnvelopeInput = {
    set?: ProductSeoMetadataCreateInput
  }

  export type ProductSeoMetadataCreateInput = {
    seoTitle: string
    seoDescription: string
    keywords?: ProductSeoMetadataCreatekeywordsInput | string[]
  }

  export type MediasOnProductsCreateNestedManyWithoutProductInput = {
    create?: XOR<MediasOnProductsCreateWithoutProductInput, MediasOnProductsUncheckedCreateWithoutProductInput> | MediasOnProductsCreateWithoutProductInput[] | MediasOnProductsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: MediasOnProductsCreateOrConnectWithoutProductInput | MediasOnProductsCreateOrConnectWithoutProductInput[]
    createMany?: MediasOnProductsCreateManyProductInputEnvelope
    connect?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
  }

  export type ReviewCreateNestedManyWithoutProductInput = {
    create?: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput> | ReviewCreateWithoutProductInput[] | ReviewUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutProductInput | ReviewCreateOrConnectWithoutProductInput[]
    createMany?: ReviewCreateManyProductInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type CategoriesOnProductsCreateNestedManyWithoutProductInput = {
    create?: XOR<CategoriesOnProductsCreateWithoutProductInput, CategoriesOnProductsUncheckedCreateWithoutProductInput> | CategoriesOnProductsCreateWithoutProductInput[] | CategoriesOnProductsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CategoriesOnProductsCreateOrConnectWithoutProductInput | CategoriesOnProductsCreateOrConnectWithoutProductInput[]
    createMany?: CategoriesOnProductsCreateManyProductInputEnvelope
    connect?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
  }

  export type OrderItemCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type WishlistCreateNestedManyWithoutProductInput = {
    create?: XOR<WishlistCreateWithoutProductInput, WishlistUncheckedCreateWithoutProductInput> | WishlistCreateWithoutProductInput[] | WishlistUncheckedCreateWithoutProductInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutProductInput | WishlistCreateOrConnectWithoutProductInput[]
    createMany?: WishlistCreateManyProductInputEnvelope
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
  }

  export type MediasOnProductsUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<MediasOnProductsCreateWithoutProductInput, MediasOnProductsUncheckedCreateWithoutProductInput> | MediasOnProductsCreateWithoutProductInput[] | MediasOnProductsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: MediasOnProductsCreateOrConnectWithoutProductInput | MediasOnProductsCreateOrConnectWithoutProductInput[]
    createMany?: MediasOnProductsCreateManyProductInputEnvelope
    connect?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
  }

  export type ReviewUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput> | ReviewCreateWithoutProductInput[] | ReviewUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutProductInput | ReviewCreateOrConnectWithoutProductInput[]
    createMany?: ReviewCreateManyProductInputEnvelope
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
  }

  export type CategoriesOnProductsUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<CategoriesOnProductsCreateWithoutProductInput, CategoriesOnProductsUncheckedCreateWithoutProductInput> | CategoriesOnProductsCreateWithoutProductInput[] | CategoriesOnProductsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CategoriesOnProductsCreateOrConnectWithoutProductInput | CategoriesOnProductsCreateOrConnectWithoutProductInput[]
    createMany?: CategoriesOnProductsCreateManyProductInputEnvelope
    connect?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
  }

  export type OrderItemUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type WishlistUncheckedCreateNestedManyWithoutProductInput = {
    create?: XOR<WishlistCreateWithoutProductInput, WishlistUncheckedCreateWithoutProductInput> | WishlistCreateWithoutProductInput[] | WishlistUncheckedCreateWithoutProductInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutProductInput | WishlistCreateOrConnectWithoutProductInput[]
    createMany?: WishlistCreateManyProductInputEnvelope
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
  }

  export type ProductDescriptionUpdateEnvelopeInput = {
    set?: ProductDescriptionCreateInput
    update?: ProductDescriptionUpdateInput
  }

  export type ProductUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type PriceUpdateEnvelopeInput = {
    set?: PriceCreateInput
    update?: PriceUpdateInput
  }

  export type FeatureListUpdateEnvelopeInput = {
    set?: FeatureCreateInput | FeatureCreateInput[]
    push?: FeatureCreateInput | FeatureCreateInput[]
    updateMany?: FeatureUpdateManyInput
    deleteMany?: FeatureDeleteManyInput
  }

  export type EnumProductStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProductStatus
  }

  export type InventoryUpdateEnvelopeInput = {
    set?: InventoryCreateInput
    update?: InventoryUpdateInput
  }

  export type ProductSeoMetadataUpdateEnvelopeInput = {
    set?: ProductSeoMetadataCreateInput
    update?: ProductSeoMetadataUpdateInput
  }

  export type MediasOnProductsUpdateManyWithoutProductNestedInput = {
    create?: XOR<MediasOnProductsCreateWithoutProductInput, MediasOnProductsUncheckedCreateWithoutProductInput> | MediasOnProductsCreateWithoutProductInput[] | MediasOnProductsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: MediasOnProductsCreateOrConnectWithoutProductInput | MediasOnProductsCreateOrConnectWithoutProductInput[]
    upsert?: MediasOnProductsUpsertWithWhereUniqueWithoutProductInput | MediasOnProductsUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: MediasOnProductsCreateManyProductInputEnvelope
    set?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    disconnect?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    delete?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    connect?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    update?: MediasOnProductsUpdateWithWhereUniqueWithoutProductInput | MediasOnProductsUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: MediasOnProductsUpdateManyWithWhereWithoutProductInput | MediasOnProductsUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: MediasOnProductsScalarWhereInput | MediasOnProductsScalarWhereInput[]
  }

  export type ReviewUpdateManyWithoutProductNestedInput = {
    create?: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput> | ReviewCreateWithoutProductInput[] | ReviewUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutProductInput | ReviewCreateOrConnectWithoutProductInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutProductInput | ReviewUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ReviewCreateManyProductInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutProductInput | ReviewUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutProductInput | ReviewUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type CategoriesOnProductsUpdateManyWithoutProductNestedInput = {
    create?: XOR<CategoriesOnProductsCreateWithoutProductInput, CategoriesOnProductsUncheckedCreateWithoutProductInput> | CategoriesOnProductsCreateWithoutProductInput[] | CategoriesOnProductsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CategoriesOnProductsCreateOrConnectWithoutProductInput | CategoriesOnProductsCreateOrConnectWithoutProductInput[]
    upsert?: CategoriesOnProductsUpsertWithWhereUniqueWithoutProductInput | CategoriesOnProductsUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CategoriesOnProductsCreateManyProductInputEnvelope
    set?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    disconnect?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    delete?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    connect?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    update?: CategoriesOnProductsUpdateWithWhereUniqueWithoutProductInput | CategoriesOnProductsUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CategoriesOnProductsUpdateManyWithWhereWithoutProductInput | CategoriesOnProductsUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CategoriesOnProductsScalarWhereInput | CategoriesOnProductsScalarWhereInput[]
  }

  export type OrderItemUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type WishlistUpdateManyWithoutProductNestedInput = {
    create?: XOR<WishlistCreateWithoutProductInput, WishlistUncheckedCreateWithoutProductInput> | WishlistCreateWithoutProductInput[] | WishlistUncheckedCreateWithoutProductInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutProductInput | WishlistCreateOrConnectWithoutProductInput[]
    upsert?: WishlistUpsertWithWhereUniqueWithoutProductInput | WishlistUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: WishlistCreateManyProductInputEnvelope
    set?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    disconnect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    delete?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    update?: WishlistUpdateWithWhereUniqueWithoutProductInput | WishlistUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: WishlistUpdateManyWithWhereWithoutProductInput | WishlistUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: WishlistScalarWhereInput | WishlistScalarWhereInput[]
  }

  export type MediasOnProductsUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<MediasOnProductsCreateWithoutProductInput, MediasOnProductsUncheckedCreateWithoutProductInput> | MediasOnProductsCreateWithoutProductInput[] | MediasOnProductsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: MediasOnProductsCreateOrConnectWithoutProductInput | MediasOnProductsCreateOrConnectWithoutProductInput[]
    upsert?: MediasOnProductsUpsertWithWhereUniqueWithoutProductInput | MediasOnProductsUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: MediasOnProductsCreateManyProductInputEnvelope
    set?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    disconnect?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    delete?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    connect?: MediasOnProductsWhereUniqueInput | MediasOnProductsWhereUniqueInput[]
    update?: MediasOnProductsUpdateWithWhereUniqueWithoutProductInput | MediasOnProductsUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: MediasOnProductsUpdateManyWithWhereWithoutProductInput | MediasOnProductsUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: MediasOnProductsScalarWhereInput | MediasOnProductsScalarWhereInput[]
  }

  export type ReviewUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput> | ReviewCreateWithoutProductInput[] | ReviewUncheckedCreateWithoutProductInput[]
    connectOrCreate?: ReviewCreateOrConnectWithoutProductInput | ReviewCreateOrConnectWithoutProductInput[]
    upsert?: ReviewUpsertWithWhereUniqueWithoutProductInput | ReviewUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: ReviewCreateManyProductInputEnvelope
    set?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    disconnect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    delete?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    connect?: ReviewWhereUniqueInput | ReviewWhereUniqueInput[]
    update?: ReviewUpdateWithWhereUniqueWithoutProductInput | ReviewUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: ReviewUpdateManyWithWhereWithoutProductInput | ReviewUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
  }

  export type CategoriesOnProductsUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<CategoriesOnProductsCreateWithoutProductInput, CategoriesOnProductsUncheckedCreateWithoutProductInput> | CategoriesOnProductsCreateWithoutProductInput[] | CategoriesOnProductsUncheckedCreateWithoutProductInput[]
    connectOrCreate?: CategoriesOnProductsCreateOrConnectWithoutProductInput | CategoriesOnProductsCreateOrConnectWithoutProductInput[]
    upsert?: CategoriesOnProductsUpsertWithWhereUniqueWithoutProductInput | CategoriesOnProductsUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: CategoriesOnProductsCreateManyProductInputEnvelope
    set?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    disconnect?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    delete?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    connect?: CategoriesOnProductsWhereUniqueInput | CategoriesOnProductsWhereUniqueInput[]
    update?: CategoriesOnProductsUpdateWithWhereUniqueWithoutProductInput | CategoriesOnProductsUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: CategoriesOnProductsUpdateManyWithWhereWithoutProductInput | CategoriesOnProductsUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: CategoriesOnProductsScalarWhereInput | CategoriesOnProductsScalarWhereInput[]
  }

  export type OrderItemUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput> | OrderItemCreateWithoutProductInput[] | OrderItemUncheckedCreateWithoutProductInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutProductInput | OrderItemCreateOrConnectWithoutProductInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutProductInput | OrderItemUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: OrderItemCreateManyProductInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutProductInput | OrderItemUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutProductInput | OrderItemUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type WishlistUncheckedUpdateManyWithoutProductNestedInput = {
    create?: XOR<WishlistCreateWithoutProductInput, WishlistUncheckedCreateWithoutProductInput> | WishlistCreateWithoutProductInput[] | WishlistUncheckedCreateWithoutProductInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutProductInput | WishlistCreateOrConnectWithoutProductInput[]
    upsert?: WishlistUpsertWithWhereUniqueWithoutProductInput | WishlistUpsertWithWhereUniqueWithoutProductInput[]
    createMany?: WishlistCreateManyProductInputEnvelope
    set?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    disconnect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    delete?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    update?: WishlistUpdateWithWhereUniqueWithoutProductInput | WishlistUpdateWithWhereUniqueWithoutProductInput[]
    updateMany?: WishlistUpdateManyWithWhereWithoutProductInput | WishlistUpdateManyWithWhereWithoutProductInput[]
    deleteMany?: WishlistScalarWhereInput | WishlistScalarWhereInput[]
  }

  export type ProductCreateNestedOneWithoutReviewsInput = {
    create?: XOR<ProductCreateWithoutReviewsInput, ProductUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReviewsInput
    connect?: ProductWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutReviewsNestedInput = {
    create?: XOR<ProductCreateWithoutReviewsInput, ProductUncheckedCreateWithoutReviewsInput>
    connectOrCreate?: ProductCreateOrConnectWithoutReviewsInput
    upsert?: ProductUpsertWithoutReviewsInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutReviewsInput, ProductUpdateWithoutReviewsInput>, ProductUncheckedUpdateWithoutReviewsInput>
  }

  export type OrderCreateNestedOneWithoutItemsInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    connect?: OrderWhereUniqueInput
  }

  export type ProductCreateNestedOneWithoutOrderItemInput = {
    create?: XOR<ProductCreateWithoutOrderItemInput, ProductUncheckedCreateWithoutOrderItemInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemInput
    connect?: ProductWhereUniqueInput
  }

  export type OrderUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutItemsInput
    upsert?: OrderUpsertWithoutItemsInput
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutItemsInput, OrderUpdateWithoutItemsInput>, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type ProductUpdateOneRequiredWithoutOrderItemNestedInput = {
    create?: XOR<ProductCreateWithoutOrderItemInput, ProductUncheckedCreateWithoutOrderItemInput>
    connectOrCreate?: ProductCreateOrConnectWithoutOrderItemInput
    upsert?: ProductUpsertWithoutOrderItemInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutOrderItemInput, ProductUpdateWithoutOrderItemInput>, ProductUncheckedUpdateWithoutOrderItemInput>
  }

  export type DeliveryInfoCreateEnvelopeInput = {
    set?: DeliveryInfoCreateInput
  }

  export type DeliveryInfoCreateInput = {
    address: string
    deliveryDate: Date | string
    deliveryTime: string
    city?: string | null
    additionalNotes?: string | null
    deliveryMethod?: string | null
    location?: string | null
  }

  export type UserDataCreateEnvelopeInput = {
    set?: UserDataCreateInput
  }

  export type UserDataCreateInput = {
    id: string
    email: string
    fullName: string
    phone: string
  }

  export type OrderPromotionListCreateEnvelopeInput = {
    set?: OrderPromotionCreateInput | OrderPromotionCreateInput[]
  }

  export type OrderPromotionCreateInput = {
    promotionId: string
    discountAmount: number
    code: string
  }

  export type OrderPricesCreateEnvelopeInput = {
    set?: OrderPricesCreateInput
  }

  export type OrderPricesCreateInput = {
    subtotal: number
    shipping: number
    discount: number
    total: number
  }

  export type OrderItemCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutOrderInput = {
    create?: XOR<UserCreateWithoutOrderInput, UserUncheckedCreateWithoutOrderInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrderInput
    connect?: UserWhereUniqueInput
  }

  export type OrderItemUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
  }

  export type DeliveryInfoUpdateEnvelopeInput = {
    set?: DeliveryInfoCreateInput
    update?: DeliveryInfoUpdateInput
  }

  export type UserDataUpdateEnvelopeInput = {
    set?: UserDataCreateInput
    update?: UserDataUpdateInput
  }

  export type OrderPromotionListUpdateEnvelopeInput = {
    set?: OrderPromotionCreateInput | OrderPromotionCreateInput[]
    push?: OrderPromotionCreateInput | OrderPromotionCreateInput[]
    updateMany?: OrderPromotionUpdateManyInput
    deleteMany?: OrderPromotionDeleteManyInput
  }

  export type OrderPricesUpdateEnvelopeInput = {
    set?: OrderPricesCreateInput
    update?: OrderPricesUpdateInput
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type OrderItemUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutOrderNestedInput = {
    create?: XOR<UserCreateWithoutOrderInput, UserUncheckedCreateWithoutOrderInput>
    connectOrCreate?: UserCreateOrConnectWithoutOrderInput
    upsert?: UserUpsertWithoutOrderInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOrderInput, UserUpdateWithoutOrderInput>, UserUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput> | OrderItemCreateWithoutOrderInput[] | OrderItemUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: OrderItemCreateOrConnectWithoutOrderInput | OrderItemCreateOrConnectWithoutOrderInput[]
    upsert?: OrderItemUpsertWithWhereUniqueWithoutOrderInput | OrderItemUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: OrderItemCreateManyOrderInputEnvelope
    set?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    disconnect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    delete?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    connect?: OrderItemWhereUniqueInput | OrderItemWhereUniqueInput[]
    update?: OrderItemUpdateWithWhereUniqueWithoutOrderInput | OrderItemUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: OrderItemUpdateManyWithWhereWithoutOrderInput | OrderItemUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
  }

  export type WishlistCreateNestedManyWithoutUserInput = {
    create?: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput> | WishlistCreateWithoutUserInput[] | WishlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutUserInput | WishlistCreateOrConnectWithoutUserInput[]
    createMany?: WishlistCreateManyUserInputEnvelope
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type WishlistUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput> | WishlistCreateWithoutUserInput[] | WishlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutUserInput | WishlistCreateOrConnectWithoutUserInput[]
    createMany?: WishlistCreateManyUserInputEnvelope
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type WishlistUpdateManyWithoutUserNestedInput = {
    create?: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput> | WishlistCreateWithoutUserInput[] | WishlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutUserInput | WishlistCreateOrConnectWithoutUserInput[]
    upsert?: WishlistUpsertWithWhereUniqueWithoutUserInput | WishlistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WishlistCreateManyUserInputEnvelope
    set?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    disconnect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    delete?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    update?: WishlistUpdateWithWhereUniqueWithoutUserInput | WishlistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WishlistUpdateManyWithWhereWithoutUserInput | WishlistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WishlistScalarWhereInput | WishlistScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type WishlistUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput> | WishlistCreateWithoutUserInput[] | WishlistUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WishlistCreateOrConnectWithoutUserInput | WishlistCreateOrConnectWithoutUserInput[]
    upsert?: WishlistUpsertWithWhereUniqueWithoutUserInput | WishlistUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WishlistCreateManyUserInputEnvelope
    set?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    disconnect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    delete?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    connect?: WishlistWhereUniqueInput | WishlistWhereUniqueInput[]
    update?: WishlistUpdateWithWhereUniqueWithoutUserInput | WishlistUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WishlistUpdateManyWithWhereWithoutUserInput | WishlistUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WishlistScalarWhereInput | WishlistScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput> | OrderCreateWithoutUserInput[] | OrderUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutUserInput | OrderCreateOrConnectWithoutUserInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutUserInput | OrderUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OrderCreateManyUserInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutUserInput | OrderUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutUserInput | OrderUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type BlogCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<BlogCreateWithoutCategoriesInput, BlogUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: BlogCreateOrConnectWithoutCategoriesInput
    connect?: BlogWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutBlogsInput = {
    create?: XOR<CategoryCreateWithoutBlogsInput, CategoryUncheckedCreateWithoutBlogsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutBlogsInput
    connect?: CategoryWhereUniqueInput
  }

  export type BlogUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<BlogCreateWithoutCategoriesInput, BlogUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: BlogCreateOrConnectWithoutCategoriesInput
    upsert?: BlogUpsertWithoutCategoriesInput
    connect?: BlogWhereUniqueInput
    update?: XOR<XOR<BlogUpdateToOneWithWhereWithoutCategoriesInput, BlogUpdateWithoutCategoriesInput>, BlogUncheckedUpdateWithoutCategoriesInput>
  }

  export type CategoryUpdateOneRequiredWithoutBlogsNestedInput = {
    create?: XOR<CategoryCreateWithoutBlogsInput, CategoryUncheckedCreateWithoutBlogsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutBlogsInput
    upsert?: CategoryUpsertWithoutBlogsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutBlogsInput, CategoryUpdateWithoutBlogsInput>, CategoryUncheckedUpdateWithoutBlogsInput>
  }

  export type ProductCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<ProductCreateWithoutCategoriesInput, ProductUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCategoriesInput
    connect?: ProductWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutProductsInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<ProductCreateWithoutCategoriesInput, ProductUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: ProductCreateOrConnectWithoutCategoriesInput
    upsert?: ProductUpsertWithoutCategoriesInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutCategoriesInput, ProductUpdateWithoutCategoriesInput>, ProductUncheckedUpdateWithoutCategoriesInput>
  }

  export type CategoryUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProductsInput
    upsert?: CategoryUpsertWithoutProductsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProductsInput, CategoryUpdateWithoutProductsInput>, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type ProductCreateNestedOneWithoutMediaInput = {
    create?: XOR<ProductCreateWithoutMediaInput, ProductUncheckedCreateWithoutMediaInput>
    connectOrCreate?: ProductCreateOrConnectWithoutMediaInput
    connect?: ProductWhereUniqueInput
  }

  export type MediaCreateNestedOneWithoutProductsInput = {
    create?: XOR<MediaCreateWithoutProductsInput, MediaUncheckedCreateWithoutProductsInput>
    connectOrCreate?: MediaCreateOrConnectWithoutProductsInput
    connect?: MediaWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutMediaNestedInput = {
    create?: XOR<ProductCreateWithoutMediaInput, ProductUncheckedCreateWithoutMediaInput>
    connectOrCreate?: ProductCreateOrConnectWithoutMediaInput
    upsert?: ProductUpsertWithoutMediaInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutMediaInput, ProductUpdateWithoutMediaInput>, ProductUncheckedUpdateWithoutMediaInput>
  }

  export type MediaUpdateOneRequiredWithoutProductsNestedInput = {
    create?: XOR<MediaCreateWithoutProductsInput, MediaUncheckedCreateWithoutProductsInput>
    connectOrCreate?: MediaCreateOrConnectWithoutProductsInput
    upsert?: MediaUpsertWithoutProductsInput
    connect?: MediaWhereUniqueInput
    update?: XOR<XOR<MediaUpdateToOneWithWhereWithoutProductsInput, MediaUpdateWithoutProductsInput>, MediaUncheckedUpdateWithoutProductsInput>
  }

  export type ProductCreateNestedOneWithoutUserWishlistInput = {
    create?: XOR<ProductCreateWithoutUserWishlistInput, ProductUncheckedCreateWithoutUserWishlistInput>
    connectOrCreate?: ProductCreateOrConnectWithoutUserWishlistInput
    connect?: ProductWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutProductWishlistInput = {
    create?: XOR<UserCreateWithoutProductWishlistInput, UserUncheckedCreateWithoutProductWishlistInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductWishlistInput
    connect?: UserWhereUniqueInput
  }

  export type ProductUpdateOneRequiredWithoutUserWishlistNestedInput = {
    create?: XOR<ProductCreateWithoutUserWishlistInput, ProductUncheckedCreateWithoutUserWishlistInput>
    connectOrCreate?: ProductCreateOrConnectWithoutUserWishlistInput
    upsert?: ProductUpsertWithoutUserWishlistInput
    connect?: ProductWhereUniqueInput
    update?: XOR<XOR<ProductUpdateToOneWithWhereWithoutUserWishlistInput, ProductUpdateWithoutUserWishlistInput>, ProductUncheckedUpdateWithoutUserWishlistInput>
  }

  export type UserUpdateOneRequiredWithoutProductWishlistNestedInput = {
    create?: XOR<UserCreateWithoutProductWishlistInput, UserUncheckedCreateWithoutProductWishlistInput>
    connectOrCreate?: UserCreateOrConnectWithoutProductWishlistInput
    upsert?: UserUpsertWithoutProductWishlistInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProductWishlistInput, UserUpdateWithoutProductWishlistInput>, UserUncheckedUpdateWithoutProductWishlistInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
    isSet?: boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedEnumShipmentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentMethod | EnumShipmentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentMethod[] | ListEnumShipmentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentMethod[] | ListEnumShipmentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentMethodFilter<$PrismaModel> | $Enums.ShipmentMethod
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumShipmentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ShipmentMethod | EnumShipmentMethodFieldRefInput<$PrismaModel>
    in?: $Enums.ShipmentMethod[] | ListEnumShipmentMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.ShipmentMethod[] | ListEnumShipmentMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumShipmentMethodWithAggregatesFilter<$PrismaModel> | $Enums.ShipmentMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumShipmentMethodFilter<$PrismaModel>
    _max?: NestedEnumShipmentMethodFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type SeoMetadataWhereInput = {
    AND?: SeoMetadataWhereInput | SeoMetadataWhereInput[]
    OR?: SeoMetadataWhereInput[]
    NOT?: SeoMetadataWhereInput | SeoMetadataWhereInput[]
    seoTitle?: StringNullableFilter<"SeoMetadata"> | string | null
    seoDescription?: StringNullableFilter<"SeoMetadata"> | string | null
    keywords?: StringNullableListFilter<"SeoMetadata">
  }

  export type PromotionConditionWhereInput = {
    AND?: PromotionConditionWhereInput | PromotionConditionWhereInput[]
    OR?: PromotionConditionWhereInput[]
    NOT?: PromotionConditionWhereInput | PromotionConditionWhereInput[]
    type?: EnumPromotionConditionTypeFilter<"PromotionCondition"> | $Enums.PromotionConditionType
    value?: StringFilter<"PromotionCondition"> | string
  }

  export type PromotionActionWhereInput = {
    AND?: PromotionActionWhereInput | PromotionActionWhereInput[]
    OR?: PromotionActionWhereInput[]
    NOT?: PromotionActionWhereInput | PromotionActionWhereInput[]
    type?: EnumPromotionActionTypeFilter<"PromotionAction"> | $Enums.PromotionActionType
    value?: StringFilter<"PromotionAction"> | string
    maxDiscount?: FloatNullableFilter<"PromotionAction"> | number | null
  }

  export type UsageLimitWhereInput = {
    AND?: UsageLimitWhereInput | UsageLimitWhereInput[]
    OR?: UsageLimitWhereInput[]
    NOT?: UsageLimitWhereInput | UsageLimitWhereInput[]
    perCustomer?: IntNullableFilter<"UsageLimit"> | number | null
    total?: IntNullableFilter<"UsageLimit"> | number | null
  }

  export type NestedEnumPromotionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionStatus | EnumPromotionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PromotionStatus[] | ListEnumPromotionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromotionStatus[] | ListEnumPromotionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPromotionStatusFilter<$PrismaModel> | $Enums.PromotionStatus
  }

  export type MetadataWhereInput = {
    AND?: MetadataWhereInput | MetadataWhereInput[]
    OR?: MetadataWhereInput[]
    NOT?: MetadataWhereInput | MetadataWhereInput[]
    createdBy?: StringFilter<"Metadata"> | string
    updatedBy?: StringFilter<"Metadata"> | string
    notes?: StringNullableFilter<"Metadata"> | string | null
  }

  export type NestedEnumPromotionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionStatus | EnumPromotionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PromotionStatus[] | ListEnumPromotionStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromotionStatus[] | ListEnumPromotionStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPromotionStatusWithAggregatesFilter<$PrismaModel> | $Enums.PromotionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPromotionStatusFilter<$PrismaModel>
    _max?: NestedEnumPromotionStatusFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BlogContentWhereInput = {
    AND?: BlogContentWhereInput | BlogContentWhereInput[]
    OR?: BlogContentWhereInput[]
    NOT?: BlogContentWhereInput | BlogContentWhereInput[]
    type?: EnumBlogContentTypeFilter<"BlogContent"> | $Enums.BlogContentType
    content?: StringFilter<"BlogContent"> | string
    excerpt?: StringNullableFilter<"BlogContent"> | string | null
  }

  export type BlogMetadataWhereInput = {
    AND?: BlogMetadataWhereInput | BlogMetadataWhereInput[]
    OR?: BlogMetadataWhereInput[]
    NOT?: BlogMetadataWhereInput | BlogMetadataWhereInput[]
    title?: StringFilter<"BlogMetadata"> | string
    description?: StringNullableFilter<"BlogMetadata"> | string | null
    keywords?: StringNullableListFilter<"BlogMetadata">
    author?: XOR<BlogAuthorCompositeFilter, BlogAuthorObjectEqualityInput>
    readingTime?: IntNullableFilter<"BlogMetadata"> | number | null
    coverImageURL?: StringNullableFilter<"BlogMetadata"> | string | null
    blurDataUrl?: StringNullableFilter<"BlogMetadata"> | string | null
    featured?: BoolFilter<"BlogMetadata"> | boolean
  }

  export type BlogAuthorObjectEqualityInput = {
    name: string
    bio?: string | null
    avatar?: string | null
  }

  export type NestedEnumBlogStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogStatus | EnumBlogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BlogStatus[] | ListEnumBlogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogStatus[] | ListEnumBlogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogStatusFilter<$PrismaModel> | $Enums.BlogStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
    isSet?: boolean
  }

  export type CustomFieldsWhereInput = {
    AND?: CustomFieldsWhereInput | CustomFieldsWhereInput[]
    OR?: CustomFieldsWhereInput[]
    NOT?: CustomFieldsWhereInput | CustomFieldsWhereInput[]
    key?: StringFilter<"CustomFields"> | string
    value?: StringFilter<"CustomFields"> | string
  }

  export type NestedEnumBlogLayoutFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogLayout | EnumBlogLayoutFieldRefInput<$PrismaModel>
    in?: $Enums.BlogLayout[] | ListEnumBlogLayoutFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogLayout[] | ListEnumBlogLayoutFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogLayoutFilter<$PrismaModel> | $Enums.BlogLayout
  }

  export type BlogAuthorOrderByInput = {
    name?: SortOrder
    bio?: SortOrder
    avatar?: SortOrder
  }

  export type NestedEnumBlogStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogStatus | EnumBlogStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BlogStatus[] | ListEnumBlogStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogStatus[] | ListEnumBlogStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogStatusWithAggregatesFilter<$PrismaModel> | $Enums.BlogStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBlogStatusFilter<$PrismaModel>
    _max?: NestedEnumBlogStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
    isSet?: boolean
  }

  export type NestedEnumBlogLayoutWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogLayout | EnumBlogLayoutFieldRefInput<$PrismaModel>
    in?: $Enums.BlogLayout[] | ListEnumBlogLayoutFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogLayout[] | ListEnumBlogLayoutFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogLayoutWithAggregatesFilter<$PrismaModel> | $Enums.BlogLayout
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBlogLayoutFilter<$PrismaModel>
    _max?: NestedEnumBlogLayoutFilter<$PrismaModel>
  }

  export type ProductDescriptionWhereInput = {
    AND?: ProductDescriptionWhereInput | ProductDescriptionWhereInput[]
    OR?: ProductDescriptionWhereInput[]
    NOT?: ProductDescriptionWhereInput | ProductDescriptionWhereInput[]
    contentType?: EnumProductContentTypeFilter<"ProductDescription"> | $Enums.ProductContentType
    content?: StringFilter<"ProductDescription"> | string
  }

  export type PriceWhereInput = {
    AND?: PriceWhereInput | PriceWhereInput[]
    OR?: PriceWhereInput[]
    NOT?: PriceWhereInput | PriceWhereInput[]
    regular?: FloatFilter<"Price"> | number
    sale?: FloatNullableFilter<"Price"> | number | null
    saleStartDate?: DateTimeNullableFilter<"Price"> | Date | string | null
    saleEndDate?: DateTimeNullableFilter<"Price"> | Date | string | null
  }

  export type FeatureWhereInput = {
    AND?: FeatureWhereInput | FeatureWhereInput[]
    OR?: FeatureWhereInput[]
    NOT?: FeatureWhereInput | FeatureWhereInput[]
    icon?: StringNullableFilter<"Feature"> | string | null
    title?: StringFilter<"Feature"> | string
    description?: XOR<ProductDescriptionNullableCompositeFilter, ProductDescriptionObjectEqualityInput> | null
  }

  export type NestedEnumProductStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusFilter<$PrismaModel> | $Enums.ProductStatus
  }

  export type InventoryWhereInput = {
    AND?: InventoryWhereInput | InventoryWhereInput[]
    OR?: InventoryWhereInput[]
    NOT?: InventoryWhereInput | InventoryWhereInput[]
    quantity?: IntFilter<"Inventory"> | number
    lowStockThreshold?: IntFilter<"Inventory"> | number
    stockQuantity?: IntFilter<"Inventory"> | number
  }

  export type ProductSeoMetadataWhereInput = {
    AND?: ProductSeoMetadataWhereInput | ProductSeoMetadataWhereInput[]
    OR?: ProductSeoMetadataWhereInput[]
    NOT?: ProductSeoMetadataWhereInput | ProductSeoMetadataWhereInput[]
    seoTitle?: StringFilter<"ProductSeoMetadata"> | string
    seoDescription?: StringFilter<"ProductSeoMetadata"> | string
    keywords?: StringNullableListFilter<"ProductSeoMetadata">
  }

  export type NestedEnumProductStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductStatus | EnumProductStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductStatus[] | ListEnumProductStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProductStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProductStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProductStatusFilter<$PrismaModel>
    _max?: NestedEnumProductStatusFilter<$PrismaModel>
  }

  export type DeliveryInfoWhereInput = {
    AND?: DeliveryInfoWhereInput | DeliveryInfoWhereInput[]
    OR?: DeliveryInfoWhereInput[]
    NOT?: DeliveryInfoWhereInput | DeliveryInfoWhereInput[]
    address?: StringFilter<"DeliveryInfo"> | string
    deliveryDate?: DateTimeFilter<"DeliveryInfo"> | Date | string
    deliveryTime?: StringFilter<"DeliveryInfo"> | string
    city?: StringNullableFilter<"DeliveryInfo"> | string | null
    additionalNotes?: StringNullableFilter<"DeliveryInfo"> | string | null
    deliveryMethod?: StringNullableFilter<"DeliveryInfo"> | string | null
    location?: StringNullableFilter<"DeliveryInfo"> | string | null
  }

  export type UserDataWhereInput = {
    AND?: UserDataWhereInput | UserDataWhereInput[]
    OR?: UserDataWhereInput[]
    NOT?: UserDataWhereInput | UserDataWhereInput[]
    id?: StringFilter<"UserData"> | string
    email?: StringFilter<"UserData"> | string
    fullName?: StringFilter<"UserData"> | string
    phone?: StringFilter<"UserData"> | string
  }

  export type OrderPromotionWhereInput = {
    AND?: OrderPromotionWhereInput | OrderPromotionWhereInput[]
    OR?: OrderPromotionWhereInput[]
    NOT?: OrderPromotionWhereInput | OrderPromotionWhereInput[]
    promotionId?: StringFilter<"OrderPromotion"> | string
    discountAmount?: FloatFilter<"OrderPromotion"> | number
    code?: StringFilter<"OrderPromotion"> | string
  }

  export type OrderPricesWhereInput = {
    AND?: OrderPricesWhereInput | OrderPricesWhereInput[]
    OR?: OrderPricesWhereInput[]
    NOT?: OrderPricesWhereInput | OrderPricesWhereInput[]
    subtotal?: FloatFilter<"OrderPrices"> | number
    shipping?: FloatFilter<"OrderPrices"> | number
    discount?: FloatFilter<"OrderPrices"> | number
    total?: FloatFilter<"OrderPrices"> | number
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type MediasOnProductsCreateWithoutMediaInput = {
    id?: string
    assignedAt?: Date | string
    product: ProductCreateNestedOneWithoutMediaInput
  }

  export type MediasOnProductsUncheckedCreateWithoutMediaInput = {
    id?: string
    productId: string
    assignedAt?: Date | string
  }

  export type MediasOnProductsCreateOrConnectWithoutMediaInput = {
    where: MediasOnProductsWhereUniqueInput
    create: XOR<MediasOnProductsCreateWithoutMediaInput, MediasOnProductsUncheckedCreateWithoutMediaInput>
  }

  export type MediasOnProductsCreateManyMediaInputEnvelope = {
    data: MediasOnProductsCreateManyMediaInput | MediasOnProductsCreateManyMediaInput[]
  }

  export type CategoryCreateWithoutImageInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    featured?: boolean
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
    blogs?: CategoriesOnBlogsCreateNestedManyWithoutCategoryInput
    products?: CategoriesOnProductsCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutImageInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    featured?: boolean
    parentId?: string | null
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    blogs?: CategoriesOnBlogsUncheckedCreateNestedManyWithoutCategoryInput
    products?: CategoriesOnProductsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutImageInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutImageInput, CategoryUncheckedCreateWithoutImageInput>
  }

  export type CategoryCreateManyImageInputEnvelope = {
    data: CategoryCreateManyImageInput | CategoryCreateManyImageInput[]
  }

  export type MediasOnProductsUpsertWithWhereUniqueWithoutMediaInput = {
    where: MediasOnProductsWhereUniqueInput
    update: XOR<MediasOnProductsUpdateWithoutMediaInput, MediasOnProductsUncheckedUpdateWithoutMediaInput>
    create: XOR<MediasOnProductsCreateWithoutMediaInput, MediasOnProductsUncheckedCreateWithoutMediaInput>
  }

  export type MediasOnProductsUpdateWithWhereUniqueWithoutMediaInput = {
    where: MediasOnProductsWhereUniqueInput
    data: XOR<MediasOnProductsUpdateWithoutMediaInput, MediasOnProductsUncheckedUpdateWithoutMediaInput>
  }

  export type MediasOnProductsUpdateManyWithWhereWithoutMediaInput = {
    where: MediasOnProductsScalarWhereInput
    data: XOR<MediasOnProductsUpdateManyMutationInput, MediasOnProductsUncheckedUpdateManyWithoutMediaInput>
  }

  export type MediasOnProductsScalarWhereInput = {
    AND?: MediasOnProductsScalarWhereInput | MediasOnProductsScalarWhereInput[]
    OR?: MediasOnProductsScalarWhereInput[]
    NOT?: MediasOnProductsScalarWhereInput | MediasOnProductsScalarWhereInput[]
    id?: StringFilter<"MediasOnProducts"> | string
    productId?: StringFilter<"MediasOnProducts"> | string
    mediaId?: StringFilter<"MediasOnProducts"> | string
    assignedAt?: DateTimeFilter<"MediasOnProducts"> | Date | string
  }

  export type CategoryUpsertWithWhereUniqueWithoutImageInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutImageInput, CategoryUncheckedUpdateWithoutImageInput>
    create: XOR<CategoryCreateWithoutImageInput, CategoryUncheckedCreateWithoutImageInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutImageInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutImageInput, CategoryUncheckedUpdateWithoutImageInput>
  }

  export type CategoryUpdateManyWithWhereWithoutImageInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutImageInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    imageId?: StringNullableFilter<"Category"> | string | null
    featured?: BoolFilter<"Category"> | boolean
    parentId?: StringNullableFilter<"Category"> | string | null
    creatorId?: StringFilter<"Category"> | string
    createdAt?: DateTimeFilter<"Category"> | Date | string
    updatedAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type SeoMetadataCreatekeywordsInput = {
    set: string[]
  }

  export type MediaCreateWithoutCategoriesInput = {
    id?: string
    createdAt?: Date | string
    fileName: string
    type: $Enums.MediaType
    updatedAt?: Date | string
    url: string
    blurDataUrl?: string | null
    creatorId: string
    products?: MediasOnProductsCreateNestedManyWithoutMediaInput
  }

  export type MediaUncheckedCreateWithoutCategoriesInput = {
    id?: string
    createdAt?: Date | string
    fileName: string
    type: $Enums.MediaType
    updatedAt?: Date | string
    url: string
    blurDataUrl?: string | null
    creatorId: string
    products?: MediasOnProductsUncheckedCreateNestedManyWithoutMediaInput
  }

  export type MediaCreateOrConnectWithoutCategoriesInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutCategoriesInput, MediaUncheckedCreateWithoutCategoriesInput>
  }

  export type CategoryCreateWithoutChildrenInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    featured?: boolean
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: MediaCreateNestedOneWithoutCategoriesInput
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    blogs?: CategoriesOnBlogsCreateNestedManyWithoutCategoryInput
    products?: CategoriesOnProductsCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutChildrenInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageId?: string | null
    featured?: boolean
    parentId?: string | null
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    blogs?: CategoriesOnBlogsUncheckedCreateNestedManyWithoutCategoryInput
    products?: CategoriesOnProductsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutChildrenInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
  }

  export type CategoryCreateWithoutParentInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    featured?: boolean
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: MediaCreateNestedOneWithoutCategoriesInput
    children?: CategoryCreateNestedManyWithoutParentInput
    blogs?: CategoriesOnBlogsCreateNestedManyWithoutCategoryInput
    products?: CategoriesOnProductsCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutParentInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageId?: string | null
    featured?: boolean
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    blogs?: CategoriesOnBlogsUncheckedCreateNestedManyWithoutCategoryInput
    products?: CategoriesOnProductsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutParentInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryCreateManyParentInputEnvelope = {
    data: CategoryCreateManyParentInput | CategoryCreateManyParentInput[]
  }

  export type CategoriesOnBlogsCreateWithoutCategoryInput = {
    id?: string
    assignedAt?: Date | string
    blog: BlogCreateNestedOneWithoutCategoriesInput
  }

  export type CategoriesOnBlogsUncheckedCreateWithoutCategoryInput = {
    id?: string
    blogId: string
    assignedAt?: Date | string
  }

  export type CategoriesOnBlogsCreateOrConnectWithoutCategoryInput = {
    where: CategoriesOnBlogsWhereUniqueInput
    create: XOR<CategoriesOnBlogsCreateWithoutCategoryInput, CategoriesOnBlogsUncheckedCreateWithoutCategoryInput>
  }

  export type CategoriesOnBlogsCreateManyCategoryInputEnvelope = {
    data: CategoriesOnBlogsCreateManyCategoryInput | CategoriesOnBlogsCreateManyCategoryInput[]
  }

  export type CategoriesOnProductsCreateWithoutCategoryInput = {
    id?: string
    assignedAt?: Date | string
    product: ProductCreateNestedOneWithoutCategoriesInput
  }

  export type CategoriesOnProductsUncheckedCreateWithoutCategoryInput = {
    id?: string
    productId: string
    assignedAt?: Date | string
  }

  export type CategoriesOnProductsCreateOrConnectWithoutCategoryInput = {
    where: CategoriesOnProductsWhereUniqueInput
    create: XOR<CategoriesOnProductsCreateWithoutCategoryInput, CategoriesOnProductsUncheckedCreateWithoutCategoryInput>
  }

  export type CategoriesOnProductsCreateManyCategoryInputEnvelope = {
    data: CategoriesOnProductsCreateManyCategoryInput | CategoriesOnProductsCreateManyCategoryInput[]
  }

  export type SeoMetadataUpsertInput = {
    set: SeoMetadataCreateInput | null
    update: SeoMetadataUpdateInput
  }

  export type MediaUpsertWithoutCategoriesInput = {
    update: XOR<MediaUpdateWithoutCategoriesInput, MediaUncheckedUpdateWithoutCategoriesInput>
    create: XOR<MediaCreateWithoutCategoriesInput, MediaUncheckedCreateWithoutCategoriesInput>
    where?: MediaWhereInput
  }

  export type MediaUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: MediaWhereInput
    data: XOR<MediaUpdateWithoutCategoriesInput, MediaUncheckedUpdateWithoutCategoriesInput>
  }

  export type MediaUpdateWithoutCategoriesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    blurDataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    products?: MediasOnProductsUpdateManyWithoutMediaNestedInput
  }

  export type MediaUncheckedUpdateWithoutCategoriesInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    blurDataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    products?: MediasOnProductsUncheckedUpdateManyWithoutMediaNestedInput
  }

  export type CategoryUpsertWithoutChildrenInput = {
    update: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
    create: XOR<CategoryCreateWithoutChildrenInput, CategoryUncheckedCreateWithoutChildrenInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutChildrenInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutChildrenInput, CategoryUncheckedUpdateWithoutChildrenInput>
  }

  export type CategoryUpdateWithoutChildrenInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: MediaUpdateOneWithoutCategoriesNestedInput
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    blogs?: CategoriesOnBlogsUpdateManyWithoutCategoryNestedInput
    products?: CategoriesOnProductsUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutChildrenInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blogs?: CategoriesOnBlogsUncheckedUpdateManyWithoutCategoryNestedInput
    products?: CategoriesOnProductsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUpsertWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
    create: XOR<CategoryCreateWithoutParentInput, CategoryUncheckedCreateWithoutParentInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutParentInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutParentInput, CategoryUncheckedUpdateWithoutParentInput>
  }

  export type CategoryUpdateManyWithWhereWithoutParentInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutParentInput>
  }

  export type CategoriesOnBlogsUpsertWithWhereUniqueWithoutCategoryInput = {
    where: CategoriesOnBlogsWhereUniqueInput
    update: XOR<CategoriesOnBlogsUpdateWithoutCategoryInput, CategoriesOnBlogsUncheckedUpdateWithoutCategoryInput>
    create: XOR<CategoriesOnBlogsCreateWithoutCategoryInput, CategoriesOnBlogsUncheckedCreateWithoutCategoryInput>
  }

  export type CategoriesOnBlogsUpdateWithWhereUniqueWithoutCategoryInput = {
    where: CategoriesOnBlogsWhereUniqueInput
    data: XOR<CategoriesOnBlogsUpdateWithoutCategoryInput, CategoriesOnBlogsUncheckedUpdateWithoutCategoryInput>
  }

  export type CategoriesOnBlogsUpdateManyWithWhereWithoutCategoryInput = {
    where: CategoriesOnBlogsScalarWhereInput
    data: XOR<CategoriesOnBlogsUpdateManyMutationInput, CategoriesOnBlogsUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CategoriesOnBlogsScalarWhereInput = {
    AND?: CategoriesOnBlogsScalarWhereInput | CategoriesOnBlogsScalarWhereInput[]
    OR?: CategoriesOnBlogsScalarWhereInput[]
    NOT?: CategoriesOnBlogsScalarWhereInput | CategoriesOnBlogsScalarWhereInput[]
    id?: StringFilter<"CategoriesOnBlogs"> | string
    blogId?: StringFilter<"CategoriesOnBlogs"> | string
    categoryId?: StringFilter<"CategoriesOnBlogs"> | string
    assignedAt?: DateTimeFilter<"CategoriesOnBlogs"> | Date | string
  }

  export type CategoriesOnProductsUpsertWithWhereUniqueWithoutCategoryInput = {
    where: CategoriesOnProductsWhereUniqueInput
    update: XOR<CategoriesOnProductsUpdateWithoutCategoryInput, CategoriesOnProductsUncheckedUpdateWithoutCategoryInput>
    create: XOR<CategoriesOnProductsCreateWithoutCategoryInput, CategoriesOnProductsUncheckedCreateWithoutCategoryInput>
  }

  export type CategoriesOnProductsUpdateWithWhereUniqueWithoutCategoryInput = {
    where: CategoriesOnProductsWhereUniqueInput
    data: XOR<CategoriesOnProductsUpdateWithoutCategoryInput, CategoriesOnProductsUncheckedUpdateWithoutCategoryInput>
  }

  export type CategoriesOnProductsUpdateManyWithWhereWithoutCategoryInput = {
    where: CategoriesOnProductsScalarWhereInput
    data: XOR<CategoriesOnProductsUpdateManyMutationInput, CategoriesOnProductsUncheckedUpdateManyWithoutCategoryInput>
  }

  export type CategoriesOnProductsScalarWhereInput = {
    AND?: CategoriesOnProductsScalarWhereInput | CategoriesOnProductsScalarWhereInput[]
    OR?: CategoriesOnProductsScalarWhereInput[]
    NOT?: CategoriesOnProductsScalarWhereInput | CategoriesOnProductsScalarWhereInput[]
    id?: StringFilter<"CategoriesOnProducts"> | string
    productId?: StringFilter<"CategoriesOnProducts"> | string
    categoryId?: StringFilter<"CategoriesOnProducts"> | string
    assignedAt?: DateTimeFilter<"CategoriesOnProducts"> | Date | string
  }

  export type PromotionConditionUpdateManyInput = {
    where: PromotionConditionWhereInput
    data: PromotionConditionUpdateInput
  }

  export type PromotionConditionDeleteManyInput = {
    where: PromotionConditionWhereInput
  }

  export type PromotionActionUpdateManyInput = {
    where: PromotionActionWhereInput
    data: PromotionActionUpdateInput
  }

  export type PromotionActionDeleteManyInput = {
    where: PromotionActionWhereInput
  }

  export type UsageLimitUpsertInput = {
    set: UsageLimitCreateInput | null
    update: UsageLimitUpdateInput
  }

  export type MetadataUpdateInput = {
    createdBy?: StringFieldUpdateOperationsInput | string
    updatedBy?: StringFieldUpdateOperationsInput | string
    notes?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlogCreateWithoutCommentsInput = {
    id?: string
    slug: string
    title: string
    content: XOR<BlogContentCreateEnvelopeInput, BlogContentCreateInput>
    metadata: XOR<BlogMetadataCreateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogCreatetagsInput | string[]
    status?: $Enums.BlogStatus
    publishedAt?: Date | string | null
    customFields?: XOR<CustomFieldsListCreateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: $Enums.BlogLayout
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoriesOnBlogsCreateNestedManyWithoutBlogInput
  }

  export type BlogUncheckedCreateWithoutCommentsInput = {
    id?: string
    slug: string
    title: string
    content: XOR<BlogContentCreateEnvelopeInput, BlogContentCreateInput>
    metadata: XOR<BlogMetadataCreateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogCreatetagsInput | string[]
    status?: $Enums.BlogStatus
    publishedAt?: Date | string | null
    customFields?: XOR<CustomFieldsListCreateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: $Enums.BlogLayout
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: CategoriesOnBlogsUncheckedCreateNestedManyWithoutBlogInput
  }

  export type BlogCreateOrConnectWithoutCommentsInput = {
    where: BlogWhereUniqueInput
    create: XOR<BlogCreateWithoutCommentsInput, BlogUncheckedCreateWithoutCommentsInput>
  }

  export type BlogUpsertWithoutCommentsInput = {
    update: XOR<BlogUpdateWithoutCommentsInput, BlogUncheckedUpdateWithoutCommentsInput>
    create: XOR<BlogCreateWithoutCommentsInput, BlogUncheckedCreateWithoutCommentsInput>
    where?: BlogWhereInput
  }

  export type BlogUpdateToOneWithWhereWithoutCommentsInput = {
    where?: BlogWhereInput
    data: XOR<BlogUpdateWithoutCommentsInput, BlogUncheckedUpdateWithoutCommentsInput>
  }

  export type BlogUpdateWithoutCommentsInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: XOR<BlogContentUpdateEnvelopeInput, BlogContentCreateInput>
    metadata?: XOR<BlogMetadataUpdateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogUpdatetagsInput | string[]
    status?: EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customFields?: XOR<CustomFieldsListUpdateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: EnumBlogLayoutFieldUpdateOperationsInput | $Enums.BlogLayout
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoriesOnBlogsUpdateManyWithoutBlogNestedInput
  }

  export type BlogUncheckedUpdateWithoutCommentsInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: XOR<BlogContentUpdateEnvelopeInput, BlogContentCreateInput>
    metadata?: XOR<BlogMetadataUpdateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogUpdatetagsInput | string[]
    status?: EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customFields?: XOR<CustomFieldsListUpdateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: EnumBlogLayoutFieldUpdateOperationsInput | $Enums.BlogLayout
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoriesOnBlogsUncheckedUpdateManyWithoutBlogNestedInput
  }

  export type BlogMetadataCreatekeywordsInput = {
    set: string[]
  }

  export type BlogAuthorCreateInput = {
    name: string
    bio?: string | null
    avatar?: string | null
  }

  export type CategoriesOnBlogsCreateWithoutBlogInput = {
    id?: string
    assignedAt?: Date | string
    category: CategoryCreateNestedOneWithoutBlogsInput
  }

  export type CategoriesOnBlogsUncheckedCreateWithoutBlogInput = {
    id?: string
    categoryId: string
    assignedAt?: Date | string
  }

  export type CategoriesOnBlogsCreateOrConnectWithoutBlogInput = {
    where: CategoriesOnBlogsWhereUniqueInput
    create: XOR<CategoriesOnBlogsCreateWithoutBlogInput, CategoriesOnBlogsUncheckedCreateWithoutBlogInput>
  }

  export type CategoriesOnBlogsCreateManyBlogInputEnvelope = {
    data: CategoriesOnBlogsCreateManyBlogInput | CategoriesOnBlogsCreateManyBlogInput[]
  }

  export type CommentCreateWithoutBlogInput = {
    id?: string
    comment: string
  }

  export type CommentUncheckedCreateWithoutBlogInput = {
    id?: string
    comment: string
  }

  export type CommentCreateOrConnectWithoutBlogInput = {
    where: CommentWhereUniqueInput
    create: XOR<CommentCreateWithoutBlogInput, CommentUncheckedCreateWithoutBlogInput>
  }

  export type CommentCreateManyBlogInputEnvelope = {
    data: CommentCreateManyBlogInput | CommentCreateManyBlogInput[]
  }

  export type BlogContentUpdateInput = {
    type?: EnumBlogContentTypeFieldUpdateOperationsInput | $Enums.BlogContentType
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlogMetadataUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: BlogMetadataUpdatekeywordsInput | string[]
    author?: XOR<BlogAuthorUpdateEnvelopeInput, BlogAuthorCreateInput>
    readingTime?: NullableIntFieldUpdateOperationsInput | number | null
    coverImageURL?: NullableStringFieldUpdateOperationsInput | string | null
    blurDataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CustomFieldsUpdateManyInput = {
    where: CustomFieldsWhereInput
    data: CustomFieldsUpdateInput
  }

  export type CustomFieldsDeleteManyInput = {
    where: CustomFieldsWhereInput
  }

  export type CategoriesOnBlogsUpsertWithWhereUniqueWithoutBlogInput = {
    where: CategoriesOnBlogsWhereUniqueInput
    update: XOR<CategoriesOnBlogsUpdateWithoutBlogInput, CategoriesOnBlogsUncheckedUpdateWithoutBlogInput>
    create: XOR<CategoriesOnBlogsCreateWithoutBlogInput, CategoriesOnBlogsUncheckedCreateWithoutBlogInput>
  }

  export type CategoriesOnBlogsUpdateWithWhereUniqueWithoutBlogInput = {
    where: CategoriesOnBlogsWhereUniqueInput
    data: XOR<CategoriesOnBlogsUpdateWithoutBlogInput, CategoriesOnBlogsUncheckedUpdateWithoutBlogInput>
  }

  export type CategoriesOnBlogsUpdateManyWithWhereWithoutBlogInput = {
    where: CategoriesOnBlogsScalarWhereInput
    data: XOR<CategoriesOnBlogsUpdateManyMutationInput, CategoriesOnBlogsUncheckedUpdateManyWithoutBlogInput>
  }

  export type CommentUpsertWithWhereUniqueWithoutBlogInput = {
    where: CommentWhereUniqueInput
    update: XOR<CommentUpdateWithoutBlogInput, CommentUncheckedUpdateWithoutBlogInput>
    create: XOR<CommentCreateWithoutBlogInput, CommentUncheckedCreateWithoutBlogInput>
  }

  export type CommentUpdateWithWhereUniqueWithoutBlogInput = {
    where: CommentWhereUniqueInput
    data: XOR<CommentUpdateWithoutBlogInput, CommentUncheckedUpdateWithoutBlogInput>
  }

  export type CommentUpdateManyWithWhereWithoutBlogInput = {
    where: CommentScalarWhereInput
    data: XOR<CommentUpdateManyMutationInput, CommentUncheckedUpdateManyWithoutBlogInput>
  }

  export type CommentScalarWhereInput = {
    AND?: CommentScalarWhereInput | CommentScalarWhereInput[]
    OR?: CommentScalarWhereInput[]
    NOT?: CommentScalarWhereInput | CommentScalarWhereInput[]
    id?: StringFilter<"Comment"> | string
    comment?: StringFilter<"Comment"> | string
    blogId?: StringFilter<"Comment"> | string
  }

  export type ProductSeoMetadataCreatekeywordsInput = {
    set: string[]
  }

  export type MediasOnProductsCreateWithoutProductInput = {
    id?: string
    assignedAt?: Date | string
    media: MediaCreateNestedOneWithoutProductsInput
  }

  export type MediasOnProductsUncheckedCreateWithoutProductInput = {
    id?: string
    mediaId: string
    assignedAt?: Date | string
  }

  export type MediasOnProductsCreateOrConnectWithoutProductInput = {
    where: MediasOnProductsWhereUniqueInput
    create: XOR<MediasOnProductsCreateWithoutProductInput, MediasOnProductsUncheckedCreateWithoutProductInput>
  }

  export type MediasOnProductsCreateManyProductInputEnvelope = {
    data: MediasOnProductsCreateManyProductInput | MediasOnProductsCreateManyProductInput[]
  }

  export type ReviewCreateWithoutProductInput = {
    id?: string
    userName: string
    rating: number
    comment: string
    imageUrl?: string | null
    helpful?: number
    notHelpful?: number
    verify?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type ReviewUncheckedCreateWithoutProductInput = {
    id?: string
    userName: string
    rating: number
    comment: string
    imageUrl?: string | null
    helpful?: number
    notHelpful?: number
    verify?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type ReviewCreateOrConnectWithoutProductInput = {
    where: ReviewWhereUniqueInput
    create: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput>
  }

  export type ReviewCreateManyProductInputEnvelope = {
    data: ReviewCreateManyProductInput | ReviewCreateManyProductInput[]
  }

  export type CategoriesOnProductsCreateWithoutProductInput = {
    id?: string
    assignedAt?: Date | string
    category: CategoryCreateNestedOneWithoutProductsInput
  }

  export type CategoriesOnProductsUncheckedCreateWithoutProductInput = {
    id?: string
    categoryId: string
    assignedAt?: Date | string
  }

  export type CategoriesOnProductsCreateOrConnectWithoutProductInput = {
    where: CategoriesOnProductsWhereUniqueInput
    create: XOR<CategoriesOnProductsCreateWithoutProductInput, CategoriesOnProductsUncheckedCreateWithoutProductInput>
  }

  export type CategoriesOnProductsCreateManyProductInputEnvelope = {
    data: CategoriesOnProductsCreateManyProductInput | CategoriesOnProductsCreateManyProductInput[]
  }

  export type OrderItemCreateWithoutProductInput = {
    id?: string
    quantity: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
    order: OrderCreateNestedOneWithoutItemsInput
  }

  export type OrderItemUncheckedCreateWithoutProductInput = {
    id?: string
    orderId: string
    quantity: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderItemCreateOrConnectWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemCreateManyProductInputEnvelope = {
    data: OrderItemCreateManyProductInput | OrderItemCreateManyProductInput[]
  }

  export type WishlistCreateWithoutProductInput = {
    id?: string
    assignedAt?: Date | string
    user: UserCreateNestedOneWithoutProductWishlistInput
  }

  export type WishlistUncheckedCreateWithoutProductInput = {
    id?: string
    userId: string
    assignedAt?: Date | string
  }

  export type WishlistCreateOrConnectWithoutProductInput = {
    where: WishlistWhereUniqueInput
    create: XOR<WishlistCreateWithoutProductInput, WishlistUncheckedCreateWithoutProductInput>
  }

  export type WishlistCreateManyProductInputEnvelope = {
    data: WishlistCreateManyProductInput | WishlistCreateManyProductInput[]
  }

  export type ProductDescriptionUpdateInput = {
    contentType?: EnumProductContentTypeFieldUpdateOperationsInput | $Enums.ProductContentType
    content?: StringFieldUpdateOperationsInput | string
  }

  export type PriceUpdateInput = {
    regular?: FloatFieldUpdateOperationsInput | number
    sale?: NullableFloatFieldUpdateOperationsInput | number | null
    saleStartDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    saleEndDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type FeatureUpdateManyInput = {
    where: FeatureWhereInput
    data: FeatureUpdateInput
  }

  export type FeatureDeleteManyInput = {
    where: FeatureWhereInput
  }

  export type InventoryUpdateInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    lowStockThreshold?: IntFieldUpdateOperationsInput | number
    stockQuantity?: IntFieldUpdateOperationsInput | number
  }

  export type ProductSeoMetadataUpdateInput = {
    seoTitle?: StringFieldUpdateOperationsInput | string
    seoDescription?: StringFieldUpdateOperationsInput | string
    keywords?: ProductSeoMetadataUpdatekeywordsInput | string[]
  }

  export type MediasOnProductsUpsertWithWhereUniqueWithoutProductInput = {
    where: MediasOnProductsWhereUniqueInput
    update: XOR<MediasOnProductsUpdateWithoutProductInput, MediasOnProductsUncheckedUpdateWithoutProductInput>
    create: XOR<MediasOnProductsCreateWithoutProductInput, MediasOnProductsUncheckedCreateWithoutProductInput>
  }

  export type MediasOnProductsUpdateWithWhereUniqueWithoutProductInput = {
    where: MediasOnProductsWhereUniqueInput
    data: XOR<MediasOnProductsUpdateWithoutProductInput, MediasOnProductsUncheckedUpdateWithoutProductInput>
  }

  export type MediasOnProductsUpdateManyWithWhereWithoutProductInput = {
    where: MediasOnProductsScalarWhereInput
    data: XOR<MediasOnProductsUpdateManyMutationInput, MediasOnProductsUncheckedUpdateManyWithoutProductInput>
  }

  export type ReviewUpsertWithWhereUniqueWithoutProductInput = {
    where: ReviewWhereUniqueInput
    update: XOR<ReviewUpdateWithoutProductInput, ReviewUncheckedUpdateWithoutProductInput>
    create: XOR<ReviewCreateWithoutProductInput, ReviewUncheckedCreateWithoutProductInput>
  }

  export type ReviewUpdateWithWhereUniqueWithoutProductInput = {
    where: ReviewWhereUniqueInput
    data: XOR<ReviewUpdateWithoutProductInput, ReviewUncheckedUpdateWithoutProductInput>
  }

  export type ReviewUpdateManyWithWhereWithoutProductInput = {
    where: ReviewScalarWhereInput
    data: XOR<ReviewUpdateManyMutationInput, ReviewUncheckedUpdateManyWithoutProductInput>
  }

  export type ReviewScalarWhereInput = {
    AND?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    OR?: ReviewScalarWhereInput[]
    NOT?: ReviewScalarWhereInput | ReviewScalarWhereInput[]
    id?: StringFilter<"Review"> | string
    productId?: StringFilter<"Review"> | string
    userName?: StringFilter<"Review"> | string
    rating?: IntFilter<"Review"> | number
    comment?: StringFilter<"Review"> | string
    imageUrl?: StringNullableFilter<"Review"> | string | null
    helpful?: IntFilter<"Review"> | number
    notHelpful?: IntFilter<"Review"> | number
    verify?: BoolFilter<"Review"> | boolean
    createdAt?: DateTimeFilter<"Review"> | Date | string
    updatedAt?: DateTimeFilter<"Review"> | Date | string
    creatorId?: StringFilter<"Review"> | string
  }

  export type CategoriesOnProductsUpsertWithWhereUniqueWithoutProductInput = {
    where: CategoriesOnProductsWhereUniqueInput
    update: XOR<CategoriesOnProductsUpdateWithoutProductInput, CategoriesOnProductsUncheckedUpdateWithoutProductInput>
    create: XOR<CategoriesOnProductsCreateWithoutProductInput, CategoriesOnProductsUncheckedCreateWithoutProductInput>
  }

  export type CategoriesOnProductsUpdateWithWhereUniqueWithoutProductInput = {
    where: CategoriesOnProductsWhereUniqueInput
    data: XOR<CategoriesOnProductsUpdateWithoutProductInput, CategoriesOnProductsUncheckedUpdateWithoutProductInput>
  }

  export type CategoriesOnProductsUpdateManyWithWhereWithoutProductInput = {
    where: CategoriesOnProductsScalarWhereInput
    data: XOR<CategoriesOnProductsUpdateManyMutationInput, CategoriesOnProductsUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemUpsertWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
    create: XOR<OrderItemCreateWithoutProductInput, OrderItemUncheckedCreateWithoutProductInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutProductInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutProductInput, OrderItemUncheckedUpdateWithoutProductInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutProductInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutProductInput>
  }

  export type OrderItemScalarWhereInput = {
    AND?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    OR?: OrderItemScalarWhereInput[]
    NOT?: OrderItemScalarWhereInput | OrderItemScalarWhereInput[]
    id?: StringFilter<"OrderItem"> | string
    orderId?: StringFilter<"OrderItem"> | string
    productId?: StringFilter<"OrderItem"> | string
    quantity?: IntFilter<"OrderItem"> | number
    price?: FloatFilter<"OrderItem"> | number
    createdAt?: DateTimeFilter<"OrderItem"> | Date | string
    updatedAt?: DateTimeFilter<"OrderItem"> | Date | string
  }

  export type WishlistUpsertWithWhereUniqueWithoutProductInput = {
    where: WishlistWhereUniqueInput
    update: XOR<WishlistUpdateWithoutProductInput, WishlistUncheckedUpdateWithoutProductInput>
    create: XOR<WishlistCreateWithoutProductInput, WishlistUncheckedCreateWithoutProductInput>
  }

  export type WishlistUpdateWithWhereUniqueWithoutProductInput = {
    where: WishlistWhereUniqueInput
    data: XOR<WishlistUpdateWithoutProductInput, WishlistUncheckedUpdateWithoutProductInput>
  }

  export type WishlistUpdateManyWithWhereWithoutProductInput = {
    where: WishlistScalarWhereInput
    data: XOR<WishlistUpdateManyMutationInput, WishlistUncheckedUpdateManyWithoutProductInput>
  }

  export type WishlistScalarWhereInput = {
    AND?: WishlistScalarWhereInput | WishlistScalarWhereInput[]
    OR?: WishlistScalarWhereInput[]
    NOT?: WishlistScalarWhereInput | WishlistScalarWhereInput[]
    id?: StringFilter<"Wishlist"> | string
    productId?: StringFilter<"Wishlist"> | string
    userId?: StringFilter<"Wishlist"> | string
    assignedAt?: DateTimeFilter<"Wishlist"> | Date | string
  }

  export type ProductCreateWithoutReviewsInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    media?: MediasOnProductsCreateNestedManyWithoutProductInput
    categories?: CategoriesOnProductsCreateNestedManyWithoutProductInput
    OrderItem?: OrderItemCreateNestedManyWithoutProductInput
    userWishlist?: WishlistCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutReviewsInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    media?: MediasOnProductsUncheckedCreateNestedManyWithoutProductInput
    categories?: CategoriesOnProductsUncheckedCreateNestedManyWithoutProductInput
    OrderItem?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    userWishlist?: WishlistUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutReviewsInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutReviewsInput, ProductUncheckedCreateWithoutReviewsInput>
  }

  export type ProductUpsertWithoutReviewsInput = {
    update: XOR<ProductUpdateWithoutReviewsInput, ProductUncheckedUpdateWithoutReviewsInput>
    create: XOR<ProductCreateWithoutReviewsInput, ProductUncheckedCreateWithoutReviewsInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutReviewsInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutReviewsInput, ProductUncheckedUpdateWithoutReviewsInput>
  }

  export type ProductUpdateWithoutReviewsInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    media?: MediasOnProductsUpdateManyWithoutProductNestedInput
    categories?: CategoriesOnProductsUpdateManyWithoutProductNestedInput
    OrderItem?: OrderItemUpdateManyWithoutProductNestedInput
    userWishlist?: WishlistUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutReviewsInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    media?: MediasOnProductsUncheckedUpdateManyWithoutProductNestedInput
    categories?: CategoriesOnProductsUncheckedUpdateManyWithoutProductNestedInput
    OrderItem?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    userWishlist?: WishlistUncheckedUpdateManyWithoutProductNestedInput
  }

  export type OrderCreateWithoutItemsInput = {
    id?: string
    deliveryInfo: XOR<DeliveryInfoCreateEnvelopeInput, DeliveryInfoCreateInput>
    userData: XOR<UserDataCreateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListCreateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices: XOR<OrderPricesCreateEnvelopeInput, OrderPricesCreateInput>
    status?: $Enums.OrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutItemsInput = {
    id?: string
    deliveryInfo: XOR<DeliveryInfoCreateEnvelopeInput, DeliveryInfoCreateInput>
    userData: XOR<UserDataCreateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListCreateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices: XOR<OrderPricesCreateEnvelopeInput, OrderPricesCreateInput>
    status?: $Enums.OrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    userId: string
  }

  export type OrderCreateOrConnectWithoutItemsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
  }

  export type ProductCreateWithoutOrderItemInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    media?: MediasOnProductsCreateNestedManyWithoutProductInput
    reviews?: ReviewCreateNestedManyWithoutProductInput
    categories?: CategoriesOnProductsCreateNestedManyWithoutProductInput
    userWishlist?: WishlistCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutOrderItemInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    media?: MediasOnProductsUncheckedCreateNestedManyWithoutProductInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
    categories?: CategoriesOnProductsUncheckedCreateNestedManyWithoutProductInput
    userWishlist?: WishlistUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutOrderItemInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutOrderItemInput, ProductUncheckedCreateWithoutOrderItemInput>
  }

  export type OrderUpsertWithoutItemsInput = {
    update: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
    create: XOR<OrderCreateWithoutItemsInput, OrderUncheckedCreateWithoutItemsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutItemsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutItemsInput, OrderUncheckedUpdateWithoutItemsInput>
  }

  export type OrderUpdateWithoutItemsInput = {
    deliveryInfo?: XOR<DeliveryInfoUpdateEnvelopeInput, DeliveryInfoCreateInput>
    userData?: XOR<UserDataUpdateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListUpdateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices?: XOR<OrderPricesUpdateEnvelopeInput, OrderPricesCreateInput>
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutItemsInput = {
    deliveryInfo?: XOR<DeliveryInfoUpdateEnvelopeInput, DeliveryInfoCreateInput>
    userData?: XOR<UserDataUpdateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListUpdateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices?: XOR<OrderPricesUpdateEnvelopeInput, OrderPricesCreateInput>
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type ProductUpsertWithoutOrderItemInput = {
    update: XOR<ProductUpdateWithoutOrderItemInput, ProductUncheckedUpdateWithoutOrderItemInput>
    create: XOR<ProductCreateWithoutOrderItemInput, ProductUncheckedCreateWithoutOrderItemInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutOrderItemInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutOrderItemInput, ProductUncheckedUpdateWithoutOrderItemInput>
  }

  export type ProductUpdateWithoutOrderItemInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    media?: MediasOnProductsUpdateManyWithoutProductNestedInput
    reviews?: ReviewUpdateManyWithoutProductNestedInput
    categories?: CategoriesOnProductsUpdateManyWithoutProductNestedInput
    userWishlist?: WishlistUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutOrderItemInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    media?: MediasOnProductsUncheckedUpdateManyWithoutProductNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
    categories?: CategoriesOnProductsUncheckedUpdateManyWithoutProductNestedInput
    userWishlist?: WishlistUncheckedUpdateManyWithoutProductNestedInput
  }

  export type OrderItemCreateWithoutOrderInput = {
    id?: string
    quantity: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
    product: ProductCreateNestedOneWithoutOrderItemInput
  }

  export type OrderItemUncheckedCreateWithoutOrderInput = {
    id?: string
    productId: string
    quantity: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderItemCreateOrConnectWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemCreateManyOrderInputEnvelope = {
    data: OrderItemCreateManyOrderInput | OrderItemCreateManyOrderInput[]
  }

  export type UserCreateWithoutOrderInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    fullName?: string | null
    avatar?: string | null
    phone?: string | null
    isAnonymous?: boolean
    productWishlist?: WishlistCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOrderInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    fullName?: string | null
    avatar?: string | null
    phone?: string | null
    isAnonymous?: boolean
    productWishlist?: WishlistUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOrderInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOrderInput, UserUncheckedCreateWithoutOrderInput>
  }

  export type DeliveryInfoUpdateInput = {
    address?: StringFieldUpdateOperationsInput | string
    deliveryDate?: DateTimeFieldUpdateOperationsInput | Date | string
    deliveryTime?: StringFieldUpdateOperationsInput | string
    city?: NullableStringFieldUpdateOperationsInput | string | null
    additionalNotes?: NullableStringFieldUpdateOperationsInput | string | null
    deliveryMethod?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
  }

  export type OrderPromotionUpdateManyInput = {
    where: OrderPromotionWhereInput
    data: OrderPromotionUpdateInput
  }

  export type OrderPromotionDeleteManyInput = {
    where: OrderPromotionWhereInput
  }

  export type OrderPricesUpdateInput = {
    subtotal?: FloatFieldUpdateOperationsInput | number
    shipping?: FloatFieldUpdateOperationsInput | number
    discount?: FloatFieldUpdateOperationsInput | number
    total?: FloatFieldUpdateOperationsInput | number
  }

  export type OrderItemUpsertWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    update: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
    create: XOR<OrderItemCreateWithoutOrderInput, OrderItemUncheckedCreateWithoutOrderInput>
  }

  export type OrderItemUpdateWithWhereUniqueWithoutOrderInput = {
    where: OrderItemWhereUniqueInput
    data: XOR<OrderItemUpdateWithoutOrderInput, OrderItemUncheckedUpdateWithoutOrderInput>
  }

  export type OrderItemUpdateManyWithWhereWithoutOrderInput = {
    where: OrderItemScalarWhereInput
    data: XOR<OrderItemUpdateManyMutationInput, OrderItemUncheckedUpdateManyWithoutOrderInput>
  }

  export type UserUpsertWithoutOrderInput = {
    update: XOR<UserUpdateWithoutOrderInput, UserUncheckedUpdateWithoutOrderInput>
    create: XOR<UserCreateWithoutOrderInput, UserUncheckedCreateWithoutOrderInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOrderInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOrderInput, UserUncheckedUpdateWithoutOrderInput>
  }

  export type UserUpdateWithoutOrderInput = {
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    productWishlist?: WishlistUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOrderInput = {
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    productWishlist?: WishlistUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WishlistCreateWithoutUserInput = {
    id?: string
    assignedAt?: Date | string
    product: ProductCreateNestedOneWithoutUserWishlistInput
  }

  export type WishlistUncheckedCreateWithoutUserInput = {
    id?: string
    productId: string
    assignedAt?: Date | string
  }

  export type WishlistCreateOrConnectWithoutUserInput = {
    where: WishlistWhereUniqueInput
    create: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput>
  }

  export type WishlistCreateManyUserInputEnvelope = {
    data: WishlistCreateManyUserInput | WishlistCreateManyUserInput[]
  }

  export type OrderCreateWithoutUserInput = {
    id?: string
    deliveryInfo: XOR<DeliveryInfoCreateEnvelopeInput, DeliveryInfoCreateInput>
    userData: XOR<UserDataCreateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListCreateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices: XOR<OrderPricesCreateEnvelopeInput, OrderPricesCreateInput>
    status?: $Enums.OrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutUserInput = {
    id?: string
    deliveryInfo: XOR<DeliveryInfoCreateEnvelopeInput, DeliveryInfoCreateInput>
    userData: XOR<UserDataCreateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListCreateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices: XOR<OrderPricesCreateEnvelopeInput, OrderPricesCreateInput>
    status?: $Enums.OrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    items?: OrderItemUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutUserInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderCreateManyUserInputEnvelope = {
    data: OrderCreateManyUserInput | OrderCreateManyUserInput[]
  }

  export type WishlistUpsertWithWhereUniqueWithoutUserInput = {
    where: WishlistWhereUniqueInput
    update: XOR<WishlistUpdateWithoutUserInput, WishlistUncheckedUpdateWithoutUserInput>
    create: XOR<WishlistCreateWithoutUserInput, WishlistUncheckedCreateWithoutUserInput>
  }

  export type WishlistUpdateWithWhereUniqueWithoutUserInput = {
    where: WishlistWhereUniqueInput
    data: XOR<WishlistUpdateWithoutUserInput, WishlistUncheckedUpdateWithoutUserInput>
  }

  export type WishlistUpdateManyWithWhereWithoutUserInput = {
    where: WishlistScalarWhereInput
    data: XOR<WishlistUpdateManyMutationInput, WishlistUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderUpsertWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
    create: XOR<OrderCreateWithoutUserInput, OrderUncheckedCreateWithoutUserInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutUserInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutUserInput, OrderUncheckedUpdateWithoutUserInput>
  }

  export type OrderUpdateManyWithWhereWithoutUserInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutUserInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    userId?: StringFilter<"Order"> | string
  }

  export type BlogCreateWithoutCategoriesInput = {
    id?: string
    slug: string
    title: string
    content: XOR<BlogContentCreateEnvelopeInput, BlogContentCreateInput>
    metadata: XOR<BlogMetadataCreateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogCreatetagsInput | string[]
    status?: $Enums.BlogStatus
    publishedAt?: Date | string | null
    customFields?: XOR<CustomFieldsListCreateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: $Enums.BlogLayout
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentCreateNestedManyWithoutBlogInput
  }

  export type BlogUncheckedCreateWithoutCategoriesInput = {
    id?: string
    slug: string
    title: string
    content: XOR<BlogContentCreateEnvelopeInput, BlogContentCreateInput>
    metadata: XOR<BlogMetadataCreateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogCreatetagsInput | string[]
    status?: $Enums.BlogStatus
    publishedAt?: Date | string | null
    customFields?: XOR<CustomFieldsListCreateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: $Enums.BlogLayout
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    comments?: CommentUncheckedCreateNestedManyWithoutBlogInput
  }

  export type BlogCreateOrConnectWithoutCategoriesInput = {
    where: BlogWhereUniqueInput
    create: XOR<BlogCreateWithoutCategoriesInput, BlogUncheckedCreateWithoutCategoriesInput>
  }

  export type CategoryCreateWithoutBlogsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    featured?: boolean
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: MediaCreateNestedOneWithoutCategoriesInput
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
    products?: CategoriesOnProductsCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutBlogsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageId?: string | null
    featured?: boolean
    parentId?: string | null
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    products?: CategoriesOnProductsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutBlogsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutBlogsInput, CategoryUncheckedCreateWithoutBlogsInput>
  }

  export type BlogUpsertWithoutCategoriesInput = {
    update: XOR<BlogUpdateWithoutCategoriesInput, BlogUncheckedUpdateWithoutCategoriesInput>
    create: XOR<BlogCreateWithoutCategoriesInput, BlogUncheckedCreateWithoutCategoriesInput>
    where?: BlogWhereInput
  }

  export type BlogUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: BlogWhereInput
    data: XOR<BlogUpdateWithoutCategoriesInput, BlogUncheckedUpdateWithoutCategoriesInput>
  }

  export type BlogUpdateWithoutCategoriesInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: XOR<BlogContentUpdateEnvelopeInput, BlogContentCreateInput>
    metadata?: XOR<BlogMetadataUpdateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogUpdatetagsInput | string[]
    status?: EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customFields?: XOR<CustomFieldsListUpdateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: EnumBlogLayoutFieldUpdateOperationsInput | $Enums.BlogLayout
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUpdateManyWithoutBlogNestedInput
  }

  export type BlogUncheckedUpdateWithoutCategoriesInput = {
    slug?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: XOR<BlogContentUpdateEnvelopeInput, BlogContentCreateInput>
    metadata?: XOR<BlogMetadataUpdateEnvelopeInput, BlogMetadataCreateInput>
    tags?: BlogUpdatetagsInput | string[]
    status?: EnumBlogStatusFieldUpdateOperationsInput | $Enums.BlogStatus
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    customFields?: XOR<CustomFieldsListUpdateEnvelopeInput, CustomFieldsCreateInput> | CustomFieldsCreateInput[]
    layout?: EnumBlogLayoutFieldUpdateOperationsInput | $Enums.BlogLayout
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    comments?: CommentUncheckedUpdateManyWithoutBlogNestedInput
  }

  export type CategoryUpsertWithoutBlogsInput = {
    update: XOR<CategoryUpdateWithoutBlogsInput, CategoryUncheckedUpdateWithoutBlogsInput>
    create: XOR<CategoryCreateWithoutBlogsInput, CategoryUncheckedCreateWithoutBlogsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutBlogsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutBlogsInput, CategoryUncheckedUpdateWithoutBlogsInput>
  }

  export type CategoryUpdateWithoutBlogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: MediaUpdateOneWithoutCategoriesNestedInput
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    products?: CategoriesOnProductsUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutBlogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    products?: CategoriesOnProductsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ProductCreateWithoutCategoriesInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    media?: MediasOnProductsCreateNestedManyWithoutProductInput
    reviews?: ReviewCreateNestedManyWithoutProductInput
    OrderItem?: OrderItemCreateNestedManyWithoutProductInput
    userWishlist?: WishlistCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutCategoriesInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    media?: MediasOnProductsUncheckedCreateNestedManyWithoutProductInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
    OrderItem?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    userWishlist?: WishlistUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutCategoriesInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutCategoriesInput, ProductUncheckedCreateWithoutCategoriesInput>
  }

  export type CategoryCreateWithoutProductsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    featured?: boolean
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    image?: MediaCreateNestedOneWithoutCategoriesInput
    parent?: CategoryCreateNestedOneWithoutChildrenInput
    children?: CategoryCreateNestedManyWithoutParentInput
    blogs?: CategoriesOnBlogsCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutProductsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageId?: string | null
    featured?: boolean
    parentId?: string | null
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: CategoryUncheckedCreateNestedManyWithoutParentInput
    blogs?: CategoriesOnBlogsUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutProductsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
  }

  export type ProductUpsertWithoutCategoriesInput = {
    update: XOR<ProductUpdateWithoutCategoriesInput, ProductUncheckedUpdateWithoutCategoriesInput>
    create: XOR<ProductCreateWithoutCategoriesInput, ProductUncheckedCreateWithoutCategoriesInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutCategoriesInput, ProductUncheckedUpdateWithoutCategoriesInput>
  }

  export type ProductUpdateWithoutCategoriesInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    media?: MediasOnProductsUpdateManyWithoutProductNestedInput
    reviews?: ReviewUpdateManyWithoutProductNestedInput
    OrderItem?: OrderItemUpdateManyWithoutProductNestedInput
    userWishlist?: WishlistUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutCategoriesInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    media?: MediasOnProductsUncheckedUpdateManyWithoutProductNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
    OrderItem?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    userWishlist?: WishlistUncheckedUpdateManyWithoutProductNestedInput
  }

  export type CategoryUpsertWithoutProductsInput = {
    update: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
    create: XOR<CategoryCreateWithoutProductsInput, CategoryUncheckedCreateWithoutProductsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProductsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProductsInput, CategoryUncheckedUpdateWithoutProductsInput>
  }

  export type CategoryUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: MediaUpdateOneWithoutCategoriesNestedInput
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    blogs?: CategoriesOnBlogsUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProductsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    blogs?: CategoriesOnBlogsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ProductCreateWithoutMediaInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    reviews?: ReviewCreateNestedManyWithoutProductInput
    categories?: CategoriesOnProductsCreateNestedManyWithoutProductInput
    OrderItem?: OrderItemCreateNestedManyWithoutProductInput
    userWishlist?: WishlistCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutMediaInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
    categories?: CategoriesOnProductsUncheckedCreateNestedManyWithoutProductInput
    OrderItem?: OrderItemUncheckedCreateNestedManyWithoutProductInput
    userWishlist?: WishlistUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutMediaInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutMediaInput, ProductUncheckedCreateWithoutMediaInput>
  }

  export type MediaCreateWithoutProductsInput = {
    id?: string
    createdAt?: Date | string
    fileName: string
    type: $Enums.MediaType
    updatedAt?: Date | string
    url: string
    blurDataUrl?: string | null
    creatorId: string
    categories?: CategoryCreateNestedManyWithoutImageInput
  }

  export type MediaUncheckedCreateWithoutProductsInput = {
    id?: string
    createdAt?: Date | string
    fileName: string
    type: $Enums.MediaType
    updatedAt?: Date | string
    url: string
    blurDataUrl?: string | null
    creatorId: string
    categories?: CategoryUncheckedCreateNestedManyWithoutImageInput
  }

  export type MediaCreateOrConnectWithoutProductsInput = {
    where: MediaWhereUniqueInput
    create: XOR<MediaCreateWithoutProductsInput, MediaUncheckedCreateWithoutProductsInput>
  }

  export type ProductUpsertWithoutMediaInput = {
    update: XOR<ProductUpdateWithoutMediaInput, ProductUncheckedUpdateWithoutMediaInput>
    create: XOR<ProductCreateWithoutMediaInput, ProductUncheckedCreateWithoutMediaInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutMediaInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutMediaInput, ProductUncheckedUpdateWithoutMediaInput>
  }

  export type ProductUpdateWithoutMediaInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    reviews?: ReviewUpdateManyWithoutProductNestedInput
    categories?: CategoriesOnProductsUpdateManyWithoutProductNestedInput
    OrderItem?: OrderItemUpdateManyWithoutProductNestedInput
    userWishlist?: WishlistUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutMediaInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
    categories?: CategoriesOnProductsUncheckedUpdateManyWithoutProductNestedInput
    OrderItem?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
    userWishlist?: WishlistUncheckedUpdateManyWithoutProductNestedInput
  }

  export type MediaUpsertWithoutProductsInput = {
    update: XOR<MediaUpdateWithoutProductsInput, MediaUncheckedUpdateWithoutProductsInput>
    create: XOR<MediaCreateWithoutProductsInput, MediaUncheckedCreateWithoutProductsInput>
    where?: MediaWhereInput
  }

  export type MediaUpdateToOneWithWhereWithoutProductsInput = {
    where?: MediaWhereInput
    data: XOR<MediaUpdateWithoutProductsInput, MediaUncheckedUpdateWithoutProductsInput>
  }

  export type MediaUpdateWithoutProductsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    blurDataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    categories?: CategoryUpdateManyWithoutImageNestedInput
  }

  export type MediaUncheckedUpdateWithoutProductsInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    fileName?: StringFieldUpdateOperationsInput | string
    type?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    url?: StringFieldUpdateOperationsInput | string
    blurDataUrl?: NullableStringFieldUpdateOperationsInput | string | null
    creatorId?: StringFieldUpdateOperationsInput | string
    categories?: CategoryUncheckedUpdateManyWithoutImageNestedInput
  }

  export type ProductCreateWithoutUserWishlistInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    media?: MediasOnProductsCreateNestedManyWithoutProductInput
    reviews?: ReviewCreateNestedManyWithoutProductInput
    categories?: CategoriesOnProductsCreateNestedManyWithoutProductInput
    OrderItem?: OrderItemCreateNestedManyWithoutProductInput
  }

  export type ProductUncheckedCreateWithoutUserWishlistInput = {
    id?: string
    title: string
    slug: string
    description: XOR<ProductDescriptionCreateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: boolean
    isNewProduct?: boolean
    tags?: ProductCreatetagsInput | string[]
    price: XOR<PriceCreateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListCreateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: $Enums.ProductStatus
    visibility?: boolean
    inventory: XOR<InventoryCreateEnvelopeInput, InventoryCreateInput>
    blogUrl?: string | null
    partnerId: string
    metadata: XOR<ProductSeoMetadataCreateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
    media?: MediasOnProductsUncheckedCreateNestedManyWithoutProductInput
    reviews?: ReviewUncheckedCreateNestedManyWithoutProductInput
    categories?: CategoriesOnProductsUncheckedCreateNestedManyWithoutProductInput
    OrderItem?: OrderItemUncheckedCreateNestedManyWithoutProductInput
  }

  export type ProductCreateOrConnectWithoutUserWishlistInput = {
    where: ProductWhereUniqueInput
    create: XOR<ProductCreateWithoutUserWishlistInput, ProductUncheckedCreateWithoutUserWishlistInput>
  }

  export type UserCreateWithoutProductWishlistInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    fullName?: string | null
    avatar?: string | null
    phone?: string | null
    isAnonymous?: boolean
    order?: OrderCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProductWishlistInput = {
    id?: string
    clerkId?: string | null
    email?: string | null
    fullName?: string | null
    avatar?: string | null
    phone?: string | null
    isAnonymous?: boolean
    order?: OrderUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProductWishlistInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProductWishlistInput, UserUncheckedCreateWithoutProductWishlistInput>
  }

  export type ProductUpsertWithoutUserWishlistInput = {
    update: XOR<ProductUpdateWithoutUserWishlistInput, ProductUncheckedUpdateWithoutUserWishlistInput>
    create: XOR<ProductCreateWithoutUserWishlistInput, ProductUncheckedCreateWithoutUserWishlistInput>
    where?: ProductWhereInput
  }

  export type ProductUpdateToOneWithWhereWithoutUserWishlistInput = {
    where?: ProductWhereInput
    data: XOR<ProductUpdateWithoutUserWishlistInput, ProductUncheckedUpdateWithoutUserWishlistInput>
  }

  export type ProductUpdateWithoutUserWishlistInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    media?: MediasOnProductsUpdateManyWithoutProductNestedInput
    reviews?: ReviewUpdateManyWithoutProductNestedInput
    categories?: CategoriesOnProductsUpdateManyWithoutProductNestedInput
    OrderItem?: OrderItemUpdateManyWithoutProductNestedInput
  }

  export type ProductUncheckedUpdateWithoutUserWishlistInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionUpdateEnvelopeInput, ProductDescriptionCreateInput>
    isFeature?: BoolFieldUpdateOperationsInput | boolean
    isNewProduct?: BoolFieldUpdateOperationsInput | boolean
    tags?: ProductUpdatetagsInput | string[]
    price?: XOR<PriceUpdateEnvelopeInput, PriceCreateInput>
    features?: XOR<FeatureListUpdateEnvelopeInput, FeatureCreateInput> | FeatureCreateInput[]
    status?: EnumProductStatusFieldUpdateOperationsInput | $Enums.ProductStatus
    visibility?: BoolFieldUpdateOperationsInput | boolean
    inventory?: XOR<InventoryUpdateEnvelopeInput, InventoryCreateInput>
    blogUrl?: NullableStringFieldUpdateOperationsInput | string | null
    partnerId?: StringFieldUpdateOperationsInput | string
    metadata?: XOR<ProductSeoMetadataUpdateEnvelopeInput, ProductSeoMetadataCreateInput>
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
    media?: MediasOnProductsUncheckedUpdateManyWithoutProductNestedInput
    reviews?: ReviewUncheckedUpdateManyWithoutProductNestedInput
    categories?: CategoriesOnProductsUncheckedUpdateManyWithoutProductNestedInput
    OrderItem?: OrderItemUncheckedUpdateManyWithoutProductNestedInput
  }

  export type UserUpsertWithoutProductWishlistInput = {
    update: XOR<UserUpdateWithoutProductWishlistInput, UserUncheckedUpdateWithoutProductWishlistInput>
    create: XOR<UserCreateWithoutProductWishlistInput, UserUncheckedCreateWithoutProductWishlistInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProductWishlistInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProductWishlistInput, UserUncheckedUpdateWithoutProductWishlistInput>
  }

  export type UserUpdateWithoutProductWishlistInput = {
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    order?: OrderUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProductWishlistInput = {
    clerkId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    isAnonymous?: BoolFieldUpdateOperationsInput | boolean
    order?: OrderUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EnumPromotionConditionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionConditionType | EnumPromotionConditionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PromotionConditionType[] | ListEnumPromotionConditionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromotionConditionType[] | ListEnumPromotionConditionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPromotionConditionTypeFilter<$PrismaModel> | $Enums.PromotionConditionType
  }

  export type EnumPromotionActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionActionType | EnumPromotionActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PromotionActionType[] | ListEnumPromotionActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromotionActionType[] | ListEnumPromotionActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPromotionActionTypeFilter<$PrismaModel> | $Enums.PromotionActionType
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type EnumBlogContentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogContentType | EnumBlogContentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BlogContentType[] | ListEnumBlogContentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogContentType[] | ListEnumBlogContentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogContentTypeFilter<$PrismaModel> | $Enums.BlogContentType
  }

  export type BlogAuthorCompositeFilter = {
    equals?: BlogAuthorObjectEqualityInput
    is?: BlogAuthorWhereInput
    isNot?: BlogAuthorWhereInput
  }

  export type EnumProductContentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductContentType | EnumProductContentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductContentType[] | ListEnumProductContentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductContentType[] | ListEnumProductContentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductContentTypeFilter<$PrismaModel> | $Enums.ProductContentType
  }

  export type ProductDescriptionNullableCompositeFilter = {
    equals?: ProductDescriptionObjectEqualityInput | null
    is?: ProductDescriptionWhereInput | null
    isNot?: ProductDescriptionWhereInput | null
    isSet?: boolean
  }

  export type MediasOnProductsCreateManyMediaInput = {
    id?: string
    productId: string
    assignedAt?: Date | string
  }

  export type CategoryCreateManyImageInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    featured?: boolean
    parentId?: string | null
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediasOnProductsUpdateWithoutMediaInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutMediaNestedInput
  }

  export type MediasOnProductsUncheckedUpdateWithoutMediaInput = {
    productId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediasOnProductsUncheckedUpdateManyWithoutMediaInput = {
    productId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUpdateWithoutImageInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: CategoryUpdateOneWithoutChildrenNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    blogs?: CategoriesOnBlogsUpdateManyWithoutCategoryNestedInput
    products?: CategoriesOnProductsUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutImageInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    blogs?: CategoriesOnBlogsUncheckedUpdateManyWithoutCategoryNestedInput
    products?: CategoriesOnProductsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutImageInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateManyParentInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    imageId?: string | null
    featured?: boolean
    seoMetadata?: XOR<SeoMetadataNullableCreateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CategoriesOnBlogsCreateManyCategoryInput = {
    id?: string
    blogId: string
    assignedAt?: Date | string
  }

  export type CategoriesOnProductsCreateManyCategoryInput = {
    id?: string
    productId: string
    assignedAt?: Date | string
  }

  export type SeoMetadataUpdateInput = {
    seoTitle?: NullableStringFieldUpdateOperationsInput | string | null
    seoDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: SeoMetadataUpdatekeywordsInput | string[]
  }

  export type CategoryUpdateWithoutParentInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    image?: MediaUpdateOneWithoutCategoriesNestedInput
    children?: CategoryUpdateManyWithoutParentNestedInput
    blogs?: CategoriesOnBlogsUpdateManyWithoutCategoryNestedInput
    products?: CategoriesOnProductsUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutParentInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: CategoryUncheckedUpdateManyWithoutParentNestedInput
    blogs?: CategoriesOnBlogsUncheckedUpdateManyWithoutCategoryNestedInput
    products?: CategoriesOnProductsUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutParentInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    imageId?: NullableStringFieldUpdateOperationsInput | string | null
    featured?: BoolFieldUpdateOperationsInput | boolean
    seoMetadata?: XOR<SeoMetadataNullableUpdateEnvelopeInput, SeoMetadataCreateInput> | null
    creatorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriesOnBlogsUpdateWithoutCategoryInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blog?: BlogUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CategoriesOnBlogsUncheckedUpdateWithoutCategoryInput = {
    blogId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriesOnBlogsUncheckedUpdateManyWithoutCategoryInput = {
    blogId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriesOnProductsUpdateWithoutCategoryInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type CategoriesOnProductsUncheckedUpdateWithoutCategoryInput = {
    productId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriesOnProductsUncheckedUpdateManyWithoutCategoryInput = {
    productId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PromotionConditionUpdateInput = {
    type?: EnumPromotionConditionTypeFieldUpdateOperationsInput | $Enums.PromotionConditionType
    value?: StringFieldUpdateOperationsInput | string
  }

  export type PromotionActionUpdateInput = {
    type?: EnumPromotionActionTypeFieldUpdateOperationsInput | $Enums.PromotionActionType
    value?: StringFieldUpdateOperationsInput | string
    maxDiscount?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type UsageLimitUpdateInput = {
    perCustomer?: NullableIntFieldUpdateOperationsInput | number | null
    total?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type CategoriesOnBlogsCreateManyBlogInput = {
    id?: string
    categoryId: string
    assignedAt?: Date | string
  }

  export type CommentCreateManyBlogInput = {
    id?: string
    comment: string
  }

  export type EnumBlogContentTypeFieldUpdateOperationsInput = {
    set?: $Enums.BlogContentType
  }

  export type BlogMetadataUpdatekeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BlogAuthorUpdateEnvelopeInput = {
    set?: BlogAuthorCreateInput
    update?: BlogAuthorUpdateInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type CustomFieldsUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type CategoriesOnBlogsUpdateWithoutBlogInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutBlogsNestedInput
  }

  export type CategoriesOnBlogsUncheckedUpdateWithoutBlogInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriesOnBlogsUncheckedUpdateManyWithoutBlogInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommentUpdateWithoutBlogInput = {
    comment?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUncheckedUpdateWithoutBlogInput = {
    comment?: StringFieldUpdateOperationsInput | string
  }

  export type CommentUncheckedUpdateManyWithoutBlogInput = {
    comment?: StringFieldUpdateOperationsInput | string
  }

  export type MediasOnProductsCreateManyProductInput = {
    id?: string
    mediaId: string
    assignedAt?: Date | string
  }

  export type ReviewCreateManyProductInput = {
    id?: string
    userName: string
    rating: number
    comment: string
    imageUrl?: string | null
    helpful?: number
    notHelpful?: number
    verify?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    creatorId: string
  }

  export type CategoriesOnProductsCreateManyProductInput = {
    id?: string
    categoryId: string
    assignedAt?: Date | string
  }

  export type OrderItemCreateManyProductInput = {
    id?: string
    orderId: string
    quantity: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WishlistCreateManyProductInput = {
    id?: string
    userId: string
    assignedAt?: Date | string
  }

  export type EnumProductContentTypeFieldUpdateOperationsInput = {
    set?: $Enums.ProductContentType
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
    unset?: boolean
  }

  export type FeatureUpdateInput = {
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    description?: XOR<ProductDescriptionNullableUpdateEnvelopeInput, ProductDescriptionCreateInput> | null
  }

  export type ProductSeoMetadataUpdatekeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type MediasOnProductsUpdateWithoutProductInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaUpdateOneRequiredWithoutProductsNestedInput
  }

  export type MediasOnProductsUncheckedUpdateWithoutProductInput = {
    mediaId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediasOnProductsUncheckedUpdateManyWithoutProductInput = {
    mediaId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReviewUpdateWithoutProductInput = {
    userName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    helpful?: IntFieldUpdateOperationsInput | number
    notHelpful?: IntFieldUpdateOperationsInput | number
    verify?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUncheckedUpdateWithoutProductInput = {
    userName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    helpful?: IntFieldUpdateOperationsInput | number
    notHelpful?: IntFieldUpdateOperationsInput | number
    verify?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type ReviewUncheckedUpdateManyWithoutProductInput = {
    userName?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    comment?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    helpful?: IntFieldUpdateOperationsInput | number
    notHelpful?: IntFieldUpdateOperationsInput | number
    verify?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creatorId?: StringFieldUpdateOperationsInput | string
  }

  export type CategoriesOnProductsUpdateWithoutProductInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutProductsNestedInput
  }

  export type CategoriesOnProductsUncheckedUpdateWithoutProductInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoriesOnProductsUncheckedUpdateManyWithoutProductInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUpdateWithoutProductInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneRequiredWithoutItemsNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutProductInput = {
    orderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyWithoutProductInput = {
    orderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishlistUpdateWithoutProductInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProductWishlistNestedInput
  }

  export type WishlistUncheckedUpdateWithoutProductInput = {
    userId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishlistUncheckedUpdateManyWithoutProductInput = {
    userId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemCreateManyOrderInput = {
    id?: string
    productId: string
    quantity: number
    price: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderPromotionUpdateInput = {
    promotionId?: StringFieldUpdateOperationsInput | string
    discountAmount?: FloatFieldUpdateOperationsInput | number
    code?: StringFieldUpdateOperationsInput | string
  }

  export type OrderItemUpdateWithoutOrderInput = {
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutOrderItemNestedInput
  }

  export type OrderItemUncheckedUpdateWithoutOrderInput = {
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderItemUncheckedUpdateManyWithoutOrderInput = {
    productId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    price?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishlistCreateManyUserInput = {
    id?: string
    productId: string
    assignedAt?: Date | string
  }

  export type OrderCreateManyUserInput = {
    id?: string
    deliveryInfo: XOR<DeliveryInfoCreateEnvelopeInput, DeliveryInfoCreateInput>
    userData: XOR<UserDataCreateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListCreateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices: XOR<OrderPricesCreateEnvelopeInput, OrderPricesCreateInput>
    status?: $Enums.OrderStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WishlistUpdateWithoutUserInput = {
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    product?: ProductUpdateOneRequiredWithoutUserWishlistNestedInput
  }

  export type WishlistUncheckedUpdateWithoutUserInput = {
    productId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WishlistUncheckedUpdateManyWithoutUserInput = {
    productId?: StringFieldUpdateOperationsInput | string
    assignedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutUserInput = {
    deliveryInfo?: XOR<DeliveryInfoUpdateEnvelopeInput, DeliveryInfoCreateInput>
    userData?: XOR<UserDataUpdateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListUpdateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices?: XOR<OrderPricesUpdateEnvelopeInput, OrderPricesCreateInput>
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutUserInput = {
    deliveryInfo?: XOR<DeliveryInfoUpdateEnvelopeInput, DeliveryInfoCreateInput>
    userData?: XOR<UserDataUpdateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListUpdateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices?: XOR<OrderPricesUpdateEnvelopeInput, OrderPricesCreateInput>
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: OrderItemUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutUserInput = {
    deliveryInfo?: XOR<DeliveryInfoUpdateEnvelopeInput, DeliveryInfoCreateInput>
    userData?: XOR<UserDataUpdateEnvelopeInput, UserDataCreateInput>
    promotions?: XOR<OrderPromotionListUpdateEnvelopeInput, OrderPromotionCreateInput> | OrderPromotionCreateInput[]
    orderPrices?: XOR<OrderPricesUpdateEnvelopeInput, OrderPricesCreateInput>
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NestedEnumPromotionConditionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionConditionType | EnumPromotionConditionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PromotionConditionType[] | ListEnumPromotionConditionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromotionConditionType[] | ListEnumPromotionConditionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPromotionConditionTypeFilter<$PrismaModel> | $Enums.PromotionConditionType
  }

  export type NestedEnumPromotionActionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionActionType | EnumPromotionActionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PromotionActionType[] | ListEnumPromotionActionTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PromotionActionType[] | ListEnumPromotionActionTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPromotionActionTypeFilter<$PrismaModel> | $Enums.PromotionActionType
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
    isSet?: boolean
  }

  export type NestedEnumBlogContentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogContentType | EnumBlogContentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BlogContentType[] | ListEnumBlogContentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlogContentType[] | ListEnumBlogContentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBlogContentTypeFilter<$PrismaModel> | $Enums.BlogContentType
  }

  export type BlogAuthorWhereInput = {
    AND?: BlogAuthorWhereInput | BlogAuthorWhereInput[]
    OR?: BlogAuthorWhereInput[]
    NOT?: BlogAuthorWhereInput | BlogAuthorWhereInput[]
    name?: StringFilter<"BlogAuthor"> | string
    bio?: StringNullableFilter<"BlogAuthor"> | string | null
    avatar?: StringNullableFilter<"BlogAuthor"> | string | null
  }

  export type NestedEnumProductContentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProductContentType | EnumProductContentTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ProductContentType[] | ListEnumProductContentTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProductContentType[] | ListEnumProductContentTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumProductContentTypeFilter<$PrismaModel> | $Enums.ProductContentType
  }

  export type SeoMetadataUpdatekeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumPromotionConditionTypeFieldUpdateOperationsInput = {
    set?: $Enums.PromotionConditionType
  }

  export type EnumPromotionActionTypeFieldUpdateOperationsInput = {
    set?: $Enums.PromotionActionType
  }

  export type BlogAuthorUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProductDescriptionNullableUpdateEnvelopeInput = {
    set?: ProductDescriptionCreateInput | null
    upsert?: ProductDescriptionUpsertInput
    unset?: boolean
  }

  export type ProductDescriptionUpsertInput = {
    set: ProductDescriptionCreateInput | null
    update: ProductDescriptionUpdateInput
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}