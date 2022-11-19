
let yearText = document.querySelector('#year');
let searchBtns = document.querySelectorAll('.search_nav');
let blogBtns = document.querySelectorAll('.blog_nav');
let serviceBtns = document.querySelectorAll('.service_nav');
let fab = document.querySelector('.mobile-menu');
let fab_body = document.querySelector('div.FAB ul');

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