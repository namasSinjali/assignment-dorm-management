<script>
	import RoomCard from '$lib/RoomCard.svelte';
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import { allRoomsData } from '$lib/store.js';

	if (browser) {
		// allRoomsData.refresh();
		// response = new Promise((resolve) => {
		// 	resolve({});
		// });
	}

	let response;
	let data = [];
	let modData = [];

	let phaseSelection;
	let buildingSelection;
	let floorSelection = 1;

	const FLOORS = [1, 2, 3];

	const unsubscribe = allRoomsData.subscribe((value) => {
		if (value === 'loading' || !value) {
			modData = [];
		} else {
			modData = value;
			phaseSelection = modData[0].id;
			buildingSelection = modData[0].buildings[0].id;
		}
	});

	let viewport;
	let observer;
	const anchors = [];

	onMount(async () => {
		observer = new IntersectionObserver(intersectionCallback, { root: viewport });
		// response = fetch('/api/room?all', {
		// 	method: 'GET',
		// 	headers: {
		// 		'content-type': 'application/json'
		// 	}
		// }).then((res) => res.json());
		// response.then((d) => {
		// 	data = d;
		// 	console.log(d);
		// 	modData = data.map((phase) => {
		// 		return {
		// 			...phase,
		// 			buildings: phase.buildings
		// 				// .filter((b) => b.rooms.length !== 0)
		// 				.map((building) => {
		// 					return {
		// 						...building,
		// 						floors: [1, 2, 3].map((n) => {
		// 							return {
		// 								floorNo: n,
		// 								rooms: building.rooms
		// 									.map((rm) => ({
		// 										...rm,
		// 										building: {
		// 											id: building.id,
		// 											name: building.name,
		// 											phase: { id: phase.id, name: phase.name }
		// 										}
		// 									}))
		// 									.filter((room) => room.floor === n)
		// 							};
		// 						})
		// 					};
		// 				})
		// 		};
		// 	});
		// 	// .filter((p) => p.buildings.length !== 0);
		// 	phaseSelection = modData[0].id;
		// 	buildingSelection = modData[0].buildings[0].id;
		// });
	});

	onDestroy(unsubscribe);

	function intersectionCallback(e) {
		e.forEach((a) => {
			anchors.find((b) => b.node === a.target).isIntersecting = a.isIntersecting;
		});
		const inview = anchors.find((a) => a.isIntersecting);
		if (!inview) return;
		phaseSelection = inview.phase;
		buildingSelection = inview.building;
		floorSelection = inview.floor;
	}

	function anchorFn(node, { phase, building, floor }) {
		anchors[phase][building][floor] = node;
	}
	function observe(node, { phase, building, floor }) {
		observer.observe(node);
		// anchors[`${phase}${building}${floor}`].node = node;
		anchors.push({
			node: node,
			phase,
			building,
			floor,
			isIntersecting: false
		});

		return {
			destroy() {
				observer.unobserve(node);
			}
		};
	}
	function scrollToSelection() {
		anchors
			.find(
				(a) =>
					a.phase === phaseSelection &&
					a.building === buildingSelection &&
					a.floor === floorSelection
			)
			.node.scrollIntoView(true);
	}
</script>

<div class="card w-full h-full p-3 space-y-4 flex flex-col overflow-hidden">
	<h2 class="card-header p-0">Search Room</h2>
	<div class="flex-1 flex flex-col gap-4 overflow-hidden">
		<ol class="breadcrumb [&_li]:block">
			<li class="crumb">
				<select
					class="bcselect"
					name="phase"
					bind:value={phaseSelection}
					on:change={() => {
						buildingSelection = modData.find((phase) => phase.id === phaseSelection).buildings[0]
							.id;
						scrollToSelection();
					}}
				>
					{#each modData as phase}
						<option value={phase.id}>{phase.name}</option>
					{/each}
				</select>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb">
				<select
					class="bcselect"
					name="building"
					bind:value={buildingSelection}
					on:change={scrollToSelection}
				>
					{#if modData.length > 0}
						{#each modData.find((phase) => phase.id == phaseSelection)?.buildings as building}
							<option value={building.id}>{building.name}</option>
						{/each}
					{/if}
				</select>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb">
				<select
					class="bcselect"
					name="floor"
					bind:value={floorSelection}
					on:change={scrollToSelection}
				>
					{#each FLOORS as floorNo}
						<option value={floorNo}>{'Floor ' + floorNo}</option>
					{/each}
				</select>
			</li>
		</ol>
		<div
			class="flex-1 overflow-x-hidden [scrollbar-gutter:auto] scroll-smooth snap-y"
			bind:this={viewport}
		>
			{#if viewport}
				{#each modData as phase}
					<div
						class="text-center mt-4 -mb-4 text-surface-500-400-token text-lg font-bold snap-start"
					>
						{phase.name}
					</div>
					{#each phase.buildings as building}
						<div
							class="text-center mt-4 -mb-2 text-surface-500-400-token text-base font-bold snap-start"
						>
							{building.name}
						</div>
						{#each building.floors as floor}
							<div class="text-center mt-4 mb-2 text-surface-500-400-token snap-start">
								Floor {floor.floorNo}
							</div>
							<div
								class="flex gap-4 flex-wrap justify-center content-start items-start"
								use:observe={{ phase: phase.id, building: building.id, floor: floor.floorNo }}
							>
								{#each floor.rooms as room}
									<RoomCard data={room} />
								{/each}
							</div>
						{/each}
					{/each}
				{/each}
			{/if}
		</div>
	</div>
</div>
