import { qe } from '../../db';

export async function POST(req) {
    const insert = await req.json();
    await qe(`insert into dm_member set 
    mb_id = '${insert.mb_id}',
    mb_nick='${insert.nickName}', 
    mb_icon='${insert.cc}', 
    mb_img='${insert.uimg}',
    mb_date='${insert.toDay}'`);
    return Response.json(true);
}