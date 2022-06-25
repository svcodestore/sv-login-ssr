import { LoginParams } from '~/typings/data/page-index'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { ApiService } from './index.service'

@Controller('/api')
export class ApiController {
  constructor (private readonly apiService: ApiService) {}

  @Get('/is-intranet')
  async isIntranet () {
    return await this.apiService.isIntranet()
  }

  @Get('/file-server-url')
  async getFileServerUrl () {
    return await this.apiService.getFileServerUrl()
  }

  @Get('/my-apps')
  async getMyApps () {
    return await this.apiService.getMyApps()
  }

  @Post('/login')
  async login (@Body() body: LoginParams): Promise<any> {
    return await this.apiService.login(body)
  }

  @Get('is-login')
  async isLogin () {
    return await this.apiService.isLogin()
  }

  @Post('/login/oauth2.0/grant-code')
  async getGrantCode (@Body() body: {
    responseType: string
    redirectUri: string
    clientId: string
  }): Promise<any> {
    return await this.apiService.getGrantCode(body)
  }
}
