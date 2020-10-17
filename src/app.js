import tmi from 'tmi.js'

const client = new tmi.Client({
	options: { debug: true },
	connection: {
		reconnect: true,
		secure: true
	},
	identity: {
		username: 'quizbot',
		password: 'oauth:jd8o89z5ucuzps1ooxmyornq4m7owh'
	},
	channels: [ 'j_xx_n' ]
});
client.connect().catch(console.error);
client.on('message', (channel, userstate, message, self) => {
	if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${userstate.username}, heya!`);
	}
});