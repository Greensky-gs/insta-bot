import { Event } from '../structures/Event';
import { config } from '../typings/bot';

export default new Event('messageCreate', (message) => {
    if (!message.content?.toLowerCase()?.startsWith(process.env.prefix.toLowerCase())) return;

    const args = message.content.toLowerCase().slice(process.env.prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!commandName) return;

    const cmd = message.client.commands.find(
        (x) =>
            x.options.name.toLowerCase() === commandName ||
            (x.options.aliases && x.options.aliases.includes(commandName.toLowerCase()))
    );
    if (!cmd) return;

    if (config('state') === 'prod' && cmd.options.groupOnly && message.chat.id !== process.env.chatID) return;
    if (cmd.options.allowed_users && !cmd.options.allowed_users.includes(message.authorID.toString())) return;
    if (cmd.options.denied_users && cmd.options.denied_users.includes(message.authorID.toString())) return;

    const run = new Promise((resolve) => resolve(cmd.run(message, args)));

    run.catch((error) => {
        console.log(`Erreur lors de l'exécution de la commande ${cmd.options.name}`);
        console.log(error);
    });
});
