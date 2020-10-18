let now = new Date()
let currentQuizStart = now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
console.log(currentQuizStart)
let currentQuizTime = 300
console.log(currentQuizTime)
var millisecondsToWait = 10000;
setTimeout(function() {
    console.log(timeValid())
}, millisecondsToWait);

function timeValid() {
    let times = currentQuizStart.split(':')
    let now = new Date()
    let newSecond = now.getSeconds() - times[2]
    let newMin = now.getMinutes();
    if (newSecond < 0) {
        newMin -= 1
        newSecond = 60 + newSecond
    }
    newMin -= times[1]
    let newHour = now.getHours()
    if (newMin < 0) {
        newHour -= 1
        newMin = 60 + newMin
    }
    newHour -= times[0]
    let seconds = (newHour * 60 * 60) + (newMin * 60) + newSecond
    console.log('seconds passed:',seconds)
    console.log('time:',currentQuizTime)
    return seconds < currentQuizTime
    
}