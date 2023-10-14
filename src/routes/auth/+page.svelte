<script>
	import { goto } from '$app/navigation';

	export let data;
	let { supabase } = data;
	$: ({ supabase } = data);

	let email;
	let password;

	const handleSignUp = async () => {
		await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${location.origin}/auth/callback`
			}
		});
	};

	const handleSignIn = async () => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (!error) {
			goto('/');
		}
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};
</script>

<form on:submit={handleSignUp}>
	<input class="input" name="email" bind:value={email} />
	<input class="input" type="password" name="password" bind:value={password} />
	<button class="btn">Sign up</button>
</form>

<button class="btn" on:click={handleSignIn}>Sign in</button>
<button class="btn" on:click={handleSignOut}>Sign out</button>
