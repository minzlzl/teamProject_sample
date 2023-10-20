"use client"
import style from './page.module.scss'
import React, { useEffect, useRef, useState } from 'react'
import krDigimonData from '../../borad/digimondata.json'
import axios from 'axios';
import {user_get} from '../../../comp/member/Login'
import Footer from '@/app/comp/Footer';
import Lodding from '@/app/comp/Lodding';
import { useRouter } from 'next/navigation';

export default function page() {
  // ~~~~기본값 지정~~~~
  let [lineSize,setLineSize] = useState(1);
  let [undoArray, setUndoArray] = useState([]);


  /* 회원정보 */
  let [dataURL, setDataURL] = useState();
  const [data,setData]=useState();
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

  //캔버스 함수
  useEffect(() => {
    if(member){
      const id = canvasRef.current;
      let ctx = id.getContext('2d');
      let cSize = {w:id.clientWidth, h:id.clientHeight};
        // ~~~~그림 그리기~~~~
        let status = false;
        //클릭 시작
        canvasId.onmousedown = function(){
            status = true;
            ctx.beginPath();
        }

        canvasId.ontouchstart = function(){
          status = true;
          ctx.beginPath();
      }


        //클릭 끝 
        canvasId.onmouseup =function(){
          status = false;
            saveSnapshot();
        }

        canvasId.ontouchend =function(){
          status = false;
            saveSnapshot();
        }


        canvasId.onmousemove = drawMove;
        canvasId.ontouchmove = drawMove2;
  
        //그림그리는 함수
        function drawMove(e){
          if(status===true){
              ctx.lineWidth = lineSize;
              ctx.strokeStyle = lineColor;
              ctx.lineTo(e.offsetX,e.offsetY);
              ctx.stroke();
          }
        }

        function drawMove2(e){
          e.preventDefault();
          if(status===true){
            var rect = canvasId.getBoundingClientRect();
            var x = e.touches[0].clientX - rect.left;
            var y = e.touches[0].clientY - rect.top;
      
            ctx.lineWidth = lineSize;
            ctx.strokeStyle = lineColor;
            ctx.lineTo(x, y);
            ctx.stroke();
          }
        }
      //~~~~~~~~~색상 변경~~~~~~~~~
      let lineColor = colorId.value;
      colorId.onchange = function (){
        lineColor = this.value;
      }
      //~~~~~~~~~선 두께 변경~~~~~~~~~
      lineSizeId.onchange = function (){
        setLineSize(this.value);   
      }
      //~~~~~~~~~지우기 버튼~~~~~~~~~
      eraseId.onclick =  eraseCanvas;
  
      function eraseCanvas() {
        ctx.clearRect(0, 0, cSize.w, cSize.h);
      }
      //~~~~~~~~~되돌리기 버튼~~~~~~~~~
      undoId.onclick = onClickUndo;
      
      function onClickUndo() {
        if (undoArray.length> 0) {
          restoreSnapshot();
        }else{}
      }
  
      function saveSnapshot() {
        const canvas = canvasRef.current;
        setUndoArray([...undoArray,canvas.toDataURL()])
      }
  
      function restoreSnapshot() {
          const nonStateArray = [...undoArray];
          nonStateArray.pop();
          setUndoArray(nonStateArray)

          let prevImg = new Image();
          prevImg.src = undoArray[undoArray.length - 2];
          
          prevImg.onload = function () {
            ctx.clearRect(0, 0, cSize.w, cSize.h);
            ctx.drawImage(prevImg, 0, 0, cSize.w, cSize.h);
          };
      }

      if(undoArray.length == 0){
        saveSnapshot();
      }
    }
    

  },[lineSize,undoArray,member])


  //~~~~~저장버튼~~~~~~
  const wantSave = function(e){
    
    if(selectedDigimon){
      const dataURL = canvasId.toDataURL();

      //회원/캐치마인드 정보 보내기=>userData
      setDataURL(dataURL);
      const mb_id = member.mb_id;
      const nickName = member.mb_nick;
      const mb_icon = member.mb_icon;
      const mb_img = member.mb_img;

      const date = new Date();
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const toDay = `${y}.${m}.${d}`;

      let userData = {mb_id,SDid,nickName,selectedDigimon,dataURL,toDay,mb_icon,mb_img}
      axios.post('/api/borad/write',userData);

      //저장 클릭후 로딩창 띄우기
      goNextPage();
  }else{}

  }

  //~~~~~~~~~두께 슬라이더 토글~~~~~~~~~
  const [sliderOn, setSliderOn] = useState(false);
  const toggleSlider = () => {
    setSliderOn(!sliderOn);
  };

  //~~~~~~~~~캔버스 크기 조절~~~~~~~~~
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


  //~~~~~~~~~~~~선택창 열고닫기~~~~~~~~~~~~
  const [isSelectDigimonOpen, setIsSelectDigimonOpen] = useState(false);
    
  const openSelectDigimon = () => {
    setIsSelectDigimonOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // 팝업 바깥 클릭시 창닫기
  const closeSelectDigimon = (e) => {
    if (e.target.id === 'selectDigimon') {
      setIsSelectDigimonOpen(false);
      document.body.style.overflow = 'auto';
    }
  };

  //디지몬 json 배열로 변경
  const krDigimon = krDigimonData.content;

  // json배열 섞기
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// JSON 데이터를 복제한 후 섞기
const RandomkrDigimon = [...krDigimon]; 
shuffleArray(RandomkrDigimon ); 

  //디지몬 검색
  const [searchByName, setSearchByName] = useState(''); 
  const [searchResult, setSearchResult] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [ifNoDigimon, setIfNoDigimon] = useState(false);

  const letsSearch = () => {
    const result = krDigimon.filter(digimon => digimon.name.includes(searchByName));
    setSearchResult(result);
    setShowAll(false);
    setIfNoDigimon(result.length === 0);
  };
  
  const searchKeyPress = (e) => {
      e.preventDefault(); 
      setSearchByName(e.target.value)
  };

  useEffect(()=>{
    letsSearch();
  },[searchByName])

  //클릭한 디지몬 저장
  const [selectedDigimon, setSelectedDigimon] = useState('');
  const [SDid, setSDid] = useState('');

  const selectFinish = function(digimon){
    setSelectedDigimon(digimon.name);
    setSDid(digimon.id);
    setIsSelectDigimonOpen(false);
    document.body.style.overflow = 'auto';
  }

  //제출 후 다음페이지로 로딩
  const [nextPageOpen, setNextPageOpen] = useState(false);
  const nav = useRouter();

  const goNextPage = async () => {
    setNextPageOpen(true);
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      document.body.style.overflow = 'auto';
      moving('/pages/borad/list')
    }, 3000);
  };
  const moving = (link)=>{
      nav.push(link)
    }

  if(!member || !canvasRef) return <Lodding />
  return (
    <article className={style.board_write}>
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
        <div className={style.selectTab} onClick={openSelectDigimon}>
          <img className={style.selectDeco} src='/img/board/write/selectDigimon.png'/>
          <h2>디지몬 선택</h2>
        </div>
      </section>

      <section className={style.drawing}>
        <div className={style.canvasWrapper}>
          <img className={style.canvasDeco} src='/img/board/write/canvas_deco.png'/>
          <canvas id="canvasId" ref={canvasRef} width={canvasWidth}></canvas>
        </div>
        <div className={style.selectedWrap}>
          <figure className={style.SDigimonName}>
            <img className={style.SNamePlate} src='/img/board/write/SNamePlate.png'/>
            <figcaption className={style.SNameSlot}>{selectedDigimon}</figcaption>
          </figure>
        </div>
      </section>

      <section className={style.drawTool}>
        
        <div className={style.toolboxDeco}>
          <img src='/img/board/write/drawTab.png'/>
          <div className={style.toolbox}>
            <input type='color'id="colorId"/>
            <figure className={style.lineWeight} onClick={toggleSlider}>
              <img src='/img/board/write/lineWeight_icon.png'/>
              <div className={ sliderOn ? style.verticalRange : style.verticalRangeOff}>
                <input 
                  type='range'id="lineSizeId" 
                  min="1" max="15" value={lineSize}  
                  onChange={(e)=>{setLineSize(e.target.value)}}  
                  step="1" orient="vertical
                "/>
              </div>
              <figcaption>굵기</figcaption>
            </figure>
            <figure id='undoId' className={style.undo}>
              <img className={style.undoIcon} src='/img/board/write/undo.png'/>
              <figcaption>되돌리기</figcaption>
            </figure>
            <figure id='eraseId' className={style.erase}>
              <img src='/img/board/write/erase.png'/>
              <figcaption>지우기</figcaption>
            </figure>
          </div>
        </div>

        <div className={style.save} id="saveId" onClick={wantSave}>
          <img className={style.saveDeco} src='/img/board/write/saveBtn.png' style={selectedDigimon ? {} : { filter: 'brightness(0.7)',cursor: 'auto' }} />
        </div>
      </section>

      <Footer/>

      {/* 선택 팝업창 */}
      {isSelectDigimonOpen && (
      <section className={style.selectDigimon} id='selectDigimon' onClick={closeSelectDigimon}>
        <div className={style.selBg}>

          <div className={style.searchBg}>
            <div className={style.wrapSearch}>
              <input className={style.searchInput} type='text' 
                placeholder='디지몬을 검색해보세요'
                onChange={(e)=> searchKeyPress}
                onKeyPress={searchKeyPress}  
              />
              <div className={style.searchBtn} onClick={letsSearch}>
                <img src='/img/board/write/searchBtn.png'/>
              </div>
            </div>
          </div>

          <ul className={style.digimonList}>
            {(showAll ? RandomkrDigimon : searchResult).map((digimon) => (
              <li className={style.eachDigimon} key={digimon.id} onClick={()=>selectFinish(digimon)}>
                <div className={style.cageWhole}>
                  <img className={style.cage} src='/img/board/write/eachDigimonCage.png' />
                  <img className={style.mon} src={digimon.image} />
                </div>
                <div className={style.nameWhole}>
                  <img className={style.namePlate} src='/img/board/write/eachDigimonName.png' />
                  <p className={style.name}>{digimon.name}</p>
                </div>
              </li>
            ))}
            {ifNoDigimon && <p>검색 결과가 없습니다</p>}
          </ul>
        </div>
      </section>
      )}

      {/* 다음 페이지 로딩창 */}
      {nextPageOpen && (
        <section className={style.nextPage}>
          <img className={style.wordBubble} src='/img/board/write/savedSuccess.gif'/>
          <img className={style.threeDigimon} src='/img/board/write/whileLoading.gif'/>
        </section>
      )}
    </article>
  )
}