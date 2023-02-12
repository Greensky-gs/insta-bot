/* eslint-disable @typescript-eslint/no-var-requires */
import { Client, ClientEvents } from '@androz2091/insta.js';
import { readdirSync } from 'fs';
import { Command } from './Command';
import { CommandOptions } from '../typings/structures';
import { Event } from './Event';
import { PronoteStudentSession, login } from '@dorian-eydoux/pronote-api';
import BlaguesAPI from 'blagues-api';

export class Handler {
    private client: Client;
    private commands: Command<CommandOptions>[] = [];
    private events: Event<keyof ClientEvents>[] = [];
    private pronote: PronoteStudentSession;
    private jokes: BlaguesAPI;
    private pronotes: {
        AC: PronoteStudentSession;
        AS: PronoteStudentSession;
        BC: PronoteStudentSession;
        BS: PronoteStudentSession;
    } = { AC: null, AS: null, BC: null, BS: null };

    constructor(client: Client) {
        this.client = client;

        this.start();
    }

    private start() {
        this.loadCommands();
        this.loadEvents();
        this.loadPronote();
        this.loadJokes();
    }

    private loadCommands() {
        this.client.commands = [];

        readdirSync('./dist/commands').forEach((fileName) => {
            const cmd = require(`../commands/${fileName}`)?.default as Command<CommandOptions>;

            if (cmd) {
                this.client.commands.push(cmd);
                this.commands.push(cmd);
                this.log(`Commande ${cmd.options.name} chargée`);
            }
        });
    }
    private loadEvents() {
        readdirSync('./dist/events').forEach((fileName) => {
            const event = require(`../events/${fileName}`)?.default as Event<keyof ClientEvents>;

            this.events.push(event);
            this.client.on(event.key, event.run);

            this.log(`Event ${event.key} chargé`);
        });
    }
    private async loadPronote() {
        const passwords = JSON.parse(process.env.pronoteDatas) as {
            username: string;
            password: string;
            group: 'A' | 'B';
            lv2: 'chinese' | 'spanish';
        }[];

        passwords.forEach(async (pwd) => {
            const session = await login(
                process.env.pronoteURL,
                pwd.username,
                pwd.password,
                process.env.pronoteCas ?? 'none'
            );

            session.setKeepAlive(true);
            this.pronotes[`${pwd.group}${pwd.lv2[0].toUpperCase()}`] = session;
        });
        this.pronote = await login(
            process.env.pronoteURL,
            process.env.pronoteUsername,
            process.env.pronotePassword,
            process.env.pronoteCas ?? 'none'
        );

        this.pronote.setKeepAlive(true);
    }
    private loadJokes() {
        this.jokes = new BlaguesAPI(process.env.blaguesAPIToken);
    }

    public get container() {
        return {
            commands: this.commands,
            events: this.events,
            pronote: this.pronote,
            jokes: this.jokes,
            pronotes: this.pronotes
        };
    }
    private log(msg: string) {
        console.log(`[*] ${msg}`);
    }
}

declare module '@androz2091/insta.js' {
    interface Client {
        commands: Command<CommandOptions>[];
        handler: Handler;
    }
}
