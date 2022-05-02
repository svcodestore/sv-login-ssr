import React, { useContext } from 'react'
import { SProps, IContext } from 'ssr-types-react'
import { STORE_CONTEXT } from '_build/create-context'

export default (props: SProps) => {
  const { state } = useContext<IContext<{ isLogin: boolean }>>(STORE_CONTEXT)
  if (__isBrowser__) {
    if (!state?.isLogin) {
      document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      localStorage.removeItem('accessToken')
      props.history.push('/')
    }
  }
  return <div>goto !</div>
}
