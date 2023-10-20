"use client"
import React, { useEffect, useState } from 'react'
import de from './detail.module.scss'
import { Modal, Modal2 } from '../../../comp/dex/detail/Modal'
import Footer from '@/app/comp/Footer'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import Link from 'next/link'
import { user_get } from '../../../comp/member/Login'
import { useRouter } from 'next/navigation'
import Lodding from '@/app/comp/Lodding'

export default function page() {
  // 모달 버튼 클릭 유무를 저장할 state
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [DescriptionInModal, setDescriptionInModal] = useState('')
  const [DescriptionInModal2, setDescriptionInModal2] = useState('')
  const [data, setData] = useState();
  const [reviewText, setReviewText] = useState([])
  const params = useSearchParams();
  const idParam = params.get('id');
  const [member, setMember] = useState();
  const [rk, setRk] = useState();
  const [likecnt, setLikecnt] = useState();
  const [dg, setDg] = useState();
  const [btnname, setBtnname] = useState('포획하기');
  const [likes, setLikes] = useState('like_1');

  //alert창
  const [altext, setAltext] = useState();
  const [isAlertOpen, setIsAlertOpen] = useState(false);



  const nav = useRouter();
  async function fetchData() {
    const mb = await user_get()
    setRk(mb.rk.data)
    setMember(mb.data);
  }
  async function line() {
    const line = await axios.get(`/api/line?dg_id=${idParam}`);
    setReviewText(line.data)
  }
  async function dglike() {
    const lik = await axios.get(`/api/dex/detail/like?num=${idParam}`)
    setLikecnt(lik.data)
    mylike()
  }

  async function mylike() {
    let mb_id = sessionStorage.getItem('loginstate');
    const mk = await axios.get(`/api/dex/detail/mylike?num=${idParam}&mb_id=${mb_id}`)
    if(mk.data > 0) {
      setLikes('like_2')
    }else{
      setLikes('like_1')
    }
  }

  useEffect(() => {
    fetchData()
    dglike();
    dgch();
    line();
    setBtnname('포획하기')
    setLikes('like_1')
    mylike() 
  }, [idParam]);

  // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
  const clickModal = (des) => {
    setShowModal(!showModal);
    setDescriptionInModal(des);
    window.scrollTo({ top: 0, behavior: "auto" });
    const body = document.querySelector('body');
    if (!showModal) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }

  const clickModal2 = (des2) => {
    setShowModal2(!showModal2);
    setDescriptionInModal2(des2)
    window.scrollTo({ top: 0, behavior: "auto" });
    const body = document.querySelector('body');
    if (!showModal2) {
      body.style.overflow = "hidden"; // 스타일 속성을 수정
    } else {
      body.style.overflow = "auto"; // 스타일 속성을 수정
    }
  }

  //alert창 열고 닫기
  const alertOpen = (text) =>{
    setAltext(text)
    setIsAlertOpen(true);    
  };

  const alertClose = () =>{
    setIsAlertOpen(false);
    if(altext == "변경완료" || altext == '닉네임 변경 완료'){
      location.reload();
    }
  };


  const data_input = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    if (title == '') {
      alertOpen("한줄평을 작성하세요");
      return false;
    }
    const date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();
    let fulldate = `${y}.${m}.${d}`;
    const send = { title, fulldate, id: member.mb_id, idParam, icon: member.mb_icon, nick: member.mb_nick }
    await axios.post('/api/line', send);
    line()
    //setReviewText([...reviewText, value.search]);
  }

  const like = async () => {
    const dd = { idParam, id: member.mb_id }
    await axios.post(`/api/dex/detail/like`, dd)
    dglike()
  }


  async function dgch() {
    const mb_id = sessionStorage.getItem('loginstate');
    const ch = await axios.get(`/api/dex/detail/catch?dg_id=${idParam}&mb_id=${mb_id}`)
    setDg(ch.data);
    if (ch.data == true) {
      setBtnname('포획완료')
    }
  }

  const detailData = function () {
    axios.get(`/api/dex/detail?num=${idParam}`)
      .then(res => {
        setData(res.data);
      })
  }

  useEffect(() => {
    if (!idParam) {
      history.back();
    } else {
      detailData()
    }
  }, [idParam])

  const moving = (link) => {
    nav.push(link)
  }

  const handleImgError = (e) => {
    e.target.src = 'https://digimon-api.com/images/digimon/w/Earthdramon.png';
  }

  const performAction = async () => {
    if (dg === false) {
      let isSuccess = Math.floor(Math.random() * 100)
      if (isSuccess <= 20) {
        const send = { idParam, id: member.mb_id }
        await axios.post(`/api/dex/detail/catch`, send)
        setDg(true)
        alertOpen('나이스! 포획성공!');
        dgch()
      } else {
        alertOpen('디지몬이 도망갔습니다.');
      }
    } else {
      alertOpen('이미 잡은 디지몬입니다.');
    }
  };

  if (!data || !member) return <Lodding />
  return (
    <section className={de.detail} key={data.id}>
      {showModal && <Modal clickModal={clickModal} DescriptionInModal={DescriptionInModal} />}
      {showModal2 && <Modal2 clickModal2={clickModal2} DescriptionInModal2={DescriptionInModal2} />}
      <div className={de.detail_page}>
        <div className={de.user_info}>
          <p><img src={'/img/detail/logo.png'} /></p>
          <div className={de.info_box} onClick={() => { moving('/pages/member/mypage') }}>
            <div className={de.inner_box} >
              <span>[Rk.{rk}]</span>
              <div>
                <img src={`/img/main/icon/${member.mb_icon}.png`} alt='' />
                <p>{member.mb_nick}</p>
              </div>
            </div>
            <div className={de.user_profile}>
              <p ><img src={`/img/main/face/${member.mb_img}.png`} alt='' /></p>
            </div>
          </div>
        </div>
        <div className={de.dg_info}>
          <h3>{data.name}</h3>
          <div className={de.dg_box}>
            <div className={de.dg_data}>
              <div className={de.left_data}>
                <p className={de.like} onClick={like} >
                  <img src={'/img/detail/like_box.png'} />
                  <img src={`/img/detail/${likes}.png`} className={de.likes} />
                  <span>{likecnt}</span>
                </p>
                <div className={de.dg_img}>
                  <p className={de.dg_img_1}>
                    <img src={'/img/detail/dg_img_1.png'} />
                  </p>
                  <p className={de.sample}>
                    <img src={data.images[0].href} onError={handleImgError} alt='' />
                  </p>
                  <p className={de.dg_img_2}>
                    <img src={'/img/detail/dg_img_2.png'} />
                  </p>
                </div>
              </div>
              <ul className={de.right_data}>
                <li>
                  <p>LEVEL</p>
                  <div>
                    {
                      data.levels.map((level, key_1) => (
                        <span key={key_1}>{
                          level.level == 'Baby I' ? '유아기'
                            : level.level == 'Baby II' ? '유년기'
                              : level.level == 'Child' ? '성장기'
                                : level.level == 'Adult' ? '성숙기'
                                  : level.level == 'Perfect' ? '완전체'
                                    : level.level == 'Ultimate' ? '궁극체'
                                      : level.level == 'Super Ultimate' ? '초 궁극체'
                                        : level.level == 'Armor' ? '아머체'
                                          : level.level == 'Hybrid' ? '하이브리드'
                                            : level.level
                        }</span>
                      ))
                    }
                  </div>
                </li>
                <li>
                  <p>TYPE</p>
                  <div>
                    {
                      data.types.length === 0
                        ? <span>none</span>
                        : data.types.map((type, key_2) => (
                          <span key={key_2}>{type.type}</span>
                        ))
                    }
                  </div>
                </li>
                <li>
                  <p>X-Antibody</p>
                  <div>
                    <span>{data.xAntibody === true ? 'true' : data.xAntibody ? data.xAntibody : 'none'}</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className={de.description} onClick={() => clickModal(data)}>
              <p className={de.description_txt}>
                {data.descriptions.find(description => description.language === 'en_us')?.description || 'The data is not available.'}
              </p>
              <div className={de.description_more}>
                <p><img src={'/img/detail/more.png'} /></p>
              </div>
            </div>
          </div>
          <div className={de.get_btn}>
            <p onClick={() => performAction(data)}>{btnname}</p>
          </div>
        </div>
        <div className={de.skill_more}>
          <p onClick={() => clickModal2(data)}>스킬 더보기</p>
        </div>
        <div className={de.skill_info}>
          <div className={de.skill}>
            <div className={de.skill_gif}>
              <p><img src={'/img/detail/digivice.gif'} /></p>
              <span>SKILLS</span>
            </div>
            <div className={de.skill_txt}>
              {
                data.skills.length === 0
                  ? <p>No data</p>
                  : data.skills.slice(0, 4).map((skill, key_3) => (
                    <p key={key_3}>{skill.skill}</p>
                  ))
              }
            </div>
          </div>
        </div>
        <div className={de.skill_info_mobile}>
          <div className={de.skill_deco}>
            <div className={de.title}>
              <div className={de.digivice_m}>
                <img src={'/img/detail/digivice.gif'} />
              </div>
              <p>SKILLS</p>
            </div>
          </div>
          <div className={de.skill_txt_m}>
            <ul>
              {
                data.skills.length === 0
                  ? <li className={de.no_data_m}><p>No data</p></li>
                  : data.skills.slice(0, 4).map((skill, key_3) => (
                    <li key={key_3} className={de.skill_data_m}>
                      <span>{skill.skill}</span>
                    </li>
                  ))
              }
            </ul>
          </div>
        </div>
        <div className={de.dg_review}>
          <h3>유저 한줄 평</h3>
          <ul>
            {
              reviewText.length <= 0 ? <li className={de.no_review_list}><p> 작성 된 한줄평이 없습니다. </p></li>
                :
                reviewText.map((item, key) => (
                  <li className={de.review_list} key={item.num}>
                    <div>
                      <p className={de.review_text}>{item.content}</p>
                      <div>
                        <div className={de.user_text}>
                          <img src={`/img/main/icon/${item.wr_icon}.png`} />
                          <p>{item.wr_nick}</p>
                        </div>
                        <span>[{item.wr_date}]</span>
                      </div>
                    </div>
                  </li>
                ))
            }
          </ul>
        </div>
        <div className={de.search_area}>
          <form onSubmit={data_input}>
            <label htmlFor="search_box">
              <input id='search_box' type='text' name="title" maxLength='15' placeholder='한줄평을 입력하세요.' />
            </label>
            <label htmlFor="submit_btn">
              <input id='submit_btn' type='submit' name="save" value='입력' />
            </label>
          </form>
        </div>
        <div className={de.Evolution_process}>
          <div className={de.prev}>
            <div>
              <img src={'/img/detail/Evolution_process.png'} />
              <span>이전진화</span>
            </div>
            <Swiper
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
              breakpoints={{
                320: {
                  slidesPerView: 1.5,
                  spaceBetween: 0,
                },
                380: {
                  slidesPerView: 2.5,
                  spaceBetween: 5,
                },
                530: {
                  slidesPerView: 3.5,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 3.5,
                  spaceBetween: 25,
                },
              }}>
              {
                data.priorEvolutions.length === 0
                  ? <div className={de.no_data}>No data</div>
                  : data.priorEvolutions.map((priorEvolutions, key_5) => (
                    <SwiperSlide key={key_5}>
                      <div className={de.list_box}>
                        <Link href={{
                          pathname: '../dex/detail',
                          query: {
                            id: !priorEvolutions.id ? idParam : priorEvolutions.id,
                          }
                        }} className={de.Evolution_list} >
                          {priorEvolutions.id == priorEvolutions.id ? (
                            <div className={de.Evolution_data}>
                              <div className={de.picture}>
                                <div className={de.digimon}>
                                  <img src={priorEvolutions.image} onError={handleImgError} className={de.digi_picture} />
                                  <p>
                                    <img src={'/img/detail/overview.png'} className={de.mask} />
                                  </p>
                                </div>
                              </div>
                              <div className={de.digi_name}>
                                <span>{priorEvolutions.digimon}</span>
                              </div>
                            </div>
                          ) : (alertOpen('데이터없음'))}
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))
              }
            </Swiper>
          </div>
          <div className={de.next}>
            <div>
              <img src={'/img/detail/Evolution_process.png'} />
              <span>다음진화</span>
            </div>
            <Swiper
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
              breakpoints={{
                320: {
                  slidesPerView: 1.5,
                  spaceBetween: 0,
                },
                380: {
                  slidesPerView: 2.5,
                  spaceBetween: 5,
                },
                530: {
                  slidesPerView: 3.5,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 3.5,
                  spaceBetween: 25,
                },
              }}>
              {
                data.nextEvolutions.length === 0
                  ? <div className={de.no_data}>No data</div>
                  : data.nextEvolutions.map((nextEvolutions, key_6) => (
                    <SwiperSlide key={key_6}>
                      <div className={de.list_box}>
                        <Link href={{
                          pathname: '../dex/detail',
                          query: {
                            id: nextEvolutions.id,
                          }
                        }} className={de.Evolution_list}>
                          <div className={de.Evolution_data}>
                            <div className={de.picture}>
                              <img src={'/img/detail/digi_box.png'} />
                              <div className={de.digimon}>
                                <img src={nextEvolutions.image} onError={handleImgError} className={de.digi_picture} />
                                <p>
                                  <img src={'/img/detail/overview.png'} className={de.mask} />
                                </p>
                              </div>
                            </div>
                            <div className={de.digi_name}>
                              <img src={'/img/detail/name_box.png'} />
                              <span>{nextEvolutions.digimon}</span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))
              }
            </Swiper>
          </div>
        </div>
      </div>
      <div className={de.alert_modal} onChange={() => openAlert()}>
        {isAlertOpen && (
          <form className= {de.alert_warning}>
          <img src='/img/member/join/modal.png' alt=''/>
          <div className={de.alert_text}>
          <p>{altext}</p>
          <input type='image' src='/img/member/mypage/ok.png' className = {de.alert_btn}  onClick={() => alertClose()}/>
          </div>
        </form>
        )}
        </div>

      < Footer />
    </section >
  )
}
