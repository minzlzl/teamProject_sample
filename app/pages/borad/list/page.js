"use client"
import style from './page.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import {user_get} from '../../../comp/member/Login'
import Footer from '@/app/comp/Footer';
import LoginCheck from '@/app/comp/LoginCheck';

export default function page() {  
  const [member,setMember] = useState();
  const [rk,setRk] = useState();
  async function fetchData() {
      const mb = await user_get()
      setRk(mb.rk.data)
      setMember(mb.data);
  }
    
  useEffect(()=>{
    fetchData();
  },[])

  //get으로 db정보 가져오기
  const [data,setData] = useState([]);
  const getFile = async function(){
    const dbData = await axios.get('/api/borad/list');
    setData(dbData.data);
    console.log(dbData.data);
  }
  useEffect(()=>{
    getFile();
  },[])

  if(!member) return <></>
  return (
    <article className={style.board_list}>
      {/* <LoginCheck />  */}
      <header>
        <figure className={style.logo}><img src='/img/board/write/logo.png'/></figure>
        <div className={style.profile}>
          <img className={style.pfDecoBox} src='/img/board/write/profilebox.png'/>
          <div className={style.pfInner}>
            <p>[Rk.{rk}]</p>
            <figure className={style.pfNickname}>
              <img src={`/img/main/icon/${member.mb_icon}.png`}/>
              <figcaption>{member.mb_nick}</figcaption>
            </figure>
            <div className={style.pfPictureWrap}>
              <div className={style.pfPicture}>
                <img className={style.pfPicDeco} src='/img/board/write/pfDeco.png'/>
                <img className={style.pfPic} src={`/img/main/face/${member.mb_img}.png`}/>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className={style.title}>
        <div className={style.titleTab}>
          <img className={style.titleDeco} src='/img/board/write/mainDMtab.png'/>
          <h1>DIGIMON MIND (D.M)</h1>
        </div>
      </section>

      <section className={style.DMList}>
        <ul className={style.digimonList}>
          {
            data.map((digimon)=>(
              <li className={style.eachDigimon} key={digimon.num}>
                <div className={style.cageWhole}>
                  <img className={style.cage} src='/img/board/list/listPack.png' />
                  <img className={style.mon} src={digimon.path}/>
                </div>

                <div className={style.nameWhole}>
                  <img className={style.namePlate} src='/img/board/list/eachListNametag.png' />
                  <div className={style.nameInner}>
                    <img className={style.smallFace} src={`/img/main/face/${member.mb_img}.png`}/>
                    <div className={style.iconNameLine}>
                      <img src={`/img/main/icon/${member.mb_icon}.png`}/>
                      <p className={style.name}>{digimon.title}</p>
                    </div>
                    <span className={style.fromWho}>님의 D.M</span>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
      

      

      <Footer/>
    </article>
  )
}
