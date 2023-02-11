import { Command } from "../structures/Command";
import { getDayName } from "../utils/time";

export default new Command({
  name: "cours",
  description: "Affiche le prochain cours",
}).setRun(async (message) => {
  const nextClass = (
    await message.client.handler.container.pronote.timetable(
      new Date(),
      new Date(Date.now() + 172800000)
    )
  )[0];

  message.chat
    .sendMessage(
      nextClass.isCancelled
        ? `Votre prochain cours (${nextClass.subject.toLowerCase()}) est annulé`
        : nextClass.isAway
        ? `Le professeur (${nextClass.teacher}) est absent`
        : `Le prochain cours est ${nextClass.subject.toLowerCase()} en salle ${
            nextClass.room.split(' ')[0]
          } le ${getDayName(nextClass.from.getDay())} à ${nextClass.from.getHours()}h${nextClass.from.getMinutes()}`,
      null
    )
    .catch(() => {});
});
