function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let form = $('form')
let prevBtn = $('prev')
let nextBtn = $('next')
let songName = $('songName')
let lyricContainer = $('lyric-container')
let btnGroup = $('btn-group')
let lyric = document.getElementsByClassName('lyric')[0]

let baseUrl = 'https://api.lyrics.ovh/'

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let text = songName.value

  if (text.trim() !== '' || text !== '') {
    searchSong(text)
  } else {
    alert('请不要输入空字符串')
  }
})

// 歌词按钮的点击 用到事件委托
lyricContainer.addEventListener('click', (e) => {
  if(e.target.tagName === 'BUTTON'){
    // 显示歌词
    let artist = e.target.getAttribute('data-artist')
    let title = e.target.getAttribute('data-title')
    console.log(artist, title)

    getLyrics(artist, title)
  }
})

async function searchSong(val) {
  let res = await fetch(`${baseUrl}/suggest/${val}`)
  let data = await res.json()
  console.log(data)
  renderLyricDiv(data)
}

function renderLyricDiv(data) {
  lyricContainer.innerHTML = ''
  data.data.forEach(data => {
    let lyric = document.createElement('div')
    lyric.classList.add('lyric')
    lyric.innerHTML = `
    <img src="${data.artist.picture_small}" alt="${data.title}">
    <p><strong>${data.artist.name}</strong> - ${data.title}</p>
    <button id="showlyrics" class="btn btn-small" data-artist='${data.artist.name}' data-title='${data.title}'>歌词</button>
    `
    lyricContainer.appendChild(lyric)
  })
  if (data.prev || data.next) {
    btnGroup.innerHTML = `
      ${data.prev ?
         `<button class="btn btn-small" onclick="getMore('${data.prev}')">上一页</button>` 
         : ''}
      ${ data.next ? 
        `<button class="btn btn-small" onclick="getMore('${data.next}')">下一页</button>` 
        : '' }
  `
  }
}

async function getMore(url){
  let res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
  let data = await res.json()
  renderLyricDiv(data)
}

async function getLyrics(artist, title){
  let res = await fetch(`${baseUrl}/v1/${artist}/${title}`)
  let data = await res.json()
  console.log(data.lyrics)
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')

  lyricContainer.innerHTML = `
    <h2><strong>${artist}</strong> - ${title}</h2><span>${lyrics}</span>
  `
}
