import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Alert, message, Form, Button, Input } from 'antd'
import React, { useState } from 'react'
import { debounce } from 'lodash'
import {
  login,
  getGrantCode,
  getCurrentApplication,
  getCurrentUser
} from '@/apis'

import { aesEncrypt } from '@/utils/crypto'

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

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values)
    console.log(window.location.pathname)
  }

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

  // return <div>1</div>
  // const [userLoginState, setUserLoginState] = useState({})
  // const [type] = useState<string>('login')

  // const {
  //   location: { pathname, query: q }
  // } = history
  // if (pathname === '/login/oauth2.0/authorize') {
  //   try {
  //     getGrantCode({
  //       responseType: q?.response_type as string,
  //       redirectUri: q?.redirect_uri as string,
  //       clientId: q?.client_id as string
  //     }).then(res => {
  //       window.location.href = (q?.redirect_uri +
  //         '?code=' +
  //         res.code +
  //         '&client_id=' +
  //         q?.client_id) as string
  //     })
  //   } catch {
  //     message.error('authorize fail')
  //   }
  // }

  // getCurrentApplication().then(res => {
  //   localStorage.setItem('clientId', res.clientId)
  // })

  // const handleSubmit = debounce(async values => {
  //   // try {
  //   //   // 登录
  //   //   const data = { ...values, type }
  //   //   data.clientId = localStorage.getItem('clientId') || ''
  //   //   if (values.username) {
  //   //     data.username = aesEncrypt(values.username)
  //   //   }
  //   //   if (values.password) {
  //   //     data.password = aesEncrypt(values.password)
  //   //   }
  //   //   const msg = await login(data)
  //   //   if (msg.accessToken) {
  //   //     localStorage.setItem('accessToken', msg.accessToken)
  //   //     const defaultLoginSuccessMessage = intl.formatMessage({
  //   //       id: 'pages.login.success',
  //   //       defaultMessage: '登录成功！'
  //   //     })
  //   //     message.success(defaultLoginSuccessMessage)
  //   //     await getCurrentUser()
  //   //     /** 此方法会跳转到 redirect 参数所在的位置 */
  //   //     if (!history) return
  //   //     const { query } = history.location
  //   //     const { redirect } = query as { redirect: string }
  //   //     history.push(redirect || '/')
  //   //     return
  //   //   }
  //   //   // 如果失败去设置用户错误信息
  //   //   setUserLoginState({ ...msg, errNameOrPassword: true })
  //   // } catch (error) {
  //   //   const defaultLoginFailureMessage = '登录失败，请重试！'
  //   //   message.error(defaultLoginFailureMessage)
  //   // }
  // }, 300)
  // const { errNameOrPassword } = userLoginState

  // return (
  //   <div>
  //     <div>
  //       123
  //       {/* <LoginForm
  //         title={'登录斯达文星'}
  //         subTitle={'登录一次，其他系统无需再登录'}
  //         initialValues={{
  //           autoLogin: true
  //         }}
  //         onFinish={async values => {
  //           await handleSubmit(values)
  //         }}
  //       >
  //         {errNameOrPassword && <LoginMessage content={'账户或密码错误'} />}
  //         {type === 'login' && (
  //           <>
  //             <ProFormText
  //               name='username'
  //               fieldProps={{
  //                 size: 'large',
  //                 prefix: <UserOutlined />
  //               }}
  //               placeholder={'请输入用户名'}
  //               rules={[
  //                 {
  //                   required: true,
  //                   message: '用户名是必填项！'
  //                 }
  //               ]}
  //             />
  //             <ProFormText.Password
  //               name='password'
  //               fieldProps={{
  //                 size: 'large',
  //                 prefix: <LockOutlined />
  //               }}
  //               placeholder={'请输入密码'}
  //               rules={[
  //                 {
  //                   required: true,
  //                   message: '密码是必填项！'
  //                 }
  //               ]}
  //             />
  //           </>
  //         )}
  //       </LoginForm> */}
  //     </div>
  //   </div>
  // )
}

export default Login
