"use client"
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import style from './page.module.scss'
import Footer from '@/app/comp/Footer'
import {user_get} from '../../../comp/member/Login'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Lodding from '@/app/comp/Lodding'


export default function page() {

  const fig = useRef();  const imgChange = useRef();
  const [num, setNum] = useState(0);
  const [altext, setAltext] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [member,setMember] = useState();
  const [rk,setRk] = useState();
  const n = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  async function fetchData() {
      const mb = await user_get()
      setRk(mb.rk.data)
      setMember(mb.data);
  }

  useEffect( ()=>{
    fetchData()
  },[]);
  
  //alert창 열고 닫기
  const alertOpen = (text) =>{
    setIsAlertOpen(true);
    setAltext(text)
  };

  const alertClose = () =>{
    setIsAlertOpen(false);
    if(altext == "변경완료" || altext == '닉네임 변경 완료'){
      location.reload();
    }
  };


  //캡슐 불 키고 끄고
  useEffect(() => {
    const button = fig.current?.childNodes
      
    button?.forEach((v, k) => {
      if(k+1 == member?.mb_icon){  button[k].childNodes[0].style.opacity = 1 }
      v.onclick = () => {
        button[num].childNodes[0].style.opacity = 0.6
        v.childNodes[0].style.opacity = 1
        if (k == member.mb_icon-1) {
          alertOpen('같은 캡슐로 변경은 불가능합니다.')
          return false;
        } else {
          const send = {id:member?.mb_id,cc:k+1}
          axios.post('/api/member/mypage/cc',send)
          fetchData();
          alertOpen('변경완료')
          return false;
        }
      }
    });

  },[num,member])


  //모달페이지 이미지 선택
  useEffect(()=>{
    if(isModalOpen){
      const imgChangeNode = imgChange.current.childNodes;
      imgChangeNode.forEach((a, b) =>{
        if(b+1 == member.mb_img){
          a.childNodes[0].style.opacity = 1;
        }
        a.addEventListener('click' , () =>{
          let send = {id:member.mb_id,img:b+1}
          alertOpen('변경완료')
          axios.post('/api/member/mypage/face',send)
          fetchData()
        })
      })

    }
  },[isModalOpen])


  //모달페이지 열고 닫기
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const nickchang =async (e)=>{
    e.preventDefault();
    const mb_nick = e.target.mb_nick.value;
    const nickLangth = mb_nick.split("");

    if(nickLangth.length < 2 || nickLangth.length > 6) {
      alertOpen('닉네임은 2~6글자로 만들어주세요!')
      //alert("닉네임은 2~6글자로 만들어주세요!");
    } else {
      const send = {id:member.mb_id,nick:mb_nick}
      const req = await axios.post('/api/member/mypage/nick',send)
      console.log(req);
      if(req.data == false) {alertOpen('중복 된 닉네임이 있습니다.'); return false;}
      fetchData()
      e.target.mb_nick.blur()
      alertOpen('닉네임 변경 완료')
    }
  }



  const logout= ()=>{
    sessionStorage.setItem('loginstate','');
    n.push('/pages/intro')
  }

  const dell= ()=>{
    sessionStorage.setItem('loginstate','');
    const id = member.mb_id;
    axios.post('/api/member/dell',id)
    n.push('/pages/intro')
  }

  if(!member) return <Lodding />
  return (
    <article className={style.bg_img}>
      <div className={style.pro}>
        <div className={style.pro_title} >
          <img src='/img/member/mypage/프로필.png' />
          <img src='/img/member/mypage/Group 206.png' />
        </div>
        <figure className={style.pro_view_bg}>
          <figcaption className={style.pro_view}>
            <img src={`/img/member/mypage/faces/${member && member.mb_img}.png`} className={style.pro_img} onClick={() => openModal()} />
            {isModalOpen && (
              <div className={style.modal_bg} onClick={() => closeModal()}>
                <div className={style.modal_p} ref={imgChange}>
                  <figure>
                    <img src='/img/member/mypage/faces/s1.png' alt='' />
                  </figure>
                  <figure>
                    <img src='/img/member/mypage/faces/s2.png' alt='' />
                  </figure>
                  <figure>
                    <img src='/img/member/mypage/faces/s3.png' alt='' />
                  </figure>
                  <figure>
                    <img src='/img/member/mypage/faces/s4.png' alt='' />
                  </figure>
                  <figure>
                    <img src='/img/member/mypage/faces/s5.png' alt='' />
                  </figure>
                  <figure>
                    <img src='/img/member/mypage/faces/s6.png' alt='' />
                  </figure>
                  <figure>
                    <img src='/img/member/mypage/faces/s7.png' alt='' />
                  </figure>
                  <figure>
                    <img src='/img/member/mypage/faces/s8.png' alt='' />
                  </figure>
                </div>
              </div>)}
            <p>[ {member && member.mb_date} ]</p>
            <p>[ Rk. {rk} ]</p>
            <img src='/img/member/mypage/Group 759.png' className={style.pro_view_img} />
            <form className={style.pro_view_form} onSubmit={nickchang} method='post'>
              <img src={`/img/main/icon/${member && member.mb_icon}.png`} />  
              <input type='text' name='mb_nick' className={style.text_box} placeholder={member && member.mb_nick}/>
              <input type='submit' className={style.submit_btn} value='' />
            </form>
          </figcaption>
        </figure>
      </div>
      <div className={style.capsule} ref={fig}>
        <figure>
          <img src='/img/member/mypage/1.png' alt='' />
        </figure>
        <figure>
          <img src='/img/member/mypage/2.png' alt='' />
        </figure>
        <figure>
          <img src='/img/member/mypage/3.png' alt='' />
        </figure>
        <figure>
          <img src='/img/member/mypage/4.png' alt='' />
        </figure>
        <figure>
          <img src='/img/member/mypage/5.png' alt='' />
        </figure>
        <figure>
          <img src='/img/member/mypage/6.png' alt='' />
        </figure>
        <figure>
          <img src='/img/member/mypage/7.png' alt='' />
        </figure>
        <figure>
          <img src='/img/member/mypage/8.png' alt='' />
        </figure>
        <figure>
          <img src='/img/member/mypage/9.png' alt='' />
        </figure>
      </div>
      <div className={style.last_btn}>
        <figure>
          <img src='/img/member/mypage/Group 226.png' alt='' onClick={logout} />
        </figure>
        <figure className={style.btn_ani}>
          <img src='/img/member/mypage/Group 177.png' alt='' />
          <img src='/img/member/mypage/Ellipse 3.png' alt='' />
        </figure>
        <figure>
          <img src='/img/member/mypage/Group 264.png' alt='' onClick={dell} />
        </figure>
      </div>


      <div className={style.alert_modal} onChange={() => openAlert()}>
        {isAlertOpen && (
          <form className= {style.alert_warning}>
          <img src='/img/member/join/modal.png' alt=''/>
          <div className={style.alert_text}>
          <p>{altext}</p>
          <input type='image' src='/img/member/mypage/ok.png' className = {style.alert_btn}  onClick={() => alertClose()}/>
          </div>
        </form>
        )}
        </div>
      
      
      <Footer />
    </article>
  )
  {

  }
}
