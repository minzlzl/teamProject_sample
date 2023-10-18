"use client";
import React, { useEffect, useState } from 'react';
import li from './list.module.scss';
import axios from 'axios';
import Footer from '@/app/comp/Footer';
import Link from 'next/link';
import {user_get} from '../../../comp/member/Login'

const baseURL = 'https://www.digi-api.com/api/v1/digimon';

export default function Page() {
    const [data, setData] = useState([]); // 검색용
    const [page, setPage] = useState(10);
    const [level, setLevel] = useState(['Baby I', 'Baby II', '', '']);
    const [searchText, setSearchText] = useState('');
    const [btnClicked, setBtnClicked] = useState(false);
    const [member,setMember] = useState();
    const [rk,setRk] = useState();

    async function fetchData() {
        const mb = await user_get()
        setRk(mb.rk.data)
        setMember(mb.data);
    }

    useEffect( ()=>{
        fetchData()
    },[]);


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

    const setLevelByType = (levels) => {
        setLevel(levels);
        setPage(10);
    };

    useEffect(() => {
        getContents();
    }, [level]);

    async function searching(e) {
        e.preventDefault();
        const newData = await axios.get(`${baseURL}?pageSize=1422`)
        const searchTextLower = searchText.toLowerCase();
        const filterName = newData.data.content.filter(item =>
            item.name.toLowerCase().includes(searchTextLower)
        );
        const filterId = data.filter(item =>
            item.id.toString().toLowerCase().includes(searchTextLower)
        );
        const filteredData = [...new Set([...filterName, ...filterId])];

        if (filteredData.length === 0) {
            alert('일치하는 결과를 찾을 수 없습니다.');
        } else {
            setData(filteredData);
        }
    }


    if (!data || !member) return <></>;

    return (
        <section className={li.list_page}>
            <div className={li.user_info}>
                <p><img src={'/img/detail/logo.png'} alt="Logo" /></p>
                <div className={li.info_box}>
                    <div className={li.inner_box}>
                        <span>[Rk.{rk}]</span>
                        <div>
                        <img src={`/img/main/icon/${member.mb_icon}.png`} alt=''/>
                            <p>{member.mb_nick}</p>
                        </div>
                    </div>
                    <div className={li.user_profile}>
                        <p><img src={`/img/main/face/${member.mb_img}.png`} alt=''/></p>
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
                                maxLength='15' placeholder='디지몬을 검색해보세요.(영문검색)' pattern="[A-Za-z]+"
                                value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                            <input name='date' type='hidden' value={new Date()} />
                        </label>
                        <label htmlFor="submit_btn">
                            <input id='submit_btn' type='submit' name="save" value='검색' />
                        </label>
                    </form>
                </div>
            </div>
            <div className={li.data_list}>
                <div className={`${li.btn_list}${btnClicked ? '_clicked' : ''}`}>
                    <div onClick={() => setLevelByType(['Baby I' || 'Baby II' || '' || ''])}
                        className={li.btn}>
                        <p>유년기</p>
                    </div>
                    <div onClick={() => setLevelByType(['Child' || 'Adult' || 'Armor' || ''])}
                        className={li.btn}>
                        <p>성장기</p>
                    </div>
                    <div onClick={() => setLevelByType(['Perfect' || 'Ultimate' || 'Hybrid' || 'Super Ultimate'])}
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
                                        }}className={li.picture}>
                                            <img src={'/img/detail/digi_box.png'} alt="Digi Box" />
                                            <div className={li.digimon}>
                                                <img src={v.image} className={li.digi_picture} alt="Digimon Image" />
                                                <p>
                                                    <img src={'/img/detail/mask.png'} className={li.mask} alt="Mask" />
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
                            <div className={li.button}>
                                <span onClick={more}> 더보기 </span>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </section >
    );
}
