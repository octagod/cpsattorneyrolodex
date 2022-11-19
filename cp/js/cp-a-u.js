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

//get the input fields
let fname = document.querySelector('#firstname');
let lname = document.querySelector('#lastname');
let email = document.getElementById('email');
let description = document.getElementById('desc');
let office = document.getElementById('office-address');
let phone = document.getElementById('phone');
let website = document.getElementById('website');
let firm = document.getElementById('firm');
let state = document.getElementById('state');
let service = document.getElementById('service');
let city = document.getElementById('city');
let sendBtn = document.querySelector('.submit-form');
let membership = document.getElementById('membership');


let imageFile = document.getElementById('file');
let image = document.querySelector('.form-holder img');

let toast = document.querySelector('p.toast');
let toastBody = document.querySelector('div.toast-body');


let dashboard = document.getElementById('dash');
let people = document.getElementById('people');
let posts = document.getElementById('post');
let addUser = document.getElementById('add-user');



dashboard.onclick = function(){
    location.href = '/cp/cp-home.html';
}
people.onclick = function(){
    location.href = '/cp/cp-attorney.html';
}
posts.onclick = function(){
    location.href = '/cp/cp-posts.html';
}
addUser.onclick = function(){
    location.href = '/cp/cp-add-user.html';
}

//check to see all fields where selected
sendBtn.onclick = function(){
    if(fname.value != '' && lname.value != '' && email.value != ''){
        if(office.value != '' && phone.value != '' & website.value != '' && description.value != ''){
            if(firm.value != '' && state.value != '' & city.value != '' && service.value != '' && membership.value != ''){
                if(firstFile){
                    sendBtn.innerHTML = 'CREATING USERS....';
                    let imageName = fname.value+lname.value+'image';
                    //firebase storage
                    let storage = firebase.storage().ref().child(imageName);
                    storage.put(firstFile).then(function(snap){
                        snap.ref.getDownloadURL().then(function(imageUrl){
                            sendBtn.innerHTML = 'AUTHENTICATING USERS....';
                            firestore.collection('users').doc(fname.value+lname.value+Date.now().toString())
                            .set({
                               firstname: fname.value,
                               lastname: lname.value,
                                active: true,
                                email: email.value,
                                'office address': office.value,
                                phone: "+1"+phone.value,
                                firm: firm.value,
                                website: website.value,
                                city: city.value,
                                state: state.value.toLowerCase(),
                                image: imageUrl,
                                visits: 0,
                                description: description.value,
                                userId: fname.value+lname.value+Date.now().toString(),
                                'web counts': 0,
                                'call counts': 0,
                                'mail counts': 0,
                                'membership expire date': expireDate(membership.value),
                                'service provided': service.value,
                            }).then(val =>{
                                sendBtn.innerHTML = 'REGISTER ATTORNEY';
                                showToast('Attorney Registered Successfully');
                                setTimeout(() => {
                                    location.reload();
                                }, 5000);
                            });
                        });
                    });


                }else{
                    showToast('Select A Proffesional <br/> Profile Picture');
                }
            }else{
                showToast('Leave No Field Empty');
            }
        }else{
            showToast('Leave No Field Empty');
        }
    }else{
        showToast('Fill Name And Email!!');
    }
};




//save image
var firstFile;

//check to see if the file has a data
file.addEventListener('change', function(){
    firstFile = this.files[0];
});
setInterval(() => {
    if(firstFile){
        // Create A Url For the file uploaded
        let src = URL.createObjectURL(firstFile);

        //preview image before uploading
        image.setAttribute('src', src);
    }
}, 1000);


function showToast(msg){
    toast.innerHTML = msg;
    setTimeout(function(){
        toastBody.classList.toggle('show');
    }, 5000);
    toastBody.classList.toggle('show');
}

//generate expire date
function expireDate(mon){
    let date = new Date();
    let m =  date.getMonth();
    let month = parseInt(m)+parseInt(mon)+1;
    let year;
    if(parseInt(m)+1 >= 12 ){
        year = date.getFullYear()+1;
    }else{
        year = date.getFullYear();
    }

    if(month.toString().length == 2){
        if(month > 12){
            let newMon = month - 12;
            if(newMon.toString().length == 2){
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