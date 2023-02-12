import { Message, User } from '@androz2091/insta.js';
import { Values, config } from '../typings/bot';

export const waitForMesage = ({
    message,
    user,
    time = 120000,
    whoCanReply = 'useronly'
}: {
    message: Message;
    user: User;
    time?: number;
    whoCanReply?: 'useronly' | 'everyoneexeptuser' | 'everyone';
}): Promise<Message> => {
    return new Promise((resolve, reject) => {
        if (config('state') === 'prod' && user.id === Values.OwnerID) return reject('Cannot be done on the owner');
        const collector = message.createMessageCollector({});
        let resolved = false;

        collector.on('message', (msg) => {
            if (whoCanReply === 'everyoneexeptuser' && msg.authorID === user.id) return;
            if (whoCanReply === 'useronly' && msg.authorID !== user.id) return;

            resolved = true;
            collector.end('collected');
            return resolve(msg);
        });

        setTimeout(() => {
            collector.end('time exeeded');
        }, time);

        collector.on('end', () => {
            if (!resolved) return reject('No message');
        });
    });
};
