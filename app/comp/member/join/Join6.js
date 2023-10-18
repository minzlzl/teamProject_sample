import React, { useEffect, useRef, useState } from 'react'
import join from '../../../pages/member/join/join.module.scss'

export default function Join6({list,setList,cc}) {
  let con6_wrap = useRef();
  let winHeight = useRef();

  const con6Click = ()=>{
    setList('end');
  };
  const cc_name = ['기적이','사랑이','순수가','빛이','지식이','희망이','친절이','용기가','성실이'];
  useEffect(()=>{
    winHeight.current.style.setProperty('height', `${window.innerHeight}px`);
  },[])
  return (
    <div className={join.join_wrap} ref={winHeight} >
      <video autoPlay muted loop playsInline src='/img/background.mp4'/>
      <div className={join.bg}>
        <div className={join.join_con6_wrap} ref={con6_wrap}>
        <div className={join.con1}>
          <figure className={join.dot}><img src='/img/member/join/dotdotdot.gif' alt="쩜쩜쩜 이미지"/></figure>
          <figure className={join.agumon}><img src='/img/member/join/agumon.png' alt="아구몬 이미지"/></figure>
          <figure className={join.tornado}><img src='/img/member/join/tornado.png' alt="토네이도 이미지"/></figure>
        </div>
        <div className={join.con1_txt} onClick={con6Click}>
          <figure className={join.con1_txt_box}><img src='/img/member/join/con1_txt_box.png' alt="텍스트 박스"/></figure>
          <figure className={join.arrow}><img src='/img/member/join/arrow.png' alt="화살표 버튼"/></figure>       
          <div className={join.typing_txt}>
            <ul>
              <li>{cc_name[cc - 1]} 느껴지는 캡슐을 골랐구나.</li>
              <li>정말 멋진 파트너가 될 거야!</li>
              <li>그럼 이제 진짜 디지털 월드로 가보자!</li>
            </ul>
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
