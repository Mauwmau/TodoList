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

    todolist.push(newitem)

    return newitem
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
    const newtask = createTodoItem(taskname)
    addToDo(newtask)
}

// Creates the elements that will be added to the DOM.
// params:
//  - itemname: string that describes the task
function addToDo(itemobj) {
    const {id, checked, description} = itemobj
    const customid = generateCustomId(itemobj)
    console.log(id, checked, description)
    if(itemobj != null && description != ""){
        let newitembox = document.createElement("INPUT")
        newitembox.setAttribute("type", "checkbox")
        newitembox.setAttribute("value", false)
        newitembox.addEventListener("input", () => {toggleVisibility(customid, id)})

        let newitemname = document.createElement("P")
        newitemname.innerHTML = description

        let deletebutton = document.createElement("BUTTON")
        deletebutton.addEventListener("click", () => {removeTodo(customid)})
        deletebutton.innerHTML = "Apagar tarefa"

        let licontainer = document.createElement("LI")
        licontainer.id = customid
        licontainer.appendChild(newitembox)
        licontainer.appendChild(newitemname)
        licontainer.appendChild(deletebutton)

        let domList = document.getElementById("mylist")
        domList.appendChild(licontainer)
    }
}

function toggleVisibility(customid, id) {
    todolist.forEach(item => {
        if (item.id === id) {
            item.checked = !item.checked
        }
    })
    document.getElementById(customid).classList.toggle("hidden")
}

function generateCustomId(taskitem) {
    const {id, description} = taskitem

    const wordlist = description.split(" ")

    const initials = wordlist.map(word => word[0])

    return initials.join("") + id.toString()
}

function removeTodo(todoid) {
    document.getElementById(todoid).remove()
    deleteTodoItem(todoid)
}

function receiveList() {
    todolist.forEach((item)=>{
        addToDo(item)
    })
}
