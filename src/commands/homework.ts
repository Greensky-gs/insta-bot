import moment from 'moment';
import { Command } from '../structures/Command';
import { numerize, plurial } from '../utils/numbers';
import { resizeString } from '../utils/strings';
import { capitalize } from '../utils/time';

moment.locale('fr');

export default new Command({
    name: 'devoirs',
    aliases: ['devoir', 'travail'],
    description: 'Affiche les prochains devoirs',
    groupOnly: true
}).setRun(async (message) => {
    const homeworks = await message.client.handler.container.pronote.homeworks(
        new Date(),
        new Date(Date.now() + 172800000)
    );

    if (homeworks.length === 0)
        return message.chat
            .sendMessage(`Il n'y a aucun devoir à faire dans les 2 prochains jours`, null)
            .catch(() => {});

    message.chat.sendMessage(
        `Vous avez ${numerize(homeworks.length)} devoir${plurial(
            homeworks
        )} à faire dans les 2 prochains jours :\n${homeworks
            .map(
                (x) =>
                    `${capitalize(x.subject.toLowerCase())} (à rendre ${moment(x.for).fromNow()}) : ${resizeString(
                        x.description,
                        60
                    )} (donné ${moment(x.givenAt).fromNow()})`
            )
            .join('\n\n')}`,
        null
    );
});
