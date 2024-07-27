'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function GoogleSignInScript() {
  useEffect(() => {
    // 这里可以添加任何需要在脚本加载后执行的代码
  }, []);

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="lazyOnload"
    />
  );
}