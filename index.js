// FireBase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase,
       ref,
       push,
       onValue} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
  databaseURL: "https://realtime-database-c7a12-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDb = ref(database, "endorsements")

onValue(referenceInDb, function(snapshot){
  let itemsArray = Object.entries(snapshot.val())
  
})

// javascrip

const publishBtn = document.getElementById("publish-btn")
const endorsementsEl = document.getElementById("input")
const fromEl = document.getElementById("from")
const toEl = document.getElementById("to")
let endorsementsDiv = document.getElementById("endorsements-para")

publishBtn.addEventListener("click", function(){
 
  createP()
  push(referenceInDb, endorsementsEl.value)
  endorsementsEl.value = ''
   
})
function createP (){
  let createdPara = document.createElement("p")
  createdPara.textContent += endorsementsEl.value
  
  endorsementsDiv.appendChild(createdPara)
  
}

