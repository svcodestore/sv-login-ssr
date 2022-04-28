import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'
import { ApplicationService } from './application.service'
import { ApplicationController } from './application.controller'
import { Connection } from 'typeorm'
import { getConnectionToken } from '@nestjs/typeorm'

@Module({
  imports: [ConfigModule],
  controllers: [ApplicationController],
  providers: [
    {
      provide: ApplicationService,
      useFactory: (con: Connection) => {
        return new ApplicationService(con)
      },
      inject: [getConnectionToken('sys')]
    }
  ]
})
export class ApplicationModule {}
