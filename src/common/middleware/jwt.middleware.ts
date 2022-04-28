import { Request, Response, NextFunction } from 'express'
import { NestMiddleware } from '@nestjs/common'

export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization || req.cookies.Authorization) {
      if (req.url === '/') {
        // res.redirect('/goto')
        console.log(11);
        next()

      } else {
        next()
      }
    } else {
      res.redirect('/')
    }
  }
}
