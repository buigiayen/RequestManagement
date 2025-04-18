'use client';

import React from 'react';
import { Form, Input, Button, Card, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const { Title } = Typography;

export default function RegisterPage() {
  const { register, isLoading } = useAuth();
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      // Set default role to Customer for registration
      const userData = {
        ...values,
        role: 'Customer'
      };
      
      await register(userData);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ color: '#1890ff', margin: 0 }}>Request Manager</Title>
          <p>Đăng ký tài khoản mới</p>
        </div>
        
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="userName"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
          >
            <Input 
              prefix={<UserOutlined />} 
              placeholder="Tên đăng nhập" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}
          >
            <Input 
              prefix={<MailOutlined />} 
              placeholder="Email" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Mật khẩu" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Vui lòng xác nhận mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu xác nhận không khớp!'));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />} 
              placeholder="Xác nhận mật khẩu" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="firstName"
            rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
          >
            <Input 
              placeholder="Tên" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="lastName"
            rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
          >
            <Input 
              placeholder="Họ" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input 
              prefix={<PhoneOutlined />} 
              placeholder="Số điện thoại" 
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={isLoading}
              block
              size="large"
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
        
        <div style={{ textAlign: 'center' }}>
          <p>
            Đã có tài khoản? <Link href="/login">Đăng nhập</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
