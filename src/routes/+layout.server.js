export const load = async ({ url, locals: { getSession } }) => {
	return {
		session: await getSession()
	};
};
