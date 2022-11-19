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

const states = [
    'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
    'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas',
    'Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
    'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
    'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma',
    'Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee',
    'Texas', 'Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin',
    'Wyoming'
];

let statesDiv = document.querySelector('.states');
let resultDiv = document.querySelector('.results');

let note = document.querySelector('.note');

let dashboard = document.getElementById('dash');
let posts = document.getElementById('post');



dashboard.onclick = function(){
    location.href = '/cp/cp-home.html';
}
posts.onclick = function(){
    location.href = '/cp/cp-posts.html';
}

//loop throught the list of states
states.forEach(state =>{
    renderState(state);
});

function renderState(state){
    let div = document.createElement('div');
    let p = document.createElement('p');

    p.innerHTML = state;
    div.setAttribute('id', 'state-holder');

    div.appendChild(p);
    statesDiv.appendChild(div);

    div.onclick = function(){
        resultDiv.innerHTML = '';
        note.innerHTML = 'Showing Attorneys Representing In '+state;

        firestore.collection('users').where('state', '==', state.toLowerCase())
        .get().then(snap =>{
            if(snap.docs.length < 1){
                resultDiv.innerHTML = '<h1 class="warning">There Are Currently No Attorneys Registered In This State At This Time</h1>';
            }else{
                snap.docs.forEach(doc =>{
                    renderAttorneys(doc, snap.docs.length,state);
                });
            }
        });
    }

}

function renderAttorneys(doc, lenght,state){
    let backgroundImage = document.createElement('div');
    let name = document.createElement('p');
    let firm = document.createElement('p');
    let loction = document.createElement('p');

    backgroundImage.setAttribute('id', 'attorney-image');
    name.setAttribute('id', 'attorney-name');
    firm.setAttribute('id', 'firm');
    loction.setAttribute('id', 'location');

    backgroundImage.setAttribute('style', `background-image: url('${doc.data().image}')`);
    name.innerHTML = doc.data().firstname + ' '+ doc.data().lastname;
    firm.innerHTML = doc.data().firm;
    loction.innerHTML = doc.data().city+', '+doc.data().state;

    note.innerHTML = `Showing Attorneys Representing In ${state} <br><br> Total Number of Attorneys: ${lenght}`;

    backgroundImage.appendChild(name);
    backgroundImage.appendChild(firm);
    backgroundImage.appendChild(loction);
    resultDiv.appendChild(backgroundImage);

    backgroundImage.onclick = function(){
        location.href = `/cp/cp-view-attorney.html?id=${doc.id}`;
    }
    
}