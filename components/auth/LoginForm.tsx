'use client'
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useEffect } from 'react';

const LoginForm: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      // 使用 Link 标签进行导航替换原有的 router.push
    }
  }, [session]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Log in to your account</h2>
        <button
          onClick={() => signIn('github')}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Continue with GitHub
        </button>
        <div className="text-center mb-4">or</div>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-3 py-2 border border-gray-300 rounded"
        />
        <button className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded mb-4">
          Log in
        </button>
        <div className="text-center">
          <Link href="#" className="text-blue-500 hover:underline">
            Use single sign-on
          </Link>
          <br />
          <Link href="#" className="text-blue-500 hover:underline">
            Reset password
          </Link>
          <br />
          <Link href="#" className="text-blue-500 hover:underline">
            No account? Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
