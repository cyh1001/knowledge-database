import { login, signup } from './actions'
import GoogleSignIn from '@/components/GoogleSignIn';
export default function LoginPage() {
  return (
    <div>
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
    <GoogleSignIn />
    </div>
  )
}


// 'use client';

// import React from 'react';
// import LoginForm from '@/components/auth/LoginForm';


// const LoginPage: React.FC = () => {
//   return (
//     <div>
//       <LoginForm  />
//     </div>
//   );
// };

// export default LoginPage;


// import { useEffect } from 'react';
// import { signIn, useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// const LoginPage: React.FC = () => {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === 'authenticated') {
//       router.push('/i/my');
//     }
//   }, [status, router]);

//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-white-100">
//       <h1 className="text-3xl font-bold mb-6">登录</h1>
//       <button
//         className="btn btn-primary"
//         onClick={() => signIn('github')}
//       >
//         使用 GitHub 登录
//       </button>
//       <Link href="/"  className="btn btn-secondary mt-4">
//         返回主页
//       </Link>
//     </div>
//   );
// };

// export default LoginPage;
