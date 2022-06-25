import { ReactNestFetch } from 'ssr-types-react'

const fetch: ReactNestFetch<{
  apiService: {
    isLogin: () => Promise<{ isLogin: boolean }>
    getFileServerUrl: () => Promise<{ fileServerUrl: string }>
  }
}> = async ({ ctx, routerProps }) => {
  const data = {
    isLogin: false,
    fileServerUrl: ''
  }
  if (__isBrowser__) {
    data.fileServerUrl = await (await window.fetch('/api/file-server-url')).json()
    const token = localStorage.getItem('accessToken') || ''
    if (token) {
      data.isLogin = await (await window.fetch('/api/is-login', { headers: { Authorization: 'Bearer ' + token } })).json()
    }
  } else {
    data.fileServerUrl = await (await ctx!.apiService?.getFileServerUrl()).fileServerUrl
    data.isLogin = await (await ctx!.apiService?.isLogin()).isLogin
  }

  return data
}

export default fetch
