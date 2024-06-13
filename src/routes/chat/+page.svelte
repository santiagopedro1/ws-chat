<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area/';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';

	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	export let data: PageData;

	const { username } = data;

	type Message = {
		sender: string;
		content: string;
	};

	let ws: WebSocket;
	let messages: Message[] = [];
	let myMessage: string;

	let users: Set<string> = new Set();
	$: users = new Set(messages.map((m) => m.sender));

	onMount(() => {
		ws = new WebSocket('ws://192.168.0.103:8080');

		ws.onopen = () => {
			console.log('Connected to WebSocket server');
		};

		ws.onmessage = (event) => {
			const message = JSON.parse(event.data);
			switch (message.type) {
				case 'message update':
					console.log('Received message update:');
					messages = message.messages;
					break;
				default:
					console.log('Unknown message type:', message.type);
			}
		};

		ws.onerror = (error) => {
			console.error('WebSocket error:', error);
		};

		ws.onclose = () => {
			console.log('WebSocket connection closed');
		};
	});
</script>

<Card.Root class="grid h-[calc(100vh_-_32px)] grid-rows-[auto,1fr,auto] gap-2">
	<Card.Header class="rounded-lg bg-white bg-opacity-10">
		<Card.Title class="text-3xl">Chat Foda</Card.Title>
		<Card.Description>{users ? Array.from(users).join(', ') : ''}</Card.Description>
	</Card.Header>

	<ScrollArea id="messages">
		<Card.Content class="flex flex-col gap-4 px-12 py-5">
			{#each messages as message}
				<div
					class="w-fit max-w-[45%] rounded-lg bg-[hsl(24_9.8%_10%)] p-3 {message.sender === username
						? 'self-end'
						: 'self-start'}"
				>
					{#if message.sender !== username}
						<p class="text-primary">{message.sender}</p>
					{/if}
					<p class="text-pretty break-words text-lg">{message.content}</p>
				</div>
			{/each}
		</Card.Content>
	</ScrollArea>

	<form
		method="POST"
		use:enhance={({ formData, cancel }) => {
			const messageBody = formData.get('message');
			if (!messageBody) {
				myMessage = '';
			} else {
				const message = {
					sender: username,
					content: messageBody.toString()
				};
				messages = [...messages, message];
				ws.send(JSON.stringify(message));
				myMessage = '';
			}
			cancel();
		}}
	>
		<div class="flex w-full items-center gap-8 rounded-lg bg-white bg-opacity-10 px-16 py-4">
			<Input
				bind:value={myMessage}
				name="message"
				placeholder="Type your message here."
			/>
			<Button
				size="icon"
				class="rounded-full"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="m3 3 3 9-3 9 19-9Z" />
					<path d="M6 12h16" />
				</svg>
			</Button>
		</div>
	</form>
</Card.Root>
