import { ConfigModule } from '@nestjs/config'
import { ApplicationService } from '../application/application.service'
import { Module } from '@nestjs/common'
import { AppController } from './index.controller'
import { ApiController } from './api.controller'
import { ApiService } from './index.service'

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [AppController, ApiController],
  providers: [ApiService, ApplicationService]
})

export class indexModule {}
