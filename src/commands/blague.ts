import { Command } from '../structures/Command';

export default new Command({
    name: 'blague',
    description: 'Envoie une blague'
}).setRun(async (message, args) => {
    const Categories = message.client.handler.container.jokes.categories;
    let type = Categories.GLOBAL;
    if (/^noire?/i.test(args.join(' '))) type = Categories.DARK;
    if (/^limite?/i.test(args.join(' '))) type = Categories.LIMIT;

    const joke = await message.client.handler.container.jokes.randomCategorized(type).catch(() => {});

    if (!joke) return message.chat.sendMessage(`J'ai plus de blagues à raconter`, null).catch(() => {});
    console.log(joke);

    await message.chat.sendMessage(joke.joke, null).catch(() => {});
    setTimeout(() => {
        message.chat.sendMessage(joke.answer, null).catch(() => {});
    }, 3000);
});
