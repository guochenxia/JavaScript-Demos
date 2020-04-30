function $(id){
  return typeof id === 'string' ? document.getElementById(id) : null
}

let toggle = $('toggle')
let login = $('login')
let close = $('close')
let modal = $('modal')

toggle.addEventListener('click', () => {
  document.body.classList.toggle('show-nav')
})

login.addEventListener('click', () => {
  modal.classList.add('show-modal')
})

close.addEventListener('click', () => {
  modal.classList.remove('show-modal')
})

window.addEventListener('click', (e) => {
  (e.target === modal) ? modal.classList.remove('show-modal') : false
})