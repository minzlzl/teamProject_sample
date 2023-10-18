import React, { useEffect, useRef, useState } from 'react'
import join from '../../../pages/member/join/join.module.scss'

export default function Join1({list,setList}) {
  let con1_wrap = useRef();
  let winHeight = useRef();

  const con1Click = ()=>{
    setList(2)
  };


  return (
    <div className={join.join_wrap} ref={winHeight} >
      <video autoPlay muted loop playsInline src='/img/background.mp4'/>
      <div className={join.bg}>
        <div className={join.join_con1_wrap} ref={con1_wrap}>
        <div className={join.con1}>
          <figure className={join.dot}><img src='/img/member/join/dotdotdot.gif' alt="쩜쩜쩜 이미지"/></figure>
          <figure className={join.agumon}><img src='/img/member/join/agumon.png' alt="아구몬 이미지"/></figure>
          <figure className={join.tornado}><img src='/img/member/join/tornado.png' alt="토네이도 이미지"/></figure>
        </div>
        <div className={join.con1_txt} onClick={con1Click}>
          <figure className={join.con1_txt_box}><img src='/img/member/join/con1_txt_box.png' alt="텍스트 박스"/></figure>
          <figure className={join.arrow}><img src='/img/member/join/arrow.png' alt="화살표 버튼"/></figure>       
          <div className={join.typing_txt}>
            <ul>
              <li>안녕? 디지털 월드에 온걸 환영해!</li>
              <li>너에 대해서 알려줄래?</li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
