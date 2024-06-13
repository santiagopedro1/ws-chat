# Very lazy WebSocket chat

This is a very lazy WebSocket chat. Theres literally no authentication, no
encryption, no rate limiting, and no database. It's just a chat room.

## Made with

- [SvelteKit](https://kit.svelte.dev/)
- [Shadcn-svelte](https://shadcn-svelte.com/)
- [Bun](https://bun.sh/) WebSocket API in the future, probably

## How to use

1. Install [Bun](https://bun.sh/)
2. Install dependencies:

```bash
bun install
```

3. If you want to use an IP other than localhost, or a different port, you
   can change the `.env` file.

4. Build

```bash
bun run build
```

5. Start the WebSocket server

```bash
bun run websocketserver.ts
```

6. Start the frontend

```bash
cd build
bun run index.js
```
