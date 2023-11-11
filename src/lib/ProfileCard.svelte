<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import { profileData } from '$lib/store.js';

	let response;

	if (browser) {
		// profileData.refresh();
		// response = new Promise((resolve) => {
		// 	resolve({
		// 		name: '',
		// 		major: '',
		// 		grade: '',
		// 		info: ''
		// 	});
		// });
	}

	// onMount(() => {
	// 	response = fetch('/api/profile', {
	// 		method: 'GET',
	// 		headers: {
	// 			'content-type': 'application/json'
	// 		}
	// 	}).then((data) => data.json());

	// 	response.then((data) => {
	// 		console.log(data);
	// 	});
	// });
</script>

{#if $profileData === 'loading'}
	<div class="card p-3 space-y-4">
		<h2 class="card-header p-0">Profile</h2>
		<div class="grid grid-cols-5 gap-1">
			<div class="col-span-2 placeholder animate-pulse" />
			<div class="col-span-3 placeholder animate-pulse" />
			<div class="col-span-3 placeholder animate-pulse" />
			<div class="col-span-2 placeholder animate-pulse" />
			<div class="col-span-2 placeholder animate-pulse" />
			<div class="col-span-3 placeholder animate-pulse" />
		</div>
		<div class="h-10 rounded-lg mt-2 placeholder animate-pulse" />
	</div>
{:else if $profileData}
	<div class="card p-3 space-y-4">
		<h2 class="card-header p-0">Profile</h2>
		<ul class="list">
			<li><span class="font-bold">Name:</span><span>{$profileData?.name}</span></li>
			<li><span class="font-bold">Major:</span><span>{$profileData?.major}</span></li>
			<li><span class="font-bold">Grade:</span><span>{$profileData?.grade}</span></li>
		</ul>
		<p class="variant-ringed-surface text-sm p-2 italic">
			{$profileData?.info}
		</p>
	</div>
{:else}
	ERROR!!
{/if}
