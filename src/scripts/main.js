import API from "./DBcalls"
import createForm from "./createForm"


const mainDiv = document.querySelector("#main_div")

//Create Form to add interest
mainDiv.appendChild(createForm())

//Get all places with interests embedded and print to dom
API.getPointsOfInterest().then(placesAndInterests => {
    placesAndInterests.forEach(place => {
        let placeDiv = document.createElement("div")
        placeDiv.setAttribute("id", place.name)
        placeDiv.setAttribute("class", "place-card")
        let placeName = document.createElement("h2")
        placeName.innerHTML = place.name
        placeDiv.appendChild(placeName)
        //function to loop through each places interest and append to place div
        place.interests.forEach(interest => {
            let intDiv = document.createElement("div")
            intDiv.setAttribute("id", `${interest.id}`)

            let intName = document.createElement("h4")
            intName.innerHTML = `${interest.name}`

            let intDesc = document.createElement("p")
            intDesc.innerHTML = `${interest.description}`

            let intCost = document.createElement("p")
            intCost.innerHTML = `${interest.cost}`

            let intReview = document.createElement("p")
            intReview.innerHTML = (interest.review) ? `${interest.review}` : "No Review Yet"

            let editBtn = document.createElement("button")
            editBtn.innerHTML = "Edit"
            let delBtn = document.createElement("button")
            delBtn.innerHTML = "Delete"
            delBtn.addEventListener("click", (event) => deleteInterest(event.target.parentNode.id))

            intDiv.appendChild(intName)
            intDiv.appendChild(intDesc)
            intDiv.appendChild(intCost)
            intDiv.appendChild(intReview)
            intDiv.appendChild(editBtn)
            intDiv.appendChild(delBtn)

            placeDiv.appendChild(intDiv)
        })

        //append place div to main div
        mainDiv.appendChild(placeDiv)
    })
})


