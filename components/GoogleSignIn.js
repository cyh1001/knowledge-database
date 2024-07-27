'use client';

import { useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function GoogleSignIn() {
  const supabase = createClientComponentClient();

  useEffect(() => {
    window.handleSignInWithGoogle = async (response) => {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });

      if (error) {
        console.error('Error signing in with Google:', error);
        // 处理错误，例如显示错误消息
      } else {
        console.log('Successfully signed in with Google:', data);
        // 处理成功登录，例如重定向到仪表板页面
      }
    };
  }, [supabase.auth]);

  return (
    <div>
<div id="g_id_onload"
     data-client_id="431443615963-lsagtmscta61epejc3bg0e8asj6d5rvb.apps.googleusercontent.com"
     data-context="signin"
     data-ux_mode="popup"
     data-callback="handleSignInWithGoogle"
     data-auto_prompt="false">
</div>

<div className="g_id_signin"
     data-type="standard"
     data-shape="rectangular"
     data-theme="outline"
     data-text="continue_with"
     data-size="large"
     data-logo_alignment="left">
</div>
</div>
  );
}