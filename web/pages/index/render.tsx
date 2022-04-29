import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, Form, Button, Input } from 'antd'
import React, { useContext, useState } from 'react'
import { debounce } from 'lodash'
import { login, getCurrentApplication, getCurrentUser } from '@/apis'

import { aesEncrypt } from '@/utils/crypto'
import { IContext, SProps } from 'ssr-types-react'
import { STORE_CONTEXT } from '_build/create-context'
import { ApplicationEntity } from '@/../src/application/entities/application.entity'

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

const Login: React.FC = (props: SProps) => {
  const { state } = useContext<
    IContext<{ currentApplication: ApplicationEntity }>
  >(STORE_CONTEXT)

  if (__isBrowser__) {
    if (state?.currentApplication.clientId) {
      localStorage.setItem('clientId', state.currentApplication.clientId)
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
        'Authorization=Bearer ' + (msg.data.accessToken as string)
      props.history.push('/goto')
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
        backgroundImage:
          'url("https://preview.pro.antdv.com/assets/background.ebcb9160.svg")'
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
