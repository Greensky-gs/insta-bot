import { DatabaseTables, groupData } from '../typings/database';
import { query } from '../utils/query';

export class groupDataManager {
    private _cache: Record<string, groupData> = {};

    constructor() {
        this.start();
    }

    public getGroupData(user_id: string) {
        if (!this._cache[user_id]) return undefined;

        return {
            group: this._cache[user_id]?.group,
            lv2: this._cache[user_id]?.lv2
        };
    }
    public setGroupData(user_id: string, opts: { lv2?: 'chinese' | 'spanish'; group?: 'A' | 'B' }) {
        if (!this._cache[user_id] && Object.keys(opts).length !== 2) return 'not enough informations';

        const data = this._cache[user_id] ?? {};
        const existed = this.cache[user_id] ? true : false;

        const edited = {
            ...data,
            user_id
        } as groupData;

        if (opts.lv2) edited.lv2 = opts.lv2;
        if (opts.group) edited.group = opts.group;

        this._cache[user_id] = edited;
        query(
            existed
                ? `UPDATE ${DatabaseTables.GroupData} SET \`group\`="${edited.group}", lv2="${edited.lv2}" WHERE user_id="${user_id}"`
                : `INSERT INTO ${DatabaseTables.GroupData} ( user_id, \`group\`, lv2 ) VALUES ( "${user_id}", "${edited.group}", "${edited.lv2}" )`
        );
    }
    public hasData(user_id: string) {
        return this.cache[user_id] !== undefined;
    }
    public getGroupCode(user_id: string) {
        if (!this.hasData(user_id) || JSON.parse(process.env.pronoteDatas).length !== 4) return 'AC';

        const dt = this.getGroupData(user_id);
        return `${dt.group}${dt.lv2[0]}`.toUpperCase();
    }
    private start() {
        this.fillCache();
    }
    private async fillCache() {
        const datas = await query<groupData>(`SELECT * FROM ${DatabaseTables.GroupData}`);

        datas.forEach((data) => {
            this._cache[data.user_id] = data;
        });
    }
    public get cache() {
        return this._cache;
    }
}
