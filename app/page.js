"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation';
import style from './pages/intro/page.module.scss'
import LoginCheck from './comp/LoginCheck';
export default function page() {
    const [loading, setLoading] = useState(true);
    const loadingimg = useRef();

    useEffect(() => {
        //로딩 화살표 ing
        //const loadingimg = document.querySelector('.loading');
    
        for (let i = 0; i < 16; i++) {
          loadingimg.current.innerHTML += "<img src='../../img/intro/Vector (1).png' alt=''>"
        }
    
    
        const loadImg2 = loadingimg.current.childNodes;
        loadImg2.forEach((v, k) => {
          setTimeout(() => {
            v.src = "../../img/intro/Vector.png"
          }, 200 * k)
        }, []);
    
    
        //로딩이 끝났을 때 바뀌는 화면
        setTimeout(() => {
          setLoading(false);
        }, 4000);
      }, []);


return (
    <>
    {
        loading ? (
            <article className={style.main_intro}>
        <video className={style.bg_video} autoPlay muted loop playsInline src='/img/background.mp4'/>
        <figure className={style.main_logo}>
        <img src="/img/intro/Group 2.png" alt='' />
        <figcaption className={style.loadfirst}>
            <div className={style.loading} ref={loadingimg}></div>
            <p>디지털 월드에 접속중 ...</p>
            <img src="/img/intro/intro.gif" alt='' />
        </figcaption>
        </figure>
    </article>
    ) : <LoginCheck />
    }
    </>
    
)
}
