var app
var db
const question = document.getElementById('question')
const choices = Array.from(document.getElementsByClassName("choice-container"))
const choiceP = Array.from(document.getElementsByClassName("choice"))
let choiceRadio = document.getElementsByName("choices")
console.log(choices)
let currentQuestion = {}

let questioncount = 0
//
let availableQuestions = []
let MAX_QUESTIONS = 0
let ansCount = []
let userAns = []
document.addEventListener("DOMContentLoaded", event => {

    app = firebase.app()
    db = firebase.firestore()



    function startGame() {




        var docRef = db.collection("admin").doc("first-admin");

        docRef.get().then(function (doc) {
            if (doc.exists) {
                document.getElementById("name").textContent = doc.data().Name
                //it is the copy of the uploaded questions
                availableQuestions = [...doc.data().Quiz]
                //shuffle tje questions array
                availableQuestions.sort(() => 0.5 - Math.random())
                MAX_QUESTIONS = availableQuestions.length
                for (let i = 0; i < MAX_QUESTIONS; i++) {
                    //on each object of the array , make a new field for the user-selected choice and initilase it to null
                    availableQuestions[i].userAns = null
                    availableQuestions[i].options.push(availableQuestions[i].answer)
                    //sort the options
                    availableQuestions[i].options.sort(() => 0.5 - Math.random())


                }
                display()

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

    }

    //onclivking the choices area
    choices.forEach(choice => {

        choice.addEventListener("click", () => {
            availableQuestions[questioncount].userAns = choices.indexOf(choice)
            choiceRadio[choices.indexOf(choice)].checked = true
        })
    })
    //events for next and prev
    document.getElementById("next").addEventListener("click", next)
    document.getElementById("prev").addEventListener("click", prev)
    startGame()

})
function display() {

    document.getElementById("heads-up").innerText = `Question ${questioncount + 1}/${MAX_QUESTIONS}`
    let progress = document.getElementById("progress-full")
    progress.style.width = `${((questioncount + 1) / MAX_QUESTIONS) * 100}%`
    currentQuestion = availableQuestions[questioncount]
    question.innerText = currentQuestion.question

    for (i = 0; i < 4; i++) {
        //if the currentQuestion's useranswer is equal to the i,chekced the radio button
        if (currentQuestion.userAns == i) {
            choiceRadio[i].checked = true
        } else if (currentQuestion.userAns == null) {
            //if the value is null,unchecked the other conditions
            choiceRadio[i].checked = false

        }
        //displaying each options
        choiceP[i].innerText = currentQuestion.options[i]
    }

}
function next() {

    if (availableQuestions.length === 0 || questioncount >= MAX_QUESTIONS) {
        document.getElementById("next").textContent = "end"
        return window.location.assign("/end.html")
    }
    questioncount++
    display()

}

function prev() {
    if (questioncount <= 0) { return questioncount = 0 }
    questioncount--
    display()

}


