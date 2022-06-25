import { Request, Response, NextFunction } from 'express'
import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'

@Injectable()
export class SsoMiddleware implements NestMiddleware {
  @Inject()
  private readonly configService: ConfigService

  async use (req: Request, res: Response, next: NextFunction) {
    const authToken = req.originalUrl.startsWith('/api') ? req.headers.authorization : req.cookies.Authorization
    if (authToken?.startsWith('Bearer ')) {
      try {
        const { hostname } = req
        const isIntranet = hostname.split('.').every(e => !isNaN(+e))
        let oauthApiKey = ''
        if (isIntranet || hostname === 'localhost') {
          oauthApiKey = 'OAUTH_API_URL'
        } else {
          oauthApiKey = 'PROD_OAUTH_API_URL'
        }

        await axios.create({
          baseURL: this.configService.get<string>(oauthApiKey),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: authToken
          }
        }).get('/user/ping')

        if (req.originalUrl === '/') {
          res.redirect('/goto')
        } else {
          next()
        }
      } catch {
        if (req.originalUrl === '/') {
          res.redirect('/goto')
        } else {
          next()
        }
      }
    } else if (req.originalUrl === '/' || req.originalUrl === '/goto') {
      next()
    } else {
      res.redirect('/')
    }
  }
}
