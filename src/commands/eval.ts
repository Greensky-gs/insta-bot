import { Command } from '../structures/Command';

export default new Command({
    allowed_users: ['57969933222'],
    name: 'eval',
    description: 'Javascript eval',
    hiddenFromPublic: true
}).setRun((message, args) => {
    message.delete().catch(() => {});

    if (args.length === 0) return;

    const run = new Promise((resolve) => resolve(eval(args.join(' '))));

    run.catch((error) => {
        message.chat.sendMessage(error, null).catch(() => {});
    }).then((value) => {
        if (value) message.chat.sendMessage(JSON.stringify(value), null).catch(() => {});
    });
});
