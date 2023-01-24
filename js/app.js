AOS.init();

$(document).on("click", function () {
  if ($(".burgerBtn").hasClass("active")) {
    $(".burgerBtn").toggleClass("active not-active");
  }
  if ($("nav ul").hasClass("navClicked")) {
    $("nav ul").toggleClass("navClicked");
  }
})

$(".burgerBtn").on("click", function(e) {
  e.stopPropagation();
  $(this).toggleClass("active not-active");
  $("nav ul").toggleClass("navClicked");
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 150) {
    $("header").css("background-color","white");
    $("nav ul").css("background-color","white");
    $("nav ul").css("box-shadow","0px 0px 5px rgb(91, 110, 91)");
  } 
  if ($(this).scrollTop() < 150) {
    $("header").css("background-color","unset");
    $("nav ul").css("background-color","unset");
    $("nav ul").css("box-shadow","none");
  } 
});

$(window).on("load", function () {
  if ($(this).width() > 770) {
    $("#contactLink").addClass("button");
  } 
  if ($(this).width() < 770) {
    $("#contactLink").removeClass("button");
  } 
})

$(window).on("resize", function () {
  if ($(this).width() > 770) {
    $("#contactLink").addClass("button");
  } 
  if ($(this).width() < 770) {
    $("#contactLink").removeClass("button");
  } 
})