"use client";
import React, { useEffect, useRef, useState } from 'react';
import li from './list.module.scss';
import axios from 'axios';
import Footer from '@/app/comp/Footer';
import Link from 'next/link';
import { user_get } from '../../../comp/member/Login'
import { useSearchParams } from 'next/navigation';
import Lodding from '@/app/comp/Lodding';
import { useRouter } from 'next/navigation';

const baseURL = 'https://www.digi-api.com/api/v1/digimon';

export default function Page() {
  const [data, setData] = useState([]); // 검색용
  const [page, setPage] = useState(10);
  const [level, setLevel] = useState(['Baby I', 'Baby II', '', '']);
  const [searchText, setSearchText] = useState('');
  const [btnClicked, setBtnClicked] = useState(false);
  const [member, setMember] = useState();
  const [rk, setRk] = useState();
  const [tt, setTt] = useState(false);
  const [mdg, setMdg] = useState();
  const params = useSearchParams();
  const btn = useRef();
  let mode = params.get('mode');
  const keyword = params.get('search');

  //alert창
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [altext, setAltext] = useState();

  async function getdigimon() {
    const mb_id = sessionStorage.getItem('loginstate');
    const gdg = await axios.get(`/api/member/mydigimon?id=${mb_id}`)
    setMdg(gdg.data);
  }


  async function fetchData() {
    const mb = await user_get()
    setRk(mb.rk.data)
    setMember(mb.data);
  }

  useEffect(() => {
    fetchData();
    getdigimon();
  }, []);


  const urls = level.map((lvl) => `${baseURL}?level=${lvl}&pageSize=1422`);

  const getContents = async () => {
    try {
      const requests = urls.map((url) => axios.get(url))
      const responses = await axios.all(requests);
      const _data = responses.reduce((acc, resp) => {
        if (resp.data.content) {
          return [...acc, ...resp.data.content];
        }
        return acc;
      }, []);
      setData(_data);
    } catch (error) {
      console.log('Error');
    }
  };
  const more = () => {
    setPage(page + 10);
  };
  const [bnum, setBnum] = useState(0);
  const setLevelByType = (levels, eq) => {
    if (mode == 'search') {
      setTt(true)
      btn.current.childNodes[0].classList.remove(li.active)
      btn.current.childNodes[1].classList.remove(li.active)
      btn.current.childNodes[2].classList.remove(li.active)
    } else {
      btn.current.childNodes[bnum].classList.remove(li.active)
      btn.current.childNodes[eq].classList.add(li.active)
    }
    setBnum(eq)
    setLevel(levels);
    setPage(10);
  };
  useEffect(() => {
    if (mode == 'search' && tt == false) {
      setSearchText(keyword)
      find();
    } else {
      getContents();
    }
  }, [level]);

  function searching(e) {
    e.preventDefault();
    if(e.target.search.value == '') {
        alertOpen('검색어를 입력해주세요.')
        return false;
    }
    btn.current.childNodes[0].classList.remove(li.active)
    btn.current.childNodes[1].classList.remove(li.active)
    btn.current.childNodes[2].classList.remove(li.active)
    find()
  }

  //alert창 열고 닫기
  const alertOpen = (text) => {
    setAltext(text)
    setIsAlertOpen(true);
  };

  const alertClose = () => {
    setIsAlertOpen(false);
    if (altext == "일치하는 결과를 찾을 수 없습니다.") {
      /* location.reload(); */
    }
  };


  async function find() {
    const newData = await axios.get(`${baseURL}?pageSize=1422`)
    const searchTextLower = searchText.toLowerCase() == '' ? keyword.toLowerCase() : searchText.toLowerCase();
    const filterName = newData.data.content.filter(item =>
      item.name.toLowerCase().includes(searchTextLower)
    );
    const filterId = data.filter(item =>
      item.id.toString().toLowerCase().includes(searchTextLower)
    );
    const filteredData = [...new Set([...filterName, ...filterId])];

    if (filteredData.length === 0) {
      alertOpen('일치하는 결과를 찾을 수 없습니다.')
      //alert('일치하는 결과를 찾을 수 없습니다.');
    } else {
      setData(filteredData);
    }
  }
  const nav = useRouter();
  const moving = (link) => {
    nav.push(link)
  }

  const handleImgError = (e) => {
    e.target.src = 'https://digimon-api.com/images/digimon/w/Earthdramon.png';
  }

  if (!data || !member || !mdg) return <Lodding />

  return (
    <section className={li.list_page}>
      <div className={li.user_info}>
        <p><img src={'/img/detail/logo.png'} alt="Logo" /></p>
        <div className={li.info_box} onClick={() => { moving('/pages/member/mypage') }}>
          <div className={li.inner_box} >
            <span>[Rk.{rk}]</span>
            <div>
              <img src={`/img/main/icon/${member.mb_icon}.png`} alt='' />
              <p>{member.mb_nick}</p>
            </div>
          </div>
          <div className={li.user_profile}>
            <p><img src={`/img/main/face/${member.mb_img}.png`} alt='' /></p>
          </div>
        </div>
      </div>
      <div className={li.digidex}>
        <div className={li.dex_box}>
          <p><img src={'/img/detail/digidex.png'} alt="Digidex" /></p>
          <span>DIGIDEX</span>
        </div>
        <div className={li.search_area}>
          <form onSubmit={searching}>
            <label htmlFor="search_box">
              <input id='search_box' type='search' name="search"
                maxLength='15' placeholder='디지몬을 검색해보세요.(영문)' pattern="[A-Za-z]+"
                value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            </label>
            <label htmlFor="submit_btn">
              <input id='submit_btn' type='submit' value='검색' />
            </label>
          </form>
        </div>
      </div>
      <div className={li.data_list}>
        <div className={`${li.btn_list}${btnClicked ? '_clicked' : ''}`} ref={btn}>
          <div onClick={() => setLevelByType(['Baby I' || 'Baby II' || '' || ''], 0)}
            className={`${li.btn} ${li.active}`}>
            <p>유년기</p>
          </div>
          <div onClick={() => setLevelByType(['Child' || 'Adult' || 'Armor' || ''], 1)}
            className={li.btn}>
            <p>성장기</p>
          </div>
          <div onClick={() => setLevelByType(['Perfect' || 'Ultimate' || 'Hybrid' || 'Super Ultimate'], 2)}
            className={li.btn}>
            <p>완전체</p>
          </div>
        </div>
        <div className={li.digi_list}>
          <div>
            <ul>
              {data.slice(0, page).map((v, k) => (
                <li className={li.Evolution_list} key={k}>
                  <div className={li.Evolution_data}>
                    <Link href={{
                      pathname: '../dex/detail',
                      query: {
                        id: v.id,
                      }
                    }} className={li.picture}>
                      <img src={'/img/detail/digi_box.png'} alt="Digi Box" />
                      <div className={li.digimon}>
                        <img src={v.image} onError={handleImgError} className={`${li.digi_picture} ${mdg?.some(n => n.dg_id == v.id) && li.active || li.null} `} alt="Digimon Image" />
                        <p>
                          <img src={'/img/detail/overview.png'} className={`${li.mask} ${mdg?.some(n => n.dg_id == v.id) && li.active || li.null} `} alt="Mask" />
                        </p>
                      </div>
                    </Link>
                    <Link href={{ pathname: '../dex/detail', query: { name: v.name } }} className={li.digi_name}>
                      <img src={'/img/detail/name_box.png'} alt="Name Box" />
                      <span>{v.name}</span>
                    </Link>
                  </div>
                </li>
              ))}
              <div className={li.button} onClick={more}>
                <span> 더보기 </span>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className={li.alert_modal} onChange={() => openAlert()}>
        {isAlertOpen && (
          <form className= {li.alert_warning}>
          <img src='/img/member/join/modal.png' alt=''/>
          <div className={li.alert_text}>
          <p>{altext}</p>
          <input type='image' src='/img/member/mypage/ok.png' className = {li.alert_btn}  onClick={() => alertClose()}/>
          </div>
        </form>
        )}
        </div>
      <Footer />
    </section >
  );
}
