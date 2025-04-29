"use client";
import React, { useState } from "react";
import { Layout, Menu, Button, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  DashboardOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}
type MenuItem = {
  key: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  text?: string;
  roles?: string[]; // Optional roles property
};
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [menuInfo, setMenuInfo] = useState<MenuItem>();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const menuBase = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      text: "Dashboard",
    },
    {
      key: "/customers",
      icon: <TeamOutlined />,
      text: "Khách hàng",
      roles: ["Admin", "Manager", "Staff"],
    },
    {
      key: "/customer-groups",
      icon: <TeamOutlined />,
      text: "Khách hàng",
      link: "/customers/customer",
      roles: ["Admin", "Manager"],
    },
    {
      key: "/requests",
      icon: <FileTextOutlined />,
      text: "Yêu cầu",
    },
    {
      key: "/users",
      icon: <UserOutlined />,
      text: "Người dùng",
      roles: ["Admin", "Manager"],
    },
  ];

  const menuItems: MenuItem[] = menuBase.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: <Link href={item.link ?? item.key}>{item.text}</Link>,
    text: item.text,
    roles: item.roles,
  }));

  // Filter menu items based on user roles
  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) return true;
    if (!user || !user.roles) return false;
    return item.roles.some((role) => user.roles.includes(role));
  });

  const userMenuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link href="/profile">Hồ sơ</Link>,
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <span onClick={logout}>Đăng xuất</span>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          boxShadow: "2px 0 8px 0 rgba(29,35,41,.05)",
          width: collapsed ? 80 : 250, // Adjusted width
          color: "#f5f5f5",
        }}
        width={260} // Set the expanded width
        collapsedWidth={80} // Set the collapsed width
      >
        <div
          style={{
            height: 64,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderBottom: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <p
            style={{
              margin: 0,
              color: "#ffffff",
              fontSize: collapsed ? "14px" : "18px",
              textAlign: "center",
            }}
          >
            {collapsed ? "EMC" : "EMC SOLUTION"}
          </p>

          <small
            style={{
              margin: 0,
              color: "#ffffff",
              textAlign: "center",
            }}
          >
            {collapsed ? "" : "QUẢN LÝ YÊU CẦU"}
          </small>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[pathname ?? ""]}
          items={filteredMenuItems}
          style={{
            borderRight: 0,
          }}
          onClick={(e) => {
            setMenuInfo(menuItems.find((item) => item.key === e.key));
          }}
        />
      </Sider>

      <Layout
        style={{ marginLeft: collapsed ? 80 : 260, transition: "all 0.2s" }}
      >
        <Header
          style={{
            padding: "0 16px",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 1px 4px rgba(0,21,41,.08)",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: "16px", width: 64, height: 64 }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            {user && (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <div
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Avatar>{user.firstName.split("")[0]}</Avatar>
                  <span style={{ marginLeft: 8 }}>
                    <label
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      {user.firstName} {user.lastName}
                    </label>
                  </span>
                </div>
              </Dropdown>
            )}
          </div>
        </Header>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            padding: 15,
            marginLeft: 16,
            marginRight: 16,
            marginTop: 10,
            height: 50,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            paddingBottom: 10,
          }}
        >
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 10 }}
          >
            <span style={{ fontSize: "22px" }}>{menuInfo?.icon}</span>
          </div>
          <div>
            <span style={{ color: "black", fontWeight: "bold" }}>
              {menuInfo?.text}
            </span>
            <br />
            <small style={{ color: "#979797" }}>Ghi chú</small>
          </div>
          <div style={{ marginLeft: "auto", color: "#979797" }}>
            <HomeOutlined></HomeOutlined> / {menuInfo?.label}
          </div>
        </div>

        <Content
          style={{
            marginLeft: 16,
            marginRight: 16,
            marginTop: 10,
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
