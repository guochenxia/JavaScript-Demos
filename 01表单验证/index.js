/**
 * 实现功能：
 * 验证input输入框是否为空
 * 验证邮箱是否符合格式
 * 验证密码长度
 * 验证两次密码是否一致
 */


function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let username = $('name')
let email = $('email')
let pwd = $('pwd')
let pwd2 = $('rePwd')
let form = $('form')
// console.log(username, email, pwd, pwd2)

// 判断是否为空的函数
function checkRequired(inputArr) {
  inputArr.forEach(input => {
    console.log(input.value)
    if (input.value.trim() === '') { // 用户输入为空
      showError(input, `${getKeyWord(input)}为必填项`)
    } else {
      showSuccess(input)
    }
  })
}

// 输入出错提示
function showError(input, message){
  let formItem = input.parentElement
  formItem.className = 'form-item error'
  let small = formItem.querySelector('small')
  small.innerText = message
}

// 输入成功函数
function showSuccess(input){
  let formItem = input.parentElement
  formItem.className = 'form-item success'
}

// 验证邮箱
function isValidateEmail(input) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
  if (reg.test(input.value.trim())) {
    showSuccess(input)
  } else {
    showError(input, '邮箱格式错误')
   }
}

// 验证密码长度
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input,`密码不能少于${min}个字符`)
  } else if (input.value.length > max) {
    showError(input,`密码不能大于${max}个字符`)
  } else {
    showSuccess(input)
  }
}

// 验证密码是否匹配
function checkPwd(p1, p2) {
  if (p1.value !== p2.value) {
    showError(p2, '两次输入的密码不一致')
  }
}

// 获取统一的错误提示关键字
function getKeyWord(input) {
  return input.placeholder.slice(3)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()
  checkRequired([username, email, pwd, pwd2])
  isValidateEmail(email)
  checkLength(pwd, 6, 12)
  checkPwd(pwd, pwd2)
})