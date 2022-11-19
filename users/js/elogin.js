// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAn1bqMOAAQ2rxE4kk0EctfI4bjrdiG-5M",
    authDomain: "family-website-c44d8.firebaseapp.com",
    projectId: "family-website-c44d8",
    storageBucket: "family-website-c44d8.appspot.com",
    messagingSenderId: "964661625935",
    appId: "1:964661625935:web:d8c7317ff49e07c90e163a",
    measurementId: "G-SZLJB54LMW"
};

//initialize Firebase
firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();

let email = document.getElementById('email');
let password = document.getElementById('password');
let submitBtn = document.querySelector('.sign-in');
let fogPasswordBtn = document.querySelector('.fog-pass');
let fogPassText = document.querySelector('.forgotPassword');

let toast = document.querySelector('p.toast');
let toastBody = document.querySelector('div.toast-body');

submitBtn.onclick = function(){
    if(email.value != '' && password.value != ''){
            firebase.auth().signInWithEmailAndPassword(email.value, password.value)
            .then((doc) => {
                location.href = 'profile.html?userId='+doc.user.uid+'&userType=expert';
            })
            .catch((err)=>{
                showToast('Email Or Password in Incorrect');
            });
    }else{
        showToast('Empty Fields');
    }
}

let fgtpas = false;

//forgot password
fogPasswordBtn.onclick = function(){
    fgtpas = !fgtpas;
    if(fgtpas){
        submitBtn.innerHTML = 'Send Reset Link';
        password.setAttribute('style', 'display:none');
        document.querySelector('.second h2').innerHTML = 'Forgot Password';
        document.querySelector('.second sub').innerHTML = 'Enter your login Email';

        submitBtn.onclick = function(){
            if(email.value != ''){
                firebase.auth().sendPasswordResetEmail(email.value).then((val)=>{
                    showToast(`Your Password Reset Email <br> Has Been Sent to ${email.value}`);
                    email.value = '';
                    setTimeout(()=>{
                        location.reload();
                    }, 6000);
                });
            }else{
                showToast('Input your email address');
            }
        }
    }else{
        submitBtn.innerHTML = 'SIGN IN';
        password.setAttribute('style', 'display:block');
        document.querySelector('.second h2').innerHTML = 'Sign In';
        document.querySelector('.second sub').innerHTML = 'Use Your Email and Password';
    }
}

fogPassText.onclick = function(){
    fgtpas = !fgtpas;
    if(fgtpas){
        submitBtn.innerHTML = 'Send Reset Link';
        password.setAttribute('style', 'display:none');
        document.querySelector('.second h2').innerHTML = 'Forgot Password';
        document.querySelector('.second sub').innerHTML = 'Enter your login Email';
        fogPassText.innerText = 'Back To login';


        submitBtn.onclick = function(){
            if(email.value != ''){
                firebase.auth().sendPasswordResetEmail(email.value).then((val)=>{
                    showToast(`Your Password Reset Email <br> Has Been Sent to ${email.value}`);
                    email.value = '';
                    setTimeout(()=>{
                        location.reload();
                    }, 6000);
                });
            }else{
                showToast('Input your email address');
            }
        }
    }else{
        submitBtn.innerHTML = 'SIGN IN';
        password.setAttribute('style', 'display:block');
        document.querySelector('.second h2').innerHTML = 'Sign In';
        document.querySelector('.second sub').innerHTML = 'Use Your Email and Password';
        fogPassText.innerText = 'Forgot Password';
    }
}


function showToast(msg){
    toast.innerHTML = msg;
    setTimeout(function(){
        toastBody.classList.toggle('show');
    }, 5000);
    toastBody.classList.toggle('show');
}

