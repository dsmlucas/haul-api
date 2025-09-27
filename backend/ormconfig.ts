import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'

dotenv.config({
  path: '.env',
})

const { DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env

const dataSourceOption: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5438,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['src/modules/**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
  namingStrategy: new SnakeNamingStrategy(),
}

const dataSource = new DataSource(dataSourceOption)

export { dataSourceOption }

export default dataSource
