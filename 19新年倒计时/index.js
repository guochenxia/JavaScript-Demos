function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let year = $('year')
let days = $('days')
let hours = $('hours')
let mins = $('mins')
let secs = $('secs')
let loading = $('loading')
let countDown = $('countDown')

const curYear = new Date().getFullYear()
const newYearTime = new Date(`January 01 ${curYear + 1} 00:00:00`)

year.innerText = curYear + 1

// 更新倒计时
function updateCountDown(){
  const curTime = new Date()
  const time = newYearTime - curTime
  
  const d = Math.floor(time / 1000 / 60 / 60 / 24)
  const h = Math.floor(time / 1000 / 60 / 60) % 24
  const m = Math.floor(time / 1000 / 60) % 60
  const s = Math.floor(time / 1000) % 60

  days.innerText = d
  hours.innerText = h < 10 ? `0${h}` : h
  mins.innerText = m < 10 ? `0${m}` : m
  secs.innerText = s < 10 ? `0${s}` : s
}

setTimeout(() => {
  loading.remove()
  countDown.style.display = 'flex'
}, 1000)
setInterval(() => {
  updateCountDown()
}, 1000)
