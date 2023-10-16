"use client"
import React, {  useState } from 'react'
import de from './detail.module.scss'
import Modal from '../../../comp/dex/detail/Modal'
import Footer from '@/app/comp/Footer'


export default function page() {
    // 모달 버튼 클릭 유무를 저장할 state
    const [showModal, setShowModal] = useState(false)
    // 버튼 클릭시 모달 버튼 클릭 유무를 설정하는 state 함수
    const clickModal = () => { 
        setShowModal(!showModal);
        const body = document.querySelector('body');
        if(!showModal){
            body.style="overflow:hidden"
        } else {
            body.style="overflow:auto"
        }
    }

    let data_input = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const value = Object.fromEntries(formData)
        console.log(value);
    }



    const like = () => {
        const like_btn = document.querySelector('.likes');
    }

    return (
        <section className={de.detail}>
            <div className={de.detail_page}>
                <div className={de.user_info}>
                    <p><img src={'/img/detail/logo.png'} /></p>
                    <div className={de.info_box}>
                        <div className={de.inner_box}>
                            <span>[Rk.99]</span>
                            <div>
                                <img src='/img/detail/user_icon.png' />
                                <p>자룡님은바보</p>
                            </div>
                        </div>
                        <div className={de.user_profile}>
                            <p><img src={'/img/detail/profile.png'} /></p>
                        </div>
                    </div>
                </div>
                <div className={de.dg_info}>
                    <h3>팬더몬인가뭔가</h3>
                    <div className={de.dg_data}>
                        <div className={de.left_data}>
                            <p className={de.like} onClick={like} >
                                <img src={'/img/detail/like_box.png'} />
                                <img src={'/img/detail/like_1.png'} className={de.likes}/>
                                <span>1,234</span>
                            </p>
                            <div className={de.dg_img}>
                                <p className={de.dg_img_1}>
                                    <img src={'/img/detail/dg_img_1.png'} />
                                </p>
                                <p className={de.sample}>
                                    <img src={'/img/detail/sample.png'} />
                                </p>
                                <p className={de.dg_img_2}>
                                    <img src={'/img/detail/dg_img_2.png'} />
                                </p>
                            </div>
                        </div>
                        <ul className={de.right_data}>
                            <li>
                                <p>LEVEL</p>
                                <span>완전체</span>
                            </li>
                            <li>
                                <p>타입</p>
                                <span>데이타</span>
                            </li>
                            <li>
                                <p>X 바이러스 항체</p>
                                <span>NONE</span>
                            </li>
                        </ul>
                    </div>
                    <div className={de.description}>
                        {showModal && <Modal clickModal={clickModal} />}
                        <p className={de.description_txt} onClick={clickModal} >

                            팬더의 모습을 한 퍼펫형 디지몬. 무표정, 무관심의 무뚝뚝한 성격으로 아예 귀여운 면이 없다. 자신을 독불장군이라고 생각하지만 같은 용모에서 인기인인 퍼펫몬을 은밀하게 부러워팬더의 모습을 한 퍼펫형 디지몬. 무표정, 무관심의 무뚝뚝한 성격으로 아예 귀여운 면이 없다. 자신을 독불장군이라고 생각하지만 같은 용모에서 인기인인 퍼펫몬을 은밀하게 부러워
                        </p>
                        <p className={de.description_more}>
                            <img src={'/img/detail/more.png'} />
                        </p>
                    </div>
                    <div className={de.get_btn}>
                        <p>포획하기</p>
                    </div>
                </div>
                <div className={de.skill_info}>
                    <div className={de.skill_gif}>
                        <p><img src={'/img/detail/digivice.gif'} /></p>
                        <span>SKILLS</span>
                    </div>
                    <div className={de.skill_txt}>
                        <p>애니멀네일</p>
                        <p>운남성</p>
                        <p>장타</p>
                        <p>대나무펀치</p>
                    </div>
                </div>
                <div className={de.dg_review}>
                    <h3>유저 한줄 평</h3>
                    <ul>
                        {/*                         {
                            data && data.map((item) => (
                                <li className={de.review_list}>
                                    <div>
                                        <p className={de.review_text}>{item.text}</p>
                                        <div>
                                            <div className={de.user_text}>
                                                <img src='/img/detail/user_icon.png' />
                                                <p>자룡님은바보</p>
                                            </div>
                                            <span>[2023.10.12]</span>
                                        </div>
                                    </div>
                                </li>
                            ))
                        } */}
                    </ul>
                </div>
                <div className={de.search_area}>
                    <form onSubmit={data_input}>
                        <label htmlFor="search_box">
                            <input id='search_box' type='search' name="search" maxLength='15' placeholder='한줄평을 입력하세요.' />
                            <input name='date' type='hidden' value={new Date()} />
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
                        <ul>
                            <li className={de.Evolution_list}>
                                <div className={de.Evolution_data}>
                                    <div className={de.picture}>
                                        <img src={'/img/detail/digi_box.png'} />
                                        <div className={de.digimon}>
                                            <img src={'/img/detail/sample.png'} className={de.digi_picture} />
                                            <p>
                                                <img src={'/img/detail/mask.png'} className={de.mask} />
                                            </p>
                                        </div>
                                    </div>
                                    <div className={de.digi_name}>
                                        <img src={'/img/detail/name_box.png'} />
                                        <span>용가리몬</span>
                                    </div>
                                </div>
                            </li>
                            <li className={de.Evolution_list}>
                                <div className={de.Evolution_data}>
                                    <div className={de.picture}>
                                        <img src={'/img/detail/digi_box.png'} />
                                        <div className={de.digimon}>
                                            <img src={'/img/detail/sample.png'} className={de.digi_picture} />
                                            <p>
                                                <img src={'/img/detail/mask.png'} className={de.mask} />
                                            </p>
                                        </div>
                                    </div>
                                    <div className={de.digi_name}>
                                        <img src={'/img/detail/name_box.png'} />
                                        <span>용가리몬</span>
                                    </div>
                                </div>
                            </li>
                            <li className={de.Evolution_list}>
                                <div className={de.Evolution_data}>
                                    <div className={de.picture}>
                                        <img src={'/img/detail/digi_box.png'} />
                                        <div className={de.digimon}>
                                            <img src={'/img/detail/sample.png'} className={de.digi_picture} />
                                            <p>
                                                <img src={'/img/detail/mask.png'} className={de.mask} />
                                            </p>
                                        </div>
                                    </div>
                                    <div className={de.digi_name}>
                                        <img src={'/img/detail/name_box.png'} />
                                        <span>용가리몬</span>
                                    </div>
                                </div>
                            </li>
                            <li className={de.Evolution_list}>
                                <div className={de.Evolution_data}>
                                    <div className={de.picture}>
                                        <img src={'/img/detail/digi_box.png'} />
                                        <div className={de.digimon}>
                                            <img src={'/img/detail/sample.png'} className={de.digi_picture} />
                                            <p>
                                                <img src={'/img/detail/mask.png'} className={de.mask} />
                                            </p>
                                        </div>
                                    </div>
                                    <div className={de.digi_name}>
                                        <img src={'/img/detail/name_box.png'} />
                                        <span>용가리몬</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className={de.next}>
                        <div>
                            <img src={'/img/detail/Evolution_process.png'} />
                            <span>다음진화</span>
                        </div>
                        <ul>
                            <li className={de.Evolution_list}>
                                <div className={de.Evolution_data}>
                                    <div className={de.picture}>
                                        <img src={'/img/detail/digi_box.png'} />
                                        <div className={de.digimon}>
                                            <img src={'/img/detail/sample.png'} className={de.digi_picture} />
                                            <p>
                                                <img src={'/img/detail/mask.png'} className={de.mask} />
                                            </p>
                                        </div>
                                    </div>
                                    <div className={de.digi_name}>
                                        <img src={'/img/detail/name_box.png'} />
                                        <span>용용가리몬이에용</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer />
        </section>

    )
}
