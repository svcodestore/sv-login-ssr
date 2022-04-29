import { Request, Response, NextFunction } from 'express'
import { NestMiddleware } from '@nestjs/common'

export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization || req.cookies.Authorization) {
      if (req.originalUrl === '/') {
        res.redirect('/goto')
      } else {
        next()
      }
    } else if (req.originalUrl === '/') {
      next()
    } else {
      res.redirect('/')
    }
  }
}
