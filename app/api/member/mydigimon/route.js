import { qe } from '../../db';

export async function GET(req) {
    const getNum = req.nextUrl.searchParams.get('id')
    const data = await qe(`select dg_id from dm_mydigimon where mb_id = ${getNum}`)
    return Response.json(data);
}

