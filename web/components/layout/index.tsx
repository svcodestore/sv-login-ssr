import React from 'react'
import { LayoutProps } from 'ssr-types-react'
import App from './App'

const Layout = (props: LayoutProps) => {
  // 注：Layout 只会在服务端被渲染，不要在此运行客户端有关逻辑
  const { injectState } = props
  const { injectCss, injectScript } = props.staticList!

  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, shrink-to-fit=no'
        />
        <meta name='theme-color' content='#000000' />
        <title>SV SSO LOGIN</title>
        {injectCss}
      </head>
      <body
        style={{
          margin: 0,
          padding: 0
        }}
      >
        <div
          id='app'
          style={{
            height: '100%'
          }}
        >
          <App {...props} />
        </div>
        {injectState}
        {injectScript}
      </body>
    </html>
  )
}

export default Layout
