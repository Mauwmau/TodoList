let todolist = [] // Declaration of a list, will store the to-do's

let counter = 0
// How a to-do item should look like
// const todoitem = {
//     id: 0, // Number
//     checked: false, // Boolean
//     description: "Name of a chore" // String
// }

function createTodoItem(desc) {
    const newitem = {
        id: todolist.length + 1 + counter,
        checked: false,
        description: desc
    }

    console.log(desc, newitem)

    todolist.push(newitem)
}

function deleteTodoItem(itemId) {
    todolist = todolist.filter((item)=>item.id !== itemId)
    counter = counter + 1
}

// Gets the text field and returns the string written by the user
function readUserInput() {
    const userInput = document.getElementById("chorename")
    const userStr = userInput.value
    userInput.value = ""
    return userStr
}

// Reads user task and adds to the list, activated when the form is submited
function handleSubmit(){
    const taskname = readUserInput()
    // addToDo(taskname)
    createTodoItem(taskname)
    console.log(todolist);
}

// Creates the elements that will be added to the DOM.
// params:
//  - itemname: string that describes the task
function addToDo(itemname) {
    if(itemname != null && itemname != ""){
        let newitembox = document.createElement("INPUT")
        newitembox.setAttribute("type", "checkbox")
        newitembox.setAttribute("value", false)
        newitembox.addEventListener("input", () => {removeTodo(itemname)})

        let newitemname = document.createElement("P")
        newitemname.innerHTML = itemname

        let licontainer = document.createElement("LI")
        licontainer.appendChild(newitembox)
        licontainer.appendChild(newitemname)

        let domList = document.getElementById("mylist")
        domList.appendChild(licontainer)
    }
}

function removeTodo(param) {
    alert("Remover " + param)
}

function receiveList() {
    todolist.forEach((item)=>{
        addToDo(item.description)
    })
}
