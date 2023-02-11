import { query } from "./query"

export const checkDatabase = async () => {
    await query(`SHOW TABLES`)

    return true;
}