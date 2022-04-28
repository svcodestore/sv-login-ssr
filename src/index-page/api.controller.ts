import { UsersService } from './../users/users.service'
import { LoginParams } from '~/typings/data/page-index'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiService } from './index.service'

@Controller('/api')
export class ApiController {
  constructor (private readonly apiService: ApiService, private readonly usersService: UsersService) {}

  @Get('/index')
  async getIndexData (): Promise<any> {
    return await this.usersService.findOne('1508366740931739648')
  }

  @Get('/my-apps')
  async getMyApps (): Promise<any> {
    return await this.apiService.myApps()
  }

  @Post('/login')
  async login (@Body() body: LoginParams): Promise<any> {
    return await this.apiService.login(body)
  }
}
