import React, { useEffect, useRef, useState } from 'react'
import join from '../../../pages/member/join/join.module.scss'


export default function Join5({setList,cc,setCc}) {
  let con5_wrap = useRef();
  let winHeight = useRef();
  let blur = useRef();
  let modal = useRef();
  let video = useRef();
  let capsule = useRef();
  const [st,setSt] = useState(0);
  const [kk,setKk] = useState();

  //alert 
const [altext, setAltext] = useState();
const [isAlertOpen, setIsAlertOpen] = useState(false);


  const cc_name = ['기적이','사랑이','순수가','빛이','지식이','희망이','친절이','용기가','성실이'];

  //alert창 열고 닫기
  const alertOpen = (text) =>{
    setAltext(text)
    setIsAlertOpen(true);    
  };

  const alertClose = () =>{
    setIsAlertOpen(false);
    if(altext == "캡슐을 선택해주세요."){
      location.reload();
    }
  };

  useEffect(()=>{
    winHeight.current.style.setProperty('height', `${window.innerHeight}px`);

    let cc = capsule.current.childNodes;
    
    let num = 1;
    cc.forEach((v,k) => {
      v.onclick=()=>{
        cc[num-1].childNodes[0].src=`/img/member/cc/${num}.png`;
        v.childNodes[0].src=`/img/member/cc/${k + 1}_1.png`;
        num = k + 1 ;
        setSt(1)
        setKk(num)
        }
      });
    },[])

    const con5Click = ()=>{
      if(st <= 0) {
        alertOpen("캡슐을 선택해주세요.")
      } else {
        blur.current.style = `display:block`;
        modal.current.style = `display:block`;
        video.current.style = `display:none`;
      }
    };

    const no = ()=>{
      modal.current.style = `display:none`;
      blur.current.style = `display:none`;
      video.current.style = `display:block`;
    };
    const yes = ()=>{
      setCc(kk)
      setList(6)
    };
  return (
    <div className={join.join_wrap} ref={winHeight} >
      <video autoPlay muted loop playsInline src='/img/background.mp4'
      ref={video}/>
      <div className={join.bg}>
        <div className={join.join_con5_wrap} ref={con5_wrap}>
          <div className={join.capsule_wrap} ref={capsule}>
            <figure className={join.capsule}><img src='/img/member/cc/1.png' alt='캡슐1'/></figure>
            <figure className={join.capsule}><img src='/img/member/cc/2.png' alt='캡슐2'/></figure>
            <figure className={join.capsule}><img src='/img/member/cc/3.png' alt='캡슐3'/></figure>
            <figure className={join.capsule}><img src='/img/member/cc/4.png' alt='캡슐4'/></figure>
            <figure className={join.capsule}><img src='/img/member/cc/5.png' alt='캡슐5'/></figure>
            <figure className={join.capsule}><img src='/img/member/cc/6.png' alt='캡슐6'/></figure>
            <figure className={join.capsule}><img src='/img/member/cc/7.png' alt='캡슐7'/></figure>
            <figure className={join.capsule}><img src='/img/member/cc/8.png' alt='캡슐8'/></figure>
            <figure className={join.capsule}><img src='/img/member/cc/9.png' alt='캡슐9'/></figure>
          </div>
          <div className={join.create} onClick={con5Click}>
            <figure className={join.create_img}><img src='/img/member/join/create.png' alt='생성하기'/></figure>
            <p>생성하기</p>
          </div>
        </div>
        <div className={join.blur} ref={blur}></div>
        <div className={join.modal_wrap} ref={modal}>
          <figure><img src='/img/member/join/modal.png' alt=''/></figure>
          <div className={join.join_con5}>
            <div className={join.capsule_txt}>
                <div className={join.capsule_txt_img}>
                  <figure className={join.capsule_txt_img1}><img src={`/img/member/cc/small${kk}.png`} alt=''/></figure>
                </div>
                <p className={join.capsule_txt_p}>{cc_name[kk - 1]} 느껴진다.<br/>
                  이 캡슐로 하시겠습니까?
                </p>
            </div>
            <div className={join.answer}>
              <figure className={join.no} onClick={no}><img src='/img/member/join/no.png' alt='아니오 버튼'/></figure>
              <figure className={join.yes} onClick={yes}><img src='/img/member/join/yes.png' alt='예 버튼'/></figure>
            </div>
          </div>
        </div>
      </div>
      <div className={join.alert_modal} onChange={() => openAlert()}>
        {isAlertOpen && (
          <form className= {join.alert_warning}>
          <img src='/img/member/join/modal.png' alt=''/>
          <div className={join.alert_text}>
          <p>{altext}</p>
          <input type='image' src='/img/member/mypage/ok.png' className = {join.alert_btn}  onClick={() => alertClose()}/>
          </div>
        </form>
        )}
        </div>

    </div>
  )
}
