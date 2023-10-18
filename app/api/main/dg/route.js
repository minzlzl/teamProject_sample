import axios from "axios";

export async function GET() {
    let rand = Math.floor(Math.random() * 1422);
    const instance = axios.create({ baseURL:'https://www.digi-api.com/api/v1/digimon', params:{pageSize:'1422'} })
    const data = await instance.get('/');
    const send = data.data.content[rand];
    return Response.json(send)
}