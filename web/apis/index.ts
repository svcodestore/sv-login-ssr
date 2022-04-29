import { stringify } from 'qs'
import { LoginParams, RequestGrantCodeParams } from '~/typings/data'

enum Api {
  Login = '/api/login',
  CurrentApplication = '/api/application/current-application',
  GrantCode = '/api/login/oauth2.0/grant-code',
  CurrentUser = '/api/user/current-user'
}

const headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

export async function login (body: LoginParams) {
  return await (await window.fetch(Api.Login, {
    method: 'post',
    body: stringify(body),
    headers
  })).json()
}

export async function getCurrentApplication () {
  return await window.fetch(Api.CurrentApplication)
}

export async function getGrantCode (body: RequestGrantCodeParams, accessToken: string) {
  return await (await window.fetch(Api.GrantCode, {
    method: 'post',
    body: stringify(body),
    headers: {
      ...headers,
      Authorization: 'Bearer ' + accessToken
    }
  })).json()
}

export async function getCurrentUser () {
  return await window.fetch(Api.CurrentUser)
}
