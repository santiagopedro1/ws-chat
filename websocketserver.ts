import WebSocket from 'ws';

type Message = {
	sender: string;
	content: string;
};

const wss = new WebSocket.Server({ host: '192.168.0.103', port: 8080 });

let messages: Message[] = [];

wss.on('connection', (ws) => {
	// Send initial messages to the client
	ws.send(JSON.stringify({ type: 'message update', messages }));

	// Send user and message updates to all clients
	wss.clients.forEach((client) => {
		if (client !== ws && client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify({ type: 'message update', messages }));
		}
	});

	ws.on('message', (data: string) => {
		const message: Message = JSON.parse(data);
		console.log('Received message:', message);

		// Add message to messages array
		messages.push(message);

		// Broadcast message update to all clients
		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify({ type: 'message update', messages }));
			}
		});
	});
});

console.log('WebSocket server started on port 8080');
