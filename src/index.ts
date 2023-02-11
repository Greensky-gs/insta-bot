import { Client } from "@androz2091/insta.js";
import { config } from "dotenv";

config();

export const client = new Client({
    disableReplyPrefix: false
});

client.login(process.env.name, process.env.password, {});