const modal = document.getElementById("crud-modal");
const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskName");
const listContainer = document.getElementById("listContainer");
const addTaskBtnContainer = document.getElementById('')
// const isEditBtn = false;
// document.getElementById()
// let crossBtn = null;

/**
 * When user refresh the window then if data is available then create the list items
*/
window.addEventListener('load', ()=>{
	console.log("loaded")
	const url = "/todo";
	fetch(url)
	.then((response) => response.json())
	.then((data) => {
		listContainer.innerHTML = "";
		data.forEach(element => {
			createUi(element)
		});
	})
	.catch((error) => console.log(error))
})

// Listen click on task button where popup will be open
openModalBtn.addEventListener("click", () => {
	modal.classList.remove("hidden");
	if(isEditBtn){
		<button id="editTaskBtn" class="w-full text-white bg-blue-700 hover:bg-blue-800 p-3 rounded-lg transition-all duration-300 shadow-md">Update Task</button>
	}
});

// In popup when user click on close button
closeModalBtn.addEventListener("click", () => {
	modal.classList.add("hidden");
});

// When user wants to add the task in to-do list
addTaskBtn.addEventListener('click', (e)=>{
	e.preventDefault();
	const taskObject = createTaskObject(taskInput.value);
	// console.log(taskObject);
	// const isAvailable =  editTask(taskObject);
	addTask(taskObject);
	// close the model when task is added
	modal.classList.add("hidden");
	taskInput.value = "";
})

/**
 * This function will create object with user data
 *
 * */
function createTaskObject(inputValue){
	const obj = {
		id: Date.now(),
		name: inputValue,
		createdAt: new Date(),
	}
	return obj
}

/**
 * This function will called when user click on "Add task button" after that this function will call create ui
 * */
function addTask(data){
	const url = "/todo";
	const taskPostConfig = {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data)
}
	fetch(url, taskPostConfig)
	.then((response) => response.json())
	.then((data) => createUi(data))
	.catch((error) => console.log(error))
}

/**
 * This function is used to create list items which will displayed on ui
 * */
const createUi = (dataObj) => {
	const listItem = document.createElement('li');
	listItem.id = dataObj.id;
	listItem.classList.add("list-item");
	const taskName = document.createElement('span');
	taskName.classList.add("first-letter:capitalize");
	taskName.innerText = dataObj.name;
	listItem.appendChild(taskName)
	const dateContainer = document.createElement('span');
	dateContainer.innerText = dataObj.createdAt.split("T")[0];
	listItem.appendChild(dateContainer);
	const checkedBtn = document.createElement('button');
	checkedBtn.id = "checkedBtn";
	let isChecked = false;
	checkedBtn.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
	checkedBtn.classList.add("checked-btn");
	listItem.appendChild(checkedBtn);

	crossBtn = document.createElement('button');
	crossBtn.classList.add("cross-btn");
	crossBtn.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
	listItem.appendChild(crossBtn);

	editBtn = document.createElement('button');
	editBtn.classList.add("edit-btn");
	editBtn.innerHTML = '<i class="fa-solid fa-user-pen"></i>';
	listItem.appendChild(editBtn);
	listContainer.appendChild(listItem);

	checkedBtn.addEventListener('click', ()=>{
		isChecked = !isChecked;
		checkedBtn.innerHTML = isChecked ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-regular fa-circle-check"></i>';
		listItem.style.textDecoration = isChecked ? "line-through" : "none";
		//listItem.style.backgroundColor = isChecked ? "gray" : "rgb(175, 219, 228)"
	})

	crossBtn.addEventListener('click', ()=>{
		// fetch(`/deleteTask?=${encodeURIComponent(dataObj.id)}`,{
		// 	method:"delete"
		// })
		fetch(`/todo?id=${encodeURIComponent(dataObj.id)}`, {
			method: "DELETE"
		});
		listItem.remove();
	})

	editBtn.addEventListener('click',()=>{
		isEditBtn = !isEditBtn;
		modal.classList.remove("hidden");
		taskInput.value = dataObj.name;
		const taskObject = createTaskObject(taskInput.value);
		console.log(taskInput.value,'task object')
		// editTask();
	})
}


function editTask(data){
	const url = '/todo';
	const taskPostConfig = {
		method: "PATCH",
		headers: {
			'Content-type': 'application/json',
		},
		body: JSON.stringify(data)
	}
	fetch(url, taskPostConfig)
	.then((response) => response.json())
	.then((data) => updateTask(data))
	.catch((error) => console.log(error))
}

// function updateTask(){

// }