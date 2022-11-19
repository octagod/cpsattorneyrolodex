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

let NoOfAttorney = document.querySelector('.no-of-attorneys .number');
let NoOfActiveAtty = document.querySelector('.no-of-active-atty .number');
let NoOfPosts = document.querySelector('.no-of-posts .number');

let mostOpensAtty = document.querySelector('#most-opens-atty');
let mostCalledAtty = document.querySelector('.most-called-atty');
let mostWebVisits = document.querySelector('.most-website-atty');
let mostMailed = document.querySelector('.most-mailed-atty');

let people = document.getElementById('people');
let posts = document.getElementById('post');
// let addUser = document.getElementById('add-user');



people.onclick = function(){
    location.href = '/cp/cp-attorney.html';
}
posts.onclick = function(){
    location.href = '/cp/cp-posts.html';
}

//get number of attorneys
firestore.collection('users').get().then(snap =>{
    NoOfAttorney.innerHTML = snap.docs.length;
});

//get total number of active attorneys
firestore.collection('users').where('active', '==', true).get().then(snap =>{
    NoOfActiveAtty.innerHTML = snap.docs.length;
});

//get total number of posts
firestore.collection('posts').get().then(snap =>{
    NoOfPosts.innerHTML = snap.docs.length;
});


//get most visited attorney
firestore.collection('users').orderBy('visits', 'desc').get()
.then(snap =>{
    renderAttorney(snap.docs[0]);
});

function renderAttorney(doc){
    let name = document.createElement('p');
    let firm = document.createElement('p');
    let loction = document.createElement('p');

    name.setAttribute('id', 'attorney-name');
    firm.setAttribute('id', 'firm');
    loction.setAttribute('id', 'location');

    mostOpensAtty.setAttribute('style', `background-image: url('${doc.data().image}')`);
    name.innerHTML = doc.data().firstname + ' '+ doc.data().lastname;
    firm.innerHTML = doc.data().firm;
    loction.innerHTML = doc.data().city+', '+doc.data().state;

    mostOpensAtty.appendChild(name);
    mostOpensAtty.appendChild(firm);
    mostOpensAtty.appendChild(loction);
}


//get most called attorney
firestore.collection('users').orderBy('call counts', 'desc').get()
.then(snap =>{
    renderCall(snap.docs[0]);
});

function renderCall(doc){
    let name = document.createElement('p');
    let firm = document.createElement('p');
    let loction = document.createElement('p');

    name.setAttribute('id', 'attorney-name');
    firm.setAttribute('id', 'firm');
    loction.setAttribute('id', 'location');

    mostCalledAtty.setAttribute('style', `background-image: url('${doc.data().image}')`);
    name.innerHTML = doc.data().firstname + ' '+ doc.data().lastname;
    firm.innerHTML = doc.data().firm;
    loction.innerHTML = doc.data().city+', '+doc.data().state;

    mostCalledAtty.appendChild(name);
    mostCalledAtty.appendChild(firm);
    mostCalledAtty.appendChild(loction);
}


//get most web visits
firestore.collection('users').orderBy('web counts', 'desc').get()
.then(snap =>{
    renderWeb(snap.docs[0]);
});

function renderWeb(doc){
    let name = document.createElement('p');
    let firm = document.createElement('p');
    let loction = document.createElement('p');

    name.setAttribute('id', 'attorney-name');
    firm.setAttribute('id', 'firm');
    loction.setAttribute('id', 'location');

    mostWebVisits.setAttribute('style', `background-image: url('${doc.data().image}')`);
    name.innerHTML = doc.data().firstname + ' '+ doc.data().lastname;
    firm.innerHTML = doc.data().firm;
    loction.innerHTML = doc.data().city+', '+doc.data().state;

    mostWebVisits.appendChild(name);
    mostWebVisits.appendChild(firm);
    mostWebVisits.appendChild(loction);
}


//get most mail visits
firestore.collection('users').orderBy('mail counts', 'desc').get()
.then(snap =>{
    renderMail(snap.docs[0]);
});

function renderMail(doc){
    let name = document.createElement('p');
    let firm = document.createElement('p');
    let loction = document.createElement('p');

    name.setAttribute('id', 'attorney-name');
    firm.setAttribute('id', 'firm');
    loction.setAttribute('id', 'location');

    mostMailed.setAttribute('style', `background-image: url('${doc.data().image}')`);
    name.innerHTML = doc.data().firstname + ' '+ doc.data().lastname;
    firm.innerHTML = doc.data().firm;
    loction.innerHTML = doc.data().city+', '+doc.data().state;

    mostMailed.appendChild(name);
    mostMailed.appendChild(firm);
    mostMailed.appendChild(loction);
}