"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function Write({userData}) {
    const n = useRouter()
    useEffect(()=>{
        axios.post('/api/member/join',userData)
        sessionStorage.setItem('loginstate',userData.mb_id)
        n.push('../main')
    },[])

}
