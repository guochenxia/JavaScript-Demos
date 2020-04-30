function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let postContainer = $('posts-container')
let number = $('page')
let loading = $('loader')
let filter = $('filter')

let limit = 5 // 每页文章个数
let page = 1 // 当前页数

async function getposts(){
  const res = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

  const data = await res.json()
  return data
}

async function showPosts(){
  const posts = await getposts()
  console.log(posts)
  if (posts.length === 0) {
    alert('文章到底啦...')
    console.log('文章到底啦...')
  } else {
    posts.forEach(post => {
      const postEl = document.createElement('div')
      postEl.classList.add('post')
      postEl.innerHTML = `
      <div class="page" id="page">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
      `
      postContainer.appendChild(postEl)
    })
  }
}

showPosts()

window.addEventListener('scroll', (e) => {
  let scrollHeight = document.documentElement.scrollHeight // 整个文档的高度
  let scrollTop = document.documentElement.scrollTop // 滚动的高度
  let clientHeight = document.documentElement.clientHeight // 可视区域的高度

  if(scrollTop + clientHeight >= scrollHeight - 5){
    showLoading()
  } else {
    cancelLoading()
  }
})

function showLoading(){
  loading.classList.add('show')
  setTimeout(() => {
    cancelLoading()

    setTimeout(() => {
      page++
      showPosts()
    }, 100)
  }, 2000)
}

function cancelLoading(){
  loading.classList.remove('show')
}

filter.addEventListener('input', filterPosts)

function filterPosts(e){
  let val = e.target.value.toUpperCase()
  const posts = document.querySelectorAll('.post')
  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase()

    const body = post.querySelector('.post-body').innerText.toUpperCase()

    if (title.indexOf(val) !== -1){
      post.style.display = 'flex'
    } else {
      post.style.display = 'none'
    }
  })
}