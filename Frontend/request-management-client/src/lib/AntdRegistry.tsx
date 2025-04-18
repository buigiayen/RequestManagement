"use client";

import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import { useServerInsertedHTML } from "next/navigation";
import { ConfigProvider } from "antd";

const StyledComponentsRegistry = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cache = React.useMemo(() => createCache(), []);

  useServerInsertedHTML(() => {
    return (
      <style
        id="antd"
        dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
      />
    );
  });

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider
        theme={{
          token: {
            borderRadius: 0,
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;
