import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SERVICE_ROLE_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase, getSession } }) {
	// return json([
	// 	{ uid: '2365aedf-57a9-4e55-a836-2e7d95b9330a', room_id: 1 },
	// 	{ uid: '2365aedf-57a9-4e55-a836-2e7d95b9330a', room_id: 3 },
	// 	{ uid: '2365aedf-57a9-4e55-a836-2e7d95b9330a', room_id: 17 }
	// ]);
	const session = await getSession();

	const { data, error } = await supabase
		.from('bookmarks')
		.select('room_id')
		.eq('uid', session.user.id);

	if (error) throw error;

	return json(data);
}

export async function POST({ request, locals: { getSession } }) {
	const session = await getSession();

	if (!session) {
		// the user is not signed in
		throw error(401, { message: 'Unauthorized' });
	}
	const uid = session.user.id;

	const supabase = createClient(PUBLIC_SUPABASE_URL, SERVICE_ROLE_KEY, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});

	const { roomId, bookmarkState } = await request.json();

	let supaFn;

	if (bookmarkState) {
		const { count } = await supabase
			.from('bookmarks')
			.select('', { count: 'exact', head: true })
			.eq('uid', uid);

		if (count >= 5) return json({ isSuccess: false, message: 'Bookmark limit reached' });

		supaFn = supabase.from('bookmarks').insert({ uid, room_id: roomId });
	} else {
		supaFn = supabase.from('bookmarks').delete().eq('uid', uid).eq('room_id', roomId);
	}

	const { data, error } = await supaFn;

	return json({ isSuccess: !error, message: null, error });
}
