import React, { useContext } from 'react'
import { message, Spin } from 'antd'

import { IContext, SProps } from 'ssr-types-react'
import { STORE_CONTEXT } from '_build/create-context'
import { getGrantCode } from '@/apis'

interface Context {
  isLogin: boolean
}

const Authorization = (props: SProps) => {
  const { state } = useContext<IContext<Context>>(STORE_CONTEXT)

  if (__isBrowser__) {
    const { pathname, search } = props.location
    if (state?.isLogin) {
      const accessToken = localStorage.getItem('accessToken') || ''
      if (accessToken) {
        const params = new URLSearchParams(search)
        if (Array.from(params.keys()).length) {
          const responseType = params.get('response_type') || ''
          const redirectUri = params.get('redirect_uri') || ''
          const clientId = params.get('client_id') || ''
          getGrantCode(
            {
              responseType,
              redirectUri,
              clientId
            },
            accessToken
          ).then(res => {
            if (res.code === 0) {
              const p = new URLSearchParams()
              p.set('code', res.data.code)
              p.set('client_id', clientId)
              window.location.href = redirectUri + '?' + p.toString()
            } else {
              document.cookie =
                'Authorization=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
              localStorage.removeItem('accessToken')
              message.info('用户未注册')
              props.history.push('/')
            }
          })
        } else {
          props.history.push('/goto')
        }
      }
    } else {
      document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      localStorage.removeItem('accessToken')

      const p = new URLSearchParams()
      p.set('redirect', pathname + search)
      props.history.push('/?' + p.toString())
    }
  }

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        height: '100vh',
        backgroundSize: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#f0f2f5',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'url("https://preview.pro.antdv.com/assets/background.ebcb9160.svg")'
      }}
    >
      <Spin />
    </div>
  )
}

export default Authorization
