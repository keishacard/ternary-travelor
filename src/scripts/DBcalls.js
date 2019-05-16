// const src = "http://localhost:8080/"
const API = {
    getPointsOfInterest: () => {
        return fetch("http://localhost:8088/places?_embed=interests")
            .then(response => response.json())
    },

    getPlaces: () => {
        return fetch("http://localhost:8088/places")
            .then(resp => resp.json())
    },

    getOnePointOfInterest: (pointId) => {
        return fetch(`http://localhost:8088/events/${pointId}`)
            .then(response => response.json())
    },
    addPointofInterest: (obj) => {
        return fetch("http://localhost:8088/interests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    editPointsOfInterest: (obj) => {
        return fetch(`http://localhost:8088/interests/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    deletePointOfInterest: (pointsId) => {
        return fetch(`http://localhost:8088/interests/${pointsId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    },
}

export default API;