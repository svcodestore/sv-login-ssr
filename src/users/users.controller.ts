import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UsersService } from './users.service'

@Controller('api/user')
export class UsersController {
  constructor (private readonly usersService: UsersService) { }

  @Post()
  async create (@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto)
  }

  @Get('/current-user')
  async currentUser () {
    return await this.usersService.currentUser()
  }
}
