<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import ProfileCard from '$lib/ProfileCard.svelte';
	import MyRoomCard from '$lib/MyRoomCard.svelte';
	import SearchRoomCard from '$lib/SearchRoomCard.svelte';
</script>

<div id="appShell" class="w-full h-full flex flex-col overflow-hidden" data-testid="app-shell">
	<header id="shell-header" class="flex-none h-10 card"><slot name="header" /></header>

	<!-- Content Area -->
	<div class="content-grid flex-auto overflow-hidden">
		<section class="variant-ringed-surface space-y-2 p-2">
			<ProfileCard />
			<MyRoomCard />
		</section>
		<section class="variant-ringed-surface p-2 maximized overflow-hidden">
			<SearchRoomCard />
		</section>
		<section class="variant-ringed-surface">Three</section>
	</div>
</div>

<style lang="postcss">
	.content-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-rows: 30vmin 1fr;
		grid-template-areas:
			'. .'
			'maximized maximized';
		gap: 3px;
	}
	.maximized {
		grid-area: maximized;
	}

	@media screen(sm) {
		.content-grid {
			grid-template-columns: 20vmin 1fr;
			grid-template-rows: 20vmin 20vmin 1fr;
			grid-template-areas:
				'. maximized'
				'. maximized'
				'. maximized';
		}
	}
	@media screen(md) {
		.content-grid {
			grid-template-columns: 1fr 2fr 1fr;
			/* grid-template-columns: max(10rem, 1fr) 1fr 1fr; */
			grid-template-rows: 1fr;
			grid-template-areas: '. . .';
		}
		.maximized {
			grid-area: initial;
		}
	}
</style>
