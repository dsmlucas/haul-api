import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const host = this.configService.get<string>('DB_HOST')
    const port = this.configService.get<number>('DB_PORT')
    const username = this.configService.get<string>('DB_USERNAME')
    const password = this.configService.get<string>('DB_PASSWORD')
    const database = this.configService.get<string>('DB_NAME')

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../database/migrations/*{.ts,.js}'],
      migrationsTableName: 'migrations',
      subscribers: [],
      migrationsRun: true,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }
  }
}
