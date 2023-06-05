/* eslint-disable import/newline-after-import */
/* eslint-disable import/first */
import { createServer } from 'http';
import dotenv from 'dotenv';
dotenv.config({ path: './src/variables.env' });
import app from './app';

const PORT = Number(process.env.PORT);

export const server = createServer(app);

import './socket';

server.listen({ port: PORT }, () =>
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
);
