document.addEventListener("DOMContentLoaded", event => {

    app = firebase.app()
    db = firebase.firestore()



    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log(user)
            document.querySelector(".forms-container").getElementsByClassName.display = "none"
            document.querySelector(".login").getElementsByClassName.display = "block"

        } else {
            // No user is signed in.
            document.querySelector(".forms-container").getElementsByClassName.display = "all"
            document.querySelector(".login").getElementsByClassName.display = "none"
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

const signinGoogle = () => {
    console.log("CALLED THIS FUNVTION")
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(user, "login sucessful")

        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        console.log(errorMessage)
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...

    });
}