<script>
	import { browser } from '$app/environment';
	import ProfileCard from '$lib/ProfileCard.svelte';
	import MyRoomCard from '$lib/MyRoomCard.svelte';
	import SearchRoomCard from '$lib/SearchRoomCard.svelte';
	import BookmarksCard from '$lib/BookmarksCard.svelte';
	import { AddressCardSolid, SearchOutline, BookmarkOutline } from 'flowbite-svelte-icons';

	import { profileData, myRoomData, allRoomsData, myBookmarksData } from '$lib/store.js';
	import { send, receive } from '$lib/transition.js';
	import { flip } from 'svelte/animate';

	if (browser) {
		profileData.refresh();
		myRoomData.refresh();
		allRoomsData.refresh();
		myBookmarksData.refresh();
	}

	let profileSection;
	let searchSection;
	let bookmarkSection;

	let profileLabel;
	let searchLabel;
	let bookmarksLabel;

	let maximizedSection = 'search';
	let maximizeAll = false;

	if (browser) {
		const mediaQuery = window.matchMedia('(min-width: 768px)');
		maximizeAll = mediaQuery.matches;
		mediaQuery.addListener((mediaQuery) => {
			maximizeAll = mediaQuery.matches;
		});
	}

	function maximize(e) {
		// switch (e.target.name) {
		// 	case 'profile':
		// 		searchLabel.style.gridArea = 'first';
		// 		bookmarksLabel.style.gridArea = 'second';
		// 		break;
		// 	case 'search':
		// 		profileLabel.style.gridArea = 'first';
		// 		bookmarksLabel.style.gridArea = 'second';
		// 		break;
		// 	case 'bookmarks':
		// 		profileLabel.style.gridArea = 'first';
		// 		searchLabel.style.gridArea = 'second';
		// 		break;
		// }
		maximizedSection = e.target.name;
		// [profileSection, searchSection, bookmarkSection].forEach((s) => {
		// 	s.classList.remove('maximized');
		// 	s.classList.add('minimized');
		// });
		// switch (e.target.name) {
		// 	case 'profile':
		// 		profileSection.classList.replace('minimized', 'maximized');
		// 		break;
		// 	case 'search':
		// 		searchSection.classList.replace('minimized', 'maximized');
		// 		break;
		// 	case 'bookmarks':
		// 		bookmarkSection.classList.replace('minimized', 'maximized');
		// 		break;
		// }
	}
</script>

<div id="appShell" class="w-full h-full flex flex-col overflow-hidden" data-testid="app-shell">
	<header id="shell-header" class="flex-none h-10 card"><slot name="header" /></header>

	<!-- Content Area -->
	<div class="content-grid flex-auto overflow-hidden">
		<label
			class="tile md:hidden [&.active>:nth-child(2)]:bg-primary-active-token"
			class:active={maximizedSection === 'profile'}
			bind:this={profileLabel}
		>
			<div class="w-0 h-0 overflow-hidden">
				<input type="radio" tabindex="-1" name="profile" value="/profile" on:click={maximize} />
			</div>
			<div
				class="card h-full w-full grid place-content-center place-items-center hover:bg-primary-hover-token"
			>
				<div>
					<AddressCardSolid size="lg" />
				</div>
				<div>
					<span class="font-bold text-xs">Profile</span>
				</div>
			</div>
		</label>

		<label
			class="tile md:hidden [&.active>:nth-child(2)]:bg-primary-active-token"
			class:active={maximizedSection === 'search'}
			bind:this={searchLabel}
		>
			<div class="w-0 h-0 overflow-hidden">
				<input type="radio" tabindex="-1" name="search" value="/search" on:click={maximize} />
			</div>
			<div
				class="card h-full w-full grid place-content-center place-items-center hover:bg-primary-hover-token"
			>
				<div>
					<SearchOutline size="lg" />
				</div>
				<div>
					<span class="font-bold text-xs">Search</span>
				</div>
			</div>
		</label>

		<label
			class="tile md:hidden [&.active>:nth-child(2)]:bg-primary-active-token"
			class:active={maximizedSection === 'bookmarks'}
			bind:this={bookmarksLabel}
		>
			<div class="w-0 h-0 overflow-hidden">
				<input type="radio" tabindex="-1" name="bookmarks" value="/bookmarks" on:click={maximize} />
			</div>
			<div
				class="card h-full w-full grid place-content-center place-items-center hover:bg-primary-hover-token"
			>
				<div>
					<BookmarkOutline size="lg" />
				</div>
				<div>
					<span class="font-bold text-xs">Bookmarks</span>
				</div>
			</div>
		</label>

		{#if maximizedSection === 'profile' || maximizeAll}
			<section class="maximized space-y-2" bind:this={profileSection}>
				<ProfileCard />
				<MyRoomCard />
			</section>
		{/if}

		{#if maximizedSection === 'search' || maximizeAll}
			<section class="overflow-hidden maximized" bind:this={searchSection}>
				<SearchRoomCard />
			</section>
		{/if}

		{#if maximizedSection === 'bookmarks' || maximizeAll}
			<section class="maximized" bind:this={bookmarkSection}>
				<BookmarksCard />
			</section>
		{/if}

		<!-- <section
			class="space-y-2 minimized max-md:[&.minimized>:not(.tile)]:hidden max-md:[&.minimized>.tile]:inline"
			bind:this={profileSection}
		>
			<label class="tile hidden">
				<div class="w-0 h-0 overflow-hidden">
					<input type="radio" tabindex="-1" name="profile" value="/profile" on:click={maximize} />
				</div>
				<div class="card aspect-square grid place-content-center">
					<div>
						<AddressCardSolid size="lg" />
					</div>
					<div>
						<span class="font-bold text-xs">Profile</span>
					</div>
				</div>
			</label>
			<ProfileCard />
			<MyRoomCard />
		</section>
		<section
			class="maximized overflow-hidden max-md:[&.minimized>:not(.tile)]:hidden max-md:[&.minimized>.tile]:inline"
			bind:this={searchSection}
		>
			<label class="tile hidden">
				<div class="w-0 h-0 overflow-hidden">
					<input type="radio" tabindex="-1" name="search" value="/search" on:click={maximize} />
				</div>
				<div class="card aspect-square grid place-content-center">
					<div>
						<AddressCardSolid size="lg" />
					</div>
					<div>
						<span class="font-bold text-xs">Search</span>
					</div>
				</div>
			</label>
			<SearchRoomCard />
		</section>
		<section
			class="minimized max-md:[&.minimized>:not(.tile)]:hidden max-md:[&.minimized>.tile]:inline"
			bind:this={bookmarkSection}
		>
			<label class="tile hidden">
				<div class="w-0 h-0 overflow-hidden">
					<input
						type="radio"
						tabindex="-1"
						name="bookmarks"
						value="/bookmarks"
						on:click={maximize}
					/>
				</div>
				<div class="card aspect-square grid place-content-center">
					<div>
						<AddressCardSolid size="lg" />
					</div>
					<div>
						<span class="font-bold text-xs">Bookmarks</span>
					</div>
				</div>
			</label>
			<BookmarksCard />
		</section> -->
	</div>
</div>

<style lang="postcss">
	.content-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		grid-template-rows: 30vmin 1fr;
		grid-template-areas:
			'. . .'
			'maximized maximized maximized';
		gap: 0.5rem;
		padding: 0.5rem 0;
	}
	.maximized {
		grid-area: maximized;
	}

	@media screen(sm) {
		.content-grid {
			grid-template-columns: 20vmin 1fr;
			grid-template-rows: 20vmin 20vmin 20vmin 1fr;
			grid-template-areas:
				'. maximized'
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
