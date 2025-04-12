'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import StyledComponentsRegistry from '@/lib/AntdRegistry';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';
import './globals.css';

export const metadata = {
  title: 'Ứng dụng Quản lý Yêu cầu',
  description: 'Hệ thống quản lý yêu cầu từ khách hàng',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>
        <StyledComponentsRegistry>
          <ConfigProvider locale={viVN}>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ConfigProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
