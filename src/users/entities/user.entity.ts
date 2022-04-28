import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: string

  // @Column()
  // @Generated('uuid')
  uuid: string

  @Column({
    type: 'varchar',
    width: 16,
    name: 'login_id'
  })
  loginId: string

  @Column({
    type: 'varchar',
    width: 1024
  })
  password: string

  @Column({
    type: 'varchar',
    width: 32
  })
  name: string

  @Column({
    type: 'varchar',
    width: 32
  })
  alias: string

  @Column({
    type: 'varchar',
    width: 16
  })
  phone: string

  @Column({
    type: 'char',
    width: 1024
  })
  email: string

  @Column({
    type: 'char',
    width: 5
  })
  lang: string

  @Column({
    type: 'tinyint',
    width: 1
  })
  status: string

  @Column({
    type: 'datetime',
    name: 'created_at'
  })
  createdAt: string

  @Column({
    type: 'bigint',
    name: 'created_by'
  })
  createdBy: string

  @Column({
    type: 'datetime',
    name: 'updated_at'
  })
  updatedAt: string

  @Column({
    type: 'bigint',
    name: 'updated_by'
  })
  upatedBy: string
}
