import { Command } from '../structures/Command';

export default new Command({
    name: 'commandes',
    description: 'Affiche toutes les commandes',
    aliases: ['cmd', 'cmds', 'help', 'aide', 'aled', 'oskour'],
    groupOnly: true
}).setRun((message) => {
    const cmds = message.client.commands
        .filter((x) => x.options?.hiddenFromPublic !== true)
        .map((x) => `${process.env.prefix}${x.options.name} (${x.options.description})`)
        .join('\n');

    const replies = [
        `Bip boup ? Boup bip ! Je suis une version robotisée de ${process.env.myName}, je peux vous aider. Utilisez une des commandes ci-dessous pour que je vous apporte mon aide :\n${cmds}`,
        `Bonjour, ici le centre de réponse des messages de ${process.env.myName}, je ne peux pas vous parler comme vous lui parleriez, mais je peux vous aider autrement.\nUtilisez une de ces commandes pour voir ce dont je suis capable :\n${cmds}`,
        `🤖 Voici la liste de mes commandes :\n${cmds}`,
        `Salut ${message.author.username}, comment tu vas ?\nTape un de ces messages pour que je t'aide\n${cmds}`
    ];

    message.chat.sendMessage(replies[Math.floor(Math.random() * replies.length)], null).catch(() => {});
});
