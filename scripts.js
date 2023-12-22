//  -----------  Data structure or similar  -----------

let todolist = []
let counter = 0

function generateItem(id, description) {

    const idString = generateCustomId(id, description)

    const itemObject = {
        id: id,
        description: description,
        checked: false,
        customId: idString
    }

    return itemObject
}

function generateCustomId(numericId, wordListString) {
    const wordList = wordListString.split(" ")
    const initialsList = wordList.map((word)=> word[0])
    return initialsList.join("") + numericId.toString()
}

// Adds an item to the list
function addToList(userString) {
    const sessionListSize = todolist.length + counter
    const todoItem = generateItem(sessionListSize, userString)

    todolist.push(todoItem)
    return todoItem
}

// Removes an item from the list using the item id
function removeFromList(id) {
    todolist = todolist.filter((item) => item.id !== id)
    counter = counter + 1
}

// Updates the values from an especific item in the list, checking for the item id
function updateFromList(itemId, newChecked, newDescription, newId) {
    todolist.forEach((item)=>{
        if (item.id === itemId) {
            if (typeof newChecked === "boolean") {
                item.checked = newChecked
            }

            if (typeof newDescription === "string") {
                item.description = newDescription
            }

            if (typeof newId === "number") {
                item.id = newId
            }
        }
    })
}

// Returns an item from the list using the specified id
function readFromList(itemId) {
    const listItem = todolist.filter(item => item.id === itemId)
    return listItem[0]
}

// Returns an item from the list using the specified custom id
function readFromListCI(itemCustomId) {
    const listItem = todolist.filter(item => item.customId === itemCustomId)
    return listItem[0]
}


// -----------  DOM elements and visuals  -----------

document.addEventListener("DOMContentLoaded", onContentLoaded)

const userInputId = "chorename"
const userFormId = "fform"
const userListContainer = "mylist"

function onContentLoaded() {
    const userForm = document.getElementById(userFormId)
    userForm.addEventListener("submit", (event) => handleSubmit(event))
}

function handleSubmit(event) {
    // Don't let the page reload/refresh upon form submission
    event.preventDefault()

    const userInput = document.getElementById(userInputId)

    const createdItem = addToList(userInput.value) // Add info to data structure
    createListItems(createdItem)

    // Clears the input field
    userInput.value = ""
}
function createListItems(itemObject) {
    const {id, description, checked, customId} = itemObject

    // When pressed should toggle visibility
    const checkbox = document.createElement("input")
    checkbox.setAttribute("type", "checkbox")
    checkbox.value = checked
    checkbox.addEventListener("change",() => {
        toggleItemVisibility(customId)
        updateFromList(id, !checked)
    })

    // Simply display text
    const textbox = document.createElement("p")
    textbox.innerHTML = description

    // When pressed should completely delete the parent element
    const deleteButton = document.createElement("button")
    deleteButton.innerHTML = "Deletar Tarefa"
    deleteButton.addEventListener("click", () => {
        deleteListItems(customId)
        removeFromList(id)
    })

    // Is the main container
    const listItem = document.createElement("li")
    listItem.id = customId
    listItem.appendChild(checkbox)
    listItem.appendChild(textbox)
    listItem.appendChild(deleteButton)

    const listContainer = document.getElementById(userListContainer)
    listContainer.appendChild(listItem)
}

function deleteListItems(itemCustomId) {
    const myItem = document.getElementById(itemCustomId)
    myItem.remove()
}

function toggleItemVisibility(itemCustomId) {
    const myItem = document.getElementById(itemCustomId)
    myItem.classList.toggle("hidden")
}