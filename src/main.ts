import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { initialSSRDevProxy, loadConfig, getCwd } from 'ssr-server-utils'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  await initialSSRDevProxy(app, {
    express: true
  })
  app.useStaticAssets(join(getCwd(), './build'))
  app.useStaticAssets(join(getCwd(), './public'))
  app.useStaticAssets(join(getCwd(), './build/client'))
  app.useStaticAssets(join(getCwd(), './public'))
  const { serverPort } = loadConfig()

  app.use(cookieParser())

  await app.listen(serverPort)
}

bootstrap().catch(err => {
  console.log(err)
  process.exit(1)
})
