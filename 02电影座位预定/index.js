function $(id) {
  return typeof id === 'string' ? document.getElementsByClassName(id) : null
}

let container = $('container')[0]
let seats = document.querySelectorAll('.row .seat:not(.occupied)')  // 不包含别人已选中的座位
let count = $('count')[0]
let total = $('total')[0]
let movieSelect = document.getElementById('movie')


// 更新选择座位以及票价信息
function updateSelect() {
  let price = parseInt(movieSelect.value)
  let selectedSeats = container.querySelectorAll('.row .seat.selected')
  let seatsCount = selectedSeats.length
  count.innerText = seatsCount
  total.innerText = seatsCount * price

  // 将已选座位的索引数组存储到本地
  let selectedSeatsIndex = [...selectedSeats].map((seat, i, arr) => {
    return [...seats].indexOf(seat)
  })
  localStorage.setItem('selectedSeatsIndex', JSON.stringify(selectedSeatsIndex))
  // console.log(JSON.parse(localStorage.selectedValue))
}

// 根据本地数据来渲染页面
function updateUI() {
  // 渲染座位
  let selectedSeats = JSON.parse(localStorage.selectedSeatsIndex)
  if (selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) { // 筛选出已选中的座位
        seat.classList.add('selected')
      }
    })
  }

  // 渲染下拉框
  movieSelect.selectedIndex = localStorage.selectedIndex
}

// 监听下拉框的选择时间
movieSelect.addEventListener('change', e => {
  // 在本地存储选择电影的索引以及票价
  localStorage.setItem('selectedIndex', e.target.selectedIndex)
  localStorage.setItem('selectedValue', e.target.value)

  updateSelect()
})

container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
    updateSelect()
  }
})

updateUI()
updateSelect()