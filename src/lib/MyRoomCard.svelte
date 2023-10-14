<script>
	import RoomCard from '$lib/RoomCard.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let response;
	let data;

	if (!browser) {
		response = new Promise((resolve) => {
			resolve({});
		});
	}

	onMount(async () => {
		const roomId = 1;
		response = fetch('/api/profile', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				return fetch('/api/room?id=' + data.room, {
					method: 'GET',
					headers: {
						'content-type': 'application/json'
					}
				});
			})
			.then((res) => res.json());
		response.then((d) => {
			data = d;
		});
	});
</script>

<div class="card p-4 space-y-4">
	<h2 class="card-header p-0">My Room</h2>
	<RoomCard {data} />
</div>
