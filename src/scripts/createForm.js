import API from "./DBcalls"
import refreshDom from "./refreshDom"

export default function createForm() {
    // const mainDiv = document.querySelector("#main_div")
    const formDiv = document.createElement("div")

    API.getPlaces().then(places => {
        const nameInput = document.createElement("input")
        nameInput.setAttribute("id", "name")
        const costInput = document.createElement("input")
        costInput.setAttribute("id", "cost")
        const descInput = document.createElement("input")
        descInput.setAttribute("id", "desc")
        const dropDown = document.createElement("select")
        const saveBtn = document.createElement("button")

        saveBtn.innerHTML = "Save"

        saveBtn.addEventListener("click", () => {
            let intObject = {
                name: `${nameInput.value}`,
                cost: `${costInput.value}`,
                description: `${descInput.value}`,
                review: "",
                placeId: parseInt(dropDown.value)
            }
            API.addPointofInterest(intObject).then(res => refreshDom())
        })

        places.forEach(place => {
            let option = document.createElement("option")
            option.text = `${place.name}`
            option.value = `${place.id}`
            dropDown.add(option)
        })
        formDiv.appendChild(nameInput)
        formDiv.appendChild(costInput)
        formDiv.appendChild(descInput)
        formDiv.appendChild(dropDown)
        formDiv.appendChild(saveBtn)

        // mainDiv.appendChild(formDiv)

    })

    return formDiv
}