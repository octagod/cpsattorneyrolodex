//get the url params
const urlParams = new URLSearchParams(window.location.search);
let userId = urlParams.get('id');
let userType = urlParams.get('userType');

console.log(userType);

let yesBtn = document.getElementById('yes');
let noBtn = document.getElementById('no');

yesBtn.onclick = function(){
    location.href = 'https://ve26c89.clickfunnels.com/order-formu6fvbzx4?userId='+userId;
}
if(userType == 'expert'){
    document.querySelector('.link').innerHTML = 'https://cpsattorneyrolodex.com/users/elogin.html';
    document.querySelector('.grid a').setAttribute('href','/users/elogin.html');
}

noBtn.onclick = function(){
    if(userType == 'expert'){
        location.href = '/users/profile.html?userId='+userId+'&userType='+userType;

    }else{
        location.href = '/users/profile.html?userId='+userId+'&userType=null';
    }
}