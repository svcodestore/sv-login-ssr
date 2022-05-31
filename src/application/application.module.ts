import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { ApplicationController } from './application.controller'
import { ApplicationService } from './application.service'

@Module({
  imports: [ConfigModule],
  controllers: [ApplicationController],
  providers: [ApplicationService]
})
export class ApplicationModule {}
