import { Command } from '../structures/Command';
import { Values } from '../typings/bot';

export default new Command({
    allowed_users: [Values.OwnerID],
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
