import { ConfigService } from '@nestjs/config'
import { Connection, Repository } from 'typeorm'
import { ApplicationEntity } from './entities/application.entity'
import { Injectable } from '@nestjs/common'
import { InjectConnection } from '@nestjs/typeorm'

@Injectable()
export class ApplicationService {
  private readonly applicationRepository: Repository<ApplicationEntity>
  private readonly configService: ConfigService

  constructor (@InjectConnection('sys')
  // @ts-expect-error
  private readonly connection: Connection) {
    this.applicationRepository = connection.getRepository(ApplicationEntity)
  }

  async findOne (id: string) {
    return await this.applicationRepository.findOne(id)
  }

  async currentApplication () {
    return await this.findOne(this.configService.get<string>('SYSTEM_ID'))
  }
}
