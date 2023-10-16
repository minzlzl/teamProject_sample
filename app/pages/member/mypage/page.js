import React from 'react'
import style from './page.module.scss'

export default function page() {
  return (
    <article className={style.bg_img}>
      <div className={style.pro}>
        <img src='/img/member/mypage/프로필.png'></img>
        <img src='/img/member/mypage/Group 206.png'></img>
      </div>
      <figure className={style.pro_view_bg}>
        <img src='/img/member/mypage/Group 194.png'></img>
        <figcaption className={style.pro_view}>
          <img src='/img/member/mypage/Group 237.png'></img>
          <img src='/img/member/mypage/Group 759.png'></img>
        </figcaption>
      </figure>
      <div>여기안에 캡슐들...</div>
    </article>
  )
}
