import { Application } from '@/../typings/data'
import { Card } from 'antd'
import React, { useContext } from 'react'
import { SProps, IContext } from 'ssr-types-react'
import { STORE_CONTEXT } from '_build/create-context'

interface Context {
  isLogin: boolean
  myApps: Application[]
  isIntranet: boolean
}

const { Meta } = Card

export default (props: SProps) => {
  const { state } = useContext<IContext<Context>>(STORE_CONTEXT)
  let cardsData: any[] = []
  if (__isBrowser__) {
    if (!state?.isLogin) {
      document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      localStorage.removeItem('accessToken')
      props.history.push('/')
    }
  }

  cardsData = (state?.myApps || []).map(e => {
    return {
      meta: {
        title: e.name,
        description: state?.isIntranet ? e.internalUrl : e.homepageUrl
      },
      goto: e.homepageUrl
    }
  })

  return (
    <>
      <div
        style={{
          textAlign: 'center',
          letterSpacing: '20px',
          fontSize: '2rem',
          marginTop: '5px'
        }}
      >
        我的应用
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        {cardsData.map(({ style, cover, meta, goto }) => (
          <Card
            hoverable
            key={Math.random()}
            style={{ ...style, margin: 20 }}
            cover={cover}
            onClick={() => {
              if (goto && goto !== window.location.origin) {
                window.location.href = goto
              }
            }}
          >
            <Meta title={meta.title} description={meta.description} />
          </Card>
        ))}
      </div>
    </>
  )
}
