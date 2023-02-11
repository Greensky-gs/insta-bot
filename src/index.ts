import { Client } from '@androz2091/insta.js';
import { config } from 'dotenv';
import { Handler } from './structures/Handler';

config();

export const client = new Client({
    disableReplyPrefix: false
});

client.login(process.env.name, process.env.password, {});
client.handler = new Handler(client);

process.on('unhandledRejection', (reason) => {
    console.log(reason);
});
