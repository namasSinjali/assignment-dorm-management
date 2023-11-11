import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase, getSession } }) {
	return json([
		{ uid: '2365aedf-57a9-4e55-a836-2e7d95b9330a', room_id: 1 },
		{ uid: '2365aedf-57a9-4e55-a836-2e7d95b9330a', room_id: 3 },
		{ uid: '2365aedf-57a9-4e55-a836-2e7d95b9330a', room_id: 17 }
	]);
	const session = await getSession();

	const { data, error } = await supabase.from('bookmarks').select('*').eq('uid', session.user.id);

	if (error) throw error;

	return json(data);
}
