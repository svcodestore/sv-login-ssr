import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { InjectConnection } from '@nestjs/typeorm'
import { Connection, Repository } from 'typeorm'
import { UserEntity } from './entities/user.entity'
import axios from 'axios'
// import { UserClient } from './users_grpc_pb'
// import * as grpc from '@grpc/grpc-js'
// import * as pb from './users_pb'

@Injectable()
export class UsersService {
  private readonly usersRepository: Repository<UserEntity>

  constructor (
    @InjectConnection('sys')
    // @ts-expect-error
    private readonly connection: Connection
  ) {
    this.usersRepository = connection.getRepository(UserEntity)
  }

  async create (createUserDto: CreateUserDto) {
    return await this.usersRepository.save(
      Object.assign(new UserEntity(), createUserDto)
    )
  }

  async findOne (id: string) {
    return await this.usersRepository
      .findOne(id)
  }

  // async currentUser () {
  //   const client = new UserClient('localhost:50088', grpc.credentials.createInsecure())
  //   await (c => {
  //     const req = new pb.GetUserByIdRequest()
  //     req.setId('0')
  //     c.getUserById(req, (err, data) => {
  //       if (err) {
  //         console.log(err)
  //       } else {
  //         console.log(data.toObject())
  //       }
  //     })
  //   })(client)
  // }

  async currentUser () {
    const { data } = await axios.create({
      baseURL: 'http://localhost:8888/api',
      headers: {
        'Content-Type': 'x-www-form-urlencoded'
      }
    }).get('/application/current-application')

    return data
  }
}
