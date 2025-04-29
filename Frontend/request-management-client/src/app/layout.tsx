"use client";

import { AuthProvider } from "@/contexts/AuthContext";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { ConfigProvider } from "antd";
import viVN from "antd/lib/locale/vi_VN";
import "./globals.css";
import { TanstackProvider } from "@/providers/tanstack-provider";
import MainLayout from "@/components/layouts/MainLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <style jsx global>{`
          @font-face {
            font-family: "myFirstFont";
            src: url("/GoogleSans-Regular.c2901cd7.ttf") format("truetype");
          }

          body,
          span {
            font-family: "myFirstFont", Arial, sans-serif;
          }
        `}</style>
      </head>

      <body>
        <StyledComponentsRegistry>
          <TanstackProvider>
            <ConfigProvider locale={viVN}>
              <AuthProvider>{children}</AuthProvider>
            </ConfigProvider>
          </TanstackProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
