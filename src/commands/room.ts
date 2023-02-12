import { Command } from '../structures/Command';
import { calculateWayToClass } from '../utils/OzenneMaps';
import { waitForMesage } from '../utils/waitForMessage';

export default new Command({
    name: 'classe',
    aliases: ['salle'],
    description: 'Calcule le chemin vers une salle',
    groupOnly: true
}).setRun(async (message, args) => {
    let room = args[0];

    if (!room || !calculateWayToClass(room)) {
        const msg = await message.chat
            .sendMessage(`Vers quelle salle voulez-vous aller ? (répondez ici, par le numéro de la salle)`, null)
            .catch(() => {});

        const reply = await waitForMesage({ message, user: message.author });
        if (msg) msg.delete().catch(() => {});

        room = reply.content ?? '1';
    }

    const way = calculateWayToClass(room);

    if (!way)
        return message.chat.sendMessage(`Je ne connais pas le chemin jusqu'a la salle ${room}`, null).catch(() => {});

    message.chat.sendMessage(`Pour aller à la salle ${room}, ${way}`, null).catch(() => {});
});
