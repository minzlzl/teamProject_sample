import { qe } from '../../../db';


export async function POST(req) {
    const data = await req.json();
    let search = await qe(`SELECT count(*) as cnt from dm_member where mb_nick = '${data.nick}' `)

    if(search[0].cnt > 0) return Response.json(false);

    await qe(`update dm_member set mb_nick = '${data.nick}' where mb_id = '${data.id}'`);
    let newd = await qe(`SELECT * from dm_member where mb_id = '${data.id}'`);
    return Response.json(newd);
}