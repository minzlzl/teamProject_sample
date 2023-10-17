import { qe } from '../../db';

// export async function GET() {
//     let data = await qe('SELECT * from dm_borad');
//     console.log(data);
//     return Response.json(data);
// }

export async function POST(req) {
    let userData = await req.json();
    await qe(`
        insert into dm_borad set   
        title = '${userData.nickName}님의 D.M', 
        answer='${userData.selectedDigimon}', 
        path='${userData.dataURL}', 
        dm_id='${userData.SDid}',
        wr_id='${userData.mb_id}',
        wr_date='${userData.toDay}'
    `);
    return Response.json([]);
}
