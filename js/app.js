// ========================= PARTIE GENERALE ===========================
// >>>>>>>>> LANCEMENT DE ANIMATE ON SCROLL
AOS.init();

// >>>>>>>>> DISPARITION DU NAV BURGER LORS D'UN CLIC N'IMPORTE OU
// >>>>>>>>> ET ANIMATION DU BOUTON BURGER EN FONCTION
$(document).on("click", function () {
    if ($(".burgerBtn").hasClass("active")) {
        $(".burgerBtn").toggleClass("active not-active");
    };
    if ($("nav ul").hasClass("navClicked")) {
        $("nav ul").toggleClass("navClicked");
    };
});

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
        };
    };
    if ($(this).scrollTop() < 150) {
        $("header").css("background-color","unset");
        $("nav ul").removeClass("navClickedScrolled");
    };
});

// >>>>>>>>> CHANGEMENT MISE EN FORME HERO ET LIEN NAV CONTACT LORS DU RESIZE 
$(window).on("resize", function () {
    cssCLY();
    cssCLN();
    cssHeroY();
    cssHeroN();
});

// >>>>>>>>> TRADUCTION DU SITE
$("#translator").on("click", function() {
    if ($("#translator").children("img").attr("alt") == "United Kingdom") {
        var newLocale = "en";
        $("#centerDownload").children("a").attr("href", "files/RESUME_FOUQUET.pdf");
        $("#centerDownload").children("img").attr("src", "img/resume_img.jpg");
    } else if ($("#translator").children("img").attr("alt") == "France") {
        var newLocale = "fr";
        $("#centerDownload").children("a").attr("href", "files/CV_FOUQUET.pdf");
        $("#centerDownload").children("img").attr("src", "img/cv_img.jpg");
    };
    $.ajax({
        url:"ajax/website.json",
        dataType:"json",

        success:function(data){
            for (let index = 0; index < data.website.length; index++) {
                $(".txt"+(index+1)).html((data.website[index])[newLocale]);
            };
        },
        error:function(xhr, status){
            alert(xhr.status);
        }
    });
    $.ajax({
        url:"ajax/projects.json",
        dataType:"json",

        success:function(data){
            if (newLocale == "en") {
                $(".openLink").html("Open<i class=\"fa-solid fa-arrow-up-right-from-square\"></i>")
            } else if (newLocale == "fr") {
                $(".openLink").html("Ouvrir<i class=\"fa-solid fa-arrow-up-right-from-square\"></i>")
            }
            for (let index = 0; index < data.projects.length; index++) {
                var cursorProject = (data.projects[index])[newLocale];
                $(".project"+(index+1)).children("div").children("p").children("p").html(cursorProject.title);
                $(".project"+(index+1)).children("div").children("em").html(cursorProject.category);
                $(".project"+(index+1)).children("div").children("div").html(cursorProject.description);
            };
        },
        error:function(xhr, status){
            alert(xhr.status);
        }
    });
    loadMoreButton = $(".loadMore").html();
    if (newLocale == "en") {
        if (loadMoreButton == "Voir plus") {
            $(".loadMore").html("See more");
        } else if (loadMoreButton == "Voir moins"){
            $(".loadMore").html("See less");
        }
    } else if (newLocale == "fr") {
        if (loadMoreButton == "See more") {
            $(".loadMore").html("Voir plus");
        } else if (loadMoreButton == "See less"){
            $(".loadMore").html("Voir moins");
        }
    };
    if ($(".submitButton").hasClass("submittedOnce") == true) {
        if ($("#translator").children("img").attr("alt") == "United Kingdom") {
            $("#emptyAlert1").html("");
            $("#emptyAlert2").html("");
            $("#emptyAlert3").html("");
            $("#emptyAlert4").html("Please click \"Send\" to translate the error messages");
        } else if ($("#translator").children("img").attr("alt") == "France") {
            $("#emptyAlert1").html("");
            $("#emptyAlert2").html("");
            $("#emptyAlert3").html("");
            $("#emptyAlert4").html("Veuillez cliquer sur \"Envoyer\" pour traduire les erreurs");
        };
    };
});

$(".loadMore").on("click", function () {
    for (let index = 0; index < $(".otherProjects").length; index++) {
        const element = $(".otherProjects")[index];
        if (element.style.maxHeight) {
            element.style.maxHeight = null;
            if ($("#translator").children("img").attr("alt") == "United Kingdom") {
                $(".loadMore").html("Voir plus");
            } else if ($("#translator").children("img").attr("alt") == "France") {
                $(".loadMore").html("See more");
            };
            scrollToPos = $(".otherProjects").position().top;
            window.scrollTo(0, scrollToPos+150);
        } else {
            scrollToPos = $(".otherProjects").position().top;
            element.style.maxHeight = element.scrollHeight + "px";
            if ($("#translator").children("img").attr("alt") == "United Kingdom") {
                $(".loadMore").html("Voir moins");
            } else if ($("#translator").children("img").attr("alt") == "France") {
                $(".loadMore").html("See less");
            };
            window.scrollTo(0, scrollToPos+150);
        };
    }
});
