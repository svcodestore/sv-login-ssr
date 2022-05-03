import { JwtMiddleware } from './common/middleware/jwt.middleware'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { indexModule } from './index-page/index.module'
import { createConnection } from 'typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { ApplicationModule } from './application/application.module'
import path = require('path')

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    expandVariables: true,
    // load: [configuration],
    envFilePath: ['.env.development', '.env.production']
  }),
  TypeOrmModule.forRootAsync({
    name: 'sys',
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'mysql',
      host: configService.get('DB_HOST'),
      port: +configService.get<number>('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [path.join(__dirname, '/**/*.entity{.ts,.js}')],
      autoLoadEntities: true
    }),
    connectionFactory: async (options) => {
      const connection = await createConnection(options)
      return connection
    }
  }), indexModule, UsersModule, ApplicationModule]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    const whiteList = ['/favicon.ico', '/oauth2.0/authorize', '/api/login', '/api/application/current-application']
    consumer.apply(JwtMiddleware).exclude(...whiteList).forRoutes('*')
  }
}
