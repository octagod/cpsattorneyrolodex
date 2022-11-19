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
const userId = urlParams.get('id');

let title = document.querySelector('.title');
let pageTitle = document.querySelector('title');
let profilePicture =document.querySelector('.profile-picture');
let fullName = document.querySelector('.ful-name');
let firm = document.querySelector('.firm');
let service = document.querySelector('.service');
let office = document.querySelector('.office');
let cityState = document.querySelector('.city-state');
let video = document.querySelector('.desc');
let videoPlayer = document.querySelector('iframe');

let visits = document.querySelector('.no-of-visits .number');
let calls = document.querySelector('.no-of-calls .number');
let webs = document.querySelector('.no-of-web .number');
let mails = document.querySelector('.no-of-mail .number');

let note = document.querySelector('p.note');
let memberExpire = document.querySelector('.expire');

let dashboard = document.getElementById('dash');
let people = document.getElementById('people');
let posts = document.getElementById('post');



dashboard.onclick = function(){
    location.href = '/cp/cp-home.html';
}
people.onclick = function(){
    location.href = '/cp/cp-attorney.html';
}
posts.onclick = function(){
    location.href = '/cp/cp-posts.html';
}

firestore.collection('users').doc(userId).get().then(snap =>{
    title.innerHTML = snap.data().firstname+' '+snap.data().lastname;
    pageTitle.innerHTML = snap.data().firstname+' '+snap.data().lastname;
    
    profilePicture.setAttribute('style', `background-image:url('${snap.data().image}')`);
    fullName.innerHTML = snap.data().firstname+' '+snap.data().lastname;
    firm.innerHTML = '<b class="indicator">FIRM</b> '+snap.data().firm;
    service.innerHTML = '<b class="indicator">SERVICE PROVIDED</b> '+snap.data()['service provided'];
    office.innerHTML = '<b class="indicator">OFFICE ADDRESS</b> '+snap.data()['office address'];
    cityState.innerHTML = '<b class="indicator">LOCATION</b> '+snap.data().city+' '+snap.data().state+'<br><br> <b class="indicator">LAST LOGGED IN</b> '+snap.data()['last Logged In'];
    
    
    if(snap.data()['video upsell']){
        video.innerHTML = '<b class="indicator">VIDEO</b>';
        videoPlayer.setAttribute('src', snap.data().video); 
    }else{
        video.innerHTML = '<b class="indicator">ATTORNEY HAS NO VIDEO</b>';
        videoPlayer.setAttribute('style', 'display: none');
    }
    

    visits.innerHTML = snap.data().visits;
    calls.innerHTML = snap.data()['call counts'];
    webs.innerHTML = snap.data()['web counts'];
    mails.innerHTML = snap.data()['mail counts'];

    let expireDate = snap.data()['membership expire date'];

    memberExpire.innerHTML = `${snap.data().firstname}'s Membership expires after ${convertToMonth(expireDate.toString().substring(4,6))} - ${expireDate.toString().substring(0,4)}`;

    if(snap.data().active){
        note.innerHTML = `${snap.data().firstname} is currently Active`
    }else{
        note.innerHTML = `${snap.data().firstname} is currently not a Active`
    }
});


function convertToMonth(arg){
    let val = parseInt(arg);

    switch(val){
        case 1:
            return 'JAN';
            break;
        case 2:
            return 'FEB';
            break;
        case 3:
            return 'MAR';
            break;
        case 4:
            return 'APR';
            break;
        case 5:
            return 'MAY';
            break;
        case 6:
            return 'JUN';
            break;
        case 7:
            return 'JUL';
            break;
        case 8:
            return 'AUG';
            break;
        case 9:
            return 'SEP';
            break;
        case 10:
            return 'OCT';
            break;
        case 11:
            return 'NOV';
            break;
        case 12:
            return 'DEC';
            break;
        default:
            return 'ERROR';
            break;
    }
}