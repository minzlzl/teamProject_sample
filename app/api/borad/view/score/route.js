import { qe } from '../../../db';

export async function POST(req) {
    const newScore = await req.json();
    
    await qe(`
        UPDATE dm_member
        set mb_count = ${newScore.newCount}
        where mb_id = ${newScore.myid} 
    `);
    return Response.json([]);
}