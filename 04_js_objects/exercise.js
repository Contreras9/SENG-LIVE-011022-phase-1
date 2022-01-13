// this function will take the array as an argument and return the next id.
const nextId = (array) => array[array.length - 1].id + 1;

const copy = (obj) => JSON.parse(JSON.stringify(obj));

const todoList = [
  {
    id: 1,
    task: 'Learn about JS Data Types',
    complete: true,
    dueDate: '2021-12-13'
  },
  {
    id: 2,
    task: 'Learn about Iteration',
    complete: false,
    dueDate: '2021-12-14'
  },
]

function addTask(todoList, task) {
  todoList.push({ ...task, id: nextId(todoList) })
  return task;
}

// // 👟👟👟 uncomment the lines below to test

console.log('addTask', addTask(todoList, {
  task: 'Practice using the filter method',
  complete: false,
  dueDate: '2021-12-15'
}))
console.log('todoList after addTask', copy(todoList))


function incompleteTasks(todoList) {
  return todoList.filter(task => !task.complete)
}

// // 👟👟👟 uncomment the lines below to test

console.log('incompleteTasks', incompleteTasks(todoList))
console.log('todoList after incompleteTasks', copy(todoList))



function incompleteTaskCount(todoList) {
  return incompleteTasks(todoList).length;
}

// // 👟👟👟 uncomment the lines below to test

console.log('incompleteTaskCount', incompleteTaskCount(todoList))
console.log('todoList after incompleteTaskCount', copy(todoList))


function removeTask(todoList, taskId) {
  // destructively
  const indexToRemove = todoList.findIndex(task => task.id === taskId);
  todoList.splice(indexToRemove, 1);
  return todoList;
  // non destructively
  // return todoList.filter(task => task.id !== taskId)
}

// // 👟👟👟 uncomment the lines below to test

console.log('addTask', addTask(todoList, {
  task: 'demo task',
  complete: false,
  dueDate: '2021-12-15'  
}));
console.log('todoList after addTask', copy(todoList));
console.log('removeTask', removeTask(todoList, 4));
console.log('todoList after removeTask', copy(todoList));

/*
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
### Task 1: `markComplete(todoList, taskId)`
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
*/

// ✅ fill in function body below
function markComplete(todoList, taskId) {

}

// // 👟👟👟 uncomment the lines below to test
// console.log('markComplete', markComplete(todoList, 2))
// console.log('todoList after markComplete', copy(todoList))

/*
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
*/




/*
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
### Task 2: `updateDueDateForTask(todoList, taskId, dueDate)`
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
*/

// ✅ fill in function body below
function updateDueDateForTask(todoList, taskId, dueDate) {

}

// // 👟👟👟 uncomment the lines below to test
// console.log('updateDueDateForTask', updateDueDateForTask(todoList, 2, '2022-01-13'))
// console.log('todoList after updateDueDateForTask', copy(todoList))

/*
🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 🚧 
*/