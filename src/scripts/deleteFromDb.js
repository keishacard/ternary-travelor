import API from "./DBcalls"
import refreshDom from "./refreshDom"

export default function deleteFromDb(interestId) {
    API.deletePointOfInterest(interestId).then(res => refreshDom())
}