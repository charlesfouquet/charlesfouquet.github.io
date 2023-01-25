// ========================= PARTIE CONTACT / FORMULAIRE ===========================

// >>>>>>>>> DECLARATION REGEX GLOBALES
var regExEmail = /^\w+([.-]?\w+)@\w+([.-]?\w+)\.(\w{2,3})$/;
var regExMessageLength = /^.{50,500}$/s;

// >>>>>>>>> VERIFICATION LIVE DU FORMULAIRE SUR LES CHAMPS REQUIS
var inputsList = $(".fieldBox");
inputsList.each(function(){
    $(this).on("keyup", function () {
        formCheck(event);
        validateForm();
    })
});

function formCheck(event) {
    event.preventDefault()

    let indexAttributes = 0;
    var attributes = [];
    inputsList.each(function(){
        attributes[indexAttributes] = $(this).attr("id");
        indexAttributes++;
    });

    let indexContent = 0;
    var contents = [];
    inputsList.each(function(){
        contents[indexContent] = $(this).val();
        indexContent++;
    });

    let indexIncorrect = 0;
    contents.forEach(element => {
        if ((element != "") && (attributes[indexIncorrect] == "email")) {
            if (regExEmail.test(element) == false) {
                document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("incorrectInput");
                document.querySelectorAll(".fieldBox")[indexIncorrect].previousElementSibling.classList.add("incorrectText");
            } else if (regExEmail.test(element) == true) {
                document.querySelectorAll(".fieldBox")[indexIncorrect].classList.remove("incorrectInput");
                document.querySelectorAll(".fieldBox")[indexIncorrect].previousElementSibling.classList.remove("incorrectText");
            }
        } else if (element != "") {
            document.querySelectorAll(".fieldBox")[indexIncorrect].classList.remove("incorrectInput");
            document.querySelectorAll(".fieldBox")[indexIncorrect].previousElementSibling.classList.remove("incorrectText");
        }
        indexIncorrect++;
    });
}

// >>>>>>>>> VERIFICATION ONSUBMIT DE PRESENCE DE CHAMPS REQUIS VIDES
$(".submitButton").each(function(){
    $(this).on("click", function () {
        if (($(this)).hasClass("notOK")) {
            emptyCheck(event);
        }
    })
});

function emptyCheck(event) {
    event.preventDefault();

    let indexAttributesFR = 0;
    var attributesFR = [];
    var regExAttributesFR = /[A-ZÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒa-záàâäãåçéèêëíìîïñóòôöõúùûüýÿæœ0-9\s]+/;
    document.querySelectorAll(".attributeFRName").forEach(element => {
        attributesFR[indexAttributesFR] = element.innerHTML.match(regExAttributesFR)[0];
        indexAttributesFR++
    })

    let indexContent = 0;
    var contents = [];
    document.querySelectorAll(".fieldBox").forEach(element => {
        contents[indexContent] = element.value;
        indexContent++
    })
    
    let indexIncorrect = 0;
    var incorrectLabels = [];
    let indexIncorrectLabels = 0;
    contents.forEach(element => {
        if (element == "") {
            document.querySelectorAll(".fieldBox")[indexIncorrect].previousElementSibling.classList.add("incorrectText");
            document.querySelectorAll(".fieldBox")[indexIncorrect].classList.add("incorrectInput");
            incorrectLabels[indexIncorrectLabels] = attributesFR[indexIncorrect];
            indexIncorrectLabels++;
        } else if (element != "") {
            document.querySelectorAll(".fieldBox")[indexIncorrect].classList.remove("incorrectInput");
            document.querySelectorAll(".fieldBox")[indexIncorrect].previousElementSibling.classList.remove("incorrectText");
        }
        indexIncorrect++;
    });

    if (indexIncorrectLabels >= 2) {
        document.querySelector(".emptyAlert").classList.add("emptyAlertActive", "incorrectText");
        document.querySelector("#emptyAlert1").innerHTML = "Les champs ";
        const incorrectLabelsList = incorrectLabels.toString().replaceAll(",", ", ");
        const lastIndexILL = incorrectLabelsList.lastIndexOf(",");
        const replacement = " et";
        const replaced = incorrectLabelsList.substring(0, lastIndexILL)+replacement+incorrectLabelsList.substring(lastIndexILL+1);

        document.querySelector("#emptyAlert2").innerHTML = replaced;
        
        document.querySelector("#emptyAlert3").innerHTML = " sont vides";
    } else if (indexIncorrectLabels == 1) {
        document.querySelector(".emptyAlert").classList.add("emptyAlertActive", "incorrectText");
        document.querySelector("#emptyAlert1").innerHTML = "Le champ ";
        document.querySelector("#emptyAlert2").innerHTML = incorrectLabels.toString();
        document.querySelector("#emptyAlert3").innerHTML = " est vide";
    } else {
        document.querySelector(".emptyAlert").classList.remove("emptyAlertActive", "incorrectText");
    }
    var messageContent = document.getElementById("message").value;
    var messageLabel = document.getElementById("messageDiv").previousElementSibling;
    if (regExMessageLength.test(messageContent) == false) {
        document.querySelector(".emptyAlertForMessage").classList.add("emptyAlertActive", "incorrectText");
        document.querySelector("#emptyAlert4").innerHTML = "Le champ <em>Messages</em> n'est pas correctement rempli";
        document.getElementById("message").classList.add("incorrectInput");
        messageLabel.classList.add("incorrectText");
    } else {
        document.querySelector(".emptyAlertForMessage").classList.remove("emptyAlertActive", "incorrectText");
    }
}

// >>>>>>>>> VERIFICATION DE LA PRESENCE ET DE LA LONGUEUR DU MESSAGE
$("#message").on("keyup", function () {
    messageCheck(event);
    validateForm();
});

function messageCheck(event) {
    event.preventDefault()

    var messageBox = document.getElementById("message");
    var messageLabel = document.getElementById("messageDiv").previousElementSibling;
    var messageContent = document.getElementById("message").value;
    var messageLCCL = document.getElementById("messageLengthCounter");
        
    document.getElementById("messageLength").innerHTML = messageContent.length;

    if ((messageContent.length == 500) || (messageContent.length < 50)){
        messageLCCL.classList.remove("correctCommentary");
        messageLCCL.classList.add("incorrectCommentary");
        messageLabel.classList.add("incorrectText");
        messageBox.classList.add("incorrectInput");
    } else if ((messageContent.length >= 50) || (messageContent.length < 500)) {
        messageLCCL.classList.remove("incorrectCommentary");
        messageLCCL.classList.add("correctCommentary");
        messageBox.classList.remove("incorrectInput");
        messageLabel.classList.remove("incorrectText");
    }
}

// >>>>>>>>> ACTIVATION DU FORMULAIRE SI PAS D'ERREURS
function validateForm() {
    var errorsCounter = 0;
    inputsList.each(function(){
        if ($(this).val() == "") {
            errorsCounter++;
        } else if (($(this).val() != "") && ($(this).attr("id") == "email")) {
            if (regExEmail.test($(this).val()) == false) {
                errorsCounter++;
            };
        };
    });
    if ($("#message").val() != "") {
        if (regExMessageLength.test(($("#message")).val()) == false) {
            errorsCounter++;
        }
    } else if ($("#message").val() == "") {
        errorsCounter++;
    };
    if (errorsCounter > 0) {
        $(".submitButton").addClass("notOK");
    } else if (errorsCounter == 0) {
        $(".submitButton").removeClass("notOK");
    };
}