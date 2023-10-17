import { qe } from '../../db';

export async function GET() {
    let data = await qe('SELECT * from dm_borad');
    // let data = await qe('SELECT mb_icon,mb_img from dm_borad');

    return Response.json(data);
}