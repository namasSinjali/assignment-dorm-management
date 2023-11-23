import { myBookmarksData } from '$lib/store.js';
let processing = [];
export default function (roomId, bookmarkState) {
	if (processing.some((el) => el === roomId)) return;

	processing.push(roomId);
	fetch('/api/bookmark', {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({ roomId, bookmarkState })
	})
		.then((data) => data.json())
		.then((data) => {
			if (data.isSuccess) {
				myBookmarksData.change(bookmarkState ? 'insert' : 'delete', roomId);
			}
		})
		.finally(() => {
			processing = processing.filter((a) => a !== roomId);
		});
}
