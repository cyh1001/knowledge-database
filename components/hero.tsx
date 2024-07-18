"use client"
import VideoThumb from '@/public/images/hero-image.png'
// import ModalVideo from '@/components/modal-video'
import AOS from 'aos'
import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    // 初始化 AOS
    AOS.init({
      // 这里可以设置全局配置
      once: true, // 动画仅一次
      delay: 50, // 延迟
      duration: 400, // 动画持续时间
      easing: 'ease', // 动画缓动函数
    });
  }, []);
  return (
    <section className="relative min-h-screen">
      {/* Illustration behind hero content */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1" aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
          {/* data-aos="zoom-y-out" */}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tighter tracking-tighter mb-4" data-aos="zoom-y-out">
              你的日常知识管理助手
              {/* Stay ahead of the curve */}
              {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                wonderful
              </span>  */}
            </h1>
            <div className="max-w-3xl mx-auto">
            {/* data-aos="zoom-y-out" data-aos-delay="150" */}
              <p className="text-xl text-gray-600 mb-8" data-aos="zoom-y-out" data-aos-delay="150">
                {/* Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever. */}
                担心信息过载？担心知识太碎片化？用BrainyAI
              </p> 
              {/* data-aos="zoom-y-out" data-aos-delay="300" */}
              <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="zoom-y-out" data-aos-delay="300">
                <div>
                  <a className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 px-6 py-3" href="/i">免费使用</a>
                </div>
                {/* <div>
                  <a className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4" href="#0">Learn more</a>
                </div> */}
              </div>
            </div>
          </div>

          {/* Hero image */}
          {/* <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080} /> */}

        </div>

      </div>
    </section>
  )
}