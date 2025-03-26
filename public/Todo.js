// Global Variables
const modal = document.getElementById("crud-modal");
const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskInput = document.getElementById("taskName");
const listContainer = document.getElementById("listContainer");
const modelHeading = document.getElementById('modelHeading')
let isEditButton = false;
let editTaskId = null;


// WHEN WINDOW IS LOADED FOR THE FIRST TIME OR USER REFRESH THE WINDOW ALL THE PREVIOUSLY ADDED TASKS ARE RETRIEVED

// window.addEventListener('load', ()=>{
// 	const url = "/todo";
// 	fetch(url)
// 	.then((response) => {

// 		response.status == 200?response.json():listContainer.innerHTML = "error occured refresh your page"
// 	}).then((data) => {
// 		listContainer.innerHTML = "";
// 		data.forEach(element => createUi(element));
// 	}).catch((error) => console.log(error))
// })

window.addEventListener("load", () => {
	const url = "/todo";
	fetch(url)
		 .then(response => {
			  if (!response.ok) {
					throw new Error("Network response was not ok");
			  }
			  return response.json();
		 })
		 .then(data => {
			  listContainer.innerHTML = "";
			  data.forEach(element => createUi(element));
		 })
		 .catch(error => {
			  console.error("Error fetching tasks:", error);
			  listContainer.innerHTML = "Error occurred, refresh your page.";
		 });
});


// lISTEN CLICK ON PLUS BUTTON  POPUP IS SHOWN

openModalBtn.addEventListener("click", () => {
	modal.classList.remove("hidden");
	taskInput.focus();
	modelHeading.innerHTML = "Create new task"
	isEditButton = false;
});

// TO CLOSE THE POPUP USING CLOSE BUTTON

closeModalBtn.addEventListener("click", () => {
	modal.classList.add("hidden");
});

// WHEN USER WANTS TO ADD TE TASK IN TO-DO LIST

// addTaskBtn.addEventListener('click', (e)=>{
// 	e.preventDefault();
// 	const taskObject = createTaskObject(taskInput.value);
// 	addTask(taskObject);
// 	modal.classList.add("hidden");
// 	taskInput.value = "";
// })
addTaskBtn.addEventListener('click', addTaskEventHandler);
taskInput.addEventListener('keydown', (event) => {
	if (event.key === "Enter") {
		addTaskEventHandler(event);
	}
});

/**
 * Handles both click and Enter key events.
 */
function addTaskEventHandler(event) {
	event.preventDefault();
	const taskObject = createTaskObject(taskInput.value);
	addTask(taskObject);
	modal.classList.add("hidden");
	taskInput.value = "";
}


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
	if(isEditButton){
		const taskPostConfig = {
			method: "PATCH",
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		}
			fetch(`/todo?id=${encodeURIComponent(editTaskId)}`, taskPostConfig)
    .then((response) => {
        if (response.ok) {
            return response.text(); // Read as plain text instead of JSON
        } else {
            listContainer.innerHTML = "Error occurred. Refresh your page.";
            return Promise.reject("Server returned an error.");
        }
    })
    .then(() => {
        console.log("Server response:", data);
		  const taskElement = document.getElementById(editTaskId);
            if (taskElement) {
                const taskNameElement = taskElement.querySelector(".task-name");
					 console.log(taskNameElement, taskElement)
                taskNameElement.innerHTML = data.name; // Update task name in UI
            }
    })
    .catch((error) => console.log(error));
	}
	else {
		addTaskBtn.innerHTML = "Add Task";
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
		return response.status == 200?response.json():listContainer.innerHTML = "error occured refresh your page"
	})
	.then((data) =>{
		createUi(data)
	}
	)
	.catch((error) => console.log(error))
	}
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
	const listItem = createNewElem({name: "li", class: ["list-item"], id: dataObj.id, innerText:""});
	const dataWrapper = createNewElem({name:"div", class: ["data-wrapper"]})
	const dateWrapper = createNewElem({name:"div", class: ["date-wrapper"]})
	const taskName = createNewElem({name: "span", class: ["first-letter:capitalize", "task-name"], innerText: dataObj.name})
	const buttonWrapper = createNewElem({name:"div", class: ["button-wrapper"]})
	dataWrapper.appendChild(taskName)
	const dateContainer = createNewElem({name: "span", class:["date"], innerText: dataObj.createdAt.split("T")[0]})
	dateWrapper.appendChild(dateContainer);
	const checkedBtn = createNewElem({name: "button", id: "checkedBtn", class:["checked-btn", "btn"], innerText: '<i class="fa-regular fa-circle-check"></i>' })
	let isChecked = false;
	buttonWrapper.appendChild(checkedBtn);

	const editBtn = createNewElem({name: "button", class:["edit-btn", "btn"], innerText: '<i class="fa-solid fa-user-pen"></i>'})
	buttonWrapper.appendChild(editBtn);

	const crossBtn = createNewElem({name: "button", class:["cross-btn", "btn"], innerText: '<i class="fa-solid fa-circle-xmark"></i>'})
	buttonWrapper.appendChild(crossBtn);

	dataWrapper.appendChild(buttonWrapper);
	listItem.appendChild(dataWrapper);
	listItem.appendChild(dateWrapper);
	listContainer.appendChild(listItem);

	checkedBtn.addEventListener('click', ()=>{
		isChecked = !isChecked;
		checkedBtn.innerHTML = isChecked ? '<i class="fa-solid fa-circle-check"></i>' : '<i class="fa-regular fa-circle-check"></i>';
		listItem.style.textDecoration = isChecked ? "line-through" : "none";
	})

	crossBtn.addEventListener('click', ()=>{
		fetch(`/todo?id=${encodeURIComponent(dataObj.id)}`, {
			method: "DELETE"
		});
		listItem.remove();
	})

	editBtn.addEventListener("click", () => {
		isEditButton = true;
		editTaskId = dataObj.id;
		modal.classList.remove("hidden");
		taskInput.value = document.getElementById(editTaskId)?.querySelector(".task-name")?.innerText || dataObj.name;
		addTaskBtn.innerHTML = "Update Task";
		modelHeading.innerHTML = "Update the task"
		taskInput.focus();
  });

}
