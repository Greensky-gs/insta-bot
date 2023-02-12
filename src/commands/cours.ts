import { Command } from '../structures/Command';
import { getDayName } from '../utils/time';

export default new Command({
    name: 'cours',
    description: 'Affiche le prochain cours',
    groupOnly: true
}).setRun(async (message) => {
    const footer =
        message.client.groupDatas.hasData(message.author.id) && JSON.parse(process.env.pronoteDatas).length !== 4
            ? ''
            : `\n\nComme vous n'êtes pas configuré, vous voyez l'emploi du temps des personnes qui font chinois du groupe A.\nUtilisez ${process.env.prefix}configurer pour vous configurer`;

    const nextClass = (
        await message.client.handler.container.pronotes[
            message.client.groupDatas.getGroupCode(message.author.id)
        ].timetable(new Date(), new Date(Date.now() + 172800000))
    )[0];

    message.chat
        .sendMessage(
            nextClass.isCancelled
                ? `Votre prochain cours (${nextClass.subject.toLowerCase()}) est annulé`
                : nextClass.isAway
                ? `Le professeur (${nextClass.teacher}) est absent`
                : `Le prochain cours est ${nextClass.subject.toLowerCase()} en salle ${
                      nextClass.room.split(' ')[0]
                  } le ${getDayName(
                      nextClass.from.getDay()
                  )} à ${nextClass.from.getHours()}h${nextClass.from.getMinutes()}${footer}`,
            null
        )
        .catch(() => {});
});
