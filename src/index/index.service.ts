import { stringify } from 'qs'
import { Application, LoginParams, ResponseDataType } from '~/typings/data'
import { Inject, Injectable } from '@nestjs/common'
import { ApplicationService } from '@/application/application.service'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { Request } from 'express'
import { REQUEST } from '@nestjs/core'

@Injectable()
export class ApiService {
  constructor (
    private readonly applicationService: ApplicationService,
    private readonly configService: ConfigService,
    @Inject(REQUEST) private readonly request: Request) { }

  async currentApplication () {
    return await this.applicationService.currentApplication()
  }

  async getMyApps () {
    const req = this.request
    const authToken = req.headers.authorization || req.cookies.Authorization

    try {
      const { data } = await axios.create({
        baseURL: this.configService.get<string>('OAUTH_API_URL'),
        headers: {
          Authorization: authToken
        }
      }).get<ResponseDataType<Application[]>>('/my/applications')
      let app: Application[] = []
      if (data.code === 0) {
        app = data.data
      }

      return await Promise.resolve(app)
    } catch {
    }
  }

  async login ({ username, password, type, clientId }: LoginParams) {
    const req = this.request
    const { data } = await axios.create({
      baseURL: this.configService.get<string>('OAUTH_API_URL'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Real-IP': req.connection.remoteAddress
      }
    }).post('/login', stringify({ username, password, type, clientId }))

    return data
  }

  async isLogin () {
    const rtn = { isLogin: false }

    const req = this.request
    const authToken = req.headers.authorization || req.cookies.Authorization
    if (authToken?.startsWith('Bearer ')) {
      try {
        await axios.create({
          baseURL: this.configService.get<string>('OAUTH_API_URL'),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: authToken
          }
        }).get('/user/ping')
        rtn.isLogin = true
      } catch {
      }
    }
    return await Promise.resolve(rtn)
  }

  async getGrantCode ({
    responseType,
    redirectUri,
    clientId
  }: {
    responseType: string
    redirectUri: string
    clientId: string
  }) {
    const req = this.request
    const authToken = req.headers.authorization || req.cookies.Authorization

    const { data } = await axios.create({
      baseURL: this.configService.get<string>('OAUTH_API_URL'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: authToken
      }
    }).post('/login/oauth2.0/grant-code', stringify({
      responseType,
      redirectUri,
      clientId
    }))

    return data
  }
}
