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


let name = document.querySelector('.fname');
let service = document.querySelector('.service');
let CityState = document.querySelector('.city-state');
let firm = document.querySelector('.firm');
let office = document.querySelector('.office-address');
let callImage = document.getElementById('call');
let webImage = document.getElementById('web');
let mailImage = document.getElementById('mail');
let profilePicture = document.querySelector('.img');
let videoHeader = document.querySelector('.description');
let video = document.querySelector('iframe');

let backBtn = document.querySelector('.arrow-closer');


let toast = document.querySelector('p.toast');
let toastBody = document.querySelector('div.toast-body');

let title = document.querySelector('title');


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

//get user id
const URLParams = new URLSearchParams(window.location.search);
let userId = URLParams.get('id');
let userType = URLParams.get('userType');


//Interact with DB
if(userType == 'expert'){
    firestore.collection('experts').doc(userId).get().then(snap =>{
        renderHtml(snap);
    });
}else{
    firestore.collection('users').doc(userId).get().then(snap =>{
        renderHtml(snap);
    });
}


function renderHtml(doc){
    title.innerHTML = doc.data().firstname+' '+doc.data().lastname+' | CPS Attorney Rolodex';
    name.innerHTML = doc.data().firstname+' '+doc.data().lastname;
    service.innerHTML = doc.data()['service provided'];
    CityState.innerHTML = doc.data().city+', '+doc.data().state;
    firm.innerHTML = userType == 'expert'? '' : doc.data().firm+' | ';
    if(doc.data()['video upsell']){
        videoHeader.innerHTML = `<b class="follow-come">ABOUT ${doc.data().firstname} ${doc.data().lastname}</b>`;
        video.setAttribute('src', doc.data().video);
    }else{
        videoHeader.innerHTML = `<b class="follow-come"> ${doc.data().firstname} ${doc.data().lastname} Has No Video</b>`;
        video.setAttribute('style', 'display: none');
    }
    office.innerHTML = doc.data()['office address'];
    profilePicture.setAttribute('style', `background-image:url('${doc.data().image}')`);

    callImage.onclick = function(){
        //get numbers of previous clicks
        if(userType == 'expert'){
            firestore.collection('experts').doc(userId)
            .get().then(snap =>{
                let callCount = snap.data()['call counts'];
                callCount++;
                firestore.collection('experts').doc(userId).update({
                    'call counts': callCount,
                }).then(val =>{
                    location.href = `tel:${doc.data().phone}`;
                });
            });
        }else{
            firestore.collection('users').doc(userId)
            .get().then(snap =>{
                let callCount = snap.data()['call counts'];
                callCount++;
                firestore.collection('users').doc(userId).update({
                    'call counts': callCount,
                }).then(val =>{
                    location.href = `tel:${doc.data().phone}`;
                });
            });
        }
    }
    webImage.onclick = function(){
        //get no. of previous clicks
        userType == 'expert' ?
        firestore.collection('experts').doc(userId)
        .get().then(snap =>{
            let webCount = snap.data()['web counts'];
            webCount++;
            firestore.collection('experts').doc(userId).update({
                'web counts': webCount,
            }).then(val =>{
                location.href = `${doc.data().website}`;
            });
        }) :
        firestore.collection('users').doc(userId)
        .get().then(snap =>{
            let webCount = snap.data()['web counts'];
            webCount++;
            firestore.collection('users').doc(userId).update({
                'web counts': webCount,
            }).then(val =>{
                location.href = `${doc.data().website}`;
            });
        });
    }
    mailImage.onclick = function(){
        //get no. of previous click
        userType == 'expert'?
        firestore.collection('experts').doc(userId)
        .get().then(snap =>{
            let mailCount = snap.data()['mail counts'];
            mailCount++;
            firestore.collection('experts').doc(userId).update({
                'mail counts': mailCount,
            }).then(val =>{
                location.href = `mailTo:${doc.data().email}`;
            });
        }) :
        firestore.collection('users').doc(userId)
        .get().then(snap =>{
            let mailCount = snap.data()['mail counts'];
            mailCount++;
            firestore.collection('users').doc(userId).update({
                'mail counts': mailCount,
            }).then(val =>{
                location.href = `mailTo:${doc.data().email}`;
            });
        });
    }
}

//back button action
backBtn.onclick = function(){
    location.href = '/search.html';
}