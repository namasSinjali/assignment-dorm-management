import { json } from '@sveltejs/kit';

export async function GET({ locals: { supabase, getSession } }) {
	const session = await getSession();

	const { data, error } = await supabase.from('students').select().limit(1).single();

	if (error) throw error;

	return json(data);
}
