// FireBase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
  update,
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
  let toElValue = toEl.value
  let fromElValue = fromEl.value
  let totalValue = {
    to: toElValue,
    from: fromElValue,
    message:inputValue,
    likes:0
  }
  push(endorsementsInDb, totalValue);

  clearInputValue();
});

function clearInputValue() {
  endorsementsEl.value = "";
}

function appendItemEndorsements(item) {
  let itemId = item[0];
  let itemValue = item[1];
  let to = itemValue.to;
  let from = itemValue.from;
  let message = itemValue.message;
  let likes = itemValue.likes;

  let createdComment = document.createElement("div");
  createdComment.className = "comment";
  createdComment.innerHTML = `Para ${to},<br><br>${message}.<br><br>De parte de ${from}`;

  let likeContainer = document.createElement("div");
  likeContainer.className = "like-container";

  let likesCount = document.createElement("span");
  likesCount.className = "likes-count";
  likesCount.textContent = likes;

  let heartIcon = document.createElement("i");
  heartIcon.className = "fa-solid fa-heart fa-lg like-icon";

  likeContainer.appendChild(likesCount);
  likeContainer.appendChild(heartIcon);
  createdComment.appendChild(likeContainer);
  endorsementsDiv.append(createdComment);

  createdComment.addEventListener("dblclick", function () {
    let newLikes = likes + 1;
    let exactLocationOfEndorsements = ref(database, `endorsements/${itemId}`);
    update(exactLocationOfEndorsements, { likes: newLikes });
  });

  

  // Crear el botón de eliminar
  // Crear el botón de eliminar
  let deleteButton = document.createElement("button");
  deleteButton.className = "delete-btn";
  deleteButton.innerHTML = "X";

  // Añadir el contenido y el botón de eliminar al contenedor del comentario
  createdComment.append(deleteButton);

  // Evento para eliminar el comentario
  deleteButton.addEventListener("click", function () {
    let exactLocationOfEndorsements = ref(database, `endorsements/${itemId}`);
    remove(exactLocationOfEndorsements);
  });

}
function clearEndorsementsDiv() {
  endorsementsDiv.innerHTML = "";
}
