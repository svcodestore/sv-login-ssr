import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class ApplicationService {
  constructor (private readonly configService: ConfigService) {
  }

  async currentApplication () {
    const { data } = await axios.create({
      baseURL: this.configService.get<string>('OAUTH_API_URL')
    }).get('/application/current-application')

    return data.data
  }
}
