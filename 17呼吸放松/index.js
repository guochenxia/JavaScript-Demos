function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let container = $('container')
let text = $('text')

const totalTime = 7500
const breathTime = (totalTime / 5) * 2
const holdTime = totalTime / 5

breathAnimation()

function breathAnimation(){
  console.log('吸气')
  text.innerText = '吸气'
  container.className = 'container grow'

  setTimeout(() => {
    console.log('keep')
    text.innerText = '保持'

    setTimeout(() => {
      console.log('吐气')
      text.innerText = '吐气'

      container.className = 'container small'
    }, holdTime)
  }, breathTime)
}

setInterval(() => {
  breathAnimation()
}, 7500)