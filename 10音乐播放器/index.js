function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let musicContainer = $('music-container')
let prev = $('prev')
let play = $('play')
let next = $('next')

let audio = $("audio")
let progressContainer = $("progress-container")
let progress = $('progress')
let title = $('title')
let cover = $('cover')

const songs = ['hey', 'summer', 'ukulele']

// 歌曲下标 ，默认是ukulele
let songIndex = 2

// 初始化页面
loadSong(songs[songIndex])

function loadSong(song){
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `images/${song}.jpg`
}

// 播放
play.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play')

  if (isPlaying) {
    pauseSong()
  } else {
    playSong()
  }
})

function pauseSong(){
  musicContainer.classList.remove('play')
  audio.pause()
  play.querySelector('i.fas').classList.remove('fa-pause')
  play.querySelector('i.fas').classList.add('fa-play')
}

function playSong(){
  musicContainer.classList.add('play')
  audio.play()
  play.querySelector('i.fas').classList.remove('fa-play')
  play.querySelector('i.fas').classList.add('fa-pause')
}

// 切换歌曲
prev.addEventListener('click', prevSong)
next.addEventListener('click', nextSong)

function prevSong(){
  songIndex--
  if (songIndex < 0) {
    songIndex = songs.length - 1
  }
  loadSong(songs[songIndex])
  playSong()
}

function nextSong(){
  songIndex++
  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex])
  playSong()
}

// 更新进度条
audio.addEventListener('timeupdate', updateProgress)

function updateProgress(e){
  const {currentTime, duration} = e.srcElement

  const progressPrecent = (currentTime / duration) * 100
  progress.style.width = `${progressPrecent}%`
}

// 点击进度条
progressContainer.addEventListener('click', setProgress)

function setProgress(e){
  let width = this.clientWidth // 进度条总长度
  let clickX = e.offsetX;
  let duration = audio.duration
  audio.currentTime = (clickX / width) * duration
}

// 播放结束 自动切换
audio.addEventListener('ended', nextSong)