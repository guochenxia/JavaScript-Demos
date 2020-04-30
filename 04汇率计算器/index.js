function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let swap = $('swap')
let rate = $('rate')
let currency1 = $('currency-one')
let currency2 = $('currency-two')
let amount1 = $('amount-one')
let amount2 = $('amount-two')

// 获取汇率 dom更新
function getRate(){
  let val1 = currency1.value
  let val2 = currency2.value

  fetch(`https://api.exchangerate-api.com/v4/latest/${val1}`).then(res => res.json()).then(data => {
    console.log(data)
    let cash = data.rates[val2]
    rate.innerText = `${amount1.value} ${val1}=${amount1.value * cash} ${val2}`
    amount2.value = (amount1.value * cash).toFixed(2)
  })
}

getRate()

// 事件监听
currency1.addEventListener('change', getRate)
amount1.addEventListener('input', getRate)
currency2.addEventListener('change', getRate)
amount2.addEventListener('input', getRate)

swap.addEventListener('click', () => {
  const temp = currency1.value
  currency1.value = currency2.value
  currency2.value = temp
  getRate()
})