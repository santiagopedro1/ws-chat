<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Card from '$lib/components/ui/card';

	import type { PageServerData } from './$types';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	export let data: PageServerData;
	let username: string;
</script>

{#if data.username}
	<Button href="/chat">Go chatting</Button>
{:else}
	<div class="grid place-items-center">
		<Card.Root class="rounded-lg border">
			<Card.Header>
				<Card.Title>Name</Card.Title>
			</Card.Header>
			<form
				method="POST"
				use:enhance={({ formData, cancel }) => {
					const username = formData.get('username');
					if (username) {
						document.cookie = `username=${username}; path=/; max-age=604800`;
						goto('/chat');
					}
					cancel();
				}}
			>
				<Card.Content>
					<Input
						name="username"
						placeholder="Enter your name"
					/>
				</Card.Content>
				<Card.Footer class="justify-end">
					<Button type="submit">Submit</Button>
				</Card.Footer>
			</form>
		</Card.Root>
	</div>
{/if}
