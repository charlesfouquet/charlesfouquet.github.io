// >>>>>>>>> FONCTION POUR INJECTION DES PROJETS
function loadProjects() {
    newLocale = "fr";
    $.ajax({
        url:"ajax/projects.json",
        dataType:"json",

        success:function(data){
            for (let index = 0; index < data.projects.length; index++) {
                if (index > 3) {
                    $(".otherProjects").append("<div class=\"pCard project"+(index+1)+"\"><div class=\"pCardContent\"><img src=\"\" alt=\"Image Projet"+(index+1)+"\"><em></em><p class=\"cardTitle\"></p><div class=\"cardDescription\"></div></div></div>");
                };
                $(".project"+(index+1)).children("div").children("img").attr("src", (data.projects[index]).image);
                $(".project"+(index+1)).children("div").children("em").html((data.projects[index]).fr.category);
                $(".project"+(index+1)).children("div").children("p").html((data.projects[index]).fr.title);
                $(".project"+(index+1)).children("div").children("div").html((data.projects[index]).fr.description);
                $(".project"+(index+1)).children("div").children("p").append((data.projects[index]).techstack);
                $(".project"+(index+1)).children("div").children("p").append("<a href="+(data.projects[index]).link+" target=\"_blank\" class=\"button middleLayer\">Ouvrir<i class=\"fa-solid fa-arrow-up-right-from-square\"></i></a>");
            };
        },
        error:function(xhr, status){
            alert(xhr.status);
        }
    });
}

// >>>>>>>>> FONCTIONS POUR CHANGEMENT MISE EN FORME HERO ET LIEN NAV CONTACT
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

// >>>>>>>>> INJECTION DES PROJETS ET 
// >>>>>>>>> CHANGEMENT MISE EN FORME HERO ET LIEN NAV CONTACT
// >>>>>>>>> LORS DU CHARGEMENT
$(document).ready(function () {
    loadProjects();
    cssCLY();
    cssCLN();
    cssHeroY();
    cssHeroN();
});