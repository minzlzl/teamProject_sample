"use client"

import style from './page.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios';
import {user_get} from '../../../comp/member/Login'
import Footer from '@/app/comp/Footer';
import Lodding from '@/app/comp/Lodding';

export default function page() {
  // url에서 받아오기~~~~
  const params = useSearchParams();
  const idParam = params.get('id');

  //회원정보
  const [member,setMember] = useState();
  const [rk,setRk] = useState();

  async function fetchData() {
      const mb = await user_get()
      setRk(mb.rk.data)
      setMember(mb.data);
  }

  useEffect(()=>{
    fetchData();
    getWrdata();
    getAnsdata();
  },[])

  //url id값에서 DM데이터 뽑기
  const [data,setData] = useState();
  async function getWrdata(){
    const req = await axios.get(`/api/borad/view?id=${idParam}`)
    setData(req.data[0])
  }
  let textlength = data?.answer.split("").length

  //url id값에서 DM데이터 뽑기
  const [ansData,setAnsData] = useState();
  async function getAnsdata(){
    const req = await axios.get(`/api/borad/view/wrong?id=${idParam}`)
    setAnsData(req.data)
  }
  //~~~~~~~~~캐치마인드 크기 조절~~~~~~~~~
  const canvasRef = useRef(null);
  let [canvasWidth, setCanvasWidth]= useState();

  function resizeCanvas() {
    const canvas = canvasRef.current;
    if(canvas != null){
      const container = document.body;
      const width = container.clientWidth;
      canvas.width = width >= 600 ? 489 : width*0.7;
      canvas.height = width >= 639 ? 429 : canvasWidth*0.877;
      setCanvasWidth(canvas.clientWidth);

    }
  }
  useEffect(()=>{
      window.addEventListener('resize',resizeCanvas)
      resizeCanvas();
  },[canvasWidth,member])

  //답 입력
  const [answerInput, setAnswerInput] = useState(''); 
  
  const inputKeyPress =(e) =>{
    if (e.key === 'Enter'){
      e.preventDefault(); 
      answerCompare();
    }
  };

  //답 비교
  const answerCompare = () => {

    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const toDay = `${y}.${m}.${d}`;

    const send = {
      bo_id:idParam,
      wr_id:member.mb_id,
      wr_icon:member.mb_icon,
      wr_nick:member.mb_nick,
      answer: answerInput,
      an_date: toDay
    }

    if(answerInput == data.answer){
      youOanswer();
      axios.post('/api/borad/view',send);
    }else{
      youXanswer();
      axios.post('/api/borad/view/wrong',send);
    }
  };

  //정답오답 모달창
  const [Oanswer, setOanswer] = useState(false);
  const [Xanswer, setXanswer] = useState(false);

  //정답 함수
  const youOanswer = ()=>{
    setOanswer(true);
    document.body.style.overflow = 'hidden';
    
    const myid = member.mb_id;
    const newCount = (member.mb_count)+1;
    const sendScore = {myid, newCount};
    axios.post('/api/borad/view/score',sendScore);

    setTimeout(function () {
      document.body.style.overflow = 'auto';
      setOanswer(false);
      fetchData();
      getWrdata();
      getAnsdata();
    }, 3000);
  };
  //오답 함수
  const youXanswer = ()=>{
    setXanswer(true);
    document.body.style.overflow = 'hidden';
  };
  //오답에서 예/아니오
  const youSaidYes = function(){
    setXanswer(false);
    getAnsdata()
    document.body.style.overflow = 'auto';
  }
  const youSaidNo = ()=>{
    document.body.style.overflow = 'auto';
    window.location.href = '/pages/borad/list'    
  };

  //오답리스트 박스 열기
  const [openBigWrong,setOpenBigWrong]=useState(false);
  const [openSmallWrong,setOpenSmallWrong]=useState(true);

  const toggleWrongBox = function(){
    if(openSmallWrong){
      setOpenBigWrong(true);
      setOpenSmallWrong(false);
    }else{
      setOpenBigWrong(false);
      setOpenSmallWrong(true);
    }
  }

  const nav = useRouter();
  const moving = (link)=>{
      nav.push(link)
    }



  if(!member || !data || !ansData || !canvasRef) return <Lodding />
  return (
    <article className={style.board_view}>
      <header>
        <figure className={style.logo}><img src='/img/board/write/logo.png'/></figure>
        <div className={style.profile} >
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
      </section>

      <section className={style.drawing}>
        <div className={style.canvasWrapper}>
          <img className={style.canvasDeco} src='/img/board/write/canvas_deco.png'/>
          <img className={style.canvas} id="canvasId" ref={canvasRef} width={canvasWidth} src={data.path} />
        </div>
      </section>

      <section className={style.hintTab}>
        <div className={style.hintDeco}>
          <p className={style.hint}>힌트: {textlength}글자</p>
          <img src='/img/board/write/drawTab.png'/>
        </div>

        <div className={style.answerBg}>
          {
            !data?.an_id ?  
            <div className={style.wrapAnswer}>
              {
                (member.mb_id == data.wr_id) ?
                  <input className={style.answerInput} type='text' 
                    placeholder='자신의 D.M은 풀 수 없습니다' disabled
                  />
                :
                <input className={style.answerInput} type='text' 
                  placeholder='정답을 입력하세요'
                  onChange={(e)=> setAnswerInput(e.target.value)}
                  onKeyPress={inputKeyPress}
                />
              }
              {
                (member.mb_id == data.wr_id) ?
                <></>
                :
                <div className={style.inputBtn} onClick={answerCompare}>
                  <img src='/img/board/view/inputBtn.png'/>
                </div>
              }
            </div>
          :
            <div className={style.correct}>
              <b><span>정답: </span>{data.answer}</b>
              <p className={style.winner}>
                <span>정답자: </span>
                <img src={`/img/main/icon/${data.an_icon}.png`}/>
                [{data.an_nick}]
              </p>
            </div>
          }
          </div>
      </section>
      
      <section className={style.wrongAnswers}>
        <div className={style.wrapText}>
          <b>오답리스트</b>
          <p onClick={toggleWrongBox}>
            { ansData.length > 2 && openSmallWrong && ( <img src='/img/board/view/ansListOpen.png'/> )}
            { openBigWrong && ( <img src='/img/board/view/ansListClose.png'/> )}
          </p>
        </div>
        { openSmallWrong && (
          <div className={style.wrongAnsBox}>
            <ul className={style.boxInner}>
              { 
                ansData.length > 0 && (
                  ansData.slice(0,2).map((comment)=>(
                    <li className={style.comment} key={comment.num}>
                      <img src={`/img/main/icon/${comment.wr_icon}.png`}/>
                      <span>[{comment.wr_nick}]: {comment.answer}</span>
                    </li>
                  ))
                )
              }
            </ul>
          </div>
        )
      }

      { ansData.length > 2 && openBigWrong && (
          <div className={style.bigbox}>
            <ul className={style.bigboxInner}>
              {
                ansData.map((comment)=>(
                  <li className={style.comment} key={comment.num}>
                    <img src={`/img/main/icon/${comment.wr_icon}.png`}/>
                    <span>[{comment.wr_nick}]: {comment.answer}</span>
                  </li>
                ))
              }
            </ul>
          </div>
        )
      }
      </section>

      <Footer/>

      {/* 정답일때*/}
      {Oanswer && (
        <section className={style.Oanswer}>
          <img className={style.modalBg} src='/img/board/view/OanswerBg.png'/>
          <div className={style.modalInner}>
            <div className={style.rkName}>
              <figure className={style.iconNick}>
                <img src={`/img/main/icon/${member.mb_icon}.png`}/>
                <figcaption>{member.mb_nick}</figcaption>
              </figure>
              <p>[Rk.{rk}]</p>
            </div>
            <div className={style.youGotDM}>
              <li className={style.eachDigimon}>
                <div className={style.cageWhole}>
                  <img className={style.cage} src='/img/board/list/listPack.png' />
                  <img className={style.mon} src={data.path}/>
                </div>
                
                <div className={style.nameWhole}>
                  <div className={style.nameWrap}>
                    <img className={style.namePlate} src='/img/board/list/eachListNametag.png' />
                    
                    <div className={style.nameInner}>
                      <img className={style.smallFace} src={`/img/main/face/${data.wr_img}.png`}/>
                      <div className={style.textwrap}>
                        <div className={style.iconNameLine}>
                          <img src={`/img/main/icon/${data.wr_icon}.png`}/>
                          <p className={style.name}>{data.title}</p>
                        </div>
                        <span className={style.fromWho}>님의 D.M</span>
                      </div>
                    </div>
      
                  </div>
                </div>
              </li>
              
              <div className={style.answerPlate}>
                <img className={style.plateBg} src='/img/board/view/OanswerName.png' />
                <p className={style.answerName}>{data.answer}</p>
              </div>
            </div>
            <p className={style.fire}><img src='/img/board/view/congFire.gif'/></p>
          </div>
        </section>
      )}

      {/* 오답일때*/}
      {Xanswer && (
        <section className={style.Xanswer}>
          <img className={style.modalBg} src='/img/board/view/XanswerBg.png'/>
          <div className={style.askRetry}>
            <p className={style.askText}>PLAY AGAIN?</p>
            <div className={style.yesOrNo}>
              <img className={style.askBtn} onClick={ youSaidYes } src='/img/board/view/XanswerYes.png'/>
              <img className={style.askBtn} onClick={ youSaidNo } src='/img/board/view/XanswerNo.png'/>
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
