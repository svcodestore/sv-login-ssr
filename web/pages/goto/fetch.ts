import { Application } from '~/typings/data'
import { ReactNestFetch } from 'ssr-types-react'

const fetch: ReactNestFetch<{
  apiService: {
    isLogin: () => Promise<{ isLogin: boolean }>
    getMyApps: () => Promise<Application[]>
    isIntranet: () => Promise<{ isIntranet: boolean }>
  }
}> = async ({ ctx, routerProps }) => {
  const data: {
    isLogin: boolean
    myApps: Application[]
    isIntranet: boolean
  } = {
    isLogin: false,
    myApps: [],
    isIntranet: false
  }
  if (__isBrowser__) {
    data.isIntranet = await (await window.fetch('/api/is-intranet')).json()
    const token = localStorage.getItem('accessToken') || ''
    if (token) {
      data.isLogin = await (await window.fetch('/api/is-login', { headers: { Authorization: 'Bearer ' + token } })).json()
      data.myApps = await (await window.fetch('/api/my-apps', { headers: { Authorization: 'Bearer ' + token } })).json()
    }
  } else {
    data.isIntranet = (await ctx!.apiService?.isIntranet()).isIntranet
    data.isLogin = (await ctx!.apiService?.isLogin()).isLogin
    data.myApps = (await ctx!.apiService?.getMyApps())
  }

  return data
}

export default fetch
