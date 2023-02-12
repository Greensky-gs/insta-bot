import { client } from '..';
import { Event } from '../structures/Event';
import { groupDataManager } from '../structures/groupDataManager';
import { checkDatabase } from '../utils/database';

export default new Event('connected', async () => {
    console.log(`Logged as ${client.user.username}`);

    await checkDatabase().catch(console.log);
    client.groupDatas = new groupDataManager();
});

declare module '@androz2091/insta.js' {
    interface Client {
        groupDatas: groupDataManager;
    }
}
