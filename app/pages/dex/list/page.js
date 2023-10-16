"use client"
import React, { useEffect, useState } from 'react'
import li from './list.module.scss'
import axios from 'axios'

export default function page() {

    const [data, setData] = useState();
    const [page, setPage] = useState(10);

    const get = async () => {
        const dm = await axios.get('/api/dex/list');
        setData(dm.data.content)
    }

    const more = () => { setPage(page + 10) }

    useEffect(() => { get() }, [])
    if (!data || data.length <= 0) return <></>
    return (
        <section className={li.list_page}>
            <div className={li.user_info}>
                <p><img src={'/img/detail/logo.png'} /></p>
                <div className={li.info_box}>
                    <div className={li.inner_box}>
                        <span>[Rk.99]</span>
                        <div>
                            <img src='/img/detail/user_icon.png' />
                            <p>자룡님은바보</p>
                        </div>
                    </div>
                    <div className={li.user_profile}>
                        <p><img src={'/img/detail/profile.png'} /></p>
                    </div>
                </div>
            </div>
            <div className={li.digidex}>
                <div className={li.dex_box}>
                    <p><img src={'/img/detail/digidex.png'} /></p>
                    <span>DIGIDEX</span>
                </div>
                <div className={li.search_area}>
                    <form>
                        <label htmlFor="search_box">
                            <input id='search_box' type='search' name="search" maxLength='15' placeholder='디지몬을 검색해보세요.' />
                            <input name='date' type='hidden' value={new Date()} />
                        </label>
                        <label htmlFor="submit_btn">
                            <input id='submit_btn' type='submit' name="save" value='검색' />
                        </label>
                    </form>
                </div>
                {/* {
                    data.slice(0, page).map((v, k) => (
                        <p key={v.id}>{v.name}</p>
                    ))
                }
                <button onClick={more}> 더보기 </button> */}
            </div>
            <div className={li.data_list}>
                <div className={li.btn}>
                    <p>
                        <img src={'/img/detail/non_box.png'} />
                        <span>유년기</span></p>
                    <p>
                        <img src={'/img/detail/non_box.png'} />
                        <span>성장기</span>
                    </p>
                    <p>
                        <img src={'/img/detail/non_box.png'} />
                        <span>완전체</span>
                    </p>
                </div>
                <div className={li.digi_list}>
                    <ul>
                        <li className={li.Evolution_list}>
                            <div className={li.Evolution_data}>
                                <div className={li.picture}>
                                    <img src={'/img/detail/digi_box.png'} />
                                    <div className={li.digimon}>
                                        <img src={'/img/detail/sample.png'} className={li.digi_picture} />
                                        <p>
                                            <img src={'/img/detail/mask.png'} className={li.mask} />
                                        </p>
                                    </div>
                                </div>
                                <div className={li.digi_name}>
                                    <img src={'/img/detail/name_box.png'} />
                                    <span>용가리몬</span>
                                </div>
                            </div>
                        </li>
                        <li className={li.Evolution_list}>
                            <div className={li.Evolution_data}>
                                <div className={li.picture}>
                                    <img src={'/img/detail/digi_box.png'} />
                                    <div className={li.digimon}>
                                        <img src={'/img/detail/sample.png'} className={li.digi_picture} />
                                        <p>
                                            <img src={'/img/detail/mask.png'} className={li.mask} />
                                        </p>
                                    </div>
                                </div>
                                <div className={li.digi_name}>
                                    <img src={'/img/detail/name_box.png'} />
                                    <span>용가리몬</span>
                                </div>
                            </div>
                        </li>
                        <li className={li.Evolution_list}>
                            <div className={li.Evolution_data}>
                                <div className={li.picture}>
                                    <img src={'/img/detail/digi_box.png'} />
                                    <div className={li.digimon}>
                                        <img src={'/img/detail/sample.png'} className={li.digi_picture} />
                                        <p>
                                            <img src={'/img/detail/mask.png'} className={li.mask} />
                                        </p>
                                    </div>
                                </div>
                                <div className={li.digi_name}>
                                    <img src={'/img/detail/name_box.png'} />
                                    <span>용가리몬</span>
                                </div>
                            </div>
                        </li>
                        <li className={li.Evolution_list}>
                            <div className={li.Evolution_data}>
                                <div className={li.picture}>
                                    <img src={'/img/detail/digi_box.png'} />
                                    <div className={li.digimon}>
                                        <img src={'/img/detail/sample.png'} className={li.digi_picture} />
                                        <p>
                                            <img src={'/img/detail/mask.png'} className={li.mask} />
                                        </p>
                                    </div>
                                </div>
                                <div className={li.digi_name}>
                                    <img src={'/img/detail/name_box.png'} />
                                    <span>용가리몬</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
