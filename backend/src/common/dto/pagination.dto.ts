import { Transform } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator'

import { Order } from '~/@types/order.enum'

const MAX_LIMIT = 100

class PaginationDto {
  /**
   * The page number to retrieve in the paginated response.
   *
   * @type {number}
   * @default 1
   */
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1

  /**
   * The maximum number of items to return per page.
   * Must not exceed the defined maximum limit.
   *
   * @type {number}
   * @default 10
   * @max {number} MAX_LIMIT - The maximum limit for items per page.
   */
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  @Max(MAX_LIMIT)
  @IsInt()
  @IsOptional()
  readonly limit: number = 10

  /**
   * The sorting order for the results.
   * It can be either ascending (ASC) or descending (DESC).
   *
   * @type {Order}
   * @default {Order.ASC}
   * @enum {Order} - The allowed sorting orders.
   */
  @IsEnum(Order)
  @IsOptional()
  readonly order: Order = Order.ASC

  get skip(): number {
    return (this.page - 1) * Math.min(this.limit, MAX_LIMIT)
  }
}

export { PaginationDto }
