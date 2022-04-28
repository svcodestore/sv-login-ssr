import { ApplicationEntity } from './../../../src/application/entities/application.entity'
import { ReactNestFetch } from 'ssr-types-react'

const fetch: ReactNestFetch<{
  apiService: {
    currentApplication: () => Promise<ApplicationEntity>
  }
}> = async ({ ctx, routerProps }) => {
  const data = __isBrowser__ ? await (await window.fetch('/api/application/current-application')).json() : await ctx!.apiService?.currentApplication()

  return {
    // 建议根据模块给数据加上 namespace防止数据覆盖
    currentApplication: data
  }
}

export default fetch
