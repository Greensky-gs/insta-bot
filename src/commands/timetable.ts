import { Lesson } from '@dorian-eydoux/pronote-api';
import { Command } from '../structures/Command';
import { capitalize, getDayName, getMonthName, minutesDisplay } from '../utils/time';

export default new Command({
    name: 'edt',
    aliases: ['emploi-du-temps'],
    description: "Affiche l'emploi du temps du jour",
    groupOnly: true
}).setRun(async (message, args) => {
    const dates = {
        start: new Date(new Date().setHours(7)),
        end: new Date(new Date().setHours(23, 59))
    };

    if (args[0]?.toLowerCase() === 'demain') {
        dates.start = new Date(new Date(Date.now() + 86400000).setHours(7));
        dates.end = new Date(new Date(Date.now() + 86400000).setHours(23, 59));
    }
    const timetable = await message.client.handler.container.pronotes[
        message.client.groupDatas.getGroupCode(message.author.id)
    ].timetable(dates.start, dates.end);

    if (timetable.length === 0) return message.chat.sendMessage(`Il n'y a pas de cours prévu`, null).catch(() => {});

    message.chat.sendMessage(
        `${getDayName(dates.start.getDay())} ${dates.start.getDate()} ${capitalize(
            getMonthName(dates.start.getMonth())
        )} :\n${timetable
            .map(
                (x: Lesson) =>
                    `${capitalize(x.subject.toLowerCase())} de ${x.from.getHours()}h${minutesDisplay(
                        x.from.getMinutes()
                    )} à ${x.to.getHours()}h${minutesDisplay(x.to.getMinutes())}`
            )
            .join('\n')}`,
        null
    );
});
