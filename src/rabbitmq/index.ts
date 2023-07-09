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

  // const _queue = await channel.checkQueue('TestQuee');
  const printerQueue = await channel.checkQueue(process.env.PRINTER_QUEUE);
  console.log('printerQueue', printerQueue);
  // const printerQueueResponses = await channel.checkQueue(
  //   process.env.PRINTER_QUEUE_RESPONSES
  // );
  // console.log('printerQueueResponses', printerQueueResponses);

  return { connection, channel, queue: printerQueue } as const;
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
  await channel.consume(process.env.PRINTER_QUEUE, callback, {
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
  console.log('new message value:', value);

  // convert value (string) to json to add an attribute
  const valueJson = JSON.parse(value);
  console.log('valueJson', valueJson);

  valueJson.deviceName = process.env.DEVICE_NAME;
  console.log('valueJson with device', valueJson);

  await channel.sendToQueue(
    process.env.PRINTER_QUEUE,
    Buffer.from(`
  ${JSON.stringify(valueJson)}
  `)
  );
}
