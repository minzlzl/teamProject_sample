import axios from 'axios'
export async function user_get(){
    if (typeof window !== 'undefined') {
        const mb = localStorage.getItem('loginstate')
        let member = await axios.post(`/api/member/login?mb_id=${mb}`)
        return member.data[0];
    }
}

