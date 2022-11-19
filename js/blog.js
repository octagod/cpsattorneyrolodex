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

//DOM
let yearText = document.querySelector('#year');
let searchBtns = document.querySelectorAll('.search_nav');
let blogBtns = document.querySelectorAll('.blog_nav');
let serviceBtns = document.querySelectorAll('.service_nav');
let fab = document.querySelector('.mobile-menu');
let fab_body = document.querySelector('div.FAB ul');

let blogHolder = document.querySelector('section.talk');

let toast = document.querySelector('p.toast');
let toastBody = document.querySelector('div.toast-body');

let date = new Date;

yearText.innerHTML = date.getFullYear();

//naigation buttons
searchBtns.forEach((btn)=>{
    btn.onclick = function(){
        location.href = '/search.html';
    }
});
blogBtns.forEach((btn)=>{
    btn.onclick = function(){
        location.href = '/blog.html';
    }
});
serviceBtns.forEach((btn)=>{
    btn.onclick = function(){
        location.href = '/service.html';
    }
});
//the fab
fab.onclick = function(){
    fab.classList.toggle('open');
    fab_body.classList.toggle('show');
}

firestore.collection('posts').orderBy('timestamp', 'desc')
.get().then(snap =>{
    
    snap.docs.forEach(doc =>{
        renderPosts(doc);
    });
});


function renderPosts(doc){
    let heading = document.createElement('h3');
    let content = document.createElement('p');
    let hr = document.createElement('hr');

    heading.innerHTML = doc.data().header;
    content.innerText = doc.data().content;

    blogHolder.appendChild(heading);
    blogHolder.appendChild(content);
    blogHolder.appendChild(hr);
}


let emailBtn = document.getElementById('email');
let attyBtn1 = document.getElementById('call');
let contactUs = document.querySelector('.nav-button');



emailBtn.onclick = function(){
    location.href = 'mailto:cynthia@attorneyrolodex.com';
}
contactUs.onclick = function(){
    location.href = 'mailto:cynthia@attorneyrolodex.com';
}

attyBtn1.onclick = function(){
    location.href = 'https://defeatcps.com/welcome';
}