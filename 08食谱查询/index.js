function $(id) {
  return typeof id === 'string' ? document.getElementById(id) : null
}

let text = $('keyWord')
let submit = $('submit')
let random = $('random')
let meals = $('meals')
let resHeading = $('result-heading')
let singleMeal = $('single-meal')

// 表单提交事件
submit.addEventListener('submit', searchMeal)
random.addEventListener('click', getRandomMeal)

function searchMeal(e) {
  e.preventDefault()

  singleMeal.innerHTML = ''

  // 获取输入框的值
  let searchText = text.value.trim()

  if (searchText === '') {
    alert('请输入内容啊')
  } else {
    // 获取食谱
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        resHeading.innerText = `Search result for '${searchText}'`
        if (data.meals === null) {
          resHeading.innerText = `没有查询到关于 '${searchText}' 的结果`
        } else {
          meals.innerHTML = data.meals.map(meal =>
            `
            <div class='meal'>
              <img src='${meal.strMealThumb}' alt='${meal.strMeal}'>
              <div class='mealInfo' data-mealId='${meal.idMeal}'>
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
            `
          ).join('')
        }
      })
  }

  meals.addEventListener('click', (e) => {
    const mealInfo = e.path.find(item => {
      if (item.classList) {
        return item.classList.contains('mealInfo')
      } else {
        return false
      }
    })

    if (mealInfo) {
      const id = mealInfo.getAttribute('data-mealId')
      getMealById(id)
    }
  })
}

function getMealById(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(res => res.json()).then(data => {
    const meal = data.meals[0]
    addMealToDom(meal)
  })
}

function addMealToDom(meal) {
  console.log(meal)
  const ingredients = []
  for (let i = 1; i < 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      )
    } else {
      break;
    }
  }

  singleMeal.innerHTML = `
    <div class='single'>
      <h1>${meal.strMeal}</h1>
      <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
      <div class='single-meal-info'>
      ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
      ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class='main'>
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </div>
  `
}

function getRandomMeal(){
  resHeading.innerText = ''
  meals.innerHTML = ''

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res => res.json()).then(data => {
    const meal = data.meals[0]
    addMealToDom(meal)
  })
}