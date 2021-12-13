// adding FIREBASE FUNCTIONS  --keep at top
function initFirebase() {
    // firebase.auth().signInAnonymously().then(() => {
    //         console.log("signed in holmes");
    //         // _db = firebase.firestore();
    //     })
    //     .catch((error) => {
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //          console.log(errorMessage);          //delete maybe
    //         _db = [];
    //     })

    //2:09:30
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("connected");
        } else {
            console.log("user in not there");
            // _db = "";
        }
    });
}

//MVC
function route() {
    let hashTag = window.location.hash;
    // console.log("hash tag " + hashTag);
    let pageID = hashTag.replace("#/", "");

    if (pageID == "") {
        // navToPage("home");
        MODEL.getMyVariable("coffeemakers");

    } else {
        // navToPage(pageID);
        MODEL.getMyVariable(pageID);

    } 
    //use model
    MODEL.getMyVariable(pageID);
}


function createUser() {                                         //creatteuser function
    let password =  $("password").val();
    let email =     $("email").val();
    let fname =     $("fname").val();
    let lname =     $("lname").val();

    firebase.auth().createUserWithEmailAndPassword(email, password)     //from firebase - go to docs - web - authentication - password - v8
    .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;         //1:44
    // ...
    })
    .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    });
}
function signIn() {                                         //signin function
    let password =  $("password").val();
    let email =     $("email").val();

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log("signed in bro")
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
}
function signOut() {                                        //signout function
    firebase.auth().signOut().then(() => {
        console.log("signed out message");
        }).catch((error) => {
        // An error happened.
        console.log(error);
        });
}


function initListeners() {
    $(window).on("hashchange", route);          //mvc 
    route();

    // firebase targeting button in huser.html
    $("signIn").click(function(e) {
        e.preventDefault();
        let btnID = e.currentTarget.id;
        console.log(btnID);

        if(btnID == "createButton") {
            createUser();
        } else if (btnID == "signInButton") {
            signIn();
        } else if (btnID == "signOutButton") {
            signOut();
        }
    });

    // document.getElementById("signIn").addEventListener("click", function(e) {
    //     e.preventDefault();
    //     let btnID = e.currentTarget.id();
    //     console.log(btnID);

    //     if(btnID == "createButton") {
    //                 createUser();
    //             } else if (btnID == "signInButton") {
    //                 signIn();
    //             } else if (btnID == "signOutButton") {
    //                 signOut();
    //             }
    // });

    //1:31:00
}



$(document).ready(function() {
    // navToPage("home");
    // initListeners();

    try {
        let app = firebase.app();
        initFirebase();
        initListeners();
    }   catch {
        console.error(e);
    }
});

// FIREBASE BEGINS      //ignore

//cart counter
$(document).ready(function(){
    //create variable
    var counts = 0;
    $(".addtocart").click(function () {
    //to number and increase to 1 on each click
        counts += +1;
        $(".cart-counter").animate({
    //show span with number
                    opacity: 1
                }, 300, function () {
    //write number of counts into span
                    $(this).text(counts);
                });
    }); 
});
