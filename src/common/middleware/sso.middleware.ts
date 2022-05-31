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
        await axios.create({
          baseURL: this.configService.get<string>('OAUTH_API_URL'),
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
