import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TypeOrmConfigService } from '~/database/config/typeorm-config.service'

const configModule = ConfigModule.forRoot({
  envFilePath: '.env',
  isGlobal: true,
})

const typeOrmModule = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useClass: TypeOrmConfigService,
})

export { configModule, typeOrmModule }
