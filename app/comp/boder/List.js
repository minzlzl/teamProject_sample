'use client'
 import axios from 'axios'
 import useSWR from 'swr'
 const fetcher = (url) => fetch(url).then((r) => r.json())

export async function bb(){
    const { data, error } = useSWR(
        `/api/borad/list`,
        fetcher
      )
      return data
    // if (typeof window !== 'undefined') {
    //     const mb = sessionStorage.getItem('loginstate')
    //     let data =  await axios.get(`/api/borad/list`);
    //     return {data}
    // }
}