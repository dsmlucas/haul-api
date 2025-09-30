import { instanceToInstance } from 'class-transformer'
import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { PaginatedList } from '~/@types/pagination'

import { PaginationDto } from './dto/pagination.dto'

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @CreateDateColumn({
    type: 'timestamp without time zone',
  })
  createdAt: Date

  @UpdateDateColumn({
    type: 'timestamp without time zone',
  })
  updatedAt: Date

  @DeleteDateColumn({
    type: 'timestamp without time zone',
  })
  deletedAt: Date

  /**
   * Converts the entity removing the fields with `@Exclude()` notation.
   * @returns An instance of the provided entity class.
   */
  toDto<T>(): T {
    return instanceToInstance(this) as unknown as T
  }

  /**
   * Converts an array of entities into an array of DTOs, excluding non-exposed fields.
   * @param entities - An array of entity instances.
   * @returns An array of entity instances.
   */
  static toDtos<T extends AbstractEntity>(
    entities: T[],
    pagination: PaginationDto,
    totalCount?: number,
  ): PaginatedList<T> {
    const instances = entities.map(entity => instanceToInstance(entity))
    const total = totalCount || entities.length

    const payload: PaginatedList<T> = {
      data: instances,
      pagination: {
        totalCount: total,
        totalPages: Math.ceil(total / pagination.limit),
        currentPage: pagination.page,
        pageSize: pagination.limit,
      },
    }

    return payload
  }
}
