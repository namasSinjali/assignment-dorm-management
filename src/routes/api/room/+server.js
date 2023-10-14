import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SERVICE_ROLE_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';

export async function GET({ url: { searchParams }, locals: { getSession } }) {
	const session = await getSession();
	if (!session) {
		// the user is not signed in
		throw error(401, { message: 'Unauthorized' });
	}

	const supabase = createClient(PUBLIC_SUPABASE_URL, SERVICE_ROLE_KEY, {
		auth: {
			autoRefreshToken: false,
			persistSession: false
		}
	});

	if (searchParams.has('id')) {
		const { data, error } = await supabase
			.from('rooms')
			.select(
				`
                    id,
                    name,
                    floor,
                    capacity,
                    filled,
                    building (id, name, phase(id, name))
                `
			)
			.eq('id', searchParams.get('id'));

		if (error) throw error;

		return json(data[0]);
	}

	const { data, error } = await supabase
		.from('rooms')
		.select(
			`
                    id,
                    name,
                    floor,
                    capacity,
                    filled,
                    building (id, name, phase(id, name))
                `
		)
		.eq('id', searchParams.get('id'));

	if (error) throw error;

	return json(data);
}
