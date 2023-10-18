import { qe } from '../../db';

export async function POST(req) {
    const mb_id = req.nextUrl.searchParams.get('mb_id');
    const data = await qe(`SELECT mb_id, mb_count, (SELECT COUNT(*) + 1 FROM dm_member WHERE mb_count > b.mb_count) as  rank from dm_member as b where mb_id = '${mb_id}' order by rank asc `);
    return Response.json(data[0].rank);
}
