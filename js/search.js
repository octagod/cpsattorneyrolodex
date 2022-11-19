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
let search_bar = document.getElementById('search-bar');
let searchBtn = document.querySelector('.search-button');
let resultDiv = document.querySelector('.results');
let emptyDiv = document.querySelector('.empty');
let searchBarBody = document.querySelector('div.search-div');
let attorneySelector = document.querySelector('.attorneys-selector');
let expertSelector = document.querySelector('.expert-selector');

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

//change results from attorneys to experts
attorneySelector.onclick = function(){
    resultDiv.innerHTML = '';
    if(attorneySelector.classList.contains('selected')){
        //do nothing
    }else{
        attorneySelector.classList.add('selected');
        expertSelector.classList.remove('selected');
        searchBarBody.classList.add('show-element');
    }
}

expertSelector.onclick = function(){
    resultDiv.innerHTML = '';
    emptyDiv.innerHTML = '';
    if(expertSelector.classList.contains('selected')){
        //do nothing
    }else{
        expertSelector.classList.add('selected');
        attorneySelector.classList.remove('selected');
        searchBarBody.classList.remove('show-element');


        //create a loader while code is fetching data
        let loader = document.createElement('img');
        loader.setAttribute('id', 'loader');
        loader.setAttribute('src', '/assets/loading.jpg');
        resultDiv.appendChild(loader);


        //show experts from database
        firestore.collection('experts').get()
        .then(snap =>{
            snap.docs.forEach(doc =>{
                resultDiv.innerHTML = '';
                renderAttorneys(doc,'expert');
            });
        });
    }
}

searchBtn.onclick = function(){

    resultDiv.innerHTML = '';
    //create a loader while code is fetching data
    let loader = document.createElement('img');
    loader.setAttribute('id', 'loader');
    loader.setAttribute('src', '/assets/loading.jpg');
    resultDiv.appendChild(loader);
    emptyDiv.innerHTML = '';

    if(search_bar.value == ''){
        resultDiv.innerHTML = '';
        showToast('Search Bar is Empty');
    }else{
        firestore.collection('users').where('state', '==', search_bar.value.toLowerCase())
        .where('active', '==', true).get().then(snap =>{
            
            if(snap.docs.length == 0){
                emptyDiv.innerHTML = '';
                resultDiv.innerHTML = '';
                showToast('There are currently no Attorneys in this location');

                //ask user to provide details to get notified when there has been an attorney in the state they searched
                let textP = document.createElement('h1');
                let submitBtn = document.createElement('button');
                
                textP.setAttribute('id', 'empty-text');
                submitBtn.setAttribute('id', 'submit-button');

                textP.innerHTML = `Kindly provide your information to get notified when there are attoneys available in <b>${search_bar.value}</b>`;
                submitBtn.innerText = 'Proceed';

                //change the display of emptyDiv
                emptyDiv.setAttribute('style', 'display: block');
                emptyDiv.setAttribute('style', 'text-align: center');
                emptyDiv.appendChild(textP);
                emptyDiv.appendChild(submitBtn);
                search_bar.value = ''; 

                submitBtn.onclick = function(){
                    location.href = 'https://attorneyrolodex.com/cps-family-notification';
                }
            }else{
                resultDiv.innerHTML = '';
                snap.docs.forEach(doc =>{
                    renderAttorneys(doc);
                });
            }
        });
    }
}

//search when the user hits the enter button
search_bar.onkeyup = function(e){
    if(e.keyCode == 13){

        //create a loader while code is fetching data
        let loader = document.createElement('img');
        loader.setAttribute('id', 'loader');
        loader.setAttribute('src', '/assets/loading.jpg');
        resultDiv.appendChild(loader);
        emptyDiv.innerHTML = '';

        //execute code here
        if(search_bar.value == ''){
            resultDiv.innerHTML = '';
            showToast('Search Bar is Empty');
        }else{
            firestore.collection('users').where('state', '==', search_bar.value.toLowerCase())
            .where('active', '==', true).get().then(snap =>{
                
                if(snap.docs.length == 0){
                    emptyDiv.innerHTML = '';
                    resultDiv.innerHTML = '';
                    showToast('There are currently no Attorneys in this location');

                    //ask user to provide details to get notified when there has been an attorney in the state they searched
                    let textP = document.createElement('h1');
                    let submitBtn = document.createElement('button');
                    
                    textP.setAttribute('id', 'empty-text');
                    submitBtn.setAttribute('id', 'submit-button');
    
                    textP.innerHTML = `Kindly provide your information to get notified when there are attoneys available in <b>${search_bar.value}</b>`;
                    submitBtn.innerText = 'Proceed';
    
                    //change the display of emptyDiv
                    emptyDiv.setAttribute('style', 'display: block');
                    emptyDiv.setAttribute('style', 'text-align: center');
                    emptyDiv.appendChild(textP);
                    emptyDiv.appendChild(submitBtn);
                    search_bar.value = ''; 
    
                    submitBtn.onclick = function(){
                        location.href = 'https://www.attorneyrolodex.com/cps-family-notification';
                    }
                }else{
                    resultDiv.innerHTML = '';
                    snap.docs.forEach(doc =>{
                        renderAttorneys(doc);
                    });
                }
            });
        }
    }
} 


function renderAttorneys(doc, userType){
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
    firm.innerHTML = userType == 'expert'? '' : doc.data().firm;
    loction.innerHTML = doc.data().city+', '+doc.data().state;

    backgroundImage.appendChild(name);
    backgroundImage.appendChild(firm);
    backgroundImage.appendChild(loction);
    resultDiv.appendChild(backgroundImage);

    //add number of account opens to users count
    if(userType == 'expert'){
        backgroundImage.onclick = function(){
            let count;
            //get number of account visits
            firestore.collection('experts').doc(doc.id).get().then(doc =>{
                count = doc.data().visits;
                //adds number of count + 1
                count++;
                //updates visits in DB
                firestore.collection('experts').doc(doc.id).update({
                    visits: count
                }).then(val =>{
                    //navigate to the view attorney page.
                    location.href = `/attorney.html?id=${doc.id}&userType=expert`;
                });
            });
        }
    }else{
        backgroundImage.onclick = function(){
            let count;
            //get number of account visits
            firestore.collection('users').doc(doc.id).get().then(doc =>{
                count = doc.data().visits;
                //adds number of count + 1
                count++;
                //updates visits in DB
                firestore.collection('users').doc(doc.id).update({
                    visits: count
                }).then(val =>{
                    //navigate to the view attorney page.
                    location.href = `/attorney.html?id=${doc.id}&userType=attorney`;
                });
            });
        }
    }
    
}

function showToast(msg){
    toast.innerHTML = msg;
    setTimeout(function(){
        toastBody.classList.toggle('show');
    }, 5000);
    toastBody.classList.toggle('show');
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