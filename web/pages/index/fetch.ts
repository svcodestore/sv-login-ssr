import { ApplicationEntity } from './../../../src/application/entities/application.entity'
import { ReactNestFetch } from 'ssr-types-react'

const fetch: ReactNestFetch<{
  apiService: {
    currentApplication: () => Promise<ApplicationEntity>
    isLogin: () => Promise<{ isLogin: boolean }>
  }
}> = async ({ ctx, routerProps }) => {
  const data = {
    currentApplication: {},
    isLogin: false
  }
  if (__isBrowser__) {
    data.currentApplication = await (await window.fetch('/api/application/current-application')).json()
    const token = localStorage.getItem('accessToken') || ''
    if (token) {
      data.isLogin = await (await window.fetch('/api/is-login', { headers: { Authorization: 'Bearer ' + token } })).json()
    }
  } else {
    data.currentApplication = await ctx!.apiService?.currentApplication()
    data.isLogin = await (await ctx!.apiService?.isLogin()).isLogin
  }

  return data
}

export default fetch
