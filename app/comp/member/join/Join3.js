import React, { useEffect, useRef, useState } from 'react'
import join from '../../../pages/member/join/join.module.scss'

export default function Join3({list,setList,nickName}) {
  let con3_wrap = useRef();
  let winHeight = useRef();

  const con3Click = ()=>{
    setList(4)
  };

  useEffect(()=>{
    winHeight.current.style.setProperty('height', `${window.innerHeight}px`);
  },[])
  return (
    <div className={join.join_wrap} ref={winHeight} >
      <video autoPlay muted loop playsInline src='/img/background.mp4'/>
      <div className={join.bg}>
        <div className={join.join_con3_wrap} ref={con3_wrap}>
          <div className={join.con1}>
            <figure className={join.dot}><img src='/img/member/join/dotdotdot.gif' alt="쩜쩜쩜 이미지"/></figure>
            <figure className={join.agumon}><img src='/img/member/join/agumon.png' alt="아구몬 이미지"/></figure>
            <figure className={join.tornado}><img src='/img/member/join/tornado.png' alt="토네이도 이미지"/></figure>
          </div>
          <div className={join.con1_txt} onClick={con3Click}>
            <figure className={join.con1_txt_box}><img src='/img/member/join/con1_txt_box.png' alt="텍스트 박스"/></figure>
            <figure className={join.arrow}><img src='/img/member/join/arrow.png' alt="화살표 버튼"/></figure>       
            <div className={join.typing_txt}>
              <ul>
                <li>정말 반가워 " <span style={{ color: '#00f3ff' }}>{nickName}</span> " !</li>
                <li>디지털 월드를 구하기 위해선 너의 힘이 필요해.</li>
                <li>나와 함께 봉인된 모든 디지몬들을 잠에서<br/>깨워줄래?</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
