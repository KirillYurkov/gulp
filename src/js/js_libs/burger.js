
let burger=document.querySelector('.header__burger');
let headerNav=document.querySelector('.header__nav-list')
let social=document.querySelector('.header-social');
burger.addEventListener('click',function(){
    headerNav.classList.toggle('active');
    burger.classList.toggle('active');
    social.classList.toggle('active');
});