import API from "./DBcalls"
import resfreshDom from "./refreshDom"

// need to be able to edit cost & review for after visit
export default function editPoint(pointId, interest) {
    let pointDiv = document.getElementById(`${pointId}`)
    pointDiv.innerHTML = ""

    let text = document.createElement("h3")
    text.innerHTML = `Edit ${interest.name}`
    let costInput = document.createElement("input")
    let reviewInput = document.createElement("input")
    let saveBtn = document.createElement("button")

    saveBtn.innerHTML = "Save"
    costInput.value = interest.cost

    pointDiv.appendChild(text)
    pointDiv.appendChild(costInput)
    pointDiv.appendChild(reviewInput)
    pointDiv.appendChild(saveBtn)

    // prepopulate with value if there was one
    saveBtn.addEventListener("click", () => {
        interest.cost = (costInput) ? costInput.value : interest.cost
        interest.review = reviewInput.value
        API.editPointsOfInterest(interest).then(res => resfreshDom())

    })
}