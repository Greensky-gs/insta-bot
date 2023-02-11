declare global {
    namespace NodeJS {
        interface ProcessEnv {
            name: string;
            password: string;
        }
    }
}

export {};