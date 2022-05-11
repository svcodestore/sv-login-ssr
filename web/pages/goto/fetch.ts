import { Application } from '~/typings/data'
import { ReactNestFetch } from 'ssr-types-react'

const fetch: ReactNestFetch<{
  apiService: {
    isLogin: () => Promise<{ isLogin: boolean }>
    getMyApps: () => Promise<Application[]>
  }
}> = async ({ ctx, routerProps }) => {
  const data: {
    isLogin: boolean
    myApps: Application[]
  } = {
    isLogin: false,
    myApps: []
  }
  if (__isBrowser__) {
    const token = localStorage.getItem('accessToken') || ''
    if (token) {
      data.isLogin = await (await window.fetch('/api/is-login', { headers: { Authorization: 'Bearer ' + token } })).json()
      data.myApps = await (await window.fetch('/api/my-apps', { headers: { Authorization: 'Bearer ' + token } })).json()
    }
  } else {
    data.isLogin = (await ctx!.apiService?.isLogin()).isLogin
    data.myApps = (await ctx!.apiService?.getMyApps())
  }

  return data
}

export default fetch
