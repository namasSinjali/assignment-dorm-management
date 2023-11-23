import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SERVICE_ROLE_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';
import { json } from '@sveltejs/kit';

export async function GET({ url: { searchParams }, locals: { getSession } }) {
	// return json('temp');
	const session = await getSession();
	const uid = session.user.id;

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

	if (searchParams.has('my')) {
		// return json({
		// 	id: 1,
		// 	name: 'Room 101',
		// 	floor: 1,
		// 	capacity: 4,
		// 	building: { id: 1, name: 'Dormitory Building 1', phase: { id: 1, name: 'Phase 1' } },
		// 	user_room: [{ count: 2 }],
		// 	bookmarks: [{ count: 1 }]
		// });

		const { data, error } = await supabase
			.from('user_room')
			.select(
				`
					rooms (id, name, floor, capacity, building (id, name, phase(id, name)), user_room (count), bookmarks (count))
		        `
			)
			.eq('uid', uid)
			.limit(1)
			.single();

		if (error) throw error;

		return json(data.rooms);
	}

	if (searchParams.has('id')) {
		const { data, error } = await supabase
			.from('rooms')
			.select(
				`
                    id,
                    name,
                    floor,
                    capacity,
                    building (id, name, phase(id, name)),
					user_room (count),
					bookmarks (count)
                `
			)
			.eq('id', searchParams.get('id'))
			.limit(1)
			.single();

		if (error) throw error;

		return json(data);
	}

	if (searchParams.has('all')) {
		// return json([
		// 	{
		// 		id: 1,
		// 		name: 'Phase 1',
		// 		buildings: [
		// 			{
		// 				id: 1,
		// 				name: 'Dormitory Building 1',
		// 				rooms: [
		// 					{
		// 						id: 1,
		// 						name: 'Room 101',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 2 }],
		// 						bookmarks: [{ count: 1 }]
		// 					},
		// 					{
		// 						id: 2,
		// 						name: 'Room 102',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 3,
		// 						name: 'Room 103',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 2 }]
		// 					},
		// 					{
		// 						id: 4,
		// 						name: 'Room 104',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 5,
		// 						name: 'Room 105',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 6,
		// 						name: 'Room 106',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 7,
		// 						name: 'Room 107',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 1 }]
		// 					},
		// 					{
		// 						id: 8,
		// 						name: 'Room 108',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 9,
		// 						name: 'Room 109',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 10,
		// 						name: 'Room 110',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 11,
		// 						name: 'Room 111',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 12,
		// 						name: 'Room 112',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 13,
		// 						name: 'Room 201',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 14,
		// 						name: 'Room 202',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 15,
		// 						name: 'Room 203',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 16,
		// 						name: 'Room 204',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 17,
		// 						name: 'Room 205',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 1 }]
		// 					},
		// 					{
		// 						id: 18,
		// 						name: 'Room 206',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 19,
		// 						name: 'Room 207',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 20,
		// 						name: 'Room 208',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 21,
		// 						name: 'Room 209',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 22,
		// 						name: 'Room 210',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 23,
		// 						name: 'Room 211',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 24,
		// 						name: 'Room 212',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 25,
		// 						name: 'Room 301',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 26,
		// 						name: 'Room 302',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 27,
		// 						name: 'Room 303',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 28,
		// 						name: 'Room 304',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 1 }]
		// 					},
		// 					{
		// 						id: 29,
		// 						name: 'Room 305',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 30,
		// 						name: 'Room 306',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 31,
		// 						name: 'Room 307',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 32,
		// 						name: 'Room 308',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 33,
		// 						name: 'Room 309',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 34,
		// 						name: 'Room 310',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 35,
		// 						name: 'Room 311',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 36,
		// 						name: 'Room 312',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					}
		// 				]
		// 			},
		// 			{
		// 				id: 2,
		// 				name: 'Dormitory Building 2',
		// 				rooms: [
		// 					{
		// 						id: 37,
		// 						name: 'Room 102',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 38,
		// 						name: 'Room 103',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 39,
		// 						name: 'Room 104',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 40,
		// 						name: 'Room 105',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 41,
		// 						name: 'Room 106',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 42,
		// 						name: 'Room 107',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 43,
		// 						name: 'Room 108',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 44,
		// 						name: 'Room 109',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 45,
		// 						name: 'Room 110',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 46,
		// 						name: 'Room 111',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 47,
		// 						name: 'Room 112',
		// 						floor: 1,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 48,
		// 						name: 'Room 201',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 49,
		// 						name: 'Room 202',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 50,
		// 						name: 'Room 203',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 51,
		// 						name: 'Room 204',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 52,
		// 						name: 'Room 205',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 53,
		// 						name: 'Room 206',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 54,
		// 						name: 'Room 207',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 55,
		// 						name: 'Room 208',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 56,
		// 						name: 'Room 209',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 57,
		// 						name: 'Room 210',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 58,
		// 						name: 'Room 211',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 59,
		// 						name: 'Room 212',
		// 						floor: 2,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 60,
		// 						name: 'Room 301',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 61,
		// 						name: 'Room 302',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 62,
		// 						name: 'Room 303',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 63,
		// 						name: 'Room 304',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 64,
		// 						name: 'Room 305',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 65,
		// 						name: 'Room 306',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 66,
		// 						name: 'Room 307',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 67,
		// 						name: 'Room 308',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 68,
		// 						name: 'Room 309',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 69,
		// 						name: 'Room 310',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 70,
		// 						name: 'Room 311',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					},
		// 					{
		// 						id: 71,
		// 						name: 'Room 312',
		// 						floor: 3,
		// 						capacity: 4,
		// 						user_room: [{ count: 0 }],
		// 						bookmarks: [{ count: 0 }]
		// 					}
		// 				]
		// 			},
		// 			{ id: 3, name: 'Dormitory Building 3', rooms: [] },
		// 			{ id: 4, name: 'Dormitory Building 4', rooms: [] },
		// 			{ id: 5, name: 'Dormitory Building 5', rooms: [] },
		// 			{ id: 6, name: 'Dormitory Building 6', rooms: [] }
		// 		]
		// 	},
		// 	{
		// 		id: 2,
		// 		name: 'Phase 2',
		// 		buildings: [
		// 			{ id: 7, name: 'Dormitory Building 7', rooms: [] },
		// 			{ id: 8, name: 'Dormitory Building 8', rooms: [] },
		// 			{ id: 9, name: 'Dormitory Building 9', rooms: [] },
		// 			{ id: 10, name: 'Dormitory Building 10', rooms: [] },
		// 			{ id: 11, name: 'Dormitory Building 11', rooms: [] },
		// 			{ id: 12, name: 'Dormitory Building 12', rooms: [] },
		// 			{ id: 13, name: 'Dormitory Building 13', rooms: [] },
		// 			{ id: 14, name: 'Dormitory Building 14', rooms: [] },
		// 			{ id: 15, name: 'Dormitory Building 15', rooms: [] },
		// 			{ id: 16, name: 'Dormitory Building 16', rooms: [] },
		// 			{ id: 17, name: 'Dormitory Building 17', rooms: [] }
		// 		]
		// 	}
		// ]);

		const { data, error } = await supabase.from('phases').select(
			`
				id,
				name,
				buildings(id, name, rooms(id, name, floor, capacity, user_room (count), bookmarks (count)))
			`
		);

		if (error) throw error;

		return json(data);
	}
}
