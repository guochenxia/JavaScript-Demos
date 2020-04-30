function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let balance = $('balance')
let money_plus = $('money-plus')
let money_minus = $('money-minus')
let list = $('list')
let form = $("form")
let text = $('name')
let amount = $('amount')

let dummy = JSON.parse(localStorage.data)

form.addEventListener('submit', addDeal)

function init() {
  list.innerHTML = ''
  
  dummy.forEach(ele => {
    renderDom(ele)
  })
  updateValue()
}

init()

function renderDom(dummy) {
  const sign = dummy.amount < 0 ? '-' : '+'

  let li = document.createElement('li')
  li.classList.add(dummy.amount < 0 ? 'minus' : 'plus')
  li.innerHTML = `
  ${dummy.name}<span>${sign}${Math.abs(dummy.amount)}</span><button class="del-btn" onClick='remove(${dummy.id})'>x</button>
  `
  list.appendChild(li)
}

// 更新余额 收入 支出
function updateValue(){
  // 金额数组
  const moneyAll = dummy.map(money => money.amount) 

  // 求总金额
  let balance1 = moneyAll.reduce((acc, item) => 
  {return acc += item}, 0).toFixed(2)
  balance.innerText = `${balance1}`

  // 收入
  let income = moneyAll.filter(ele => ele > 0).reduce((acc, item) => {
    return acc += item
  }, 0).toFixed(2)
  money_plus.innerText = `+${income}`

  // 支出
  let minus = moneyAll.filter(ele => ele < 0).reduce((acc, item) => {
    return acc += item
  }, 0).toFixed(2)
  money_minus.innerText = minus
}

// 添加交易
function addDeal(e){
  e.preventDefault()

  let dealName = text.value
  let dealAmount = parseInt(amount.value)
  if (dealName.trim() === '' || !dealAmount) {
    alert('你是瞎子吗')
  } else {
    let obj = {
      id: randomID(),
      name: dealName,
      amount: dealAmount
    }
    console.log(obj)
    dummy.push(obj)
    localStorage.setItem('data', JSON.stringify(dummy))
    init()
    text.value = ''
    amount.value = ''
  }
  
}

function randomID(){
  return Math.floor(Math.random() * 1000000000)
}

function remove(id) {
  dummy = dummy.filter(ele => ele.id !== id)
  localStorage.setItem('data', JSON.stringify(dummy))
  init()
}