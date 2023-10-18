import React, { useEffect, useRef, useState } from 'react'
import join from '../../../pages/member/join/join.module.scss'

export default function Join4({list,setList}) {
  let con4_wrap = useRef();
  let winHeight = useRef();

  const con4Click = ()=>{
    setList(5)
  };

  useEffect(()=>{
    winHeight.current.style.setProperty('height', `${window.innerHeight}px`);
  },[])
  return (
    <div className={join.join_wrap} ref={winHeight} >
      <video autoPlay muted loop playsInline src='/img/background.mp4'/>
      <div className={join.bg}>
        <div className={join.join_con4_wrap} ref={con4_wrap}>
          <div className={join.con1}>
            <figure className={join.dot}><img src='/img/member/join/dotdotdot.gif' alt="쩜쩜쩜 이미지"/></figure>
            <figure className={join.agumon}><img src='/img/member/join/agumon.png' alt="아구몬 이미지"/></figure>
            <figure className={join.tornado}><img src='/img/member/join/tornado.png' alt="토네이도 이미지"/></figure>
          </div>
          <div className={join.con1_txt} onClick={con4Click}>
            <figure className={join.con1_txt_box}><img src='/img/member/join/con1_txt_box.png' alt="텍스트 박스"/></figure>
            <figure className={join.arrow}><img src='/img/member/join/arrow.png' alt="화살표 버튼"/></figure>       
            <div className={join.typing_txt}>
              <ul>
                <li>이제 너와 함께할 캡슐을 선택해줘.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
