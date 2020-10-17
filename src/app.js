import tmi from 'tmi.js'
import { BOT_USERNAME, CHANNEL_NAME, OAUTH_TOKEN } from './constants';

const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: BOT_USERNAME,
		password: OAUTH_TOKEN
	},
	channels: [ CHANNEL_NAME ]
});
client.connect().catch(console.error);
client.on('message', (channel, userstate, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${userstate.username}, heya!`);
	}
});