<script>
	import { BookmarkOutline, BookmarkSolid, UserSolid, UserOutline } from 'flowbite-svelte-icons';
	import { myBookmarksData } from '$lib/store.js';
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	export let data;

	let occupancy = [];
	$: {
		for (let i = 0; i < data?.capacity; i++) {
			occupancy.push(i < data?.user_room[0].count);
		}
	}

	let bookmarked = false;

	const unsubscribe = myBookmarksData.subscribe((value) => {
		if (value === 'loading' || !value) {
			bookmarked = false;
		} else {
			bookmarked = value.some((d) => d.room_id === data?.id);
		}
	});

	onDestroy(unsubscribe);
</script>

{#if Boolean(data)}
	<div class="variant-ghost-surface p-2 flex gap-y-1 gap-x-4 flex-row flex-wrap items-center">
		<div class="grow max-w-[15rem] flex gap-4 items-center justify-between">
			<h3 class="text-center">
				<span>Room</span>
				<br />
				<span class="text-[1.1em]">{data?.name.match(/(?<=^Room )\d{3}$/)[0]}</span>
			</h3>
			<div class="whitespace-nowrap text-sm text-center text-surface-600-300-token">
				<div>{data?.building.phase.name}</div>
				<div class="text-xs">{data?.building.name}</div>
			</div>
		</div>
		<div class="flex grow-[2] items-center gap-4 justify-end">
			<button class="chip hover:variant-filled p-1">
				<span>
					{#if bookmarked}
						<BookmarkSolid size="xs" />
					{:else}
						<BookmarkOutline size="xs" />
					{/if}
				</span>
				<span>{data?.bookmarks[0].count}</span>
			</button>
			<div class="flex gap-1">
				{#each occupancy as status}
					<span class="badge-icon w-3 h-3">
						{#if status}
							<UserSolid />
						{:else}
							<UserOutline />
						{/if}
					</span>
				{/each}
			</div>
		</div>
	</div>
{:else}
	<div class="variant-ghost-surface p-4 space-y-4 min-w-[15rem]">
		<div class="placeholder animate-pulse" />
		<div class="grid grid-cols-3 gap-3">
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
			<div class="placeholder animate-pulse" />
		</div>
	</div>
{/if}
