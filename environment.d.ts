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
            pronoteUsername: string;
            pronotePassword: string;
            pronoteCas?: string;
        }
    }
}

export {};
