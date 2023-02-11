export enum Values {
    OwnerID = '57969933222'
}
export type ElementType<T extends any[]> = T extends Array<infer U> ? U : never;
 
