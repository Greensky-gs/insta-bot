export enum Values {
    OwnerID = '57969933222'
}
export type ElementType<T extends any[]> = T extends Array<infer U> ? U : never;
type botStateType = 'dev' | 'prod';
const utils = {
    state: 'dev'
} as { state: botStateType } & object;

export const config = <T extends keyof typeof utils>(key: T): (typeof utils)[T] => {
    return utils[key];
};
