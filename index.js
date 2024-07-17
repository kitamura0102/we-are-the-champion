// javascript

const publishBtn = document.getElementById("publish-btn")
const endorsementsEl = document.getElementById("input")
const fromEl = document.getElementById("from")
const toEl = document.getElementById("to")
let endorsementsDiv = document.getElementById("endorsements-para")

publishBtn.addEventListener("click", function(){
  createP()
})
function createP (){
  let createdPara = document.createElement("p")
  createdPara.textContent += endorsementsEl.value
  
  endorsementsDiv.appendChild(createdPara)
  console.log(createdPara)
  
}

console.log(endorsementsDiv)