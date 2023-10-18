import { qe } from '../db';

export async function GET(req) {
    const getNum = req.nextUrl.searchParams.get('dg_id')
    let data = await qe(`SELECT * from dm_line where dg_id = ${getNum}`);
    return Response.json(data);
}


export async function POST(req) {
    const init = await req.json();
    await qe(`insert into dm_line set 
    dg_id='${init.idParam}', 
    wr_id='${init.id}', 
    content='${init.title}',
    wr_date='${init.fulldate}',
    wr_icon='${init.icon}',
    wr_nick='${init.nick}' `);
    return Response.json([]);
}