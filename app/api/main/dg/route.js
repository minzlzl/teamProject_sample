import axios from "axios";

export async function GET(req) {
    let r = req.nextUrl.searchParams.get('r');
    const instance = axios.create({ baseURL:'https://www.digi-api.com/api/v1/digimon' })
    const data = await instance.get(`/${r}`);
    const send = data.data;
    return Response.json(send)
}