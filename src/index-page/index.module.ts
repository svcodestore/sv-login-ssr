import { ConfigModule } from '@nestjs/config'
import { ApplicationService } from './../application/application.service'
import { UsersService } from './../users/users.service'
import { Module } from '@nestjs/common'
import { AppController } from './index.controller'
import { ApiController } from './api.controller'
import { ApiService } from './index.service'

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [AppController, ApiController],
  providers: [ApiService, UsersService, ApplicationService]
})

export class indexModule {}
