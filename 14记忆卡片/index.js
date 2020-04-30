function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let cardContainer = $('card-container')
let clear = $('clear')
let prevBtn = $('prev')
let nextBtn = $('next')
let showBtn = $('show')
let hideBtn = $('hide')
let questionE = $('question')
let answerE = $('answer')
let addBtn = $('add-btn')
let currentEl = $('current')
let addContainer = $('add-container')

// 当前卡片下标
let currentActiveCard = 0

// 创建空数组存储card
let cardsEl = []

// 创建变量存储card里面的数据
let cardsData = getCardsData()
console.log(cardsData)

// 动态创建card
cardsData.forEach((ele, i)=>createCard(ele, i))

nextBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card left'

  currentActiveCard += 1
  if(currentActiveCard > cardsEl.length - 1) {
    currentActiveCard = cardsEl.length - 1
  }

  cardsEl[currentActiveCard].className = 'card active'
  updateCurrentPage()
})

prevBtn.addEventListener('click', () => {
  cardsEl[currentActiveCard].className = 'card right'

  currentActiveCard -= 1
  if(currentActiveCard < 0) {
    currentActiveCard = 0
  }

  cardsEl[currentActiveCard].className = 'card active'
  updateCurrentPage()
})

showBtn.addEventListener('click', () => {
  addContainer.classList.add('show')
})
hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show')
})

addBtn.addEventListener('click', () => {
  const question = questionE.value
  const answer = answerE.value

  if (question.trim() && answer.trim()){
    const newCard = {
      question,
      answer
    }

    createCard(newCard)
    questionE.value = ''
    answerE.value = ''
    addContainer.classList.remove('show')
    cardsData.push(newCard)
    setCardData(cardsData)
  }
})

clear.addEventListener('click', () => {
  localStorage.clear('cardsData')
  cardContainer.innerHTML = ''
  currentEl.innerHTML = ''
  window.location.reload()
})

function createCard(data, index){
  const card = document.createElement('div')
  card.classList.add('card')
  if (index === 0) {
    card.classList.add('active')
  }

  card.innerHTML = `
  <div class="inner-card">
    <div class="front">
      <p>${data.question}</p>
    </div>
    <div class="back">
      <p>${data.answer}</p>
    </div>
  </div>
  `
  card.addEventListener('click', () => {
    card.classList.toggle('show-answer')
  })
  cardsEl.push(card)
  cardContainer.appendChild(card)
  updateCurrentPage()
}

// 显示当前页码
function updateCurrentPage(){
  currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`
}

function getCardsData(){
  return localStorage.cardsData ? JSON.parse(localStorage.cardsData) : []
}

function setCardData(data){
  localStorage.setItem('cardsData', JSON.stringify(data))
  window.location.reload()
}