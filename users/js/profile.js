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

//get the url params
const URLParams = new URLSearchParams(window.location.search);
let userId = URLParams.get('userId');
let userType = URLParams.get('userType');

let title = document.querySelector('title');
let picture = document.querySelector('.pro-pic');
let picture1 = document.querySelector('.pro-pic1');
let logOutBtn = document.querySelector('.logout');
let websiteBtn = document.querySelector('.website');
let profileOpen = document.querySelector('.profile-opens');
let webClicks = document.querySelector('.web-opens');
let emailClicks = document.querySelector('.email-opens');
let callClicks = document.querySelector('.call-opens');

let fullname = document.getElementById('fullname');
let email = document.getElementById('email');
let firm = document.getElementById('firm');
let office = document.getElementById('office');
let city = document.getElementById('city');
let county = document.getElementById('county');
let state = document.getElementById('state');

let video = document.getElementById('video');
let changeVideo = document.querySelector('.change-video');
let active = document.querySelector('.active-note');
let subscription = document.querySelector('.sub-note');

let subBtn = document.getElementById('subscribe');


logOutBtn.onclick = function(){
    firebase.auth().signOut()
    .then(function(){
        location.href = 'login.html';
    });
}

websiteBtn.onclick = function(){
    location.href = '/index.html';
}

setTimeout(() => {
    if(userId === null || userId == ''){
        let container = document.querySelector('.container');
        container.innerHTML = '';
        container.innerHTML = '<h1 style="border-left: solid 2px red; "> Link Seems To Be Broken </h2>';
    }
}, 2000);



//set last login
let d = new Date();
let timestamp = d.getTime();

//convert timestamp to readable time
let dtObj = new Date(timestamp);
let lastLogin = dtObj.toLocaleString();

//save to user's data
firestore.collection('users').doc(userId)
.update({
    'last Logged In': lastLogin
});


//check if user is and attorney or an expert
if(userType == 'expert'){
    firestore.collection('experts').doc(userId).get()
    .then(snap =>{
        renderExperts(snap.data());
    });
}else{
    firestore.collection('users').doc(userId).get()
    .then(snap =>{
        renderHtml(snap.data());
    });
}


function renderHtml(doc){
    picture.setAttribute('src', doc.image);
    picture1.setAttribute('src', doc.image);
    profileOpen.innerHTML = doc.visits;
    webClicks.innerHTML = doc['web counts'];
    emailClicks.innerHTML = doc['mail counts'];
    callClicks.innerHTML = doc['call counts'];
    fullname.innerHTML = doc.firstname+' '+doc.lastname;
    title.innerHTML = doc.firstname+' '+doc.lastname;
    email.innerHTML = doc.email;
    firm.innerHTML = doc.firm;
    office.innerHTML = doc['office address'];
    city.innerHTML = doc.city;
    county.innerHTML = doc.county;
    state.innerHTML = doc.state;


    //check if user has video
    if(doc.video == null){
        //do noting
    }else{
        video.setAttribute('src', doc.video);
    }

    if(doc.active){
        active.innerHTML = 'You Are Currently Active';
    }else{
        active.innerHTML = 'You Are Currently Not Active'
    }

    //change "change Video text"
    if(doc['video upsell']){

    }else{
        changeVideo.innerHTML = 'Click Here To Add Your Descriptive Video';
    }

    changeVideo.onclick = function(){
        if(doc['video upsell']){
            location.href = 'video-upload.html?userId='+userId;
        }else{
            location.href = 'https://ve26c89.clickfunnels.com/order-formu6fvbzx4?userId='+userId
        }
    }


    let expireDate = doc['membership expire date'];
    subscription.innerHTML = `Your Membership expires after ${convertToMonth(expireDate.toString().substring(4,6))} - ${expireDate.toString().substring(0,4)}`;
    
    //subscription calculations
    
    if(expDate() > parseInt(expireDate)){
        subBtn.disabled = false;
        subBtn.onclick = function(){
            location.href = 'https://ve26c89.clickfunnels.com/subscription?userId='+userId+'userType=expert';
        }
    }else{
        subBtn.disabled = true;
        subBtn.setAttribute('style', 'background-color: grey');
        subBtn.setAttribute('class', 'disabled');
    }
}


function renderExperts(doc){
    picture.setAttribute('src', doc.image);
    picture1.setAttribute('src', doc.image);
    profileOpen.innerHTML = doc.visits;
    webClicks.innerHTML = doc['web counts'];
    emailClicks.innerHTML = doc['mail counts'];
    callClicks.innerHTML = doc['call counts'];
    fullname.innerHTML = doc.firstname+' '+doc.lastname;
    title.innerHTML = doc.firstname+' '+doc.lastname;
    email.innerHTML = doc.email;
    firm.innerHTML = '';
    office.innerHTML = doc['office address'];
    city.innerHTML = doc.city;
    county.innerHTML = doc.county;
    state.innerHTML = doc.state;

    //check if user has video
    if(doc.video == null){
        //do noting
    }else{
        video.setAttribute('src', doc.video);
    }

    //chec if user is active
    if(doc.active){
        active.innerHTML = 'You Are Currently Active';
    }else{
        active.innerHTML = 'You Are Currently Not Active'
    }

    //change "change Video text"
    if(doc['video upsell']){

    }else{
        changeVideo.innerHTML = 'Click Here To Add Your Descriptive Video';
    }

    changeVideo.onclick = function(){
        if(doc['video upsell']){
            location.href = 'video-upload.html?userId='+userId;
        }else{
            location.href = 'https://ve26c89.clickfunnels.com/order-formu6fvbzx4?userId='+userId
        }
    }


    let expireDate = doc['membership expire date'];
    subscription.innerHTML = `Your Membership expires after ${convertToMonth(expireDate.toString().substring(4,6))} - ${expireDate.toString().substring(0,4)}`;
    
    //subscription calculations
    
    if(expDate() > parseInt(expireDate)){
        subBtn.disabled = false;
        subBtn.onclick = function(){
            location.href = 'https://ve26c89.clickfunnels.com/subscription?userId='+userId;
        }
    }else{
        subBtn.disabled = true;
        subBtn.setAttribute('style', 'background-color: grey');
        subBtn.setAttribute('class', 'disabled');
    }
}



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