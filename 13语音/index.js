function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

const main = $("main")
const voice = $('voice')
const textarea = $("text")
const readBtn = $('read')
const close = $('close')
const toggleBtn = $('toggle')
let textBox = $('text-box')

const data = [
  {
    image: "./img/spring01.jpg",
    text: "春暖花开"
  },
  {
    image: "./img/summer01.jpg",
    text: "夏阳酷暑"
  },
  {
    image: "./img/autumn01.jpg",
    text: "雁过留声"
  },
  {
    image: "./img/winter01.jpg",
    text: "白雪皑皑"
  },
  {
    image: "./img/spring02.jpg",
    text: "草长莺飞"
  },
  {
    image: "./img/summer02.jpg",
    text: "骄阳似火"
  },
  {
    image: "./img/autumn02.jpg",
    text: "一叶知秋 "
  },
  {
    image: "./img/winter02.jpg",
    text: "瑞雪纷飞"
  },
  {
    image: "./img/spring03.jpg",
    text: "鸟语花香"
  },
  {
    image: "./img/summer03.jpg",
    text: "艳阳高照"
  },
  {
    image: "./img/autumn03.jpg",
    text: "秋风瑟瑟"
  },
  {
    image: "./img/winter03.jpg",
    text: "雪中送炭"
  }
]
let voices = []

// 初始化语音值的变量
const message = new SpeechSynthesisUtterance()

data.forEach(ele => {
  createBox(ele)
})

toggleBtn.addEventListener('click', () => {
  textBox.classList.toggle('show')
})

close.addEventListener('click', () => {
  textBox.classList.remove('show')
})

voice.addEventListener('change', setVoice)

readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value)
  speakText()
})

speechSynthesis.addEventListener('voiceschanged', getVoices)

getVoices()

function createBox(ele){
  const box = document.createElement('div')
  const {image, text} = ele
  box.classList.add('box')

  box.innerHTML = `
    <img src='${image}' alt='${text}'/>
    <p class='info'>${text}</p>
  `
  box.addEventListener('click', (e) => {
    setTextMessage(text)
    speakText()
    // 添加active
    box.classList.add('active')
    setTimeout(()=>{
      box.classList.remove('active')
    },1000)
  })
  main.appendChild(box)
}

function getVoices(){
  voices = speechSynthesis.getVoices()

  voices.forEach(ele => {
    const option = document.createElement('option')
    option.value = ele.name
    option.innerText = `${ele.name} ${ele.lang}`

    voice.appendChild(option)
  })
}

function setTextMessage(text){
  message.text = text
}
function speakText(){
  speechSynthesis.speak(message)
}

// 切换语音
function setVoice(e){
  message.voice = voices.find(voice => {
    console.log(voice.name)
    voice.name === e.target.value
  })
  console.log(message.voice)
}

