// ========================= PARTIE GENERALE ===========================
// >>>>>>>>> LANCEMENT DE ANIMATE ON SCROLL
AOS.init();

// >>>>>>>>> DISPARITION DU NAV BURGER LORS D'UN CLIC N'IMPORTE OU
// >>>>>>>>> ET ANIMATION DU BOUTON BURGER EN FONCTION
$(document).on("click", function () {
  if ($(".burgerBtn").hasClass("active")) {
    $(".burgerBtn").toggleClass("active not-active");
  }
  if ($("nav ul").hasClass("navClicked")) {
    $("nav ul").toggleClass("navClicked");
  }
})

// >>>>>>>>> AFFICHAGE DU NAV BURGER LORS DU CLIC SUR LE BOUTON BURGER
// >>>>>>>>> ET ANIMATION DU BOUTON BURGER EN FONCTION
$(".burgerBtn").on("click", function(e) {
  e.stopPropagation();
  $(this).toggleClass("active not-active");
  $("nav ul").toggleClass("navClicked");
});

// >>>>>>>>> CHANGEMENT MISE EN FORME HEADER ET NAV SUR SCROLL
$(window).scroll(function () {
  if ($(this).scrollTop() > 150) {
    $("header").css("background-color","white");
    if ($(this).width() < 770) {
      $("nav ul").addClass("navClickedScrolled");
    }
  } 
  if ($(this).scrollTop() < 150) {
    $("header").css("background-color","unset");
    $("nav ul").removeClass("navClickedScrolled");
  } 
});

// >>>>>>>>> CHANGEMENT MISE EN FORME HERO ET LIEN NAV CONTACT LORS DU CHARGEMENT
function cssCLY() {
  if ($(this).width() > 770) {
    $("#contactLink").addClass("button");
  } 
};

function cssCLN() {
  if ($(this).width() < 770) {
    $("#contactLink").removeClass("button");
  } 
};

function cssHeroY() {
  if ($(this).height() < 500) {
    $("#helloThere").addClass("shortVP");
    $(".heroText").addClass("shortVP");
    $(".scroll").addClass("shortVP");
  }
};

function cssHeroN() {
  if ($(this).height() > 500) {
    $("#helloThere").removeClass("shortVP");
    $(".heroText").removeClass("shortVP");
    $(".scroll").removeClass("shortVP");
  }
};

$(window).on("load", function () {
  cssCLY();
  cssCLN();
  cssHeroY();
  cssHeroN();
})

// >>>>>>>>> CHANGEMENT MISE EN FORME HERO ET LIEN NAV CONTACT LORS DU RESIZE 
$(window).on("resize", function () {
  cssCLY();
  cssCLN();
  cssHeroY();
  cssHeroN();
})