import greetings from '../maps/greetings';
import { Event } from '../structures/Event';

export default new Event('messageCreate', (message) => {
    const greetingTest = greetings.get(message.author.id)
        ? greetings.get(message.author.id).getDay() !== new Date().getDay()
        : true;
    if (
        ['bonjour', 'bjr', 'slt', 'salut', 'yo', 'hey', 'hi', 'hello', 'gm', 'bonsoir'].some((x) =>
            message.content?.toLowerCase().startsWith(x)
        ) &&
        greetingTest
    ) {
        greetings.set(message.author.id, new Date());
        const replies = [`Salut ${message.author.username}`, 'salut', 'Bonjour', `Yo`, `Salut ça va ?`, 'Hey !'];
        message.chat.sendMessage(replies[Math.floor(Math.random() * replies.length)], null).catch(() => {});
    }
});
