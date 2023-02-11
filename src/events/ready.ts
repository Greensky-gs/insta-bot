import { client } from "..";
import { Event } from "../structures/Event";
import { checkDatabase } from "../utils/database";

export default new Event("connected", () => {
  console.log(`Logged as ${client.user.username}`);

  checkDatabase().catch(console.log);
});
