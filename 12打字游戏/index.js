function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let settingBtn = $('setting-btn')
let seeting = $('setting')
let word = $('word')
let text = $('text')
let timeEl = $("time")
let scoreEl = $('score')
let endGameEl = $('end-game-container')
let settingForm = $("setting-form")
let level = $('level')

const words = ['sign', 'tense', 'apple', 'banana', 'juice', 'bad', 'appearance', 'good', 'pie', 'night', 'justice', 'admit', 'drag', 'display', 'love', 'dbh', 'sliver', 'north', 'south', 'ball', 'depend', 'admit', 'root', 'street', 'clothes', 'trump', 'k98']

// 焦点到input输入框
text.focus()

// 初始单词
let randomWord

// 初始时间和分数
let time = 10
let score = 0

let difficuty = localStorage.difficuty ? localStorage.difficuty : null
level.value = localStorage.difficuty ? localStorage.difficuty : null

settingBtn.addEventListener('click', () => {
  setting.classList.toggle('hide')
})

text.addEventListener('input', (e) => {
  const inputText = e.target.value
  if (inputText === randomWord) {
    console.log("输入正确")
    addWordToDom()
    updateScroe()
    e.target.value = ''

    switch(difficuty){
      case 'easy':
        time += 5
        break
      case 'medium':
        time += 3
        break
      case 'hard':
        time += 2
        break
    }
  }
})

// 难度选择时间监听
level.addEventListener('change', (e) => {
  difficuty = e.target.value
  localStorage.setItem('difficuty', difficuty)
})

// 倒计时
const timeInterval = setInterval(updateTime, 1000)


addWordToDom()

function getRandomWord(){
  return words[Math.floor(Math.random() * words.length)]
}

function addWordToDom(){
  randomWord = getRandomWord()
  word.innerText = randomWord
}

function updateScroe(){
  score++
  scoreEl.innerText = `${score}分`
}

function updateTime(){
  time--
  timeEl.innerText = `${time}s`
  if (time === 0) {
    clearInterval(timeInterval)
    gameOver()
  }
}

function gameOver(){
  endGameEl.style.display = 'flex'
  endGameEl.innerHTML = `
    <h1>游戏结束</h1>
    <p style='margin: 10px 0'>您的最终得分：${score}</p>
    <button onClick='location.reload()'>再玩一次</button>
  `
}