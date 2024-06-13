<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { ScrollArea } from '$lib/components/ui/scroll-area/';
	import * as Card from '$lib/components/ui/card';

	type Message = {
		sender: string;
		content: string;
		isMe?: boolean;
	};

	const messages: Message[] = [
		{
			sender: 'John',
			content: 'Hello!',
			isMe: true
		},
		{
			sender: 'Jane',
			content: 'How are you?'
		},
		{
			sender: 'John',
			content: 'I am good, thanks!',
			isMe: true
		},
		{
			sender: 'Jane',
			content: 'You too!'
		},
		{
			sender: 'John',
			content: 'Bye!',
			isMe: true
		},
		{
			sender: 'Jane',
			content:
				'See you later! this is an unecessary long message to see if the wrapping works like it should, but wow is this message long'
		},
		{
			sender: 'John',
			content:
				'I am a very long message to see if the wrapping works like it should, but wow is this message long',
			isMe: true
		}
	];
</script>

<Card.Root class="grid h-[calc(100vh_-_32px)] grid-rows-[auto,1fr,auto] gap-2">
	<Card.Header class="rounded-lg bg-white bg-opacity-10">
		<Card.Title class="text-3xl">Chat Foda</Card.Title>
		<Card.Description>Card Description</Card.Description>
	</Card.Header>

	<ScrollArea>
		<Card.Content class="flex flex-col gap-4 px-12 py-5">
			{#each messages as message}
				<div
					class="w-fit max-w-[45%] rounded-lg bg-[hsl(24_9.8%_10%)] p-3 {message.isMe
						? 'self-end'
						: 'self-start'}"
				>
					{#if !message.isMe}
						<p class="text-red-500">{message.sender}</p>
					{/if}
					<p class="text-pretty text-lg">{message.content}</p>
				</div>
			{/each}
		</Card.Content>
	</ScrollArea>

	<form class="flex w-full items-center gap-8 rounded-lg bg-white bg-opacity-10 px-16 py-4">
		<Input placeholder="Type your message here." />
		<Button
			size="icon"
			class="rounded-full"
			type="submit"
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
	</form>
</Card.Root>
