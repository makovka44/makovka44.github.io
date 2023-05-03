function showLogin() {
    window.location = "login.html";
    // Update the active tab
    var navLinks = document.getElementsByClassName("login")[0].getElementsByTagName("a");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
    }
    navLinks[1].classList.add("active");
}
function showRegister() {
  window.location = "register.html";
  var navLinks = document.getElementsByClassName("register")[0].getElementsByTagName("a");
  for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove("active");
  }
  navLinks[1].classList.add("active");
}
const firebaseConfig = {
    apiKey: "AIzaSyC5qgMh1cC8RsfXHafcnJu5BioJRIm1hdw",
    authDomain: "my-website-8f892.firebaseapp.com",
    projectId: "my-website-8f892",
    storageBucket: "my-website-8f892.appspot.com",
    messagingSenderId: "91947991336",
    appId: "1:91947991336:web:663163e19d2c8d5d81901d",
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the authentication service
const auth = firebase.auth();

// Get a reference to the Firestore database
const db = firebase.firestore();

// Login function
function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            document.getElementById("login-form").style.display = "none";
            document.getElementById("profile").style.display = "block";
            document.getElementById("user-email").innerHTML = "Logged in as: " + email;
            if (email === "maj.mohar4@gmail.com") {
                document.getElementById("users").style.display = "block";
                getUsers();
            } else {
                document.getElementById("users").style.display = "none";
            }
        })
        .catch(error => {
            alert(error.message);
        });
}

// Sign up function
function signup() {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            alert("Account created successfully!");
        })
        .catch(error => {
            alert(error.message);
            alert("Account not created! Try again.")
        });
}

// Logout function
function logout() {
    auth.signOut()
        .then(() => {
            location.reload();
        })
        .catch(error => {
            alert(error.message);
        });
}

// Get all users
function getUsers() {
    db.collection("users").get()
        .then(querySnapshot => {
            const userList = document.getElementById("user-list");
            querySnapshot.forEach(doc => {
                const user = doc.data();
                const li = document.createElement("li");
                li.innerHTML = user.name + " (" + user.email + ")";
                userList.appendChild(li);
            });
        })
        .catch(error => {
            alert(error.message);
        });
}