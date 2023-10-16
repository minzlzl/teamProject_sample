import { qe } from '../../db';

export async function POST(req) {
    let mb_id = req.nextUrl.searchParams.get('mb_id');
    let data = await qe(`SELECT * from dm_member where mb_id = ${mb_id}`);
    return Response.json(data);
}
