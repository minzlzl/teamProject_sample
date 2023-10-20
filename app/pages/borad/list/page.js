"use client"
import style from './page.module.scss'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {user_get} from '../../../comp/member/Login'
import Link from 'next/link';
import Footer from '@/app/comp/Footer';
import Lodding from '@/app/comp/Lodding';
import { useRouter } from 'next/navigation';


export default function page() {  
  //회원정보
  const [member,setMember] = useState();
  const [rk,setRk] = useState();
  //get으로 DB정보 가져오기
  const [data,setData] = useState();
  async function fetchData() {
      const mb = await user_get()
      setRk(mb.rk.data)
      setMember(mb.data);
      const dbData = await axios.post(`/api/borad/list`);
      setData(dbData.data);
  }


  useEffect(()=>{
    fetchData();
  },[])

  //li 10개로 제한, 더보기버튼
  const initItemShow = 10;
  const itemsPerLoad = 10;

  const [itemsToShow, setItemsToShow] = useState(initItemShow);

  const loadMoreDM = () => {
    setItemsToShow(itemsToShow + itemsPerLoad);
  };
  const nav = useRouter();
  const moving = (link)=>{
      nav.push(link)
    }

  if(!member || !data){ return <Lodding />}
  return (
    <article className={style.board_list}>
      <header>
        <figure className={style.logo}><img src='/img/board/write/logo.png'/></figure>
        <div className={style.profile}>
          <img className={style.pfDecoBox} src='/img/board/write/profilebox.png'/>
          <div className={style.pfInner} onClick={()=>{ moving('/pages/member/mypage') }}>
            <p>[Rk.{rk}]</p>
            <figure className={style.pfNickname}>
              <img src={`/img/main/icon/${member.mb_icon}.png`}/>
              <figcaption>{member.mb_nick}</figcaption>
            </figure>
            <div className={style.pfPictureWrap}>
              <div className={style.pfPicture}>
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
        <Link href="/pages/borad/write">
          <div className={style.newDrawTab}>
            <img className={style.newDrawDeco} src='/img/board/write/selectDigimon.png'/>
            <h2>D.M 보내기</h2>
          </div>
        </Link>
      </section>

      <section className={style.DMList}>
        <ul className={style.digimonList}>
          {
            data.slice(0, itemsToShow).map((digimon)=>(
              <li className={style.eachDigimon} key={digimon.num}>
                <Link href={{
                    pathname: '../borad/view',
                    query: { id: digimon.num }
                }}>
                  <div className={style.cageWhole}>
                    <img className={style.cage} src='/img/board/list/listPack.png' />
                    <img className={style.mon} src={digimon.path}/>
                  </div>
                
                <div className={style.nameWhole}>
                  <div className={style.nameWrap}>
                    <img className={style.namePlate} src='/img/board/list/eachListNametag.png' />
                    <div className={style.nameInner}>
                      <img className={style.smallFace} src={`/img/main/face/${digimon.wr_img}.png`}/>
                      <div className={style.textwrap}>
                        <div className={style.iconNameLine}>
                          <img src={`/img/main/icon/${digimon.wr_icon}.png`}/>
                          <p className={style.name}>{digimon.title}</p>
                        </div>
                        <span className={style.fromWho}>님의 D.M</span>
                      </div>
                    </div>
                  </div>
                </div>
                </Link>
              </li>
            ))
          }
        </ul>
        {itemsToShow < data.length && (
          <div className={style.moreBtn} onClick={loadMoreDM}>
            <img src='/img/board/list/more.png'/>
          </div>
        )}
      </section>
    
      <Footer/>
    </article>
  )
}
