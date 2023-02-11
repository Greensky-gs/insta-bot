import { Message } from "@androz2091/insta.js";

export type CommandOptions = {
  name: string;
  aliases?: string[];
  denied_users?: string[];
  allowed_users?: string[];
  needPrefix?: boolean;
  description: string;
  groupOnly?: boolean;
};
export type commandRunFunction = (message: Message) => unknown;
