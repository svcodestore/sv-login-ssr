import { stringify } from 'qs'
import { LoginParams } from '~/typings/data'
import { Injectable } from '@nestjs/common'
import { ApplicationService } from '@/application/application.service'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class ApiService {
  constructor (private readonly applicationService: ApplicationService, private readonly configService: ConfigService) {}
  async currentApplication () {
    return await this.applicationService.findOne(this.configService.get<string>('SYSTEM_ID'))
  }

  async myApps () {
    return await Promise.resolve('my apps')
  }

  async login ({ username, password, type, clientId }: LoginParams) {
    const { data } = await axios.create({
      baseURL: 'http://localhost:8888/api',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).post('/login', stringify({ username, password, type, clientId }))
    return data
  }
}
