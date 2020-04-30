function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let play = $('play')
let volume = $('volumeInput')
let volumeIcon = $('volume')
let fullScreen = $('fullScreen')
let container = $('container')
let video = $('video')
let currentTime = $('current')
let durationTime = $('duration')
let progress = $('progress')
let expand = $('fullScreen')
let line = $('line')
let play2 = $('bigIcon')

progress.value = 0

play.addEventListener('click',toggleVideoStatus)
play.addEventListener('click',toggleIcon)
play2.addEventListener('click',toggleVideoStatus)
play2.addEventListener('click',toggleIcon)

video.addEventListener('click',toggleVideoStatus)
video.addEventListener('play',toggleIcon)
video.addEventListener('pause',toggleIcon)
video.addEventListener('timeupdate', updateProgress) // 更新进度条和时间
video.addEventListener('canplay', getDuration)

volume.addEventListener('change', changeVolume)
volumeIcon.addEventListener('click', () => {
  console.log(video.volume)
  if (video.volume === 0) {
    video.volume = 1
    volume.value = 100
    console.log('现在该静音了')
    volumeIcon.innerHTML = `<i class='fa fa-volume-up'></i>`
  } else {
    video.volume = 0
    volume.value = 0
    volumeIcon.innerHTML = `<i class='fa fa-volume-off'></i>`
  }
  

})

progress.addEventListener('change', dragProgress)

expand.addEventListener('click', () => {
  container.webkitRequestFullScreen()
  expand.innerHTML = `<i class="fa fa-compress"></i>`
  if (document.body.scrollHeight === window.screen.height && document.body.scrollWidth === window.screen.width) {
    console.log('全屏')
    document.webkitCancelFullScreen()
  }
  
})


// 播放/暂停
function toggleVideoStatus() {
  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

// 切换播放/暂停按钮
function toggleIcon() {
  if (video.paused) {
    // 播放按钮
    play.innerHTML = `<i class="fa fa-play"></i>`
    play2.style.visibility = 'visible'
    console.log('你点了暂停')
  } else {
    play.innerHTML = `<i class="fa fa-pause"></i>`
    play2.style.visibility = 'hidden'
    console.log('你点了播放')
  }
}

// 更新进度条和时间
function updateProgress() {
  // 1. 更新时间
  let current = Math.floor(video.currentTime)
  let duration = Math.floor(video.duration)
  if (current >= 60) {
    let min = Math.floor(current / 60)
    let sec = current % 60
    min < 10 ? min = `0${min}` : min
    sec < 10 ? sec = `0${sec}` : sec
    currentTime.innerText = `${min}:${sec}`
  } else if (current >= 10){
    currentTime.innerText = `00:${current}`
  } else {
    currentTime.innerText = `00:0${current}`
  }

  // 2. 更新进度条
    let progressCount = current / duration * 100
    progress.value = progressCount
    // 拿到进度条的宽度
    let width = progress.offsetWidth
    // 进度条应走的宽度
    let lineWidth = (current / duration) * width
    // console.log(lineWidth)
    lineWidth < width ? lineWidth : width
    line.style.width = lineWidth + 'px'
}

// 获取总时间
function getDuration() {
  let min = Math.floor(video.duration / 60)
  let sec = Math.floor(video.duration % 60)
  min < 10 ? min = `0${min}` : min
  sec < 10 ? sec = `0${sec}` : sec
  durationTime.innerText = `${min}:${sec}`
}

// 拖动进度条更新时间
function dragProgress(){
  let val = parseInt(progress.value)
  console.log(progress.value)
  video.currentTime = val * video.duration / 100
}

function changeVolume(){
  console.log('当前音量：'+volume.value / 100)

  video.volume = volume.value / 100
}
