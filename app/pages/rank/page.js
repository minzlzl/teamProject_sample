"use client"
import { useRouter } from 'next/navigation';
import rank from './rank.module.scss'
import Footer from '@/app/comp/Footer';
import {user_get} from '../../comp/member/Login'
import { useEffect, useState } from 'react';

export default function page() {
  const nav = useRouter();
  const [member,setMember] = useState();
  const [rk,setRk] = useState();
  async function fetchData() {
      const mb = await user_get()
      setRk(mb.rk.data)
      setMember(mb.data);
  }

  const moving = (link)=>{
    nav.push(link)
  }

  useEffect( ()=>{
    fetchData()
  },[]);

  if(!member) return <></>
  
  return (
    <div className={rank.rank_wrap}>
      <div className={rank.bg}>
        <div className={rank.logo_nick}>
          <figure className={rank.logo}><img src='/img/main/logo.png' alt='로고 이미지'/></figure>
          <div className={rank.logo_nick_wrap} onClick={()=>{ moving('/pages/member/mypage') }} >
            <div className={rank.nick_txt}>
              <span>RK.{rk}</span>
              <div className={rank.nick_wrap}>
                <figure><img src={`/img/main/icon/${member.mb_icon}.png`} alt=''/></figure>
                <span>{member.mb_nick}</span>
              </div>
              <figure><img src={`/img/main/face/${member.mb_img}.png`} alt=''/></figure>
            </div>
          </div>
        </div>
        <div className={rank.best_wrap}>
          <figure><img src='/img/rank/best_player.png' alt='베스트 디지몬 플레이어'/></figure>
          <div className={rank.best}>
            <ul>
              <li>
                <p>[RK.2]</p>
                <div className={rank.best_bg2}>
                  <figure><img src='/img/rank/face/2.png' alt=''/></figure>
                </div>
                <div className={rank.best_txt2}>
                  <figure><img src='/img/rank/icon/2.png' alt=''/></figure>
                  <p>아아중독</p>
                </div>
              </li>
              <li>
                <p>[RK.1]</p>
                <div className={rank.best_bg1}>
                  <figure><img src='/img/rank/face/1.png' alt=''/></figure>
                </div>
                <div className={rank.best_txt1}>
                  <figure><img src='/img/rank/icon/1.png' alt=''/></figure>
                  <p>바닐라라떼</p>
                </div>
              </li>
              <li>
                <p>[RK.3]</p>
                <div className={rank.best_bg3}>
                  <figure><img src='/img/rank/face/3.png' alt=''/></figure>
                </div>
                <div className={rank.best_txt2}>
                  <figure><img src='/img/rank/icon/3.png' alt=''/></figure>
                  <p>디지몬다내꺼</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className={rank.list_wrap}>
          <ul>
            <li>
              <p>[RK.1]</p>
              <div className={rank.list_name}>
                <figure><img src='/img/rank/icon/1.png' alt=''/></figure>
                <p>바닐라라떼</p>
              </div>
              <figure><img src='/img/rank/face/1.png' alt=''/></figure>
            </li>
            <li>
              <p>[RK.1]</p>
              <div className={rank.list_name}>
                <figure><img src='/img/rank/icon/1.png' alt=''/></figure>
                <p>바닐라라떼</p>
              </div>
              <figure><img src='/img/rank/face/1.png' alt=''/></figure>
            </li>
            <li>
              <p>[RK.1]</p>
              <div className={rank.list_name}>
                <figure><img src='/img/rank/icon/1.png' alt=''/></figure>
                <p>바닐라라떼</p>
              </div>
              <figure><img src='/img/rank/face/1.png' alt=''/></figure>
            </li>
            <li>
              <p>[RK.1]</p>
              <div className={rank.list_name}>
                <figure><img src='/img/rank/icon/1.png' alt=''/></figure>
                <p>바닐라라떼</p>
              </div>
              <figure><img src='/img/rank/face/1.png' alt=''/></figure>
            </li>
            <li>
              <p>[RK.1]</p>
              <div className={rank.list_name}>
                <figure><img src='/img/rank/icon/1.png' alt=''/></figure>
                <p>바닐라라떼</p>
              </div>
              <figure><img src='/img/rank/face/1.png' alt=''/></figure>
            </li>
            <li>
              <p>[RK.1]</p>
              <div className={rank.list_name}>
                <figure><img src='/img/rank/icon/1.png' alt=''/></figure>
                <p>바닐라라떼</p>
              </div>
              <figure><img src='/img/rank/face/1.png' alt=''/></figure>
            </li>
            <li>
              <p>[RK.1]</p>
              <div className={rank.list_name}>
                <figure><img src='/img/rank/icon/1.png' alt=''/></figure>
                <p>바닐라라떼</p>
              </div>
              <figure><img src='/img/rank/face/1.png' alt=''/></figure>
            </li>
            <li>
              <p>[RK.1]</p>
              <div className={rank.list_name}>
                <figure><img src='/img/rank/icon/1.png' alt=''/></figure>
                <p>바닐라라떼</p>
              </div>
              <figure><img src='/img/rank/face/1.png' alt=''/></figure>
            </li>
            <li>
              <p>[RK.1]</p>
              <div className={rank.list_name}>
                <figure><img src='/img/rank/icon/1.png' alt=''/></figure>
                <p>바닐라라떼</p>
              </div>
              <figure><img src='/img/rank/face/1.png' alt=''/></figure>
            </li>
          </ul>
        </div>
      </div>
      <Footer/>
    </div>
  )
}
