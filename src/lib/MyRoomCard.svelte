<script>
	import RoomCard from '$lib/RoomCard.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { myRoomData } from '$lib/store.js';

	let response;
	let data;

	if (browser) {
		// myRoomData.refresh();
		// response = new Promise((resolve) => {
		// 	resolve({});
		// });
	}

	// onMount(async () => {
	// 	response = fetch('/api/room?my', {
	// 		method: 'GET',
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		}
	// 	}).then((res) => res.json());
	// 	response.then((d) => {
	// 		data = d;
	// 		console.log(d);
	// 	});
	// });
</script>

<div class="card p-4 space-y-4">
	<h2 class="card-header p-0">My Room</h2>
	<RoomCard data={$myRoomData === 'loading' ? null : $myRoomData} />
</div>
