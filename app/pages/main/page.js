"use client"
import React, { useEffect, useRef, useState } from 'react'
import {user_get} from '../../comp/member/Login'
import main from './main.module.scss'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


// import required modules
import { Pagination } from 'swiper/modules';
import Footer from '@/app/comp/Footer';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Lodding from '@/app/comp/Lodding';


export default function page() {
const input = useRef();
const [data,setData] = useState();
const [mdg,setMdg] = useState();
const [lines,setLines] = useState();
const [member,setMember] = useState();
const [rk,setRk] = useState();
const [rdg,setRdg] = useState();
const nav = useRouter();
//get으로 DB정보 가져오기
const [ddata,setDdata] = useState([]);

//alert창 
const [isAlertOpen, setIsAlertOpen] = useState(false);
const [altext, setAltext] = useState();


async function fetchData() {
    const mb = await user_get()
    setRk(mb.rk.data)
    setMember(mb.data);
}

async function randigimon(){
  let rand = Math.floor(Math.random() * 141);
  let drand = Math.floor(Math.random() * 1422);
  const res = await axios.get(`/api/main?r=${rand}`);
  const todaydg = await axios.get(`/api/main/dg?r=${drand}`);
  let dg_id = todaydg.data.id;
  const todaydgline = await axios.get(`/api/main/line?id=${dg_id}`);
  setLines(todaydgline.data);
  setData(res.data.content)
  setRdg(todaydg.data)
}

async function getdigimon() {
  const mb_id = sessionStorage.getItem('loginstate');
  const gdg = await axios.get(`/api/member/mydigimon?id=${mb_id}`)
  setMdg(gdg.data);
}

const getFile = async function(){
  try {
    const dbData = await axios.post('/api/borad/list');
    setDdata(dbData.data);
  } catch (error) {
    console.error("AxiosError:", error);
  }
}
  
  useEffect(()=>{
    //input.current.focus();
    fetchData();
    randigimon();
    getFile(); 
    getdigimon();
  },[]);
  

  //alert창 열고 닫기
  const alertOpen = (text) =>{
    setAltext(text)
    setIsAlertOpen(true);
  };

  const alertClose = () =>{
    setIsAlertOpen(false);
  };
  const moving = (link)=>{
    nav.push(link)
  }

  const ser = (e)=>{
    e.preventDefault();
    const search = e.target.search.value;
    if(search == '') { 
      alertOpen("검색할 디지몬을 입력해주세요."); 
      return false; 
    }
    nav.push(`/pages/dex/list?mode=search&search=${search}`);
  }

  const handleImgError = (e) => {
    e.target.src = 'https://digimon-api.com/images/digimon/w/Earthdramon.png';
}

  if(!member || !mdg || !lines) return <Lodding />

  return (
    <div className={main.main_wrap}>
      <div className={main.bg}>
        <div className={main.logo_nick}>
          <figure className={main.logo}><img src='/img/main/logo.png' alt='로고 이미지'/></figure>
          <div className={main.logo_nick_wrap} onClick={()=>{ moving('/pages/member/mypage') }} >
            <div className={main.nick_txt}>
              <span>[RK.{rk}]</span>
              <div className={main.nick_wrap}>
                <figure><img src={`/img/main/icon/${member.mb_icon}.png`} alt=''/></figure>
                <span>{member.mb_nick}</span>
              </div>
              <figure><img src={`/img/main/face/${member.mb_img}.png`} alt=''/></figure>
            </div>
          </div>
        </div>
        <div className={main.search_input}>
          <div className={main.input}>
            <form className={main.input_form} onSubmit={ser}>
              <input type="text" name='search' pattern="[A-Za-z]+" className={main.inputs} placeholder='디지몬을 검색해보세요.(영문검색)' ref={input}  />
              <figure><input type="submit" className={main.fig_input} value="" /></figure>
            </form>
          </div>
        </div>
        <div className={main.random_wrap}>
          <figure className={main.random_img}><img src='/img/main/random.png' alt='랜덤 디지몬'/></figure>
          <div className={main.random_digimon_wrap}>
          <Swiper
            slidesPerView={1.5}
            spaceBetween={0}
            grabCursor={true}
            className={main.myswiper}
            breakpoints={{
              // 화면 너비가 639px 미만일 때
              630: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
              504: {
                slidesPerView: 2.9,
                spaceBetween: 20,
              },
              360: {
                slidesPerView: 2.2,
                spaceBetween: 20,
              },
            }}
          >
            {
              data && data.map((v,k)=>(
                <SwiperSlide className={`${main.swipers}`} key={k}>
                  <div className={`${main.swipers_1}  ${mdg?.some(n => n.dg_id == v.id) && main.active || main.null} `}>
                    <figure className={main.random_digimon} onClick={()=>{ moving(`/pages/dex/detail?id=${v.id}`) }}><img src={v.image} alt={v.name} onError={handleImgError} /></figure>
                  </div>
                  <div className={main.random_digimon_box_wrap}>
                    <p>{v.name.slice(0,15)}</p>
                  </div>
                </SwiperSlide>
              ))
            }
          </Swiper>
          </div>
        </div>
        <div className={main.today_wrap}>
          <figure className={main.today_img}><img src='/img/main/today.png' alt='오늘의 한줄평'/></figure>
          <div className={main.today_text_wrap}>
              <div className={main.today_ab_left} onClick={()=>{ moving(`/pages/dex/detail?id=${rdg.id}`) }}>
                <figure>
                  <img src={rdg && rdg.images[0].href} onError={handleImgError} alt=''/>
                  <figcaption>
                    <img src='/img/main/today_wrap.png' alt=''/>
                  </figcaption>
              </figure>
              </div>
              <div className={main.todya_ab_right}>
                <div className={main.todya_ab_right1}>
                  <figure className={main.today_ab_boxs}><img src='/img/main/today_boxs.png' alt=''/></figure>
                  <figure className={main.today_ab_boxs2}><img src='/img/main/today_boxs2.png' alt=''/></figure>
                  <p>{rdg && rdg.name.slice(0,10)}</p>
                </div>
                {
                  lines.length <= 0 ?
                  <div className={main.todya_ab_right2}> 
                  <figure className={main.todya_ab_right2_box}><img src='/img/main/today_box.png' alt=''/></figure>
                  <div className={main.todya_ab_right2_txt}>
                        <span>작성된 한줄평이 없습니다.</span>
                        <span onClick={()=>{ moving(`/pages/dex/detail?id=${rdg.id}`) }}>한줄평 작성하기 ▶</span>
                      </div>
                  </div>                  
                  :
                  lines.slice(0,2).map(v=>(
                    <div className={main.todya_ab_right2} key={v.num}>
                      <figure className={main.todya_ab_right2_box}><img src='/img/main/today_box.png' alt=''/></figure>
                      <div className={main.todya_ab_right2_txt}>
                        <span>{v.content}</span>
                        <figure><img src={`/img/main/icon/${v.wr_icon}.png`} alt=''/></figure>
                        <span>{v.wr_nick}</span>
                      </div>
                    </div>
                  ))
                }
                <p className={main.p2} onClick={()=>{ moving(`/pages/dex/detail?id=${rdg.id}`) }}>오늘의 한줄평 더보기 ▶</p>
              </div>
          </div>
        </div>
        <div className={main.today_dm_wrap}>
          <div className={main.today_dm_imgs}>
            <figure className={main.today_dm_img}><img src='/img/main/today_dm.png' alt=''/></figure>
            <figure className={main.today_dm_img2} onClick={()=>{ moving('/pages/borad/list') }}><img src='/img/main/quiz_plus.png' alt=''/></figure>
          </div>
          <div className={main.today_dm}>
            <Swiper
              slidesPerView={1}
              spaceBetween={0}
              grabCursor={true}
              className={main.myswiper2}
              breakpoints={{
                // 화면 너비가 639px 미만일 때
                630: {
                  slidesPerView: 2.2,
                  spaceBetween: 20,
                },
                504: {
                  slidesPerView: 1.8,
                  spaceBetween: 20,
                },
                360: {
                  slidesPerView: 1.4,
                  spaceBetween: 20,
                },
              }}
            >
              {
                ddata.slice(0,10).map((v,k)=>(
                  <SwiperSlide className={main.swipers_2} key={v.num} onClick={()=>{ moving(`/pages/borad/view?id=${v.num}`) }}>
                    <div className={main.today_dms_wrap}>
                      <figure className={main.today_dms}><img src={v.path} alt=''/></figure>
                    </div>
                    <div className={main.today_dm_info_wrap}>
                      <div className={main.today_dm_info}>
                        <figure className={main.today_dm_face}><img src={`/img/main/face/${v.wr_icon}.png`} alt=''/></figure>
                        <div className={main.today_dm_infos}>
                          <figure className={main.today_dm_info_icon}><img src={`/img/main/icon/${v.wr_img}.png`} alt=''/></figure>
                          <span>{v.title}</span>
                        </div>
                        <p>님의 D.M</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
        </div>
        <div className={main.alert_modal} onChange={() => openAlert()}>
          {isAlertOpen && (
            <form className= {main.alert_warning}>
            <img src='/img/member/join/modal.png' alt=''/>
            <div className={main.alert_text}>
            <p>{altext}</p>
            <input type='image' src='/img/member/mypage/ok.png' className = {main.alert_btn}  onClick={() => alertClose()}/>
            </div>
          </form>
          )}
          </div>
        </div>
      <Footer />
    </div>
  )
}
