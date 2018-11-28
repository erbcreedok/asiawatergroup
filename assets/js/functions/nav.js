$(document).ready(function() {

var nav = $('nav');

var navbarCheck = function() {
    nav.toggleClass('navbar-filled', window.scrollY > 0);
};

navbarCheck();

$(document).scroll(function() {
    navbarCheck();
});

$('.navbar .main-nav li a').on('click', function(e) {
    setTimeout(function() {
        $("#mainNavbar").collapse('hide');
    }, 300);
});


});