import { qe } from '../../db';

export async function POST(req) {
    const insert = await req.json();
    await qe(`delete from dm_member where mb_id = '${insert}' `); 
    await qe(`delete from dm_borad where wr_id = '${insert}' `); 
    await qe(`delete from dm_answer where wr_id = '${insert}' `); 
    await qe(`delete from dm_like where like_user = '${insert}' `); 
    await qe(`delete from dm_line where wr_id = '${insert}' `); 
    await qe(`delete from dm_mydigimon where mb_id = '${insert}' `); 
    //return Response.json(true);
}