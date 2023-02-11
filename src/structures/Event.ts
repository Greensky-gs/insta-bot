import { ClientEvents } from "@androz2091/insta.js";

export class Event<T extends keyof ClientEvents> {
    constructor(public key: T, public run: (...args: ClientEvents[T]) => unknown) {}
}