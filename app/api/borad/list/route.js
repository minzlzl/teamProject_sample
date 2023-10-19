import { qe } from '../../db';

export async function POST() {
    const bo = await qe(`SELECT * from dm_borad order by num desc  `);
    return Response.json(bo);
}

