document.body.style.backgroundImage="url('img1.jpg')";
document.querySelector('.card-content').style.backgroundImage="url('img2.jpg')";
document.querySelector('.card-action').style.backgroundImage="url('img2.jpg')";
//Define UI vars
const form=document.querySelector('#task-form');
const taskList=document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

//Load all event listeners

loadEventListeners();

function loadEventListeners(){

    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);
    //Add task Event
    form.addEventListener('submit',addTask);
    //remove task event
    taskList.addEventListener('click',removeTask);
    //clear tasks event
    clearBtn.addEventListener('click',clearTasks);
    //filter tasks
    filter.addEventListener('keyup',filterTasks)
}

//get tasks from LS
function getTasks(){
    let tasks;
if(localStorage.getItem('tasks')===null){
    tasks=[];

} else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach(function(task){
    const li=document.createElement('li');
    //Add class
    li.className='collection-item';
    //Create Text node and append to li
    li.appendChild(document.createTextNode(task));
    //Create new link element
    const link=document.createElement('a');
    link.className='delete-item secondary-content';
    //Add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    //Append link to li
    li.appendChild(link);
    
    //Append li to UI
    taskList.appendChild(li);

});
}
//Add Task
function addTask(e){
if(taskInput.value===''){
    alert('Add a task');
}
else{
//create li element
const li=document.createElement('li');
//Add class
li.className='collection-item';
//Create Text node and append to li
li.appendChild(document.createTextNode(taskInput.value));
//Create new link element
const link=document.createElement('a');
link.className='delete-item secondary-content';
//Add icon html
link.innerHTML='<i class="fa fa-remove"></i>';
//Append link to li
li.appendChild(link);

//Append li to UI
taskList.appendChild(li);
//console.log(li);
//store in localstorage
storeTaskInLocalStorage(taskInput.value);
//Clear input
taskInput.value='';
e.preventDefault();
}
}

//Remove Taske

function removeTask(e){
if(e.target.parentElement.classList.contains('delete-item')) {
if(confirm('Are you Sure?')){
e.target.parentElement.parentElement.remove();
//remove from local storage
removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}
}
}
//remove from local storage

function removeTaskFromLocalStorage(taskItem){
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    
    } else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
    if(taskItem.textContent===task){
        tasks.splice(index,1);
    }
    localStorage.setItem('tasks',JSON.stringify(tasks));
    });

}
//clear tasks
function clearTasks(){
 // taskList.innerHTML='';  
 //faster
 while(taskList.firstChild){
     taskList.removeChild(taskList.firstChild);
 }
clearTasksFromLocalStorage();
}

//clear tasks from ls
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

//filter tasks

function filterTasks(e){
const text=e.target.value.toLowerCase();
document.querySelectorAll('.collection-item').forEach(function(task){
    const item=task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text)!=-1){
        task.style.display='block';
    }else{
       task.style.display='none';
    }
})
}

//store task
function storeTaskInLocalStorage(task){
let tasks;
if(localStorage.getItem('tasks')===null){
    tasks=[];

} else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
}
tasks.push(task);

localStorage.setItem('tasks',JSON.stringify(tasks));
} 
