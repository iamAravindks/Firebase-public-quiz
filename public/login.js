let formContainer = document.querySelector(".forms-container")
let loginDiv = document.querySelector(".login")

document.addEventListener("DOMContentLoaded", event => {

    app = firebase.app()
    db = firebase.firestore()



    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            formContainer.style.display = "none"
            loginDiv.style.display = "block"
            document.querySelector("#welcome").innerHTML = `Welcome ${user.displayName}`

        } else {
            // No user is signed in.
            formContainer.style.display = "all"
            loginDiv.style.display = "none"
        }
    });

})

const login = () => {
    let userName = document.getElementsByName("textfield").value
    let userPaswd = document.getElementsByName("password").value
    firebase.auth().signInWithEmailAndPassword(userName, userPaswd).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("Error :", errorMessage)
        // ...

    });

}

function signinGoogle() {
    console.log("CALLED THIS FUNVTION")

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        // console.log("logged")

        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

const showQUiz = () => {
    let tableBody = document.getElementById("t-body")
    loginDiv.style.display = "none"
    let tBody = document.getElementById("table")
    tBody.classList.add("display")
    console.log("working")
    db.collection("admin").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            console.log(doc.data().Name);
            console.log(doc.data().Quiz.length)
            let tableCont = `<tr>
                    <td>${doc.data().Name}</td>
                    <td>${doc.data().Quiz.length}</td>
                      </tr>`

            tableBody.insertAdjacentHTML("beforeend", tableCont);


        });
    })
}
