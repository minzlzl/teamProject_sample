import axios from 'axios'
export async function user_get(){
    if (typeof window !== 'undefined') {
        const mb = sessionStorage.getItem('loginstate')
        let member = await axios.post(`/api/member/login?mb_id=${mb}`)
        let rk = await axios.post(`/api/member/rank?mb_id=${mb}`)
        return {data:member.data[0],rk}
    }
}
/* 
export async function my_rank(){
    if (typeof window !== 'undefined') {
        const mb = sessionStorage.getItem('loginstate')
        return rk.data;
    }
}
 */
