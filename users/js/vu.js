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

//get userId from url param
const URLParams = new URLSearchParams(window.location.search)
let userId = URLParams.get('userId');
let userType = URLParams.get('userType');

//validate live link
setTimeout(() => {
    if(userId === null){
        let container = document.querySelector('.container');
        container.innerHTML = '';
        container.innerHTML = '<h1 class="error"> Link is Broken </h1>';
        container.setAttribute('style', 'border-left: solid 2px red');
    }
}, 2000);

let video = document.querySelector('.video');
let link = document.getElementById('video');
let btn = document.querySelector('.submit-form');



btn.onclick = function(){
    if(link.value != ''){
       if(userType == 'expert'){
        btn.innerText = 'Submiting...';
        firestore.collection('experts').doc(userId)
        .update({
            'video': link.value,
            'video upsell': true
        }).then(val =>{
            btn.innerText = 'Done';
            location.href = `/users/profile.html?userId=${userId}&userType=${userType}`;
        });
       }else{
        btn.innerText = 'Submiting...';
        firestore.collection('users').doc(userId)
        .update({
            'video': link.value,
            'video upsell': true
        }).then(val =>{
            btn.innerText = 'Done';
            location.href = `/users/profile.html?userId=${userId}&userType=${userType}`;
        });
       }
    }else{
        link.setAttribute('style', 'border: solid 2px red');
    }
}

