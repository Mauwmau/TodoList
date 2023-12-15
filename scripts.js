let todolist = [] // Declaration of a list, will store the to-do's

// How a to-do item should look like
const todoitem = {
    checked: false,
    description: "Name of a chore"
}

newitem = todoitem;
newitem.checked = true
console.log(newitem)

function readUserInput() {
    const userInput = document.getElementById("chorename")
    const userStr = userInput.value
    userInput.value = ""
    return userStr
}

function handleSubmit(){
    const chorename = readUserInput()
    addToDo(chorename)
}

function addToDo(itemname) {
    if(itemname != null && itemname != ""){
        let newitembox = document.createElement("INPUT")
        newitembox.setAttribute("type", "checkbox")
        newitembox.setAttribute("value", false)

        let newitemname = document.createElement("INPUT")
        newitemname.setAttribute("type", "text")
        newitemname.setAttribute("value", itemname)
        newitemname.setAttribute("readonly", true)

        let licontainer = document.createElement("LI")
        licontainer.appendChild(newitembox)
        licontainer.appendChild(newitemname)

        let domList = document.getElementById("mylist")
        domList.appendChild(licontainer)
    }
}

