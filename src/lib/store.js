import { writable } from 'svelte/store';

let updateProfileData, updateMyRoomData, updateAllRoomsData;

export const profileData = (() => {
	const { subscribe, set, update } = writable(null);
	updateProfileData = update;
	// setData();

	return { subscribe, refresh: setData };

	function setData() {
		set('loading');

		fetch('/api/profile', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then((data) => data.json())
			.then((data) => {
				console.log('profiledata', data);
				set(data);
			})
			.catch((error) => {
				console.log(error);
				set(null);
			});
	}
})();

export const myRoomData = (() => {
	const { subscribe, set, update } = writable(null);
	updateMyRoomData = update;
	// setData();

	return { subscribe, refresh: setData };

	function setData() {
		set('loading');

		fetch('/api/room?my', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then((data) => data.json())
			.then((data) => {
				set(data);
				console.log('myroomdata', data);
			})
			.catch((error) => {
				console.log(error);
				set(null);
			});
	}
})();

export const allRoomsData = (() => {
	const { subscribe, set, update } = writable(null);
	updateAllRoomsData = update;
	// setData();

	return { subscribe, refresh: setData };

	function setData() {
		set('loading');

		fetch('/api/room?all', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				const modData = data.map((phase) => {
					return {
						...phase,
						buildings: phase.buildings
							// .filter((b) => b.rooms.length !== 0)
							.map((building) => {
								return {
									id: building.id,
									name: building.name,
									floors: [1, 2, 3].map((n) => {
										return {
											floorNo: n,
											rooms: building.rooms
												.map((rm) => ({
													...rm,
													building: {
														id: building.id,
														name: building.name,
														phase: { id: phase.id, name: phase.name }
													}
												}))
												.filter((room) => room.floor === n)
										};
									})
								};
							})
					};
				});
				set(modData);
				console.log('allroomdata', modData);
			})
			.catch((error) => {
				console.log(error);
				set(null);
			});
	}
})();

export const myBookmarksData = (() => {
	const { subscribe, set, update } = writable(null);
	// setData();

	return { subscribe, refresh: setData, change };

	function setData() {
		set('loading');

		fetch('/api/bookmark', {
			method: 'GET',
			headers: {
				'content-type': 'application/json'
			}
		})
			.then((data) => data.json())
			.then((data) => {
				set(data);
				console.log('bookmarks', data);
			})
			.catch((error) => {
				console.log(error);
				set(null);
			});
	}

	function change(type, roomId) {
		update((d) => {
			if (type == 'insert') {
				return [...d, { room_id: roomId }];
			} else if (type == 'delete') {
				return d.filter((room) => room.room_id !== roomId);
			}
		});

		updateMyRoomData((d) => {
			if (d.id == roomId) {
				if (type == 'insert') {
					d.bookmarks[0].count++;
				} else if (type == 'delete') {
					d.bookmarks[0].count--;
				}
			}
			return d;
		});

		updateAllRoomsData((d) => {
			d.some((phase) => {
				phase.buildings.some((building) => {
					building.floors.some((floor) => {
						floor.rooms.some((room) => {
							if (room.id === roomId) {
								if (type == 'insert') {
									room.bookmarks[0].count++;
								} else if (type == 'delete') {
									room.bookmarks[0].count--;
								}
								return true;
							}
							return false;
						});
					});
				});
			});
			return d;
		});
	}
})();
