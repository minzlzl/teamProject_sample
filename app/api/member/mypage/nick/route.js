import { qe } from '../../../db';


export async function POST(req) {
    const data = await req.json();
    await qe(`update dm_member set mb_nick = '${data.nick}' where mb_id = '${data.id}'`);
    let newd = await qe(`SELECT * from dm_member where mb_id = '${data.id}'`);
    return Response.json(newd);
}