const src = "http://localhost:8080/"
const API = {
    getPointsOfInterest: function () {
        return fetch(`http://localhost:8080/pointsOfInterest`)
            .then(response => response.json())
    },
    getOnePointOfInterest: function (pointId) {
        return fetch(`http://localhost:8080/events/${pointId}`)
            .then(response => response.json())
    },
    addPointofInterest: function (obj) {
        return fetch("http://localhost:8080/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    editPointsOfInterest: function (pointsId, obj) {
        return fetch(`http://localhost:8080/events/${pointsId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
    },
    deletePointOfInterest: function (pointsId) {
        return fetch(`http://localhost:8080/events/${pointsId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())
    },
}

export default API;