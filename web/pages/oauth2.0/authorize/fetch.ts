import { ReactNestFetch } from 'ssr-types-react'

const fetch: ReactNestFetch<{
  apiService: {
    isLogin: () => Promise<boolean>
  }
}> = async ({ ctx, routerProps }) => {
  const { isLogin } = __isBrowser__ ? await (await window.fetch('/api/is-login')).json() : await ctx!.apiService?.isLogin()

  return {
    // 建议根据模块给数据加上 namespace防止数据覆盖
    isLogin: isLogin
  }
}

export default fetch
