(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// const src = "http://localhost:8080/"
const API = {
  getPointsOfInterest: () => {
    return fetch("http://localhost:8088/places?_embed=interests").then(response => response.json());
  },
  getPlaces: () => {
    return fetch("http://localhost:8088/places").then(resp => resp.json());
  },
  getOnePointOfInterest: pointId => {
    return fetch(`http://localhost:8088/events/${pointId}`).then(response => response.json());
  },
  addPointofInterest: obj => {
    return fetch("http://localhost:8088/interests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => response.json());
  },
  editPointsOfInterest: obj => {
    return fetch(`http://localhost:8088/interests/${obj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => response.json());
  },
  deletePointOfInterest: pointsId => {
    return fetch(`http://localhost:8088/interests/${pointsId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  }
};
var _default = API;
exports.default = _default;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createForm;

var _DBcalls = _interopRequireDefault(require("./DBcalls"));

var _refreshDom = _interopRequireDefault(require("./refreshDom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createForm() {
  // const mainDiv = document.querySelector("#main_div")
  const formDiv = document.createElement("div");

  _DBcalls.default.getPlaces().then(places => {
    const nameInput = document.createElement("input");
    nameInput.setAttribute("id", "name");
    const costInput = document.createElement("input");
    costInput.setAttribute("id", "cost");
    const descInput = document.createElement("input");
    descInput.setAttribute("id", "desc");
    const dropDown = document.createElement("select");
    const saveBtn = document.createElement("button");
    saveBtn.innerHTML = "Save";
    saveBtn.addEventListener("click", () => {
      let intObject = {
        name: `${nameInput.value}`,
        cost: `${costInput.value}`,
        description: `${descInput.value}`,
        review: "",
        placeId: parseInt(dropDown.value)
      };

      _DBcalls.default.addPointofInterest(intObject).then(res => (0, _refreshDom.default)());
    });
    places.forEach(place => {
      let option = document.createElement("option");
      option.text = `${place.name}`;
      option.value = `${place.id}`;
      dropDown.add(option);
    });
    formDiv.appendChild(nameInput);
    formDiv.appendChild(costInput);
    formDiv.appendChild(descInput);
    formDiv.appendChild(dropDown);
    formDiv.appendChild(saveBtn); // mainDiv.appendChild(formDiv)
  });

  return formDiv;
}

},{"./DBcalls":1,"./refreshDom":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = deleteFromDb;

var _DBcalls = _interopRequireDefault(require("./DBcalls"));

var _refreshDom = _interopRequireDefault(require("./refreshDom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function deleteFromDb(interestId) {
  _DBcalls.default.deletePointOfInterest(interestId).then(res => (0, _refreshDom.default)());
} // need to add the confirmation alert!!!

},{"./DBcalls":1,"./refreshDom":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = editPoint;

var _DBcalls = _interopRequireDefault(require("./DBcalls"));

var _refreshDom = _interopRequireDefault(require("./refreshDom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// need to be able to edit cost & review for after visit
function editPoint(pointId, interest) {
  let pointDiv = document.getElementById(`${pointId}`);
  pointDiv.innerHTML = "";
  let text = document.createElement("h3");
  text.innerHTML = `Edit ${interest.name}`;
  let costInput = document.createElement("input");
  let reviewInput = document.createElement("input");
  let saveBtn = document.createElement("button");
  saveBtn.innerHTML = "Save";
  costInput.value = interest.cost;
  pointDiv.appendChild(text);
  pointDiv.appendChild(costInput);
  pointDiv.appendChild(reviewInput);
  pointDiv.appendChild(saveBtn); // prepopulate with value if there was one

  saveBtn.addEventListener("click", () => {
    interest.cost = costInput ? costInput.value : interest.cost;
    interest.review = reviewInput.value;

    _DBcalls.default.editPointsOfInterest(interest).then(res => (0, _refreshDom.default)());
  });
}

},{"./DBcalls":1,"./refreshDom":6}],5:[function(require,module,exports){
"use strict";

var _DBcalls = _interopRequireDefault(require("./DBcalls"));

var _createForm = _interopRequireDefault(require("./createForm"));

var _deleteFromDb = _interopRequireDefault(require("./deleteFromDb"));

var _refreshDom = _interopRequireDefault(require("./refreshDom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const mainDiv = document.querySelector("#main_div")
// //Create Form to add interest
// mainDiv.appendChild(createForm())
// //Get all places with interests embedded and print to dom
// API.getPointsOfInterest().then(placesAndInterests => {
//     placesAndInterests.forEach(place => {
//         let placeDiv = document.createElement("div")
//         placeDiv.setAttribute("id", place.name)
//         placeDiv.setAttribute("class", "place-card")
//         let placeName = document.createElement("h2")
//         placeName.innerHTML = place.name
//         placeDiv.appendChild(placeName)
//         //function to loop through each places interest and append to place div
//         place.interests.forEach(interest => {
//             let intDiv = document.createElement("div")
//             intDiv.setAttribute("id", `${interest.id}`)
//             let intName = document.createElement("h4")
//             intName.innerHTML = `${interest.name}`
//             let intDesc = document.createElement("p")
//             intDesc.innerHTML = `${interest.description}`
//             let intCost = document.createElement("p")
//             intCost.innerHTML = `${interest.cost}`
//             let intReview = document.createElement("p")
//             intReview.innerHTML = (interest.review) ? `${interest.review}` : "No Review Yet"
//             let editBtn = document.createElement("button")
//             editBtn.innerHTML = "Edit"
//             let delBtn = document.createElement("button")
//             delBtn.innerHTML = "Delete"
//             delBtn.addEventListener("click", (event) => deleteInterest(event.target.parentNode.id))
//             intDiv.appendChild(intName)
//             intDiv.appendChild(intDesc)
//             intDiv.appendChild(intCost)
//             intDiv.appendChild(intReview)
//             intDiv.appendChild(editBtn)
//             intDiv.appendChild(delBtn)
//             placeDiv.appendChild(intDiv)
//         })
//         //append place div to main div
//         mainDiv.appendChild(placeDiv)
//     })
// })
(0, _refreshDom.default)();

},{"./DBcalls":1,"./createForm":2,"./deleteFromDb":3,"./refreshDom":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = clearDom;

var _DBcalls = _interopRequireDefault(require("./DBcalls"));

var _createForm = _interopRequireDefault(require("./createForm"));

var _deleteFromDb = _interopRequireDefault(require("./deleteFromDb"));

var _editPoints = _interopRequireDefault(require("./editPoints"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function clearDom() {
  const mainDiv = document.querySelector("#main_div");
  mainDiv.innerHTML = "";
  mainDiv.appendChild((0, _createForm.default)()); //Get all places with interests embedded and print to dom

  _DBcalls.default.getPointsOfInterest().then(placesAndInterests => {
    placesAndInterests.forEach(place => {
      let placeDiv = document.createElement("div");
      placeDiv.setAttribute("id", place.name);
      placeDiv.setAttribute("class", "place-card");
      let placeName = document.createElement("h2");
      placeName.innerHTML = place.name;
      placeDiv.appendChild(placeName); //function to loop through each places interest and append to place div

      place.interests.forEach(interest => {
        let intDiv = document.createElement("div");
        intDiv.setAttribute("id", `${interest.id}`);
        let intName = document.createElement("h4");
        intName.innerHTML = `${interest.name}`;
        let intDesc = document.createElement("p");
        intDesc.innerHTML = `${interest.description}`;
        let intCost = document.createElement("p");
        intCost.innerHTML = `${interest.cost}`;
        let intReview = document.createElement("p");
        intReview.innerHTML = interest.review ? `${interest.review}` : "No Review Yet";
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Edit";
        editBtn.addEventListener("click", evt => (0, _editPoints.default)(evt.target.parentNode.id, interest));
        let delBtn = document.createElement("button");
        delBtn.innerHTML = "Delete";
        delBtn.addEventListener("click", evt => (0, _deleteFromDb.default)(evt.target.parentNode.id));
        intDiv.appendChild(intName);
        intDiv.appendChild(intDesc);
        intDiv.appendChild(intCost);
        intDiv.appendChild(intReview);
        intDiv.appendChild(editBtn);
        intDiv.appendChild(delBtn);
        placeDiv.appendChild(intDiv);
      }); //append place div to main div

      mainDiv.appendChild(placeDiv);
    });
  });
}

},{"./DBcalls":1,"./createForm":2,"./deleteFromDb":3,"./editPoints":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RCY2FsbHMuanMiLCIuLi9zY3JpcHRzL2NyZWF0ZUZvcm0uanMiLCIuLi9zY3JpcHRzL2RlbGV0ZUZyb21EYi5qcyIsIi4uL3NjcmlwdHMvZWRpdFBvaW50cy5qcyIsIi4uL3NjcmlwdHMvbWFpbi5qcyIsIi4uL3NjcmlwdHMvcmVmcmVzaERvbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQ0FBO0FBQ0EsTUFBTSxHQUFHLEdBQUc7QUFDUixFQUFBLG1CQUFtQixFQUFFLE1BQU07QUFDdkIsV0FBTyxLQUFLLENBQUMsK0NBQUQsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQO0FBRUgsR0FKTztBQU1SLEVBQUEsU0FBUyxFQUFFLE1BQU07QUFDYixXQUFPLEtBQUssQ0FBQyw4QkFBRCxDQUFMLENBQ0YsSUFERSxDQUNHLElBQUksSUFBSSxJQUFJLENBQUMsSUFBTCxFQURYLENBQVA7QUFFSCxHQVRPO0FBV1IsRUFBQSxxQkFBcUIsRUFBRyxPQUFELElBQWE7QUFDaEMsV0FBTyxLQUFLLENBQUUsZ0NBQStCLE9BQVEsRUFBekMsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQO0FBRUgsR0FkTztBQWVSLEVBQUEsa0JBQWtCLEVBQUcsR0FBRCxJQUFTO0FBQ3pCLFdBQU8sS0FBSyxDQUFDLGlDQUFELEVBQW9DO0FBQzVDLE1BQUEsTUFBTSxFQUFFLE1BRG9DO0FBRTVDLE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGbUM7QUFLNUMsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxHQUFmO0FBTHNDLEtBQXBDLENBQUwsQ0FPRixJQVBFLENBT0csUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBUGYsQ0FBUDtB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LEdBQUUsUUFBUSxDQUFDLE1BQU8sRUFBdkMsR0FBMkMsZUFBakU7QUFFQSxZQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUFkO0FBQ0EsUUFBQSxPQUFPLENBQUMsU0FBUixHQUFvQixNQUFwQjtBQUNBLFFBQUEsT0FBTyxDQUFDLGdCQUFSLENBQXlCLE9BQXpCLEVBQW1DLEdBQUQsSUFBUyx5QkFBVSxHQUFHLENBQUMsTUFBSixDQUFXLFVBQVgsQ0FBc0IsRUFBaEMsRUFBb0MsUUFBcEMsQ0FBM0M7QUFDQSxZQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0EsUUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixRQUFuQjtBQUNBLFFBQUEsTUFBTSxDQUFDLGdCQUFQLENBQXdCLE9BQXhCLEVBQWtDLEdBQUQsSUFBUywyQkFBZSxHQUFHLENBQUMsTUFBSixDQUFXLFVBQVgsQ0FBc0IsRUFBckMsQ0FBMUM7QUFFQSxRQUFBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLE9BQW5CO0FBQ0EsUUFBQSxNQUFNLENBQUMsV0FBUCxDQUFtQixPQUFuQjtBQUNBLFFBQUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsT0FBbkI7QUFDQSxRQUFBLE1BQU0sQ0FBQyxXQUFQLENBQW1CLFNBQW5CO0FBQ0EsUUFBQSxNQUFNLENBQUMsV0FBUCxDQUFtQixPQUFuQjtBQUNBLFFBQUEsTUFBTSxDQUFDLFdBQVAsQ0FBbUIsTUFBbkI7QUFFQSxRQUFBLFFBQVEsQ0FBQyxXQUFULENBQXFCLE1BQXJCO0FBQ0gsT0EvQkQsRUFSZ0MsQ0F5Q2hDOztBQUNBLE1BQUEsT0FBTyxDQUFDLFdBQVIsQ0FBb0IsUUFBcEI7QUFDSCxLQTNDRDtBQTRDSCxHQTdDRDtBQThDSCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGNvbnN0IHNyYyA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL1wiXHJcbmNvbnN0IEFQSSA9IHtcclxuICAgIGdldFBvaW50c09mSW50ZXJlc3Q6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvcGxhY2VzP19lbWJlZD1pbnRlcmVzdHNcIilcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuXHJcbiAgICBnZXRQbGFjZXM6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvcGxhY2VzXCIpXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3AgPT4gcmVzcC5qc29uKCkpXHJcbiAgICB9LFxyXG5cclxuICAgIGdldE9uZVBvaW50T2ZJbnRlcmVzdDogKHBvaW50SWQpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC9ldmVudHMvJHtwb2ludElkfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBhZGRQb2ludG9mSW50ZXJlc3Q6IChvYmopID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goXCJodHRwOi8vbG9jYWxob3N0OjgwODgvaW50ZXJlc3RzXCIsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBlZGl0UG9pbnRzT2ZJbnRlcmVzdDogKG9iaikgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2ludGVyZXN0cy8ke29iai5pZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQQVRDSFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvYmopXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuICAgIGRlbGV0ZVBvaW50T2ZJbnRlcmVzdDogKHBvaW50c0lkKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvaW50ZXJlc3RzLyR7cG9pbnRzSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEk7IiwiaW1wb3J0IEFQSSBmcm9tIFwiLi9EQmNhbGxzXCJcclxuaW1wb3J0IHJlZnJlc2hEb20gZnJvbSBcIi4vcmVmcmVzaERvbVwiXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVGb3JtKCkge1xyXG4gICAgLy8gY29uc3QgbWFpbkRpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbl9kaXZcIilcclxuICAgIGNvbnN0IGZvcm1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcblxyXG4gICAgQVBJLmdldFBsYWNlcygpLnRoZW4ocGxhY2VzID0+IHtcclxuICAgICAgICBjb25zdCBuYW1lSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgICAgICBuYW1lSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJuYW1lXCIpXHJcbiAgICAgICAgY29uc3QgY29zdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICAgICAgY29zdElucHV0LnNldEF0dHJpYnV0ZShcImlkXCIsIFwiY29zdFwiKVxyXG4gICAgICAgIGNvbnN0IGRlc2NJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKVxyXG4gICAgICAgIGRlc2NJbnB1dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImRlc2NcIilcclxuICAgICAgICBjb25zdCBkcm9wRG93biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIilcclxuICAgICAgICBjb25zdCBzYXZlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5cclxuICAgICAgICBzYXZlQnRuLmlubmVySFRNTCA9IFwiU2F2ZVwiXHJcblxyXG4gICAgICAgIHNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGludE9iamVjdCA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWU6IGAke25hbWVJbnB1dC52YWx1ZX1gLFxyXG4gICAgICAgICAgICAgICAgY29zdDogYCR7Y29zdElucHV0LnZhbHVlfWAsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogYCR7ZGVzY0lucHV0LnZhbHVlfWAsXHJcbiAgICAgICAgICAgICAgICByZXZpZXc6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBwbGFjZUlkOiBwYXJzZUludChkcm9wRG93bi52YWx1ZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBBUEkuYWRkUG9pbnRvZkludGVyZXN0KGludE9iamVjdCkudGhlbihyZXMgPT4gcmVmcmVzaERvbSgpKVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHBsYWNlcy5mb3JFYWNoKHBsYWNlID0+IHtcclxuICAgICAgICAgICAgbGV0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIilcclxuICAgICAgICAgICAgb3B0aW9uLnRleHQgPSBgJHtwbGFjZS5uYW1lfWBcclxuICAgICAgICAgICAgb3B0aW9uLnZhbHVlID0gYCR7cGxhY2UuaWR9YFxyXG4gICAgICAgICAgICBkcm9wRG93bi5hZGQob3B0aW9uKVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgZm9ybURpdi5hcHBlbmRDaGlsZChuYW1lSW5wdXQpXHJcbiAgICAgICAgZm9ybURpdi5hcHBlbmRDaGlsZChjb3N0SW5wdXQpXHJcbiAgICAgICAgZm9ybURpdi5hcHBlbmRDaGlsZChkZXNjSW5wdXQpXHJcbiAgICAgICAgZm9ybURpdi5hcHBlbmRDaGlsZChkcm9wRG93bilcclxuICAgICAgICBmb3JtRGl2LmFwcGVuZENoaWxkKHNhdmVCdG4pXHJcblxyXG4gICAgICAgIC8vIG1haW5EaXYuYXBwZW5kQ2hpbGQoZm9ybURpdilcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBmb3JtRGl2XHJcbn0iLCJpbXBvcnQgQVBJIGZyb20gXCIuL0RCY2FsbHNcIlxyXG5pbXBvcnQgcmVmcmVzaERvbSBmcm9tIFwiLi9yZWZyZXNoRG9tXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRlbGV0ZUZyb21EYihpbnRlcmVzdElkKSB7XHJcbiAgICBBUEkuZGVsZXRlUG9pbnRPZkludGVyZXN0KGludGVyZXN0SWQpLnRoZW4ocmVzID0+IHJlZnJlc2hEb20oKSlcclxufVxyXG5cclxuLy8gbmVlZCB0byBhZGQgdGhlIGNvbmZpcm1hdGlvbiBhbGVydCEhISIsImltcG9ydCBBUEkgZnJvbSBcIi4vREJjYWxsc1wiXHJcbmltcG9ydCByZXNmcmVzaERvbSBmcm9tIFwiLi9yZWZyZXNoRG9tXCJcclxuXHJcbi8vIG5lZWQgdG8gYmUgYWJsZSB0byBlZGl0IGNvc3QgJiByZXZpZXcgZm9yIGFmdGVyIHZpc2l0XHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVkaXRQb2ludChwb2ludElkLCBpbnRlcmVzdCkge1xyXG4gICAgbGV0IHBvaW50RGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cG9pbnRJZH1gKVxyXG4gICAgcG9pbnREaXYuaW5uZXJIVE1MID0gXCJcIlxyXG5cclxuICAgIGxldCB0ZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpXHJcbiAgICB0ZXh0LmlubmVySFRNTCA9IGBFZGl0ICR7aW50ZXJlc3QubmFtZX1gXHJcbiAgICBsZXQgY29zdElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpXHJcbiAgICBsZXQgcmV2aWV3SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIilcclxuICAgIGxldCBzYXZlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG5cclxuICAgIHNhdmVCdG4uaW5uZXJIVE1MID0gXCJTYXZlXCJcclxuICAgIGNvc3RJbnB1dC52YWx1ZSA9IGludGVyZXN0LmNvc3RcclxuXHJcbiAgICBwb2ludERpdi5hcHBlbmRDaGlsZCh0ZXh0KVxyXG4gICAgcG9pbnREaXYuYXBwZW5kQ2hpbGQoY29zdElucHV0KVxyXG4gICAgcG9pbnREaXYuYXBwZW5kQ2hpbGQocmV2aWV3SW5wdXQpXHJcbiAgICBwb2ludERpdi5hcHBlbmRDaGlsZChzYXZlQnRuKVxyXG5cclxuICAgIC8vIHByZXBvcHVsYXRlIHdpdGggdmFsdWUgaWYgdGhlcmUgd2FzIG9uZVxyXG4gICAgc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgIGludGVyZXN0LmNvc3QgPSAoY29zdElucHV0KSA/IGNvc3RJbnB1dC52YWx1ZSA6IGludGVyZXN0LmNvc3RcclxuICAgICAgICBpbnRlcmVzdC5yZXZpZXcgPSByZXZpZXdJbnB1dC52YWx1ZVxyXG4gICAgICAgIEFQSS5lZGl0UG9pbnRzT2ZJbnRlcmVzdChpbnRlcmVzdCkudGhlbihyZXMgPT4gcmVzZnJlc2hEb20oKSlcclxuXHJcbiAgICB9KVxyXG59IiwiaW1wb3J0IEFQSSBmcm9tIFwiLi9EQmNhbGxzXCJcbmltcG9ydCBjcmVhdGVGb3JtIGZyb20gXCIuL2NyZWF0ZUZvcm1cIlxuaW1wb3J0IGRlbGV0ZUludGVyZXN0IGZyb20gXCIuL2RlbGV0ZUZyb21EYlwiXG5cbi8vIGNvbnN0IG1haW5EaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW5fZGl2XCIpXG5cbi8vIC8vQ3JlYXRlIEZvcm0gdG8gYWRkIGludGVyZXN0XG4vLyBtYWluRGl2LmFwcGVuZENoaWxkKGNyZWF0ZUZvcm0oKSlcblxuLy8gLy9HZXQgYWxsIHBsYWNlcyB3aXRoIGludGVyZXN0cyBlbWJlZGRlZCBhbmQgcHJpbnQgdG8gZG9tXG4vLyBBUEkuZ2V0UG9pbnRzT2ZJbnRlcmVzdCgpLnRoZW4ocGxhY2VzQW5kSW50ZXJlc3RzID0+IHtcbi8vICAgICBwbGFjZXNBbmRJbnRlcmVzdHMuZm9yRWFjaChwbGFjZSA9PiB7XG4vLyAgICAgICAgIGxldCBwbGFjZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcbi8vICAgICAgICAgcGxhY2VEaXYuc2V0QXR0cmlidXRlKFwiaWRcIiwgcGxhY2UubmFtZSlcbi8vICAgICAgICAgcGxhY2VEaXYuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwbGFjZS1jYXJkXCIpXG4vLyAgICAgICAgIGxldCBwbGFjZU5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIilcbi8vICAgICAgICAgcGxhY2VOYW1lLmlubmVySFRNTCA9IHBsYWNlLm5hbWVcbi8vICAgICAgICAgcGxhY2VEaXYuYXBwZW5kQ2hpbGQocGxhY2VOYW1lKVxuLy8gICAgICAgICAvL2Z1bmN0aW9uIHRvIGxvb3AgdGhyb3VnaCBlYWNoIHBsYWNlcyBpbnRlcmVzdCBhbmQgYXBwZW5kIHRvIHBsYWNlIGRpdlxuLy8gICAgICAgICBwbGFjZS5pbnRlcmVzdHMuZm9yRWFjaChpbnRlcmVzdCA9PiB7XG4vLyAgICAgICAgICAgICBsZXQgaW50RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuLy8gICAgICAgICAgICAgaW50RGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIGAke2ludGVyZXN0LmlkfWApXG5cbi8vICAgICAgICAgICAgIGxldCBpbnROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpXG4vLyAgICAgICAgICAgICBpbnROYW1lLmlubmVySFRNTCA9IGAke2ludGVyZXN0Lm5hbWV9YFxuXG4vLyAgICAgICAgICAgICBsZXQgaW50RGVzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXG4vLyAgICAgICAgICAgICBpbnREZXNjLmlubmVySFRNTCA9IGAke2ludGVyZXN0LmRlc2NyaXB0aW9ufWBcblxuLy8gICAgICAgICAgICAgbGV0IGludENvc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKVxuLy8gICAgICAgICAgICAgaW50Q29zdC5pbm5lckhUTUwgPSBgJHtpbnRlcmVzdC5jb3N0fWBcblxuLy8gICAgICAgICAgICAgbGV0IGludFJldmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXG4vLyAgICAgICAgICAgICBpbnRSZXZpZXcuaW5uZXJIVE1MID0gKGludGVyZXN0LnJldmlldykgPyBgJHtpbnRlcmVzdC5yZXZpZXd9YCA6IFwiTm8gUmV2aWV3IFlldFwiXG5cbi8vICAgICAgICAgICAgIGxldCBlZGl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuLy8gICAgICAgICAgICAgZWRpdEJ0bi5pbm5lckhUTUwgPSBcIkVkaXRcIlxuLy8gICAgICAgICAgICAgbGV0IGRlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcbi8vICAgICAgICAgICAgIGRlbEJ0bi5pbm5lckhUTUwgPSBcIkRlbGV0ZVwiXG4vLyAgICAgICAgICAgICBkZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChldmVudCkgPT4gZGVsZXRlSW50ZXJlc3QoZXZlbnQudGFyZ2V0LnBhcmVudE5vZGUuaWQpKVxuXG4vLyAgICAgICAgICAgICBpbnREaXYuYXBwZW5kQ2hpbGQoaW50TmFtZSlcbi8vICAgICAgICAgICAgIGludERpdi5hcHBlbmRDaGlsZChpbnREZXNjKVxuLy8gICAgICAgICAgICAgaW50RGl2LmFwcGVuZENoaWxkKGludENvc3QpXG4vLyAgICAgICAgICAgICBpbnREaXYuYXBwZW5kQ2hpbGQoaW50UmV2aWV3KVxuLy8gICAgICAgICAgICAgaW50RGl2LmFwcGVuZENoaWxkKGVkaXRCdG4pXG4vLyAgICAgICAgICAgICBpbnREaXYuYXBwZW5kQ2hpbGQoZGVsQnRuKVxuXG4vLyAgICAgICAgICAgICBwbGFjZURpdi5hcHBlbmRDaGlsZChpbnREaXYpXG4vLyAgICAgICAgIH0pXG5cbi8vICAgICAgICAgLy9hcHBlbmQgcGxhY2UgZGl2IHRvIG1haW4gZGl2XG4vLyAgICAgICAgIG1haW5EaXYuYXBwZW5kQ2hpbGQocGxhY2VEaXYpXG4vLyAgICAgfSlcbi8vIH0pXG5cbmltcG9ydCByZWZyZXNoRG9tIGZyb20gXCIuL3JlZnJlc2hEb21cIlxuXG5yZWZyZXNoRG9tKCkiLCJpbXBvcnQgQVBJIGZyb20gXCIuL0RCY2FsbHNcIlxyXG5pbXBvcnQgY3JlYXRlRm9ybSBmcm9tIFwiLi9jcmVhdGVGb3JtXCJcclxuaW1wb3J0IGRlbGV0ZUludGVyZXN0IGZyb20gXCIuL2RlbGV0ZUZyb21EYlwiXHJcbmltcG9ydCBlZGl0UG9pbnQgZnJvbSBcIi4vZWRpdFBvaW50c1wiXHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xlYXJEb20oKSB7XHJcbiAgICBjb25zdCBtYWluRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluX2RpdlwiKVxyXG5cclxuICAgIG1haW5EaXYuaW5uZXJIVE1MID0gXCJcIlxyXG5cclxuICAgIG1haW5EaXYuYXBwZW5kQ2hpbGQoY3JlYXRlRm9ybSgpKVxyXG5cclxuICAgIC8vR2V0IGFsbCBwbGFjZXMgd2l0aCBpbnRlcmVzdHMgZW1iZWRkZWQgYW5kIHByaW50IHRvIGRvbVxyXG4gICAgQVBJLmdldFBvaW50c09mSW50ZXJlc3QoKS50aGVuKHBsYWNlc0FuZEludGVyZXN0cyA9PiB7XHJcbiAgICAgICAgcGxhY2VzQW5kSW50ZXJlc3RzLmZvckVhY2gocGxhY2UgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcGxhY2VEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgICAgIHBsYWNlRGl2LnNldEF0dHJpYnV0ZShcImlkXCIsIHBsYWNlLm5hbWUpXHJcbiAgICAgICAgICAgIHBsYWNlRGl2LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicGxhY2UtY2FyZFwiKVxyXG4gICAgICAgICAgICBsZXQgcGxhY2VOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgyXCIpXHJcbiAgICAgICAgICAgIHBsYWNlTmFtZS5pbm5lckhUTUwgPSBwbGFjZS5uYW1lXHJcbiAgICAgICAgICAgIHBsYWNlRGl2LmFwcGVuZENoaWxkKHBsYWNlTmFtZSlcclxuICAgICAgICAgICAgLy9mdW5jdGlvbiB0byBsb29wIHRocm91Z2ggZWFjaCBwbGFjZXMgaW50ZXJlc3QgYW5kIGFwcGVuZCB0byBwbGFjZSBkaXZcclxuICAgICAgICAgICAgcGxhY2UuaW50ZXJlc3RzLmZvckVhY2goaW50ZXJlc3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGludERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcclxuICAgICAgICAgICAgICAgIGludERpdi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgJHtpbnRlcmVzdC5pZH1gKVxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpbnROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImg0XCIpXHJcbiAgICAgICAgICAgICAgICBpbnROYW1lLmlubmVySFRNTCA9IGAke2ludGVyZXN0Lm5hbWV9YFxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpbnREZXNjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgICAgICAgICAgICAgIGludERlc2MuaW5uZXJIVE1MID0gYCR7aW50ZXJlc3QuZGVzY3JpcHRpb259YFxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBpbnRDb3N0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIilcclxuICAgICAgICAgICAgICAgIGludENvc3QuaW5uZXJIVE1MID0gYCR7aW50ZXJlc3QuY29zdH1gXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGludFJldmlldyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpXHJcbiAgICAgICAgICAgICAgICBpbnRSZXZpZXcuaW5uZXJIVE1MID0gKGludGVyZXN0LnJldmlldykgPyBgJHtpbnRlcmVzdC5yZXZpZXd9YCA6IFwiTm8gUmV2aWV3IFlldFwiXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGVkaXRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXHJcbiAgICAgICAgICAgICAgICBlZGl0QnRuLmlubmVySFRNTCA9IFwiRWRpdFwiXHJcbiAgICAgICAgICAgICAgICBlZGl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZ0KSA9PiBlZGl0UG9pbnQoZXZ0LnRhcmdldC5wYXJlbnROb2RlLmlkLCBpbnRlcmVzdCkpXHJcbiAgICAgICAgICAgICAgICBsZXQgZGVsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxyXG4gICAgICAgICAgICAgICAgZGVsQnRuLmlubmVySFRNTCA9IFwiRGVsZXRlXCJcclxuICAgICAgICAgICAgICAgIGRlbEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4gZGVsZXRlSW50ZXJlc3QoZXZ0LnRhcmdldC5wYXJlbnROb2RlLmlkKSlcclxuXHJcbiAgICAgICAgICAgICAgICBpbnREaXYuYXBwZW5kQ2hpbGQoaW50TmFtZSlcclxuICAgICAgICAgICAgICAgIGludERpdi5hcHBlbmRDaGlsZChpbnREZXNjKVxyXG4gICAgICAgICAgICAgICAgaW50RGl2LmFwcGVuZENoaWxkKGludENvc3QpXHJcbiAgICAgICAgICAgICAgICBpbnREaXYuYXBwZW5kQ2hpbGQoaW50UmV2aWV3KVxyXG4gICAgICAgICAgICAgICAgaW50RGl2LmFwcGVuZENoaWxkKGVkaXRCdG4pXHJcbiAgICAgICAgICAgICAgICBpbnREaXYuYXBwZW5kQ2hpbGQoZGVsQnRuKVxyXG5cclxuICAgICAgICAgICAgICAgIHBsYWNlRGl2LmFwcGVuZENoaWxkKGludERpdilcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIC8vYXBwZW5kIHBsYWNlIGRpdiB0byBtYWluIGRpdlxyXG4gICAgICAgICAgICBtYWluRGl2LmFwcGVuZENoaWxkKHBsYWNlRGl2KVxyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG59Il19
