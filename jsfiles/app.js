

// Initialize Firebase app with your configuration
const app = firebase.initializeApp(firebaseConfig);
console.log(app)

// Function to handle user sign-up
const signup = () => {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            firebase.database().ref('users/' + user.uid).set({
                uid: user.uid,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            })
            .then(() => {
                const user = { email: email };
                sessionStorage.setItem('user', JSON.stringify(user));
                console.log('User created successfully.');
                window.location.href = './htmlfiles/dashboard.html';
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage);
        });
};

const signin = () => {
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log(user)
            const dbRef = firebase.database().ref();
            dbRef.child("users").child(user.uid).get().then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val()
                    if (userData.role === 'Admin') {
                        const user = { email: email };
                        sessionStorage.setItem('user', JSON.stringify(user));
                        console.log('User created successfully.')
                        window.location.href = '../htmlfiles/dashboard.html'
                    }
                    else {
                        const user = { email: email };
                        sessionStorage.setItem('user', JSON.stringify(user));
                        window.location.href = '../htmlfiles/dashboard.html'
                    }
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error(error);
            });
        })
        .catch((error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode + ': ' + errorMessage)
        });

}















