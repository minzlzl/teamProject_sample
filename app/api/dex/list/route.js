import axios from "axios";

export async function GET() {
    const instance = axios.create({ baseURL:'https://www.digi-api.com/api/v1/digimon', params:{pageSize:'1422'} })
    const data = await instance.get('/');
    return Response.json(data.data)
}