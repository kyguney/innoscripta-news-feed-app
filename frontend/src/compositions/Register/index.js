import { useState } from 'react'
import { Form, Input, Button } from 'antd'
import SiteLayout from '@compositions/Layout'
import { useNavigate } from 'react-router-dom'
import { newsAPI, csrf, useGlobalStates } from '@contexts/app-context'

const Register = () => {
  const [RegistrationForm] = Form.useForm()
  const [registerSubmitLoading, setRegisterSubmitLoading] = useState(false)
  const { getUser } = useGlobalStates()
  const navigate = useNavigate()
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 8
      }
    },
    wrapperCol: {
      xs: {
        span: 24
      },
      sm: {
        span: 8
      }
    }
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  }
  const registerUser = async (values) => {
    setRegisterSubmitLoading(true)
    await csrf()
    newsAPI
      .post('/register', {
        name: values.name,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirm
      })
      .then((response) => {
        getUser()
        setRegisterSubmitLoading(false)
        navigate('/profile')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }
  return (
    <SiteLayout>
      <Form {...formItemLayout} form={RegistrationForm} onFinish={registerUser}>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your E-mail!'
            }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            },
            {
              min: 8,
              message: 'Please input at least 8 char password!'
            }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('The new password that you entered do not match!')
                )
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            loading={registerSubmitLoading}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </SiteLayout>
  )
}

export default Register
