"use client"
import React, { useEffect, useRef, useState } from 'react'
import de from './modal.module.scss'

export function Modal({ DescriptionInModal, clickModal }) {
    // 전달받은 state 함수
    return (
        <section className={de.modal_page}>
            <div className={de.modal_p}>
                <div className={de.modal}>
                    <div>
                        <h3>{DescriptionInModal.name}</h3>
                        <div>
                            <p>
                                {DescriptionInModal.descriptions.find(description => description.language === 'en_us')?.description || 'The data is not available.'}
                            </p>
                        </div>
                    </div>
                    <div className={de.close}>
                        <p onClick={clickModal}>창닫기</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export function Modal2({ clickModal2, DescriptionInModal2 }) {
    const elUl = useRef();
    const [openLiIndex, setOpenLiIndex] = useState(null);

    const handleLiClick = (index) => {
        if (openLiIndex === index) {
            setOpenLiIndex(null); // Close the clicked `li` if it's already open.
        } else {
            setOpenLiIndex(index); // Open the clicked `li`.
        }
    };

    useEffect(() => {
        const liElements = elUl.current.querySelectorAll('li');
        liElements.forEach((li, index) => {
            li.addEventListener('click', () => {
                handleLiClick(index);
            });
        });

        return () => {
            liElements.forEach((li) => {
                li.removeEventListener('click', () => {
                    handleLiClick(index);
                });
            });
        };
    }, []);

    return (
        <section className={de.modal_page_skill}>
            <div className={de.modal_p}>
                <div className={de.modal}>
                    <div className={de.more}>
                        <h3>SKILL LIST</h3>
                        <ul className={de.skill_list} ref={elUl}>
                            {
                                DescriptionInModal2.skills.length <= 0 ?
                                    <li><p>No Data</p></li>
                                    :
                                    DescriptionInModal2.skills.map((item, index) => (
                                        <li key={index}>
                                            <p >{item.skill}</p>
                                            <div className={de.skill_description} style={{ display: openLiIndex === index ? 'block' : 'none' }}>
                                                {
                                                    item.description === " "
                                                        ? <p>There are no detailed information.</p>
                                                        : <p>{item.description}</p>
                                                }
                                            </div>
                                        </li>
                                    ))
                            }
                        </ul>
                    </div>
                    <div className={de.close_btn}>
                        <p onClick={() => clickModal2()}>창닫기</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

