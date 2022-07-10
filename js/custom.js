/* Implementation */
const inputBox = document.querySelector('.inputField input');
const addNote = document.querySelector('.inputField button');
const todoList = document.querySelector('.todoList');
const deleteAllBtn = document.querySelector('.footer button');



inputBox.onkeyup = () => {
    
    let data = inputBox.value;
    
    if(data.trim() != 0) {
        addNote.classList.add("active");
    }else {
        addNote.classList.remove("active");
    }
   
}

showTasks();

addNote.onclick = () => {
   
    let userData = inputBox.value //get input datas
    let getLocalStorage = localStorage.getItem("New Todo"); //get local storage

    if(getLocalStorage == null) {
        listArr = [];

    }else {
        listArr = JSON.parse(getLocalStorage);
    }
    
    listArr.push(userData);
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
    addNote.classList.remove("active");
}

function showTasks () {

    let getLocalStorage = localStorage.getItem("New Todo"); //get local storage
    if(getLocalStorage == null) {
        
        listArr = [];

    }else {    
        listArr = JSON.parse(getLocalStorage);
    }

    const pendingNo = document.querySelector(".pendingNo");
    pendingNo.textContent = listArr.length;

    if(listArr.length > 0) {
        deleteAllBtn.classList.add('active');
    }else {
        deleteAllBtn.classList.remove('active');
    }

    let newLiTag = '';

    listArr.forEach((element, index) => {
        newLiTag += `<li>${element} <span onclick="deleteNote(${index})"><i class="fas fa-trash"></i></span></li>` 
    });

    todoList.innerHTML = newLiTag;
    inputBox.value = '';
}

function deleteNote (index) {

    let getLocalStorage = localStorage.getItem("New Todo"); //get local storage
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index, 1);

    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();

}

deleteAllBtn.onclick = () => {
    listArr = [];
    localStorage.setItem('New Todo', JSON.stringify(listArr));
    showTasks();
}