let todos = [];

const apiUrlGet = 'http://localhost:8080/tasks';
const apiUrlPost = 'http://localhost:8080/task';
const apiUrl = 'http://localhost:8080/task';


fetch(apiUrlGet)
  .then(response => response.json()) 
  .then(data => {
    todos = data.map(item => ({
      id: item.id,
      taskName: item.taskName,
      taskDesc: item.taskDesc,
      taskStatus: item.taskStatus,
      dueDate : item.dueDate
    }));
    renderTodos(); 
  })

let addTaskButton = document.querySelector('#addTaskButton');
let addTaskContainer = document.querySelector('#addTaskContainer');
let addButton = document.querySelector('#addButton');
let cancelButton = document.querySelector('#cancelButton');
let taskName = document.querySelector('#taskName');
let taskDescription = document.querySelector('#taskDescription');
let dueDate = document.querySelector('#dueDate');
let todoContainer = document.querySelector('#todoContainer');


const dateOption = {
    weekday: 'long',
    year: 'numeric',
    month:'long',
    day: 'numeric',
    hour12: true
    
}

addTaskButton.addEventListener('click',()=>{
    addTaskContainer.classList.remove('hidden');
    addTaskButton.classList.add('hidden');
})

cancelButton.addEventListener('click',()=>{
    addTaskContainer.classList.add('hidden');
    addTaskButton.classList.remove('hidden');
})

checkInput=()=>{
    const taskCheck = taskName.value;
    const descriptionCheck = taskDescription.value;
    const dateCheck = dueDate.value;
    
    
    if (taskCheck.trim() !== '' && descriptionCheck.trim() !== '' && dateCheck.trim() !== '') {
        addButton.disabled = false;
        addButton.classList.add('bg-black')
        addButton.classList.remove('bg-gray-500')
    } else {
        addButton.disabled = true;
        addButton.classList.add('bg-gray-500')
        addButton.classList.remove('bg-black')
        
        
    }
}

renderTodos=()=>{
    todoContainer.innerText="";
    todos.forEach((todo, index)=>{
        let date = new Date(todo.dueDate);
        let newDate =date.toLocaleDateString('en', dateOption);
        let taskDiv= document.createElement('div');
        let taskStatus = todo.taskStatus;
        if(todo.taskStatus === 'Mark as not done'){
            taskStatusClass = 'bg-green-200 border-green-800'
        }
        else{
            taskStatusClass = 'bg-white border-blue-500';
        }
        taskDiv.innerHTML = `
        <div id="task" class="border p-3 rounded-xl mb-3 ${taskStatusClass}">
        <div class="flex justify-between">
            <h1 class="text-base font-semibold">${todo.taskName}</h1>
            <p id="dateTime" class="text-[14px] pr-3">${newDate}</p>
        </div>
            <p class="text-[14px] font-light text-neutral-700">${todo.taskDesc}</p>
            <div class="flex gap-4 mt-2">
                <button><i data-id="${index}" class="markDone text-neutral-400 text-[14px] hover:text-blue-700 bi-check2-circle"> ${taskStatus}</i></button>
                <button><i data-id="${index}" class="taskDelete text-neutral-400 text-[14px] hover:text-red-500 bi bi-trash3"> Delete</i></button>
            </div>
        </div>`;
        
    
    todoContainer.appendChild(taskDiv);
    
    
    
    })
    let mark = document.querySelectorAll('.markDone');
    mark.forEach((taskCompleted)=>{
    taskCompleted.addEventListener('click', (e)=>{
        let index = e.target.getAttribute('data-id');
        let todo = todos[index];

        if(todo.taskStatus == 'Mark as not done'){
            todo.taskStatus = 'Mark as done';
        }
        else{
            todo.taskStatus = 'Mark as not done';
        }


        let task = {
            id : todo.id,
            taskStatus: todo.taskStatus,
            
        }

        fetch(apiUrl, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json',  
            },
            body: JSON.stringify(task), 
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);  
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        renderTodos();
        })
    })
    
    let del = document.querySelectorAll('.taskDelete');
    del.forEach((taskDeleted)=>{
    taskDeleted.addEventListener('click', (e)=>{
        let index = e.target.getAttribute('data-id');
        let todo = todos[index];


        fetch(apiUrl+"/"+todo.id, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(response => {
              if (response.ok) {
                console.log('Task deleted successfully');
              } else {
                console.error('Failed to delete the task');
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });


        todos.splice(index,1);
        renderTodos();
        })
    })
    let el = document.getElementById('todoContainer');
    new Sortable(el, {
    animation: 150,
    ghostClass: 'blue-background-class'
    });
    
}



addButton.addEventListener('click',()=>{
    let task = {
        taskName :  taskName.value,
        taskDesc : taskDescription.value,
        taskStatus: 'Mark as Done',
        dueDate : dueDate.value,
        
    }
    todos.push(task);
    addTaskContainer.classList.add('hidden');
    addTaskButton.classList.remove('hidden');


    fetch(apiUrlPost, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',  
    },
    body: JSON.stringify(task), 
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);  
    })
    .catch((error) => {
        console.error('Error:', error);
    });

    taskName.value = '';
    taskDescription.value = '';
    dueDate.value = '';

    addButton.disabled = true;
    addButton.classList.add('bg-gray-500');
    addButton.classList.remove('bg-black');


    


    renderTodos();
    
})
