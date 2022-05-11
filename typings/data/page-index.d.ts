export interface ModificationFields {
  createdAt: string
  updatedAt: string
}

export interface ResponseDataType<T = any> { code: number, data: T, message: string }

export type User = {
  id: string
  uuid: string
  loginId: string
  password: string
  name: string
  phone: string
  email: string
  lang: string
  status: boolean
} & ModificationFields

export interface LoginResult {
  accessToken?: string
  refreshToken?: string
  user?: User
  errNameOrPassword?: boolean
}

export interface LoginParams {
  clientId: string
  username?: string
  password?: string
  type?: string
}

export interface RequestGrantCodeParams {
  responseType: string
  clientId: string
  redirectUri: string
  scope?: string
  state?: string
}

export type Application = {
  id: string
  code: string
  name: string
  internalUrl: string
  homepageUrl: string
  status: boolean
  clientId: string
  clientSecret: string
  redirectUris: string
  tokenFormat: string
} & ModificationFields

export interface CurrentUser {
  name?: string
  avatar?: string
  userid?: string
  email?: string
  signature?: string
  title?: string
  group?: string
  tags?: Array<{ key?: string, label?: string }>
  notifyCount?: number
  unreadCount?: number
  country?: string
  access?: string
  geographic?: {
    province?: { label?: string, key?: string }
    city?: { label?: string, key?: string }
  }
  address?: string
  phone?: string
}
