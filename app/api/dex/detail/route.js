import axios from "axios";

export async function GET(req) {
    const getNum = req.nextUrl.searchParams.get('num')
    const instance = axios.create({ baseURL:'https://www.digi-api.com/api/v1/digimon'})
    const data = await instance.get(`/${getNum}`);
    return Response.json(data.data)
}