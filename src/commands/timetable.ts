import { Command } from '../structures/Command';
import { capitalize, getDayName, getMonthName } from '../utils/time';

export default new Command({
    name: 'edt',
    aliases: ['emploi-du-temps'],
    description: "Affiche l'emploi du temps du jour",
    groupOnly: true
}).setRun(async (message) => {
    const timetable = await message.client.handler.container.pronotes[
        message.client.groupDatas.getGroupCode(message.author.id)
    ].timetable(new Date(), new Date(new Date().setHours(23, 59)));

    if (timetable.length === 0) return message.chat.sendMessage(`Il n'y a pas de cours prévu`, null).catch(() => {});

    message.chat.sendMessage(
        `${getDayName(new Date().getDate())} ${new Date().getDate()} ${capitalize(
            getMonthName(new Date().getMonth())
        )} :\n${timetable
            .map(
                (x) =>
                    `${capitalize(
                        x.subject.toLowerCase()
                    )} de ${x.from.getHours()}h${x.from.getMinutes()} à ${x.to.getHours()}h${x.to.getMinutes()}`
            )
            .join('\n')}`,
        null
    );
});
