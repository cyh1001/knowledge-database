// const Logo: React.FC = () => {
//   return (
//     <div className="logo">
//       <div className="group-6">
//         <img src="https://www.caoyihan.com/images/logo.png" />
//         <div className="rectangle-3" />
//       </div>
//       <p className="text-2">Brainy</p>
//     </div>
//   )
// }
// export default Logo



// import Link from 'next/link'
// import Image from 'next/image'

// export default function Logo() {
//   return (
//     <Link href="/i" className="block" aria-label="Cruip">
//       <Image
//         src="https://www.caoyihan.com/images/logo.png"
//         alt="Logo"
//         width={32}
//         height={32}
//       />
//     </Link>
//   )
// }



import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/i" className="block" aria-label="Cruip">
      <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient cx="21.152%" cy="86.063%" fx="21.152%" fy="86.063%" r="79.941%" id="footer-logo">
            <stop stopColor="#4FD1C5" offset="0%" />
            <stop stopColor="#81E6D9" offset="25.871%" />
            <stop stopColor="#338CF5" offset="100%" />
          </radialGradient>
        </defs>
        <rect width="32" height="32" rx="16" fill="url(#footer-logo)" fillRule="nonzero" />
      </svg>
    </Link>
  )
}
