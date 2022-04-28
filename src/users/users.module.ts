import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { getConnectionToken } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      provide: UsersService,
      useFactory: (con: Connection) => {
        return new UsersService(con)
      },
      inject: [getConnectionToken('sys')]
    }
  ],
  exports: [UsersService]
})
export class UsersModule {}
