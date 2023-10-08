<script>
	import RoomCard from '$lib/RoomCard.svelte';
</script>

<div class="card w-full h-full p-3 space-y-4 flex flex-col overflow-hidden">
	<h2 class="card-header p-0">Search Room</h2>
	<div class="flex-1 flex flex-col gap-4 overflow-hidden">
		<ol class="breadcrumb">
			<li class="crumb">
				<select class="bcselect" name="phase">
					<option value="1">Phase 1</option>
					<option value="2">Phase 2</option>
				</select>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb">
				<select class="bcselect" name="building">
					<option value="1">Dormitory Building 1</option>
					<option value="2">Dormitory Building 2</option>
					<option value="3">Dormitory Building 3</option>
					<option value="4">Dormitory Building 4</option>
					<option value="5">Dormitory Building 5</option>
					<option value="6">Dormitory Building 6</option>
					<option value="7">Dormitory Building 7</option>
				</select>
			</li>
			<li class="crumb-separator" aria-hidden>&rsaquo;</li>
			<li class="crumb">
				<select class="bcselect" name="floor">
					<option value="1">Floor 1</option>
					<option value="2">Floor 2</option>
					<option value="3">Floor 3</option>
				</select>
			</li>
		</ol>
		<div
			class="flex-1 flex gap-4 flex-wrap justify-center content-start overflow-x-hidden [scrollbar-gutter:auto]"
		>
			<RoomCard />
			<RoomCard />
			<RoomCard />
			<RoomCard />
			<RoomCard />
			<RoomCard />
			<RoomCard />
			<RoomCard />
			<RoomCard />
			<RoomCard />
			<RoomCard />
			<RoomCard />
		</div>
	</div>
</div>
