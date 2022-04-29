import { Request, Response, NextFunction } from 'express'
import { Inject, Injectable, NestMiddleware } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import jwt = require('jsonwebtoken')
import { createClient } from 'redis'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  @Inject()
  private readonly configService: ConfigService

  async use (req: Request, res: Response, next: NextFunction) {
    const authToken = req.originalUrl.startsWith('/api') ? req.headers.authorization : req.cookies.Authorization
    const appUrl = this.configService.get<string>('APP_URL')
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
          if (req.originalUrl === '/') {
            next()
          } else {
            res.redirect(appUrl + '/')
          }
          return
        }

        await client.connect()

        // @ts-expect-error
        const isLogin = await client.exists('issuedAccessToken:' + ((claims.userId || '') as string))
        await client.disconnect()
        if (isLogin === 1) {
          if (req.originalUrl === '/') {
            res.redirect(appUrl + '/goto')
          } else {
            next()
          }
          return
        } else if (req.originalUrl === '/') {
          next()
        } else {
          // next()
        }
      } catch {
        if (req.originalUrl === '/') {
          res.redirect(appUrl + '/goto')
        } else {
          next()
        }
        return
      }
      if (req.originalUrl === '/') {
        res.redirect(appUrl + '/goto')
      } else {
        next()
      }
    } else if (req.originalUrl === '/' || req.originalUrl === '/goto') {
      next()
    } else {
      res.redirect(appUrl + '/')
    }
  }
}
