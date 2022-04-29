import React, { useContext } from 'react'
import { SProps, IContext } from 'ssr-types-react'
import { STORE_CONTEXT } from '_build/create-context'

export default (props: SProps) => {
  const { state } = useContext<IContext<{ isLogin: boolean }>>(STORE_CONTEXT)
  if (__isBrowser__) {
    if (!state?.isLogin) {
      document.cookie = ''
      localStorage.removeItem('accessToken')
      props.history.push('/')
    }
  }
  return <div>goto !</div>
}
