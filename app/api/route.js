import { qe } from './db';
export async function GET() {
    let data = await qe('SELECT * from dm_member');
    return Response.json(data);
}