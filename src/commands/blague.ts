import { Command } from '../structures/Command';

export default new Command({
    name: 'blague',
    description: 'Envoie une blague'
}).setRun(async (message) => {
    const joke = await message.client.handler.container.jokes.randomCategorized('global').catch(() => {});

    if (!joke) return message.chat.sendMessage(`J'ai plus de blagues à raconter`, null).catch(() => {});

    await message.chat.sendMessage(joke.joke, null).catch(() => {});
    setTimeout(() => {
        message.chat.sendMessage(joke.answer, null).catch(() => {});
    }, 3000);
});
