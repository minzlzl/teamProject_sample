"use client"
import React, { useEffect, useRef, useState } from 'react'
import style from './page.module.scss'

export default function page() {
  // ~~~~기본값 지정~~~~
  let [lineSize,setLineSize] = useState(1);
  let [undoArray, setUndoArray] = useState([]);


  //시작시 캔버스 세이브
  useEffect(()=>{
    setUndoArray([canvasId.toDataURL()]);
    setUndoArray([canvasId.toDataURL()]);
  },[])

  //캔버스 함수
  useEffect(() => {
    let ctx = canvasId.getContext('2d');
    let cSize = {w:canvasId.width, h:canvasId.height};

      // ~~~~그림 그리기~~~~
      let status = false;
      //클릭 시작
      canvasId.onmousedown = function(){
          status = true;
          ctx.beginPath();
      }
      //클릭 끝
      canvasId.onmouseup =function(){
        status = false;
          saveSnapshot();
      }
      canvasId.onmousemove = drawMove;

      //그림그리는 함수
      function drawMove(e){
        if(status===true){
            ctx.lineWidth = lineSize;
            ctx.strokeStyle = lineColor;
            ctx.lineTo(e.offsetX,e.offsetY);
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
    //~~~~~저장버튼~~~~~~
    saveId.onclick = function () {
      const dataURL = canvasId.toDataURL();
      const a = document.createElement('a');
      a.href = dataURL;
      a.download = 'canvas-image.png';
      a.click();
    }

    //~~~~~~~~~되돌리기 버튼~~~~~~~~~
    undoId.onclick = onClickUndo;
    
    function onClickUndo() {
      if (undoArray.length> 0) {
        restoreSnapshot();
      }else{}
    }

    function saveSnapshot() {
      setUndoArray([...undoArray,canvasId.toDataURL()])
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

  },[lineSize,undoArray])

  //~~~~~~~~~두께 슬라이더 토글~~~~~~~~~
  const [sliderOn, setSliderOn] = useState(false);
  const toggleSlider = () => {
    setSliderOn(!sliderOn);
  };

  //~~~~~~~~~캔버스 크기 조절~~~~~~~~~
  const canvasRef = useRef(null);
  let [canvasWidth, setCanvasWidth]= useState();

  useEffect(()=>{
    function resizeCanvas() {
      const canvas = canvasRef.current;
      const container = document.body;
      const width = container.clientWidth;

      canvas.width = width >= 600 ? 489 : width*0.7;
      setCanvasWidth(canvas.width);
      canvas.height = width >= 600 ? 429 : canvasWidth*0.877;
    }

    window.addEventListener('resize',resizeCanvas)

    resizeCanvas();
  },[canvasWidth])

  const selectDigimon = function(){
    const elSelcBtn = document.getElementsId('.selectDigimon');
    console.log('클릭');
    //스크롤 잠금
    document.body.style.overflow = 'hidden';
  }

  return (
    <article className={style.board_write}>

      <header>
        <figure className={style.logo}><img src='/img/board/write/logo.png'/></figure>
        <div className={style.profile}>
          <img className={style.pfDecoBox} src='/img/board/write/profilebox.png'/>
          <div className={style.pfInner}>
            <p>[Rk.<span>1</span>]</p>
            <figure className={style.pfNickname}>
              <img src='/img/board/write/capsule (10).png'></img>
              <figcaption>행복포기</figcaption>
            </figure>
            <div className={style.pfPictureWrap}>
              <div className={style.pfPicture}>
                <img className={style.pfPicDeco} src='/img/board/write/pfDeco.png'></img>
                <img className={style.pfPic} src='/img/board/write/pfPic01.png'></img>
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
        <div className={style.selectTab} onClick={selectDigimon}>
          <img className={style.selectDeco} src='/img/board/write/selectDigimon.png'/>
          <h2>디지몬 선택</h2>
        </div>
      </section>

      <section className={style.drawing}>
        <div className={style.canvasWrapper}>
          <img className={style.canvasDeco} src='/img/board/write/canvas_deco.png'/>
          <canvas id="canvasId" ref={canvasRef} width={canvasWidth}></canvas>
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
                  min="1" max="20" value={lineSize}  
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

        <div className={style.save} id="saveId">
          <img className={style.saveDeco} src='/img/board/write/saveBtn.png'/>
        </div>
      </section>

      <footer>
        <div className={style.footInner}>
          <img className={style.footImg} src='/img/board/write/main_icon01.png'/>
          <img className={style.footImg} src='/img/board/write/main_icon02.png'/>
          <img className={style.footImg} src='/img/board/write/main_icon03.png'/>
          <img className={style.footImg} src='/img/board/write/main_icon04.png'/>
          <img className={style.footImg} src='/img/board/write/main_icon05.png'/>
        </div>
      </footer>

      {/* 선택 팝업창 */}
      <section className={style.selectDigimon} id='selectDigimon'>
        <div className={style.selBg}>
          <form>
            <div className={style.searchBg}>
              <div className={style.wrapSearch}>
                <input className={style.searchInput} type='text' placeholder='디지몬을 검색해보세요.'/>
                <div className={style.searchBtn}>
                  <img src='/img/board/write/searchBtn.png'/>
                </div>
              </div>
            </div>
            
          </form>
          <ul className={style.digimonList}>
            <li className={style.eachDigimon}>
              <div className={style.caseWhole}>
                <img src='/img/board/write/eachDigimonCase.png'/>
                <img src='/img/board/write/testDigimon108x120.png'/>
              </div>
              <div className={style.nameWhole}>
                <img src='/img/board/write/eachDigimonName.png'/>
                <p>에인션트어쩌고몬</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

    </article>
  )
}
