import { qe } from '../db';

export async function POST() {
  const data = await qe('select * from dm_member order by mb_count desc')
  return Response.json(data);
}

