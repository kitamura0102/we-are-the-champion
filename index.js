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
const referenceInDb = ref(database, "endorsements");

onValue(referenceInDb, function (snapshot) {
  const snapshotDoesExist = snapshot.exists();
  if (snapshotDoesExist) {
    let itemsArray = Object.values(snapshot.val());

    appendItemToEndorsment(itemsArray);
  } else {
    endorsementsDiv.innerHTML = "No items yet.....";
  }
});

// javascrip

const publishBtn = document.getElementById("publish-btn");
const endorsementsEl = document.getElementById("input");
const fromEl = document.getElementById("from");
const toEl = document.getElementById("to");
let endorsementsDiv = document.getElementById("endorsements-para");

publishBtn.addEventListener("click", function () {
  let inputValue = endorsementsEl.value;
  let fromValue = fromEl.value;
  let toValue = toEl.value;
  push(referenceInDb, inputValue);
  console.log(inputValue, fromValue, toValue);
  clearInputValue();
});

function clearInputValue() {
  endorsementsEl.value = "";
  fromEl.value = "";
  toEl.value = "";
}

function appendItemToEndorsment(item) {
  let breakPoint = document.createElement("br")
  let itemID = item[0];
  let itemValue = item[1];
  let createdParagraph = document.createElement("p");
  

  createdParagraph.textContent = `De: ${fromEl.value} 
  ${endorsementsEl.value} 
  Para: ${toEl.value}`;
  endorsementsDiv.append(breakPoint,createdParagraph);
console.log(endorsementsDiv)
  createdParagraph.addEventListener("dblclick", function () {
    // let exactLocationOfItemInDB = ref(database, `endorsements/`)
    remove(referenceInDb);
  });
}
function clearShoppingListEl() {
  endorsementsDiv.innerHTML = "";
}
