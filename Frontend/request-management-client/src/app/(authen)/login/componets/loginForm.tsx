"use client";
import { Button, Form, Input } from "antd";
import React from "react";
import { authen } from "@/services/authentications/authentication";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function LoginForm() {
  const [form] = Form.useForm<AUTHENTICATION.LOGIN_REQUEST>();

  const onFinish = async (values: AUTHENTICATION.LOGIN_REQUEST) => {
    try {
      var result = await authen.login({
        body: { userName: values.userName, password: values.password },
      });
      console.log(result);
    } catch (error) {
      console.error("Login error:", error);
    }
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
        name='userName'
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
        <Button type="primary" htmlType="submit" block>
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
}
