import { qe } from '../../../db';

export async function POST(req) {
    const insert = await req.json();
    await qe(`delete from dm_mydigimon where mb_id = '${insert.mb_id}' and dg_id = '${insert.dg_id}' `); 

    const data = await qe(`select dg_id from dm_mydigimon where mb_id = ${insert.mb_id}`)
    return Response.json(data);
}