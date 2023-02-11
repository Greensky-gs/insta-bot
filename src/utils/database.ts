import { query } from './query';

export const checkDatabase = async () => {
    await query(`SHOW TABLES`).catch(console.log);

    return true;
};
