function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let main = $('main')
let add = $('add')
let double = $('double')
let millionaires = $('millionaires')
let sort = $('sort')
let calc = $('calc')
let data = []

getUser()
getUser()
getUser()
add.addEventListener('click', getUser)
double.addEventListener('click', doubleMoney)
millionaires.addEventListener('click', checkBW)
sort.addEventListener('click', sortMoney)
calc.addEventListener('click', calcMoney)

// 使用fetch请求随机富翁数据
async function getUser() {
  const res = await fetch('https://randomuser.me/api')
  const data = await res.json()
  let name = `${data.results[0].name.first} ${data.results[0].name.last}`
  let money = Math.floor(Math.random() * 1000000)
  let newUser = {
    name,
    money
  }
  addUser(newUser)
}

function addUser(user) {
  data.push(user)
  updateDom()
}

function updateDom(userData = data) {
  main.innerHTML = `<h2><strong>Person</strong><strong>Wealth</strong></h2>`

  userData.forEach(item => {
    const div = document.createElement('div')
    div.classList.add('person')
    div.innerHTML = `<strong>${item.name}</strong>${formatMoney(item.money)}`
    main.appendChild(div)
  })
}

function formatMoney(money) {
  return '$' + money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}

// 资金翻倍
function doubleMoney() {
  data = data.map(user => {
    return {...user, money: user.money * 2}
  })
  console.log(data)
  updateDom()
}

// 资金排序
function sortMoney() {
  data.sort((a, b) => {
    return b.money - a.money
  })
  updateDom()
}

// 查询百万富翁
function checkBW() {
  data = data.filter(user => {
    return user.money > 1000000
  })
  updateDom()
}

// 资金总额
function calcMoney() {
  const wealth = data.reduce((acc,cur) => (acc += cur.money), 0)
  const waelthEle = document.createElement('div')
  waelthEle.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`
  main.appendChild(waelthEle)
}