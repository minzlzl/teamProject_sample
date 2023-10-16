"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginCheck() {
  let navi = useRouter();
  function checkst(){
    if (typeof window !== 'undefined') {
      let item = !localStorage.loginstate ? 0 : localStorage.loginstate;
      return item;
    }
  }
  useEffect(()=>{

    let login = checkst();
    let move;
  
    if(login == 0 ) {
      move = './pages/intro';
    } else {
      move = './pages/main';
    }
    
    navi.push(move)
  },[])
    return <></>
}
