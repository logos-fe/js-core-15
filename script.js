const myList = document.querySelector('#app-list')
const todo = document.querySelector('#app-new-todo')

const counter = document.querySelector('.todo-count')
const footerList = document.querySelector('.filters')
const clearButton = document.querySelector('#app-clear-completed')

function addTodo() {
  const li = document.createElement('li')

  const toggleInput = document.createElement('input')
  toggleInput.classList.add('toggle')
  toggleInput.type = 'checkbox'

  const label = document.createElement('label')
  label.innerText = todo.value

  const deleteButton = document.createElement('button')
  deleteButton.classList.add('destroy')

  li.append(toggleInput)
  li.append(label)
  li.append(deleteButton)

  myList.append(li)
  todo.value = ''
}

function calculateCount() {
  let count = 0
  const liList = myList.getElementsByTagName('li')

  for (let i = 0; i < liList.length; i++) {
    if (liList[i].style.display !== 'none') {
      count++
    }
  }

  counter.innerText = count
}

todo.addEventListener('keyup', (event) => {
  // enter keyCode = 13, key = 'Enter
  if (event.key === 'Enter') {
    // trim() removes whitespace from the beginning and end of a string
    // '  df  sad  ' -> 'dfsad'
    // '     ' -> ''

    // '', 0, false, null, undefined -> false
    // Boolean('') -> false
    // !'', !0, !false, !null, !undefined -> true
    // !!'', !!0, !!false, !!null, !!undefined -> false
    // [].length -> 0
    // console.log(''.length !== 0) // false
    // console.log(''.length === 0) // true
    // console.log(!'') //
    if (todo.value.trim()) {
      addTodo()
      calculateCount()
    }
  }
})

myList.addEventListener('click', (event) => {
  const parent = event.target.parentElement // li element
  if (event.target.tagName === 'INPUT') {
    parent.classList.toggle('completed')
  }

  if (event.target.tagName === 'BUTTON') {
    parent.remove()
    calculateCount()
  }
})

function filterActiveElements() {
  const li = myList.getElementsByTagName('li')

  for (let i = 0; i < li.length; i++) {
    if (li[i].classList.contains('completed')) {
      li[i].style.display = 'none'
    }
  }
  calculateCount()
}

function filterCompletedElements() {
  const li = myList.getElementsByTagName('li')

  for (let i = 0; i < li.length; i++) {
    if (!li[i].classList.contains('completed')) {
      li[i].style.display = 'none'
    }
  }
  calculateCount()
}

function showAllElements() {
  const li = myList.getElementsByTagName('li')

  for (let i = 0; i < li.length; i++) {
    li[i].style.display = ''
  }
  calculateCount()
}

function checkAction(id) {
  switch(id) {
    case 'app-activeTodos': return filterActiveElements()
    case 'app-completedTodos': return filterCompletedElements()
    default: return showAllElements()
  }
}

footerList.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    const parentUL = event.target.parentElement.parentElement // UL element
    const liList = parentUL.getElementsByTagName('li') // Array of LI elements

    for (let i = 0; i < liList.length; i++) {
      liList[i].children[0].classList.remove('selected')
    }

    showAllElements()
    checkAction(event.target.id)
    event.target.classList.add('selected')
  }
})

clearButton.addEventListener('click', () => {
  const liCompleted = myList.getElementsByClassName('completed')

  while (liCompleted.length) {
    liCompleted[0].remove()
  }

  calculateCount()
  // the same as while
  // for (let i = liCompleted.length - 1; i >= 0; i--) {
  //   liCompleted[i].remove()
  // }
})
