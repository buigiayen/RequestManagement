"use client";
import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { authen } from "@/services/authentications/authentication";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
export default function LoginForm() {
  const router = useRouter();
  const [form] = Form.useForm<AUTHENTICATION.LOGIN_REQUEST>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const onFinish = async (values: AUTHENTICATION.LOGIN_REQUEST) => {
    await login(values.userName, values.password);
  };
  return (
    <Form
      form={form}
      name="login"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name="userName"
        rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Tên đăng nhập" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Mật khẩu" />
      </Form.Item>

      <Form.Item>
        <Button loading={isLoading} type="primary" htmlType="submit" block>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
}
