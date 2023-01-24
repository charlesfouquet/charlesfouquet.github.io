AOS.init();

$('.burgerBtn').on('click', function() {
  $(this).toggleClass('active not-active');
});

$(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
       $("header").css("background-color","white");
    } 
    if ($(this).scrollTop() < 150) {
        $("header").css("background-color","unset");
    } 
 });