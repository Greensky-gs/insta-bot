import { DatabaseTables } from '../typings/database';
import { query } from './query';

export const checkDatabase = async () => {
    await query(
        `CREATE TABLE IF NOT EXISTS ${DatabaseTables.GroupData} ( user_id VARCHAR(255) NOT NULL PRIMARY KEY, group VARCHAR(1) NOT NULL, lv2 VARCHAR(7) NOT NULL )`
    );

    return true;
};
