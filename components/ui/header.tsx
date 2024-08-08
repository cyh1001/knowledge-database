import Link from 'next/link'
import Logo from './logo'

export default function Header() {
  return (
    <header className="bg-white-100 border-b">
      <nav className="flex items-center justify-between p-4">
        {/* Site branding */}
        <div className="flex items-center">
          <div className="shrink-0 mr-4">
            <Logo />
          </div>
          <Link href="/i" className="text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out nav-left text-2xl">
            BrainyAI
          </Link>
        </div>

        {/* 先暂用登录和注册 */}
        <div className="flex">
          {/* <Link href="/login" className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
              登录
          </Link> */}
          {/* <SignIn /> */}
          {/* <Link href="/register" className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ml-4">
              注册
          </Link> */}
        </div>
      </nav>
    </header>
  )
}


// // 'use client'

// // import { useState, useEffect } from 'react'

// import Link from 'next/link'
// import Logo from './logo'
// // import Dropdown from '@/components/utils/dropdown'
// // import MobileMenu from './mobile-menu'
// // import LoginButton from '@/components/login-btn'
// // import SignIn from '@/components/auth/signin-button'

// export default function Header() {

//   // const [top, setTop] = useState<boolean>(true)

//   // // detect whether user has scrolled the page down by 10px
//   // const scrollHandler = () => {
//   //   window.pageYOffset > 10 ? setTop(false) : setTop(true)
//   // }  

//   // useEffect(() => {
//   //   scrollHandler()
//   //   window.addEventListener('scroll', scrollHandler)
//   //   return () => window.removeEventListener('scroll', scrollHandler)
//   // }, [top])

//   return (
//   <header className="bg-white-100  border-b">
//     <nav className="flex items-center justify-between p-4 justify-between text-lg">
//           {/* Site branding */}
//       <div className="shrink-0 mr-4">
//         <Logo />
//       </div>
//       <Link href="/" className="text-black font-bold py-2 px-4 rounded transition duration-300 ease-in-out nav-left text-2xl">
//         BrainyAI
//       </Link>
//       {/* 先暂用登录和注册 */}
//       <div className="flex">
//         {/* <Link href="/login" className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
//             登录
//         </Link> */}
//         {/* <SignIn /> */}
//         {/* <Link href="/register" className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ml-4">
//             注册
//         </Link> */}
//       </div> 
//     </nav>
//     {/* <nav className="flex items-center justify-between p-4 nav-right text-lg">

//     </nav> */}
//   </header>
//   )
// }






// {/* <header className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${!top ? 'bg-white backdrop-blur-sm shadow-lg' : ''}`}>
// <div className="max-w-6xl mx-auto px-5 sm:px-6">
//   <div className="flex items-center justify-between h-16 md:h-20">

    {/* Site branding */}
    // <div className="shrink-0 mr-4">
    //   <Logo />
    // </div>

//     {/* Desktop navigation */}
//     <nav className="hidden md:flex md:grow">
//       {/* Desktop sign in links */}
//       <ul className="flex grow justify-end flex-wrap items-center">
//         <li>
//           {/* <Link href="/signin" className="font-medium text-gray-600 hover:text-gray-900 px-5 py-3 flex items-center transition duration-150 ease-in-out">Sign in</Link> */}
//           {/* <SignIn /> */}
//         </li>
//         <li>
//           <Link href="/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800 ml-3">
//             <span>Sign up</span>
//             <svg className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
//               <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
//             </svg>
//           </Link>
//           {/* <Link href="/signup" className="btn-sm text-gray-200 bg-gray-900 hover:bg-gray-800">
//             <span>Sign up</span>
//             <svg className="w-3 h-3 fill-current text-gray-400 shrink-0 ml-2 -mr-1" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
//               <path d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z" fillRule="nonzero" />
//             </svg>
//           </Link> */}
//         </li>
//       </ul>

//     </nav>

//     <MobileMenu />

//   </div>
// </div>
// </header> */}