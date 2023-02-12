import { Message } from '@androz2091/insta.js';
import { Command } from '../structures/Command';
import { waitForMesage } from '../utils/waitForMessage';
import { random } from '../utils/numbers';

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

    if (data.lv2) data.lv2 = data.lv2 === 'chinois' ? 'chinese' : 'spanish';

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

            if (!groupReply || groupReply.content?.toLowerCase() === 'annuler')
                return msgGroup?.delete()?.catch(() => {});

            if (!['A', 'B'].includes(groupReply.content?.toUpperCase())) {
                msgGroup?.delete()?.catch(() => {});
                groupReply
                    .reply(`ce n'est pas un groupe valide. Merci de réessayer la commande en spécifiant un groupe`)
                    .catch(() => {});
                return;
            }

            data.group = groupReply.content.toUpperCase();
            msgGroup?.delete()?.catch(() => {});
        }
        if (!data.lv2) {
            const msgLv = (await message.chat
                .sendMessage(
                    `${message.author.username}, quelle est votre langue LV2 ? (répondez par chinois ou espagnol, ou par annuler pour annuler)`,
                    null
                )
                .catch(() => {})) as Message;

            const lvReply = await waitForMesage({
                message,
                user: message.author
            }).catch(() => {});

            if (!lvReply || lvReply.content?.toLowerCase() === 'annuler') return msgLv?.delete()?.catch(() => {});

            if (!['chinois', 'espagnol'].some((x) => lvReply.content?.toLowerCase() === x)) {
                msgLv?.delete()?.catch(() => {});
                lvReply
                    .reply(`ce n'est pas une langue valide. Réessayez en répondant par chinois ou espagnol`)
                    .catch(() => {});
                return;
            }
            msgLv?.delete()?.catch(() => {});
            data.lv2 = lvReply.content.toLowerCase() === 'chinois' ? 'chinese' : 'spanish';
        }
    } else if (message.client.groupDatas.getGroupData(message.author.id) && !data.group && !data.lv2)
        return message.chat
            .sendMessage(
                `${message.author.username}, vous n'avez fournit aucune information à modifier. Faites par exemple : ${
                    process.env.prefix
                }configurer ${['A', 'B'][random({ max: 2 })]} ${['chinois', 'espagnol'][random({ max: 2 })]}`,
                null
            )
            .catch(() => {});

    const existed = message.client.groupDatas.getGroupData(message.author.id) ? true : false;

    message.client.groupDatas.setGroupData(message.author.id, data);

    message.chat
        .sendMessage(
            existed
                ? `${message.author.username}, vos informations ont été modifiées, ${
                      data.group && data.lv2
                          ? `vous êtes maintenant dans le groupe ${data.group} avec ${
                                data.lv2 === 'chinese' ? 'le chinois' : "l'espagnol"
                            } en deuxième langue`
                          : data.group
                          ? `vous êtes maintenant dans le groupe ${data.group}`
                          : `vous avez maintenant ${
                                data.lv2 === 'chinese' ? 'le chinois' : "l'espagnol"
                            } en deuxième langue`
                  }`
                : `${message.author.username}, vous avez été enregistré dans le groupe ${data.group} avec ${
                      data.lv2 === 'chinese' ? 'le chinois' : "l'espagnol"
                  } en deuxième langue`,
            null
        )
        .catch(() => {});
});
