// import { login, signup } from './actions'
// import Link from 'next/link'

// export default function LoginPage() {
//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center text-gray-900">Sign in to Salesai</h1>
//         <form className="space-y-4">
//           <div>
//             <input 
//               id="email" 
//               name="email" 
//               type="email" 
//               required 
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Email"
//             />
//           </div>
//           <div className="relative">
//             <input 
//               id="password" 
//               name="password" 
//               type="password" 
//               required 
//               className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
//               placeholder="Password"
//             />
//             <button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//               </svg>
//             </button>
//           </div>
//           <div className="flex items-center justify-between">
//             <label className="flex items-center">
//               <input type="checkbox" className="form-checkbox text-orange-500" />
//               <span className="ml-2 text-sm text-gray-600">Remember me</span>
//             </label>
//             <Link href="/forgot-password" className="text-sm text-orange-500 hover:underline">
//               Forgot Password?
//             </Link>
//           </div>
//           <button 
//             formAction={login}
//             className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
//           >
//             Sign in
//           </button>
//         </form>
//         <div className="text-center text-sm text-gray-500">
//           Or login with
//         </div>
//         <div className="flex justify-center space-x-4">
//           <button className="flex items-center justify-center w-10 h-10 bg-white border rounded-full shadow-sm hover:shadow-md">
//             <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" fill="#4285F4"/>
//             </svg>
//           </button>
//           <button className="flex items-center justify-center w-10 h-10 bg-white border rounded-full shadow-sm hover:shadow-md">
//             <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10S2 17.514 2 12 6.486 2 12 2zm0 4a6 6 0 100 12 6 6 0 000-12zm0 2a4 4 0 110 8 4 4 0 010-8z" fill="#000"/>
//             </svg>
//           </button>
//         </div>
//         <div className="text-center text-sm">
//           Don't have an account? 
//           <button 
//             formAction={signup}
//             className="ml-1 text-orange-500 hover:underline"
//           >
//             Sign Up now
//           </button>
//         </div>
//       </div>
//       {/* <GoogleSignIn /> */}
//     </div>
//   )
// }

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
    {/* <GoogleSignIn /> */}
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
