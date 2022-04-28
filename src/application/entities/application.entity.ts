import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('applications')
export class ApplicationEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: string

  @Column({
    type: 'varchar',
    width: 64,
    name: 'code',
    unique: true
  })
  code: string

  @Column({
    type: 'varchar',
    width: 255
  })
  name: string

  @Column({
    type: 'varchar',
    width: 255,
    name: 'internal_url'
  })
  internalUrl: string

  @Column({
    type: 'varchar',
    width: 255,
    name: 'homepage_url'
  })
  homepageUrl: string

  @Column({
    type: 'tinyint',
    width: 1
  })
  status: number

  @Column({
    type: 'varchar',
    width: 255,
    name: 'client_id',
    unique: true
  })
  clientId: string

  @Column({
    type: 'varchar',
    width: 2555,
    name: 'client_secret'
  })
  clientSecret: string

  @Column({
    type: 'varchar',
    width: 255,
    name: 'redirect_uris'
  })
  redirectUris: string

  @Column({
    type: 'varchar',
    width: 100,
    name: 'token_format',
    default: 'JWT'
  })
  tokenTormat: string

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
