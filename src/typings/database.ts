export type DefaultQueryResult = {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
};
export type QueryResult<T> = T extends DefaultQueryResult ? DefaultQueryResult : T[];
export enum DatabaseTables {
    GroupData = 'group_data'
}
export type groupData = {
    user_id: string;
    group: 'A' | 'B';
    lv2: 'chinese' | 'spanish';
};
