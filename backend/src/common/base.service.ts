import { Logger } from '@nestjs/common'
import { FindOptionsRelations, Repository } from 'typeorm'

import { PaginatedList } from '~/@types/pagination'

import { AbstractEntity } from './abstract.entity'
import { PaginationDto } from './dto/pagination.dto'

export abstract class BaseService<T> {
  protected readonly logger: Logger

  constructor(protected readonly repository: Repository<T>) {
    this.logger = new Logger(this.constructor.name)
  }

  async findOne(id: string): Promise<T> {
    try {
      const entity = await this.repository.findOneByOrFail({ id } as never)
      return (entity as AbstractEntity).toDto()
    } catch (error) {
      this.logger.error(`Error finding entity with ID ${id}:`, error)
      throw error
    }
  }

  async findAll(
    filters?: PaginationDto,
    relations?: FindOptionsRelations<T>,
  ): Promise<PaginatedList<T>> {
    try {
      const results = await this.repository.find({
        skip: filters.skip,
        take: filters.limit,
        relations,
      })

      const paginated = AbstractEntity.toDtos(results as never, filters)

      return paginated as PaginatedList<T>
    } catch (error) {
      this.logger.error(`Error finding entities: ${error.message}`, error.stack)
      throw error
    }
  }

  async create(input: Partial<T>): Promise<T> {
    try {
      const entity = this.repository.create(input as T)

      return await this.repository.save(entity)
    } catch (error) {
      this.logger.error(`Error creating entity: ${error.message}`, error.stack)
      throw error
    }
  }

  async update(id: string, input: Partial<T>): Promise<T> {
    try {
      const entity = await this.repository.findOneByOrFail({ id } as never)

      const entityToUpdate = {
        ...entity,
        ...input,
      }

      const updated = await this.repository.save(entityToUpdate)

      return updated
    } catch (error) {
      this.logger.error(`Error updating entity with ID ${id}:`, error)
      throw error
    }
  }

  /**
   * Soft removes an entity by its ID.
   *
   * This method attempts to find the entity with the given ID and performs a soft removal,
   * meaning the entity is not permanently deleted from the database but is instead marked as deleted.
   * Returns the removed entity with its ID.
   *
   * @param id - The unique identifier of the entity to be soft removed.
   * @returns A promise that resolves to the soft removed entity with its ID.
   * @throws Will handle and propagate any errors encountered during the operation.
   */
  async remove(id: string): Promise<T> {
    try {
      const entity = await this.repository.findOneByOrFail({ id } as never)

      await this.repository.softRemove(entity)

      return { ...entity, id }
    } catch (error) {
      this.logger.error(`Error soft removing entity with ID ${id}:`, error)
      throw error
    }
  }

  /**
   * Deletes an entity by its ID.
   *
   * This method attempts to find the entity with the given ID and performs a hard delete,
   * meaning the entity is permanently removed from the database.
   * Returns the deleted entity with its ID.
   *
   * @param id - The unique identifier of the entity to be deleted.
   * @returns A promise that resolves to the deleted entity with its ID.
   * @throws Will handle and propagate any errors encountered during the operation.
   */
  async delete(id: string): Promise<T> {
    try {
      const entity = await this.repository.findOneByOrFail({ id } as never)

      await this.repository.remove(entity)

      return { ...entity, id }
    } catch (error) {
      this.logger.error(`Error deleting entity with ID ${id}:`, error)
      throw error
    }
  }
}
