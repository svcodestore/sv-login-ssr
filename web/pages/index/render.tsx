import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Form, Button, Input, message } from 'antd'
import React, { useContext, useState } from 'react'
import debounce from 'lodash.debounce'
import { login } from '@/apis'

import { aesEncrypt } from '@/utils/crypto'
import { IContext, SProps } from 'ssr-types-react'
import { STORE_CONTEXT } from '_build/create-context'

interface Context {
  currentApplication: any
  isLogin: boolean
  fileServerUrl: string
}

const LoginMessage: React.FC<{
  content: string
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24
    }}
    message={content}
    type='error'
    showIcon
  />
)

const Login = (props: SProps) => {
  const { state } = useContext<IContext<Context>>(STORE_CONTEXT)

  const bgImgUrl = state?.fileServerUrl + '/10001.svg'

  if (__isBrowser__) {
    if (!state?.isLogin) {
      document.cookie = 'Authorization=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      localStorage.removeItem('accessToken')
    } else {
      if (state?.currentApplication.clientId) {
        localStorage.setItem('clientId', state.currentApplication.clientId)
      }
      const accessToken = localStorage.getItem('accessToken') || ''
      if (accessToken) {
        props.history.push('/goto')
      }
    }
  }

  const [isLoginError, setLoginState] = useState(false)
  const onFinish = debounce(async (values: any) => {
    const data = { ...values, type: 'login' }
    data.clientId = localStorage.getItem('clientId') || ''
    if (values.username) {
      data.username = aesEncrypt(values.username)
    }
    if (values.password) {
      data.password = aesEncrypt(values.password)
    }
    const msg = await login(data)

    if (msg.code !== 0) {
      setLoginState(true)
    } else {
      localStorage.setItem('accessToken', msg.data.accessToken)
      document.cookie =
        'Authorization=Bearer ' + (msg.data.accessToken as string) + ';path=/'
      const params = new URLSearchParams(props.location.search)
      message.success('登录成功')
      if (params.get('redirect')) {
        window.location.href = params.get('redirect') || '/goto'
      } else {
        window.location.href = '/goto'
      }
    }
  }, 300)

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100%',
        backgroundSize: '100%',
        padding: '15em 0 144px',
        position: 'relative',
        backgroundColor: '#f0f2f5',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${bgImgUrl})`
      }}
    >
      <div
        style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}
      >
        <div
          style={{
            height: '2em',
            lineHeight: '2em',
            fontSize: '33px',
            color: 'rgba(0, 0, 0, .85)',
            fontWeight: 600,
            position: 'relative',
            top: '2px'
          }}
        >
          登录斯达文星
        </div>
        <div
          style={{
            fontSize: '14px',
            color: 'rgba(0, 0, 0, .35)',
            position: 'relative',
            top: '2px'
          }}
        >
          登录一次，其他系统无需再登录
        </div>
      </div>
      <Form
        name='normal_login'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{
          width: '340px',
          maxWidth: '100%',
          margin: 'auto'
        }}
      >
        {isLoginError && <LoginMessage content='账户或密码错误' />}

        <Form.Item
          name='username'
          rules={[
            { required: true, message: '请输入帐号ID' },
            { min: 4, max: 16, message: '请输入4-16位ID' }
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='请输入帐号'
          />
        </Form.Item>
        <Form.Item
          name='password'
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='请输入密码'
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            style={{
              width: '100%'
            }}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
