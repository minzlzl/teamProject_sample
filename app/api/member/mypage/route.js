import { qe } from '../../db';

export async function POST(req) {
    const data = await req.json();
    console.log('a');
    return Response.json(true);
}