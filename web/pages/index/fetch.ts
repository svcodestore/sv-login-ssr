import { ApplicationEntity } from './../../../src/application/entities/application.entity'
import { ReactNestFetch } from 'ssr-types-react'

const fetch: ReactNestFetch<{
  apiService: {
    currentApplication: () => Promise<ApplicationEntity>
    isLogin: () => Promise<boolean>
  }
}> = async ({ ctx, routerProps }) => {
  const data = __isBrowser__ ? await (await window.fetch('/api/application/current-application')).json() : await ctx!.apiService?.currentApplication()
  const { isLogin } = __isBrowser__ ? await (await window.fetch('/api/is-login', { headers: { Authorization: 'Bearer ' + localStorage.getItem('accessToken') } })).json() : await ctx!.apiService?.isLogin()

  return {
    // 建议根据模块给数据加上 namespace防止数据覆盖
    currentApplication: data,
    isLogin
  }
}

export default fetch
