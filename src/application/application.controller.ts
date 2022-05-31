import { Controller, Get } from '@nestjs/common'
import { ApplicationService } from './application.service'

@Controller('api/application')
export class ApplicationController {
  constructor (private readonly applicationService: ApplicationService) {}

  @Get('current-application')
  async currentApplication () {
    return await this.applicationService.currentApplication()
  }
}
