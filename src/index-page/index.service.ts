import { stringify } from 'qs'
import { Application, LoginParams, ResponseDataType } from '~/typings/data'
import { Inject, Injectable } from '@nestjs/common'
import { ApplicationService } from '@/application/application.service'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { Request } from 'express'
import { REQUEST } from '@nestjs/core'
import jwt = require('jsonwebtoken')
import { createClient } from 'redis'
// const GrantedCodeRedisKey = 'grantedCode'
// const IssuedAccessTokenRedisKey = 'issuedAccessToken'
// const IssuedRefreshTokenRedisKey = "issuedRefreshToken"

@Injectable()
export class ApiService {
  constructor (
    private readonly applicationService: ApplicationService,
    private readonly configService: ConfigService,
    @Inject(REQUEST) private readonly request: Request) { }

  async currentApplication () {
    return await this.applicationService.findOne(this.configService.get<string>('SYSTEM_ID'))
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
    const { data } = await axios.create({
      baseURL: this.configService.get<string>('OAUTH_API_URL'),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).post('/login', stringify({ username, password, type, clientId }))

    return data
  }

  async isLogin () {
    const req = this.request
    const authToken = req.headers.authorization || req.cookies.Authorization
    if (authToken?.startsWith('Bearer ')) {
      const token = authToken.substr(7)
      try {
        const claims = jwt.verify(token, this.configService.get<string>('JWT_SIGN_KEY'))

        const client = createClient()
        let flag = false
        client.on('error', (err) => {
          if (err) {
            flag = true
          }
        })
        if (flag) {
          return await Promise.resolve({ isLogin: false })
        }

        await client.connect()

        // @ts-expect-error
        const isLogin = await client.exists('issuedAccessToken:' + ((claims.userId || '') as string))
        await client.disconnect()

        if (isLogin === 1) {
          return await Promise.resolve({ isLogin: true })
        }

        return await Promise.resolve({ isLogin: false })
      } catch {
        return await Promise.resolve({ isLogin: false })
      }
    }
    return await Promise.resolve({ isLogin: false })
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
