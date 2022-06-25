import { ConfigService } from '@nestjs/config'
import { Inject, Injectable } from '@nestjs/common'
import axios from 'axios'
import { Request } from 'express'
import { REQUEST } from '@nestjs/core'

@Injectable()
export class ApplicationService {
  constructor (private readonly configService: ConfigService, @Inject(REQUEST) private readonly request: Request) {
  }

  async currentApplication() {
    const { hostname } = this.request
    const isIntranet = hostname.split('.').every(e => !isNaN(+e))
    let oauthApiKey = ''
    if (isIntranet || hostname === 'localhost') {
      oauthApiKey = 'OAUTH_API_URL'
    } else {
      oauthApiKey = 'PROD_OAUTH_API_URL'
    }


    const { data } = await axios.create({
      baseURL: this.configService.get<string>(oauthApiKey)
    }).get('/application/current-application')

    return data.data
  }
}
