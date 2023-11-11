import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase, getSession } }) {
	return json({
		uid: '2365aedf-57a9-4e55-a836-2e7d95b9330a',
		team: null,
		info: 'Hobbies: Game, music\nSleeping time:  00:00',
		major: 'Computer Science',
		grade: 2019,
		name: 'John Doe'
	});

	const session = await getSession();

	const { data, error } = await supabase.from('students').select().limit(1).single();

	if (error) throw error;

	return json(data);
}
