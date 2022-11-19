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
let password = document.getElementById('password');
let confirm = document.getElementById('confirm');
let description = document.getElementById('desc');
let office = document.getElementById('office-address');
let phone = document.getElementById('phone');
let website = document.getElementById('website');
let facebook = document.getElementById('facebook');
let instagram = document.getElementById('instagram');
let linkedIn = document.getElementById('linkedin');
let county = document.getElementById('county');
let firm = document.getElementById('firm');
let state = document.getElementById('state');
let service = document.getElementById('service');
let city = document.getElementById('city');
let sendBtn = document.querySelector('.submit-form');

let imageFile = document.getElementById('file');
let image = document.querySelector('img');

let toast = document.querySelector('p.toast');
let toastBody = document.querySelector('div.toast-body');


//check to see all fields where selected
sendBtn.onclick = function(){
    if(fname.value != '' && lname.value != '' && email.value != ''){
        if(office.value != '' && phone.value != '' & website.value != ''){
            if(county.value != '' && state.value != '' & city.value != '' && service.value != ''){
                if(password.value === confirm.value){
                    if(firstFile){
                        sendBtn.innerHTML = 'CREATING USERS....';
                        let imageName = fname.value+lname.value+'image';
                        //create user 
                        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
                        .then((val) => {
                             //firebase storage
                            let storage = firebase.storage().ref().child(imageName);
                            storage.put(firstFile).then(function(snap){
                                snap.ref.getDownloadURL().then(function(imageUrl){
                                    sendBtn.innerHTML = 'AUTHENTICATING USERS....';
                                    //set last login
                                    let d = new Date();
                                    let timestamp = d.getTime();

                                    //convert timestamp to readable time
                                    let dtObj = new Date(timestamp);
                                    let lastLogin = dtObj.toLocaleString();
                                    
                                    
                                    //create user data
                                    firestore.collection('experts').doc(val.user.uid)
                                    .set({
                                        firstname: fname.value,
                                        lastname: lname.value,
                                        active: true,
                                        email: email.value,
                                        'office address': office.value,
                                        phone: "+1"+phone.value,
                                        // firm: firm.value,
                                        website: website.value,
                                        facebook: facebook.value == ''? 'not set' : facebook.value,
                                        instagram: instagram.value == ''? 'not set' : instagram.value,
                                        linkedIn: linkedIn.value == ''? 'not set' : linkedIn.value,
                                        county: county.value,
                                        city: city.value,
                                        state: state.value.toLowerCase(),
                                        'last Logged In': lastLogin,
                                        image: imageUrl,
                                        visits: 0,
                                        video: null,
                                        userId: val.user.uid,
                                        'video upsell': false,
                                        'web counts': 0,
                                        'call counts': 0,
                                        'mail counts': 0,
                                        'membership expire date': expireDate(),
                                        'service provided': service.value,
                                    }).then(v =>{
                                        sendBtn.innerHTML = 'REGISTER';
                                        location.href = '/thank-you.html?id='+val.user.uid+'&userType=expert';
                                    });
                                });
                            });
                        }).catch((error) => {
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            showToast(errorCode.toString()+': '+errorMessage.toString());
                        });
                    }else{
                        showToast('Select A Proffesional <br/> Profile Picture');
                    }
                }else{
                    showToast('Password Mismatch!')
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


function showToast(msg){
    toast.innerHTML = msg;
    setTimeout(function(){
        toastBody.classList.toggle('show');
    }, 5000);
    toastBody.classList.toggle('show');
}

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

//generate expire date
function expireDate(){
    let date = new Date();
    let m = date.getMonth();
    let month = parseInt(m)+2;
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