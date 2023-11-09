import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import { userLoginApi } from '@/api/user'
import Wave from '@/components/login/wave/Wave'
import { useUserInfoStore } from '@/stores'
import type { LoginData } from '@/types/user'

import './Login.scss'

const Login = () => {
  const { setUserInfo } = useUserInfoStore()
  const navigate = useNavigate()

  const onFinish = async (values: LoginData) => {
    const result = await userLoginApi(values)
    setUserInfo(result)
    navigate('/', { replace: true })
  }

  return (
    <div className="relative header">
      <div className="flex flex-col items-center justify-center w-screen py-10 min-h-[80vh]">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="text-4xl text-center text-white">A Admin</div>
          </div>
          <div className="p-4 transition-all border shadow rounded-xl hover:shadow-2xl w-80 bg-white/80">
            <Form
              name="login"
              labelCol={{ span: 5 }}
              size="large"
              initialValues={{
                email: 'a-admin@example.com',
                password: 'password'
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: 'Please enter the Email' },
                  { type: 'email', message: 'Please enter the correct Email' }
                ]}
              >
                <Input placeholder="Username" prefix={<UserOutlined />} />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please enter the password' },
                  {
                    min: 6,
                    message: 'The password must be at least 6 characters'
                  }
                ]}
              >
                <Input.Password placeholder="Password" prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Wave />
    </div>
  )
}

export default Login
