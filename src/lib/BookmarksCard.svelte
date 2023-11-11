<script>
	import RoomCard from '$lib/RoomCard.svelte';
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import { derived } from 'svelte/store';
	import { allRoomsData, myBookmarksData } from '$lib/store.js';

	let bookmarkedRooms = derived([allRoomsData, myBookmarksData], ([phases, bookmarks]) => {
		if (phases === 'loading' || !phases || bookmarks === 'loading' || !bookmarks) {
			return [];
		} else {
			const acc = [];
			phases.forEach((phase) => {
				phase.buildings.forEach((building) => {
					building.floors.forEach((floor) => {
						floor.rooms.forEach((room) => {
							if (bookmarks.some((b) => b.room_id === room.id)) {
								acc.push(room);
							}
						});
					});
				});
			});
			return acc;
		}
	});
</script>

<div class="card p-4 space-y-4">
	<h2 class="card-header p-0">Bookmarks</h2>
	<div class="flex gap-4 flex-wrap justify-center content-start items-start">
		{#each $bookmarkedRooms as room}
			<RoomCard data={room} />
		{/each}
	</div>
</div>
