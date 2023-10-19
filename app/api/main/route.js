import axios from "axios";

export async function GET(req) {
    let r = req.nextUrl.searchParams.get('r');
    let instance = axios.create({ baseURL:'https://www.digi-api.com/api/v1/digimon', params:{page:r,pageSize:'10'} })
    let data = await instance.get('/');
    return Response.json(data.data)
}