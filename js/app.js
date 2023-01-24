AOS.init();

$(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
       $("header").css("background-color","white");
    } 
    if ($(this).scrollTop() < 150) {
        $("header").css("background-color","unset");
    } 
 });