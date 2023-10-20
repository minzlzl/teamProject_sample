import { qe } from '../../../db';

export async function GET(req) {
    const getNum = req.nextUrl.searchParams.get('num')
    const mb_id = req.nextUrl.searchParams.get('mb_id')
    let data = await qe(`SELECT count(*) as cnt from dm_like where dg_id = ${getNum} and like_user = ${mb_id}`);
    let like = !data[0].cnt ? 0 : data[0].cnt;
    return Response.json(like)
}