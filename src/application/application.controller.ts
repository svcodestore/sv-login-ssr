import { ConfigService } from '@nestjs/config'
import { Controller, Get } from '@nestjs/common'
import { ApplicationService } from './application.service'

@Controller('api/application')
export class ApplicationController {
  constructor (private readonly applicationService: ApplicationService, private readonly configService: ConfigService) {}

  @Get('current-application')
  async currentApplication () {
    return await this.applicationService.findOne(this.configService.get<string>('SYSTEM_ID'))
  }
}
