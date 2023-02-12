declare global {
    namespace NodeJS {
        interface ProcessEnv {
            name: string;
            password: string;
            db_h: string;
            db_d: string;
            db_u: string;
            db_p: string;
            prefix: string;
            chatID: string;
            pronoteURL: string;
            /**
             * A string like this
             * ```
             * [{ "username": "jhon.doe", "password": "1234", "group": "A", "lv2": "spanish" }, { "username": "doe.jhon", "password": "3412", "group": "A", "lv2": "chinese" }, { "username": "greensky.gs", "password": "github.com/Greensky-gs", "group": "B", "lv2": "spanish" }, { "username": "lofi.girl", "password": "github.com/Greensky-gs/lofi-girl", "group": "B", "lv2": "chinese" }]
             * ```
             */
            pronoteDatas: string;
            pronoteCas?: string;
            myName: string;
            blaguesAPIToken: string;
        }
    }
}

export {};
