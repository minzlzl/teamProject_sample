import { qe } from '../../../db';

export async function GET(req) {
    const getNum = req.nextUrl.searchParams.get('num')
    let data = await qe(`SELECT count(*) as cnt from dm_like where dg_id = ${getNum}`);
    let like = !data[0].cnt ? 0 : data[0].cnt;
    return Response.json(like)
}

export async function POST(req) {
    const init = await req.json()
    let find = await qe(`SELECT count(*) as cnt from dm_like where dg_id = ${init.idParam} and like_user = ${init.id}`);
    if(find[0].cnt == 0) {
        await qe(`insert into dm_like set dg_id = '${init.idParam}', like_user='${init.id}' `);
    } else {
        await qe(`delete from dm_like where like_user = '${init.id}' `); 
    }


    return Response.json(true)
}