import * as AMQP from 'amqplib';

interface CreateConnectionConfig {
  queueName?: string;
}

export async function createConnection(config: CreateConnectionConfig) {
  const connection = await AMQP.connect(process.env.AMQP_URL, {
    protocol: 'amqp',
    port: 5672,
    username: process.env.USERNAME_AMQL,
    password: process.env.PASSWORD_AMQL,
    frameMax: 0,
    heartbeat: 580,
    vhost: process.env.USERNAME_AMQL,
    // AutomaticRecoveryEnabled = true,
    // RequestedHeartbeat = 580,
    // NetworkRecoveryInterval = TimeSpan.FromSeconds(1),
  });

  console.log('connection', connection);

  const channel = await connection.createChannel();

  const _queue = await channel.checkQueue('TestQuee');

  return { connection, channel, queue: _queue } as const;
}

export type TConsumeCallback = (
  message: AMQP.Message | null
) => void | Promise<void>;

interface ConsumeMessageConfig {
  isPreMatch: boolean;
}

export async function consumeMessage(
  channel: AMQP.Channel,
  config: ConsumeMessageConfig,
  callback: TConsumeCallback
) {
  await channel.consume('TestQuee', callback, {
    noAck: true,
    noLocal: false,
  });
}

export async function sentMessage(
  channel: AMQP.Channel,
  value: any
  // config: ConsumeMessageConfig,
  // callback: TConsumeCallback
) {
  await channel.sendToQueue(
    'TestQuee',
    Buffer.from(`
  ${value}
  `)
  );
}
