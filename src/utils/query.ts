import { createConnection } from 'mysql';
import { DefaultQueryResult, QueryResult } from '../typings/database';
import { config } from 'dotenv';
config();

const database = createConnection({
    database: process.env.db_d,
    user: process.env.db_u,
    password: process.env.db_p,
    host: process.env.db_h
});

database.connect((error) => {
    if (error) {
        throw error;
    }
});

export const query = <T = DefaultQueryResult>(query: string): Promise<QueryResult<T>> => {
    return new Promise((resolve, reject) => {
        database.query(query, (error, request) => {
            if (error) {
                return reject(error);
            }
            return resolve(request);
        });
    });
};
