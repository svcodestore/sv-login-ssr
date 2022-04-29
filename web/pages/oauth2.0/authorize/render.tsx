import React, { useContext } from 'react'
import { Spin } from 'antd'

import { IContext, SProps } from 'ssr-types-react'
import { STORE_CONTEXT } from '_build/create-context'
import { ApplicationEntity } from '@/../src/application/entities/application.entity'
import { getGrantCode } from '@/apis'

const Login: React.FC = (props: SProps) => {
  const { state } = useContext<
    IContext<{ currentApplication: ApplicationEntity }>
  >(STORE_CONTEXT)

  if (__isBrowser__) {
    const accessToken = localStorage.getItem('accessToken') || ''
    const { pathname, search } = props.location
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
            props.history.push('/')
          }
        })
      } else {
        props.history.push('/goto')
      }
    } else {
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

export default Login
