import tmi from 'tmi.js'
import { BOT_USERNAME, CHANNEL_NAME, OAUTH_TOKEN, KEYWORDS } from './constants';

const options = {
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
}
const client = new tmi.Client(options)
let activeQuizStatus = false
let currentQuizStart = -1
let currentQuizTime = -1
let currentOptions = []

client.connect().catch(console.error);

client.on('message', (channel, userstate, message, self) => {
    if(self) return;
	if(message.toLowerCase() === '!hello') {
		client.say(channel, `@${userstate.username}, heya!`);
    }
    if (activeQuizStatus && !timeValid()) {
        client.say(channel, `Quiz is over!`)
        activeQuizStatus = false;
    }
    checkTwitchChat(userstate, message, channel)

});

function checkTwitchChat(username, message, channel){
    let shouldExtractData = false;
    //check message
    shouldExtractData = KEYWORDS.some(command => message.includes(command.toLowerCase()))
    //get data from message
    if(shouldExtractData) {
        if(!activeQuizStatus && username.username === BOT_USERNAME && message.includes(KEYWORDS[0])) {
            //parse command
            //example quiz: !createquiz: What to do next?, 60, [Eat, Sleep, wake, die]
            message = message.substring(message.indexOf(':') + 1)
            let question = /^\s*(.+?),/gi.exec(message)[1]
            message = message.substring(message.indexOf(',')+1).trim()
            let time = /^\s*(.+?),/gi.exec(message)[1]
            message = message.substring(message.indexOf('[')+1, message.length - 1)
            let answers = message.split(',').map(ans=>ans.trim())

            //check if parameters are valid
            if (checkParam(answers, time, channel)) {
                createActiveQuiz(question, answers, time, channel)
            }
        } else if(activeQuizStatus && message.includes(KEYWORDS[1])) {
            //get the data
            message = message.substring(message.indexOf(':') + 1).trim()
            client.say(channel, `@${username.username} voted ${message}`)            
        }
    }
}

function checkParam(answers, time, channel) {
    if(answers.length == 1 && !answers[0]) {
        client.say(channel, `Format error: must have at least one answer option`)
        return false;
    } else if(!isNumeric(time)) {
        client.say(channel, `Format error: time must be an valid integer`)
        return false
    }
    return true
}

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }

function createActiveQuiz(question, options, time, channel){
    activeQuizStatus = true;
    let now = new Date();
    currentQuizStart = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
    currentQuizTime = time
    currentOptions = options
    client.say(channel, `Quiz Created: ${question}`)
    client.say(channel, `Quiz is active for ${time} seconds!`)
}

function timeValid() {
    let now = new Date()
    let newSecond = now.getSeconds() - currentQuizStart.substring(6, 8)
    let newMin = now.getMinutes();
    if (newSecond < 0) {
        newMin -= 1
        newSecond = 60 + newSecond
    }
    newMin -= currentQuizStart.substring(3, 5)
    let newHour = now.getHours()
    if (newMin < 0) {
        newHour -= 1
        newMin = 60 + newMin
    }
    newHour -= currentQuizStart.substring(0, 2)
    let seconds = (newHour * 60 * 60) + (newMin * 60) + newSecond
    return seconds < currentQuizTime
    
}