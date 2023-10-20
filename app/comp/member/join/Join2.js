import React, { useEffect, useRef, useState } from 'react'
import join from '../../../pages/member/join/join.module.scss'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';


export default function Join2({setList,setNickName,setUimg}) {
  
  let con2_wrap = useRef();
  let input = useRef();
  let [ii,setIi] = useState();
  let elImg = useRef();
  
  
  //alert 
  const [altext, setAltext] = useState();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  

  const [name, setName] = useState(''); 
  const maxCharacters = 6;


   //alert창 열고 닫기
    const alertOpen = (text) =>{
    setAltext(text)
    setIsAlertOpen(true);    
  };

  const alertClose = () =>{
    setIsAlertOpen(false);
    if(altext == "닉네임을 입력해주세요." || altext == '2글자 이상 입력해주세요.' || altext == '캐릭터를 선택해주세요.' ){
    }
  };

  const inputChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= maxCharacters) {
      setName(inputValue);
    }
  };
  const img = function(k){
    for(let i=0; i<8; i++){
      if(i == k - 1) {
        elImg.current.childNodes[0].childNodes[i].childNodes[0].classList.add(join.active)
      } else {
        elImg.current.childNodes[0].childNodes[i].childNodes[0].classList.remove(join.active)
      }
    }
    setIi(k);
  }
  const con2Click = ()=>{
    let nickNames = input.current.value;
    let nicklen = nickNames.split("");
    if(nickNames === ``){
      alertOpen("닉네임을 입력해주세요.");
      input.current.focus();
      return false;
    }
    if(nicklen.length < 2){
      alertOpen("2글자 이상 입력해주세요.");
      input.current.focus();
      return false;
    }
    if(!ii) {
      alertOpen("캐릭터를 선택해주세요.");
      return false;
    }
      setList(3)
      setUimg(ii)
      setNickName(nickNames);
  };

  let winHeight = useRef();
  let btnh = useRef();
  
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
  });
  
  return (
    <div className={join.join_wrap} ref={winHeight}>
      <video autoPlay muted loop playsInline src='/img/background.mp4'/>
      <div className={join.bg}>
        <div className={join.join_con2_wrap} ref={con2_wrap}>
          <div className={join.con2_txt}>
            <div className={join.combine1}>
              <figure className={join.small_agumon}><img src='/img/member/join/small_agumon.png' alt='작은 아구몬 이미지'/></figure>
              <figure className={join.small_tornado}><img src='/img/member/join/small_tornado.png' alt='작은 토네이도 이미지'/></figure>
            </div>
            <div className={join.combine2}>
              <figure className={join.con2_txt_box}><img src='/img/member/join/con2_txt_box.png' alt='텍스트 박스 이미지'/></figure>
              <p className={join.typing_txt2}>캐릭터를 고르고 닉네임을 지어줘!</p>
            </div>
          </div>
          <Swiper navigation={{
            nextEl: '.swiper_button_next', // 오른쪽 버튼
            prevEl: '.swiper_button_prev', // 왼쪽 버튼
          }} modules={[Navigation]} className={join.swiper_wrap} ref={elImg}>
            <SwiperSlide className={join.swiper} onClick={()=>{img(1)}} ><img src='/img/member/join/1.png' alt=''/></SwiperSlide>  
            <SwiperSlide className={join.swiper} onClick={()=>{img(2)}} ><img src='/img/member/join/2.png' alt=''/></SwiperSlide>  
            <SwiperSlide className={join.swiper} onClick={()=>{img(3)}} ><img src='/img/member/join/3.png' alt=''/></SwiperSlide>  
            <SwiperSlide className={join.swiper} onClick={()=>{img(4)}} ><img src='/img/member/join/4.png' alt=''/></SwiperSlide>  
            <SwiperSlide className={join.swiper} onClick={()=>{img(5)}} ><img src='/img/member/join/5.png' alt=''/></SwiperSlide>  
            <SwiperSlide className={join.swiper} onClick={()=>{img(6)}} ><img src='/img/member/join/6.png' alt=''/></SwiperSlide>  
            <SwiperSlide className={join.swiper} onClick={()=>{img(7)}} ><img src='/img/member/join/7.png' alt=''/></SwiperSlide>  
            <SwiperSlide className={join.swiper} onClick={()=>{img(8)}} ><img src='/img/member/join/8.png' alt=''/></SwiperSlide>  
            <div className={join.swiper_btn}>
              <div className="swiper_button_prev"><img src='/img/member/join/prev.png' alt="왼쪽 화살표"/></div> {/* 왼쪽 화살표 버튼 */}
              <div className="swiper_button_next"><img src='/img/member/join/next.png' alt="오른쪽 화살표"/></div> {/* 오른쪽 화살표 버튼 */}
            </div>        
          </Swiper>
          <div className={join.user_name}>
            <figure className={join.user_name_txt}><img src='/img/member/join/user_name.png' alt='유저 닉네임 작성하는 창'/></figure>
            <input type="text" placeholder='닉네임을 입력하세요.' ref={input} value={name} onChange={inputChange} className={join.user_input}/>
          </div>
          <div className={join.create} onClick={con2Click} ref={btnh}>
            <figure className={join.create_img}><img src='/img/member/join/create.png' alt='생성하기'/></figure>
            <p>생성하기</p>
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
