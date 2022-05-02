import { ReactNestFetch } from 'ssr-types-react'

const fetch: ReactNestFetch<{
  apiService: {
    isLogin: () => Promise<{ isLogin: boolean }>
  }
}> = async ({ ctx, routerProps }) => {
  const data = {
    isLogin: false
  }
  if (__isBrowser__) {
    const token = localStorage.getItem('accessToken') || ''
    if (token) {
      data.isLogin = await (await window.fetch('/api/is-login', { headers: { Authorization: 'Bearer ' + token } })).json()
    }
  } else {
    data.isLogin = await (await ctx!.apiService?.isLogin()).isLogin
  }

  return data
}

export default fetch
