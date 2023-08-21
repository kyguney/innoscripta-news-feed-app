import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Input } from 'antd'
import SiteLayout from '@compositions/Layout'
import { useGlobalStates } from '@contexts/app-context'

const Login = () => {
  const { login, isLoggedIn } = useGlobalStates()
  const [loginSubmitLoading, setLoginSubmitLoading] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])
  const onFinish = (values) => {
    setLoginSubmitLoading(true)
    login(
      { email: values.email, password: values.password },
      setLoginSubmitLoading
    )
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return !isLoggedIn ? (
    <SiteLayout>
      <Form
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        style={{
          maxWidth: 600,
          margin: '0 auto'
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button type="primary" htmlType="submit" loading={loginSubmitLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </SiteLayout>
  ) : null
}

export default Login
