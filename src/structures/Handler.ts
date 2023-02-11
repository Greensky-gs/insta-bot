import { Client, ClientEvents } from "@androz2091/insta.js";
import { readdirSync } from "fs";
import { Command } from "./Command";
import { CommandOptions } from "../typings/structures";
import { Event } from "./Event";
import { PronoteSession, login } from "@dorian-eydoux/pronote-api";

export class Handler {
    private client: Client;
    private commands: Command<CommandOptions>[] = [];
    private events: Event<keyof ClientEvents>[] = [];
    private pronote: PronoteSession;

    constructor(client: Client) {
        this.client = client;    

        this.start();
    }

    private start() {
        this.loadCommands();
        this.loadEvents();
        this.loadPronote();
    }

    private loadCommands() {
        readdirSync('./dist/commands').forEach((fileName) => {
            const cmd = require(`../commands/${fileName}`)?.default as Command<CommandOptions>;

            if (cmd) {
                this.client.commands.push(cmd);
                this.commands.push(cmd);
                this.log(`Commande ${cmd.options.name} chargée`)
            };
        })
    }
    private loadEvents() {
        readdirSync('./dist/events').forEach((fileName) => {
            const event = require(`../events/${fileName}`)?.default as Event<keyof ClientEvents>;

            this.events.push(event);
            this.client.on(event.key, event.run);

            this.log(`Event ${event.key} chargé`);
        })
    }
    private async loadPronote() {
        this.pronote = await login(process.env.pronoteURL, process.env.pronoteUsername, process.env.pronotePassword, process.env.pronoteCas ?? 'none');
    }

    public get container() {
        return {
            commands: this.commands,
            events: this.events,
            pronote: this.pronote
        };
    }
    private log(msg: string) {
        console.log(`[*] ${msg}`);
    }
}

declare module '@androz2091/insta.js' {
    interface Client {
        commands: Command<CommandOptions>[]
        handler: Handler;
    }
}