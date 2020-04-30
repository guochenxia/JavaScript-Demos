function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let rulesBtn = $('rules-btn')
let closeBtn = $('close')
let rulesEl = $('rules')
let canvas = $('canvas')

rulesBtn.addEventListener('click', () => {
  rulesEl.classList.add('show')
})

closeBtn.addEventListener('click', () => {
  rulesEl.classList.remove('show')
})

let ctx = canvas.getContext('2d')
let score = 0
let brickRowCount = 9
let brickColCount = 5

// 创建球体
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4
}

// 创建挡板
const paddle = {
  x : canvas.width / 2 - 40,
  y : canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0
}

// 创建砖块
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true
}

const bricks = []
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = []
  for(let j = 0; j < brickColCount; j++){
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
    bricks[i][j] = {x, y, ...brickInfo}
  }
}
console.log(bricks)

function drawBall() {
  ctx.beginPath()
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
  ctx.closePath()
}

function drawPaddle(){
  ctx.beginPath()
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
  ctx.fillStyle = '#0095dd'
  ctx.fill()
  ctx.closePath()
}

// 绘制得分
function drawScore(){
  ctx.font = '20px Arial'
  ctx.fillText(`得分：${score}`, canvas.width - 100, 30)
}

// 绘制砖块
function drawBricks(){
  bricks.forEach(col => {
    col.forEach(brick => {
      ctx.beginPath()
      ctx.rect(brick.x, brick.y, brick.w, brick.h)
      ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent'
      ctx.fill()
      ctx.closePath()
    })
  })
}

// 挡板
function movePaddle(){
  paddle.x += paddle.dx

  // 设置移动边界
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w // 最右侧
  }

  if(paddle.x < 0) {
    paddle.x = 0
  }
}

// 球体运动
function moveBall(){
  ball.x += ball.dx
  ball.y += ball.dy

  // 左右边界判断
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    ball.dx *= -1 // 撞击后反弹
  }

  // 上下边界判断
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    ball.dy *= -1 // 撞击后反弹
  }

  // 撞击挡板
  if (ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y) {
      ball.dy = -ball.speed
  }

  // 撞击砖块
  bricks.forEach(col => {
    col.forEach(brick => {
      if (brick.visible) {
        if (ball.x - ball.size > brick.x && // 撞击砖块左侧
          ball.x + ball.size < brick.x + brick.w && // 撞击砖块后侧
          ball.y + ball.size > brick.y && // 撞击砖块顶部
          ball.y - ball.size < brick.y + brick.h // 撞击砖块底部
          ) {
            ball.dy *= -1
            brick.visible = false

            increaseScore()
        }
      }
    })
  })

  // 如果没有接住小球
  if (ball.y + ball.size > canvas.height) {
    showAllBricks()
    score = 0
  }
}

function keyDown(e){
  console.log(e.key)
  if (e.key === 'ArrowRight' || e.key === 'right') {
    paddle.dx = paddle.speed
  }
  if (e.key === 'ArrowLeft' || e.key === 'left') {
    paddle.dx = -paddle.speed
  }
}

function keyUp(e){
  if (e.key === 'ArrowRight' || e.key === 'right' || e.key === 'ArrowLeft' || e.key === 'left') {
    paddle.dx = 0
  }
}

// 监听键盘
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function increaseScore(){
  score++
  if (score % (brickRowCount * brickColCount) === 0) {
    showAllBricks()
  }
}

function showAllBricks(){
  bricks.forEach(col => {
    col.forEach(brick => {brick.visible = true})
  })
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawPaddle()
  drawScore()
  drawBricks()
}

// 更新所有绘制函数及动画
function update(){
  // 移动挡板
  movePaddle()

  moveBall()

  draw()

  window.requestAnimationFrame(update)
}

draw()
update()
