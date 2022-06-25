import { ReactNestFetch } from 'ssr-types-react'

const fetch: ReactNestFetch<{
  apiService: {
    currentApplication: () => Promise<any>
    isLogin: () => Promise<{ isLogin: boolean }>
    getFileServerUrl: () => Promise<{ fileServerUrl: string }>
  }
}> = async ({ ctx, routerProps }) => {
  const data = {
    currentApplication: {},
    isLogin: false,
    fileServerUrl: ''
  }
  if (__isBrowser__) {
    data.fileServerUrl = await (await window.fetch('/api/file-server-url')).json()
    data.currentApplication = await (await window.fetch('/api/application/current-application')).json()
    const token = localStorage.getItem('accessToken') || ''
    if (token) {
      data.isLogin = await (await window.fetch('/api/is-login', { headers: { Authorization: 'Bearer ' + token } })).json()
    }
  } else {
    data.fileServerUrl = await (await ctx!.apiService?.getFileServerUrl()).fileServerUrl
    data.currentApplication = await ctx!.apiService?.currentApplication()
    data.isLogin = await (await ctx!.apiService?.isLogin()).isLogin
  }

  return data
}

export default fetch
