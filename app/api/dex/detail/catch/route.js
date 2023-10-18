import { qe } from '../../../db';


export async function GET(req) {
    const dg_id = req.nextUrl.searchParams.get('dg_id')
    const mb_id = req.nextUrl.searchParams.get('mb_id')
    let data = await qe(`SELECT count(*) as cnt from dm_mydigimon where dg_id = ${dg_id} and mb_id = ${mb_id}`);
    let like = data[0].cnt <= 0 ? false : true;
    return Response.json(like)
}


export async function POST(req) {
    const init = await req.json();
    await qe(`insert into dm_mydigimon set mb_id='${init.id}', dg_id='${init.idParam}' `)
    return Response.json(true)

}