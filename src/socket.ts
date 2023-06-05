import { Server } from 'socket.io';
import { consumeMessage, createConnection, sentMessage } from './rabbitmq';
import { server } from './server';

export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', async (socket) => {
  const { channel } = await createConnection({});

  await consumeMessage(channel, { isPreMatch: true }, (message) => {
    const data = message?.content?.toString() ?? null;
    console.log(data);
    if (data) {
      socket.emit('foo', { data: JSON.parse(data) });
    }
  });
  socket.on('testEvent', (value) => {
    console.log('value', value);
    sentMessage(channel, value);
  });
});
