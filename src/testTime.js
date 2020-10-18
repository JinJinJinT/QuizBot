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
    //if CurrentTime - currentQuizStart > currentQuizTime
    //caluculate the max time it should be
    let now = new Date()
    //let startSec = currentQuizStart.substring(6, 8)
    let newSecond = now.getSeconds() - currentQuizStart.substring(6, 8)
    let newMin = now.getMinutes();
    if (newSecond < 0) {
        newMin -= 1
        newSecond = 60 + newSecond
    }
    //let startMin = currentQuizStart.substring(3, 5)
    newMin -= currentQuizStart.substring(3, 5)
    let newHour = now.getHours()
    if (newMin < 0) {
        newHour -= 1
        newMin = 60 + newMin
    }
    //let startHours = currentQuizStart.substring(0, 2)
    newHour -= currentQuizStart.substring(0, 2)
    
    let seconds = (newHour * 60 * 60) + (newMin * 60) + newSecond
    console.log('seconds passed:',seconds)
    console.log('time:',currentQuizTime)
    return seconds < currentQuizTime
    
}