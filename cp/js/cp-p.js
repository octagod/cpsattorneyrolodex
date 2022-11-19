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

let headingInput = document.querySelector('#heading');
let PreviewHeading = document.querySelector('#preview-head');
let contentInput = document.querySelector('#content');
let previewBody = document.querySelector('#preview-body');
let previewBtn = document.querySelector('.preview');
let submitBtn = document.querySelector('.submit');

let postBody = document.querySelector('.post-lists');

let toast = document.querySelector('p.toast');
let toastBody = document.querySelector('div.toast-body');

let dashboard = document.getElementById('dash');
let people = document.getElementById('people');
let posts = document.getElementById('post');



let headingVariable;
let contentVariable;

dashboard.onclick = function(){
    location.href = '/cp/cp-home.html';
}
people.onclick = function(){
    location.href = '/cp/cp-attorney.html';
}
posts.onclick = function(){
    location.href = '/cp/cp-posts.html';
}

previewBtn.onclick = function(){
    if(headingInput.value != '' && contentInput.value != ''){

        PreviewHeading.innerHTML = headingInput.value;
        previewBody.innerText = contentInput.value;
        submitBtn.setAttribute('style', 'display:inline');
    }else{
        showToast('Ensure Neither Heading nor Content is <br> Empty')
    }
}

submitBtn.onclick = function(){

    if(headingVariable != '' && contentVariable != ''){
        firestore.collection('posts').doc().set({
            'header': headingInput.value,
            'content': contentInput.value,
            'timestamp': Date.now()
        }).then(val =>{
            showToast('Post Added, reloads in 3 seconds');
            headingInput.value = '';
            contentInput.value = '';
            setTimeout(() => {
                location.reload();
            }, 3000);
        });
    }else{
        showToast('An Error Occured, Try Again');
    }
}

//show all the posts
firestore.collection('posts').orderBy('timestamp', 'desc').
get().then(snap =>{
    snap.docs.forEach(doc =>{
        renderPosts(doc);
    });
});


function renderPosts(doc){
    let del = document.createElement('button');
    let postHeading = document.createElement('h3');
    let postContent = document.createElement('p');
    let hr = document.createElement('hr');

    del.setAttribute('id', 'delete');
    del.innerText = 'Delete Post';
    postHeading.innerHTML = doc.data().header;
    postContent.innerText = doc.data().content;


    postBody.appendChild(postHeading);
    postBody.appendChild(postContent);
    postBody.appendChild(del);
    postBody.appendChild(hr);

    del.onclick = function(){
        if(confirm(`Delete ${doc.data().header} ?`)){
            let postName = doc.data().header;
            firestore.collection('posts').doc(doc.id).delete()
            .then(val =>{
                showToast(`${postName} deleted successfully`);
                setTimeout(() => {
                    location.reload();
                }, 5000);
            });
        }else{
            //do nothing
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

