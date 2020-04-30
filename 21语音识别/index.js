function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let msg = $('msg')

let randomNum = getRandom()

function getRandom(){
  return Math.floor(Math.random() * 100) + 1
}

console.log(randomNum)


let recognition = new webkitSpeechRecognition() || new SpeechRecognition()

recognition.start()

recognition.addEventListener('result', getSpeak)
recognition.addEventListener('end', () => {
  recognition.start()
})

function getSpeak(e){
  console.log(e.results[0][0].transcript)
  const msg = e.results[0][0].transcript

  writeMessage(msg)
  checkNum(msg)
}

function writeMessage(message){
  msg.innerHTML = `
  <div>你说的是:</div>
  <span class="box">${message}</span>
  `
}

function checkNum(message){
  const num = +message

  if (Number.isNaN(num)) {
    msg.innerHTML += `<div>这不是一个数字</div>`
    return
  }
  if (num > 100 || num < 1) {
    msg.innerHTML += `<div>说的数字必须1-100之间</div>`
    return
  }

  if (num === randomNum){
    document.body.innerHTML = `
      <h2>恭喜你猜对了<br><br>
      数字为${num}</h2>
      <button class='play-again' id='play-again'>再玩一次</button>
    `
  } else if(num > randomNum) {
    msg.innerHTML += `<div>高了</div>`
  } else {
    msg.innerHTML += `<div>低了</div>`
  }
}

// 再玩一次点击 使用事件委托
document.body.addEventListener('click', e => {
  if (e.target.id === 'play-again') {
    window.location.reload()
  }
})