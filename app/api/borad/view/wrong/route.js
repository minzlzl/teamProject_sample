import { qe } from '../../../db';

export async function GET(req) {
    let getNum = req.nextUrl.searchParams.get('id')
    let data = await qe(`SELECT * from dm_answer where bo_id=${getNum}`);
    return Response.json(data);
}

export async function POST(req) {
    const init = await req.json();
    await qe(`
        insert into dm_answer set   
        bo_id = '${init.bo_id}', 
        wr_id = '${init.wr_id}', 
        answer='${init.answer}', 
        an_date='${init.an_date}',
        wr_icon= '${init.wr_icon}',
        wr_nick= '${init.wr_nick}'
    `);
    return Response.json([]);
}