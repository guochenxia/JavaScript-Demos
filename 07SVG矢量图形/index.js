function $(id){
  return typeof id === 'string' ? document.getElementById(id) : null
}

let word = $('word')
let errorLetters = $('error-letters')
let rePlay = $('replay')
let modal = $('modal-container')
let notification = $('notification-contianer')
let msg = $('msg')

let figureParts = document.querySelectorAll('.figure-part')

const words = ['appliction', 'programming', 'interface', 'wonder', 'xzw']

// 随机要猜的单词
let selectedWord = words[Math.floor(Math.random() * words.length)]

console.log(`随机单词：${selectedWord}`)

let correctLetters = []
let wrongLetters = []

function displayWord(){
  word.innerHTML = `
    ${selectedWord.split('').map(letter => 
      `
        <span class='letter'>${correctLetters.includes(letter) ? letter : ''}</span>
      `
    ).join('')}
  `
  let innerWord = word.innerText.replace(/\n/g, '')
  if(innerWord === selectedWord){
    console.log('输入正确')
    msg.innerText='恭喜你输入正确！'
    modal.style.display = 'flex'
  }
}

displayWord()

rePlay.addEventListener('click', () => {
  modal.style.display = 'none'
  correctLetters.splice(0)
  wrongLetters.splice(0)
  selectedWord = words[Math.floor(Math.random() * words.length)]

  displayWord()

  updateWrongLetters()
})

// 监听键盘按下事件
window.addEventListener('keydown', (e) => {
  console.log(e.key)
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key
    if (selectedWord.includes(letter)){
      if (!correctLetters.includes(letter)){
        correctLetters.push(letter)

        displayWord()
      } else {
        // 显示提示框
        showNotification()
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter)

        updateWrongLetters()
      } else {
        showNotification()
      }
    }
  }
})

function showNotification(){
  notification.classList.add('show')

  setTimeout(() => {
    notification.classList.remove('show')
  }, 2000)
}

function updateWrongLetters(){
  // 显示错误字母
  errorLetters.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>错误：</p>" : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `

  // 改变火柴人
  figureParts.forEach((ele, i) => {
    let errs = wrongLetters.length // 错误的次数
    console.log(i)
    if (i < errs) {
      ele.style.display = 'block'
    } else {
      ele.style.display = 'none'
    }
  })

  // 显示弹出框
  if (wrongLetters.length === figureParts.length) {
    msg.innerText = '很遗憾，游戏结束'
    modal.style.display = 'flex'
  }
}