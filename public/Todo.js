// Global Variables
const modal = document.getElementById("crud-modal");
const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskName");
const listContainer = document.getElementById("listContainer");
const addTaskBtnContainer = document.getElementById('')

// WHEN WINDOW IS LOADED FOR THE FIRST TIME OR USER REFRESH THE WINDOW ALL THE PREVIOUSLY ADDED TASKS ARE RETRIEVED


window.addEventListener('load', ()=>{
	const url = "/todo";
	fetch(url)
	.then((response) => {
		if(response.status == 200){
			return response.json()
		}else{
			listContainer.innerHTML = ""
			listContainer.innerText = response
		}
	})
	.then((data) => {
		listContainer.innerHTML = "";
		data.forEach(element => {
			createUi(element)
		});
	})
	.catch((error) => console.log(error))
})

// lISTEN CLICK ON PLUS BUTTON  POPUP IS SHOWN

openModalBtn.addEventListener("click", () => {
	modal.classList.remove("hidden");
});

// TO CLOSE THE POPUP USING CLOSE BUTTON

closeModalBtn.addEventListener("click", () => {
	modal.classList.add("hidden");
});

// WHEN USER WANTS TO ADD TE TASK IN TO-DO LIST

addTaskBtn.addEventListener('click', (e)=>{
	e.preventDefault();
	const taskObject = createTaskObject(taskInput.value);
	addTask(taskObject);
	modal.classList.add("hidden");
	taskInput.value = "";
})

// THIS FUNCTION WILL CREATE OBJECT WITH USER DATA

function createTaskObject(inputValue){
	const obj = {
		id: Date.now(),
		name: inputValue,
		createdAt: new Date(),
	}
	return obj
}

// THIS FUNCTION WILL CALLED W
/**
 * This function will called when user click on "Add task button" after that this function will call create ui
 * */
/**
 *
 * @param {user data like id, task, created at within an object} data
 */
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
	.then((response) => {
		response.status == 200?response.json():listContainer.innerHTML = "error occured refresh your page"
	})
	.then((data) => createUi(data))
	.catch((error) => console.log(error))
}

function createNewElem(elemObj){
	let newElem = document.createElement(elemObj.name);
	newElem.classList.add(...elemObj.class || []);
	newElem.id = elemObj.id || "";
	newElem.innerHTML = elemObj.innerText || "";
	return newElem;
}

/**
 * This function is used to create list items which will displayed on ui
 * */


const createUi = (dataObj) => {
	const listItem = createNewElem({name: "li", class: ["list-item"], id: dataObj.id, innerText:""})
	// const listItem = document.createElement('li');
	// listItem.id = dataObj.id;
	// listItem.classList.add("list-item");
	const taskName = createNewElem({name: "span", class: ["first-letter:capitalize"], innerText: dataObj.name})
	//const taskName = document.createElement('span');
	//taskName.classList.add("first-letter:capitalize");
	//taskName.innerText = dataObj.name;
	listItem.appendChild(taskName)
	const dateContainer = createNewElem({name: "span", innerText: dataObj.createdAt.split("T")[0]})
	// const dateContainer = document.createElement('span');
	// dateContainer.innerText = dataObj.createdAt.split("T")[0];
	listItem.appendChild(dateContainer);
	const checkedBtn = createNewElem({name: "button", id: "checkedBtn", class:["checked-btn"], innerText: '<i class="fa-regular fa-circle-check"></i>' })
	// const checkedBtn = document.createElement('button');
	// checkedBtn.id = "checkedBtn";
	let isChecked = false;
	// checkedBtn.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
	// checkedBtn.classList.add("checked-btn");
	listItem.appendChild(checkedBtn);

	const crossBtn = createNewElem({name: "button", class:["cross-btn"], innerText: '<i class="fa-solid fa-circle-xmark"></i>'})
	// crossBtn = document.createElement('button');
	// crossBtn.classList.add("cross-btn");
	// crossBtn.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
	listItem.appendChild(crossBtn);

	const editBtn = createNewElem({name: "button", class:["edit-btn"], innerText: '<i class="fa-solid fa-user-pen"></i>'})
	// editBtn = document.createElement('button');
	// editBtn.classList.add("edit-btn");
	// editBtn.innerHTML = '<i class="fa-solid fa-user-pen"></i>';
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