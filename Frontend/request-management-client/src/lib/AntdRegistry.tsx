'use client';

import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';

const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  const cache = React.useMemo(() => createCache(), []);
  
  useServerInsertedHTML(() => {
    return (
      <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />
    );
  });
  
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry;
