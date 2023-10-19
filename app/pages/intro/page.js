"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import style from './page.module.scss'
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';

export default function page() {
  const navi = useRouter()

  const handleKakaoLogin =async (response) => {
    const u_id = response.profile.id;
    const u_nick = response.profile.properties.nickname;
    const d = await axios.post('/api/member',{u_id,u_nick})
     if(d.data[0] == false) {
      sessionStorage.setItem('u_id',u_id)
      navi.push( './member/join')
    } else {
      sessionStorage.setItem('loginstate',u_id)
      navi.push('./main')
    } 
  };

  return (
          <article className={style.main_intro}>
            <video className={style.bg_video} autoPlay muted loop playsInline src='/img/background.mp4'/>
            <figure className={`${style.main_logo} ${style.bg}`}>
            <img src="/img/intro/Group 2.png" alt='' />
              <section className={style.loadlast}>
                <div>
                  <img src="/img/intro/WELCOME TO DIGITAL WORLD.png" alt="" />
                  <KakaoLogin
                      token={process.env.NEXT_PUBLIC_KAKAO_JS_KEY}
                      onSuccess={handleKakaoLogin}
                      onFail={console.error}
                      onLogout={console.info}
                      render={({ onClick }) => {
                        return (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              onClick();
                            }}
                          >
                            <img src="/img/intro/Group 181.png" alt='' />
                          </a>
                        );
                      }}
                    /> 
                </div>
              </section>
            </figure>
          </article>
  )
}
