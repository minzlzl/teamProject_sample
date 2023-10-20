"use client"
import React, { useEffect,  useState } from 'react'
import join from './join.module.scss'
import Join1 from '@/app/comp/member/join/Join1';
import Join2 from '@/app/comp/member/join/Join2';
import Join3 from '@/app/comp/member/join/Join3';
import Join4 from '@/app/comp/member/join/Join4';
import Join5 from '@/app/comp/member/join/Join5';
import Join6 from '@/app/comp/member/join/Join6';
import Write from '@/app/comp/member/join/Write';
import { useRouter } from 'next/navigation';

export default function page() {
  let [test,setTest] = useState(1)
  let [list,setList] = useState(1)

  /* 회원정보 */
  let [mb_id,setMb_id] = useState();
  let [nickName, setNickName] = useState('');
  let [uimg, setUimg] = useState();
  let [cc,setCc] = useState();
  let [userData,setUserData] = useState();
  const n = useRouter();

  useEffect(()=>{
    setTest(list);
    const id = sessionStorage.u_id;
    !id ? n.push('/pages/intro') : setMb_id(id);
    //setMb_id(id);
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const toDay = `${y}.${m}.${d}`;

    let userData = {mb_id,nickName,uimg,cc,toDay}
    setUserData(userData)
  },[list])
  
  return (
    <form className={join.all}>
          {
            test == 1 ? 
            <Join1 list={list} setList={setList} /> 
            : 
            test == 2 ? 
            <Join2 list={list} setList={setList} setNickName={setNickName} setUimg={setUimg}/> 
            : 
            test == 3 ?
            <Join3 list={list} setList={setList}  nickName={nickName}/> 
            :
            test == 4 ?
            <Join4 list={list} setList={setList}/> 
            :
            test == 5 ?
            <Join5 list={list} setList={setList} cc={cc} setCc={setCc} /> 
            :
            test == 6 ?
            <Join6 list={list} setList={setList} cc={cc} /> 
            :
            <Write userData={userData} />
          }
    </form>
  )
}
