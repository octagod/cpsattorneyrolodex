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

const urlParams = new URLSearchParams(window.location.search);
let visitedBefore = urlParams.get('visited');


//DOM
let yearText = document.querySelector('#year');
let postDiv = document.querySelector('.post');
let fab = document.querySelector('.mobile-menu');
let fab_body = document.querySelector('div.FAB ul');
let searchBtns = document.querySelectorAll('.search_nav');
let blogBtns = document.querySelectorAll('.blog_nav');
let serviceBtns = document.querySelectorAll('.service_nav');
let familyImage = document.querySelector('.happy-family');

let popupBg = document.querySelector('.popup-body');
let closePopup = document.querySelector('.close');
let attyBtn = document.querySelector('.attorney-btn');
let famBtn = document.querySelector('.family-btn');
let expertBtn = document.querySelector('.expert-btn');


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

//fetch the post from the data base
firestore.collection('posts').orderBy('timestamp','desc').limit(2).get()
.then((snap)=>{
    snap.docs.forEach(doc =>{
        renderHTML(doc);
    });
});

function renderHTML(doc){
    let post_heading = document.createElement('p');
    let post_content = document.createElement('p');

    post_heading.setAttribute('class', 'post-header');
    post_content.setAttribute('class', 'post-content');


    let content = doc.data().content;
    let header = doc.data().header;

    post_heading.innerHTML = header.toUpperCase();
    post_content.innerHTML = content.substring(0, 99)+'...';

    postDiv.appendChild(post_heading);
    postDiv.appendChild(post_content);
}

//show popup after 5 secs
setTimeout(() => {
    if(visitedBefore == 'visited'){
        //do nothing.....
    }else{
        popupBg.classList.toggle('show-pop-up');
    }
}, 5000);

//hide the pop-up close button


// popupBg.onclick = function(){
//     popupBg.classList.remove('show-pop-up');
// }

//Popup bottons
closePopup.onclick = function(){
    popupBg.classList.remove('show-pop-up');
}

attyBtn.onclick = function(){
    location.href = 'https://defeatcps.com/welcome';
}

famBtn.onclick = function(){
    location.href = 'https://www.attorneyrolodex.com/cps-family-optin';
}

expertBtn.onclick = function(){
    location.href = 'https://www.attorneyrolodex.com/optin8i19u33e';
}

//check to deactivte all attorneys who hasn't subscribed for this current month
firestore.collection('users').get().then(snap =>{
    snap.docs.forEach(doc =>{
        if(expDate() > parseInt(doc.data()['membership expire date'])){
            firestore.collection('users').doc(doc.id)
            .update({
                'active': false
            });
        }else{
            //do nothing
        }
    });
});

//expire date generator
var expDate = function(){
    let date = new Date();
    let m = date.getMonth();
    let month = parseInt(m)+1;
    let year = date.getFullYear();

    if(parseInt(m)+1 >= 12 ){
        year = date.getFullYear()+1;
    }else{
        year = date.getFullYear();
    }

    if(month.toString().length === 2){
        if(month > 12){
            let newMon = month - 12;
            if(newMon.toString().length === 2){
                return parseInt(`${year}${newMon}`);
            }else{
                return parseInt(`${year}0${newMon}`);
            }
        }else{
            return parseInt(`${year}0${month}`);
        }
    }else{
        return parseInt(`${year}0${month}`);
    }
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