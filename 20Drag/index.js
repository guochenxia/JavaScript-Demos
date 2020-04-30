function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

const dragList = $('drag-list')
const checkBtn = $('check-btn')

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Bernard Arnault",
  "Warren Buffett",
  "Mark Zuckerberg",
  "Amancio Ortega",
  "Larry Ellison",
  "Larry Page",
  "Steve Ballmer",
  "Carlos Slim Helu"
]

// 存储排名
const listItem = []

let dragStartIndex;

createList()

function createList(){
  [...richestPeople]
  .map(p =>  ({value: p, sort: Math.random()}))
  .sort((a, b) => {return a.sort - b.sort})
  .map(a => a.value)
  .forEach((ele,i) => {
    const li = document.createElement('li')
    li.setAttribute('data-index', i)

    li.innerHTML = `
      <span class='number'>${i + 1}</span>
      <div class='dragable' draggable='true'>
        <p class='person-name'>${ele}</p>
        <i class='fas fa-grip-lines'></i>
      </div>
    `

    listItem.push(li)
    dragList.append(li)
  })

  // 事件监听
  addEventListener()
}

function addEventListener(){
  const draggables = document.querySelectorAll('.dragable')
  const dragListItems = document.querySelectorAll('.drag-list li')

  draggables.forEach(drag => {
    drag.addEventListener('dragstart', dragStart)
  })

  dragListItems.forEach(list => {
    list.addEventListener('dragenter', dragEnter)
    list.addEventListener('dragover', dragOver)
    list.addEventListener('dragleave', dragLeave)
    list.addEventListener('drop', dragDrop)
  })
}

function dragStart(){
  // this.closest('li')  当前选中元素最近的父级元素
  dragStartIndex = this.closest('li').getAttribute('data-index')
  console.log(dragStartIndex)
}
function dragEnter(){
  // console.log('dragEnter')
}
function dragOver(e){
  e.preventDefault()
  this.classList.add('over')
}
function dragLeave(){
  this.classList.remove('over')
}
function dragDrop(e){
  e.preventDefault()
  this.classList.remove('over')
  const dragEndIndex = this.getAttribute('data-index')
  console.log(dragEndIndex)
  swapItem(dragStartIndex, dragEndIndex)
}

function swapItem(fromIndex, endIndex){
  const itemOne = listItem[fromIndex].querySelector('.dragable')
  const itemTwo = listItem[endIndex].querySelector('.dragable')
  listItem[fromIndex].appendChild(itemTwo)
  listItem[endIndex].appendChild(itemOne)
}

checkBtn.addEventListener('click', checkOrder)

function checkOrder(){
  listItem.forEach((li,i) => {
    const personName = li.querySelector('.dragable').innerText.trim()

    if(personName !== richestPeople[i]){
      li.classList.add('err')
    } else {
      li.classList.remove('err')
      li.classList.add('right')
    }
  })
}

checkOrder()