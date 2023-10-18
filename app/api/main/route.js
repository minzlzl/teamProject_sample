import axios from "axios";

export async function GET() {
    let rand = Math.floor(Math.random() * 141);
    const instance = axios.create({ baseURL:'https://www.digi-api.com/api/v1/digimon', params:{page:rand,pageSize:'10'} })
    const data = await instance.get('/');
    return Response.json(data.data)
}