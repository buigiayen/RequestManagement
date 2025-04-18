import React from "react";
import { Card } from "antd";
import Link from "next/link";
import LoginForm from "./componets/loginForm";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card style={{ width: 400, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          Request Manager
          <p>Hệ thống quản lý yêu cầu</p>
        </div>
        <LoginForm />
        <div style={{ textAlign: "center" }}>
          <p>
            Chưa có tài khoản? <Link href="/register">Đăng ký</Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
