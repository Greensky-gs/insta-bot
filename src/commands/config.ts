import { Message } from '@androz2091/insta.js';
import { Command } from '../structures/Command';
import { waitForMesage } from '../utils/waitForMessage';

export default new Command({
    name: 'config',
    description: 'Configure votre groupe',
    groupOnly: true,
    aliases: ['configuration', 'set']
}).setRun(async (message, args) => {
    const data = {
        group: null,
        lv2: null
    };

    if (['A', 'B'].includes(args[0]?.toUpperCase())) data.group = args[0];
    if (['A', 'B'].includes(args[1]?.toUpperCase()) && !data.group) data.group = args[1];
    if (['chinois', 'espagnol'].includes(args[0]?.toLowerCase()))
        data.lv2 = args[0].toLowerCase() === 'chinois' ? 'chinese' : 'espagnol';
    if (['chinois', 'espagnol'].includes(args[1]?.toLowerCase()) && !data.lv2)
        data.lv2 = args[1].toLowerCase() === 'chinois' ? 'chinese' : 'espagnol';

    if (!message.client.groupDatas.getGroupData(message.author.id) && (!data.group || !data.lv2)) {
        if (!data.group) {
            const msgGroup = (await message.chat
                .sendMessage(
                    `${message.author.username}, dans quel groupe êtes-vous ? (répondez par A ou B, ou par annuler pour annuler)`,
                    null
                )
                .catch(() => {})) as Message;

            const groupReply = await waitForMesage({
                message,
                user: message.author
            }).catch(() => {});

            if (!groupReply || groupReply.content.toLowerCase() === 'annuler')
                return msgGroup?.delete()?.catch(() => {});

            if (!['A', 'B'].includes(groupReply.content?.toUpperCase())) {
                msgGroup?.delete()?.catch(() => {});
                groupReply
                    .reply(`ce n'est pas un groupe valide. Merci de réessayer la commande en spécifiant un groupe`)
                    .catch(() => {});
            }
        }
    }
});
