// FireBase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";

const firebaseConfig = {
  databaseURL: "https://realtime-database-c7a12-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const endorsementsInDb = ref(database, "endorsements");

// javascrip

const publishBtn = document.getElementById("publish-btn");
let endorsementsEl = document.getElementById("input");
const fromEl = document.getElementById("from");
const toEl = document.getElementById("to");
const endorsementsDiv = document.getElementById("endorsements-para");
const noitemsOnEndorsements = "There is no items in here... yet";
//
onValue(endorsementsInDb, function (snapshot) {
  const endorsementsExists = snapshot.exists();
  
  if (endorsementsExists) {
    const endorsementsArrays = Object.entries(snapshot.val());
    clearEndorsementsDiv();
    for (let i = 0; i < endorsementsArrays.length; i++) {
      let currentEndorsements = endorsementsArrays[i];
      
      appendItemEndorsements(currentEndorsements);
      
    }
  } else {
    endorsementsDiv.innerHTML = noitemsOnEndorsements
  }
});
//
publishBtn.addEventListener("click", function () {
  let inputValue = endorsementsEl.value;
  
  push(endorsementsInDb, inputValue);

  clearInputValue();
});

function clearInputValue() {
  endorsementsEl.value = "";
}

function appendItemEndorsements(item) {
  let itemId = item[0]
  let itemValue = item[1]
  let toElValue = toEl.value
  let fromElValue = fromEl.value
  let totalValue = `Para ${toElValue},<br><br> ${itemValue}. <br><br> De parte de ${fromElValue}  `
  let createdParagraph = document.createElement("p");
  createdParagraph.innerHTML = totalValue;
  endorsementsDiv.append(createdParagraph);

  createdParagraph.addEventListener("dblclick", function () {
    let exactLocationOfEndorsements = ref(database,  `endorsements/${itemId}` )
    remove(exactLocationOfEndorsements)
  });
}

function clearEndorsementsDiv() {
  endorsementsDiv.innerHTML = "";
}
