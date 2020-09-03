var app;
var db;
let createBtn = document.querySelector("#add-button")
let flag = 0;

let mainDiv = document.getElementById("container");
let tBody = document.getElementById("t-body")

document.addEventListener("DOMContentLoaded", (event) => {
  app = firebase.app();
  console.log(app);
  db = firebase.firestore();
  console.log(db);
  db.collection("admin").onSnapshot(function (querySnapshot) {
    tBody.innerHTML = " "
    querySnapshot.forEach(function (doc) {
      console.log(doc.data().Name);
      console.log(doc.data().Quiz.length)
      let tableCont = `<tr>
                <td>${doc.data().Name}</td>
                <td>${doc.data().Quiz.length}</td>
                <td><button onclick="displayAll('${doc.id}')" id="edit">edit</button></td>
                  </tr>`

      tBody.insertAdjacentHTML("beforeend", tableCont);


    });
  })


});


let displayQuestion = document.getElementsByName("display-question")
let displayAnswer = document.getElementsByName("display-answer")
let displayOption2 = document.getElementsByName("display-option2")
let displayOption3 = document.getElementsByName("display-option3")
let displayOption4 = document.getElementsByName("display-option4")


//adding datas to single document
function uploadData(docId) {
  createBtn.classList.add("not-display")
  let data = []
  let option = []
  for (let k = 0; k < displayQuestion.length; k++) {

    let temp = {}
    temp.question = displayQuestion[k].value
    temp.answer = displayAnswer[k].value
    temp.options = [displayOption2[k].value,
    displayOption3[k].value,
    displayOption4[k].value
    ]
    data.push(temp)
    console.log(data)

  }

  //ADDING TO database
  const admin = db.collection("admin");

  admin
    .doc(docId)
    .update({

      "Quiz": data
    })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });


}
//function used to checking empty
let j = 0


let displayDiv = document.getElementById("display-content")

//funvtion to add new question

function newQuestion() {
  let add =
    `<div>
      <h2 id="question-number">New question</h2>
      
        <form>
          <textarea name="display-question" class="display-question"  type="textarea" rows="5" cols="50"></textarea>
        </form>
        <div class="display-choice-container">
          <span class="opt">ans</span>
          <input  class="display-answer"  name="display-answer" type="text" >
        </div>
        <div class="display-choice-container">
          <span class="opt">A</span>
          <input  class="display-options"  name="display-option2" type="text" >
        </div>
        <div class="display-choice-container">
          <span class="opt">B</span>
          <input  class="display-options" name="display-option3"  type="text" >
        </div>
        <div class="display-choice-container">
          <span class="opt">C</span>
          <input  class="display-options"  name="display-option4"  type="text" >
        </div>
      </div>`
  displayDiv.insertAdjacentHTML("beforeend", add);

}

//display functions starts from here 

let displayText = document.querySelector(".not-display")
// let displayBtn = document.querySelector("#display-button")
let addBtn = document.querySelector("#button")
let mainTable = document.getElementById("quiz-table")
let main = document.getElementById("quiz-div")

function displayAll(docId) {
  let editDiv = document.getElementById("editdiv")
  editDiv.innerHTML = `<button id="button" name="add" onclick="uploadData('${docId}')">add</button>`
  main.classList.remove("not-display")
  mainTable.classList.add("not-display")
  // createBtn.classList.add("not-display")
  displayText.classList.add("display")


  db.collection("admin").doc(docId).get().then(function (querySnapshot) {

    querySnapshot.data().Quiz.forEach((element, index) => {
      console.log(element)
      let displayHtml = `  
      <div>
      <h2 id="question-number">question number .${index + 1}</h2>
      
        <form>
          <textarea name="display-question" class="display-question"  type="textarea" rows="5" cols="50">${element.question}</textarea>
        </form>
        <div class="display-choice-container">
          <span class="opt">ans</span>
          <input  class="display-answer"  name="display-answer" type="text" value="${element.answer}">
        </div>
        <div class="display-choice-container">
          <span class="opt">A</span>
          <input  class="display-options"  name="display-option2" type="text" value="${element.options[0]}">
        </div>
        <div class="display-choice-container">
          <span class="opt">B</span>
          <input  class="display-options" name="display-option3"  type="text" value="${element.options[1]}">
        </div>
        <div class="display-choice-container">
          <span class="opt">C</span>
          <input  class="display-options"  name="display-option4"  type="text" value="${element.options[2]}">
        </div>
      </div> `

      //fiels added here
      displayDiv.insertAdjacentHTML("beforeend", displayHtml);


    });
  });
}

function showTable() {
  db.collection("admin").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      console.log(doc.data().Name);
      console.log(doc.data().Quiz.length)
      let tableCont = `<tr>
                <td>${doc.data().Name}</td>
                <td>${doc.data().Quiz.length}</td>
                <td><button onclick="displayAll('${doc.id}')" id="edit">edit</button></td>
                  </tr>`
      tBody.insertAdjacentHTML("beforeend", tableCont);

    });
  });
}

let fieldBtn = document.querySelector("#fieldBtn ")
fieldBtn.addEventListener("click", () => {
  let name = prompt("please enter the name of the new quiz")
  // Add a new document with a generated id.
  if (name != null) {
    db.collection("admin").add({
      "Name": name,
      "Quiz": []
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

  }
})
