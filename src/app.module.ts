import { SsoMiddleware } from './common/middleware/sso.middleware'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { indexModule } from './index/index.module'
import { ConfigModule } from '@nestjs/config'
import { ApplicationModule } from './application/application.module'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    expandVariables: true,
    // load: [configuration],
    envFilePath: ['.env.development', '.env.production']
  }), indexModule, ApplicationModule]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    const whiteList = ['/favicon.ico', '/oauth2.0/authorize', '/api/login', '/api/application/current-application']
    consumer.apply(SsoMiddleware).exclude(...whiteList).forRoutes('*')
  }
}
