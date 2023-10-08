<script>
	import { BookmarkOutline, BookmarkSolid, UserSolid, UserOutline } from 'flowbite-svelte-icons';

	export let roomNo = '301';
	export let phase = '1';
	export let buildingNo = '7';
	export let noBookmarks = 12;
	export let occupiedNo = 1;
	export let capacity = 4;

	let occupancy = [];
	for (let i = 0; i < capacity; i++) {
		occupancy.push(i < occupiedNo);
	}
</script>

<div class="variant-ghost-surface p-2 flex gap-y-1 gap-x-4 flex-row flex-wrap items-center">
	<div class="grow max-w-[15rem] flex gap-4 items-center justify-between">
		<h3 class="text-center">
			<span>Room</span>
			<br />
			<span class="text-[1.1em]">{roomNo}</span>
		</h3>
		<div class="whitespace-nowrap text-sm text-center text-surface-600-300-token">
			<div>Phase {phase}</div>
			<div>Building {buildingNo}</div>
		</div>
	</div>
	<div class="flex grow-[2] items-center gap-4 justify-end">
		<button class="chip hover:variant-filled p-1">
			<span><BookmarkOutline size="xs" /></span>
			<span>{noBookmarks}</span>
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
