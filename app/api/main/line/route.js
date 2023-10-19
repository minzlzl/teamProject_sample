import { qe } from '../../db';

export async function GET(req) {
    const getNum = req.nextUrl.searchParams.get('id')
    let data = await qe(`SELECT * from dm_line where dg_id = ${getNum}`);
    return Response.json(data);
}