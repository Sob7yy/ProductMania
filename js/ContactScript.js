var fname = document.getElementById("name");
var nameLabel = document.getElementsByClassName("textArea")[0];
fname.addEventListener("input", CheckName);


var genderLabel = document.getElementById("gender");
var inquiryTypeLabel = document.getElementById("inquiryType");
var messageLabel = document.getElementsByClassName("textArea")[2];


var nameError = document.createElement("p");
var emailError = document.createElement("p");
var genderError = document.createElement("p");
var inquiryTypeError = document.createElement("p");
var messageError = document.createElement("p");


function CheckName() {
    if (fname.value.length <= 3) {
        fname.style.border = "3px solid red";
        nameError.innerHTML = "Name must be at least 4 charachters";
        nameLabel.append(nameError);
    }
    else {
        fname.style.border = "3px solid green";
        nameError.innerHTML = "";
    }

}


var email = document.getElementById("email");
var emailLabel = document.getElementsByClassName("textArea")[1];
email.addEventListener("input", CheckEmail);



function CheckEmail() {
    if (email.value.match(/^\w+@[a-z]{3,}\.[a-z]{2,3}$/) <= 3) {
        email.style.border = "3px solid red";
        emailError.innerHTML = "Email is not in correct form";
        emailLabel.append(emailError);
    }
    else {
        email.style.border = "3px solid green";
        emailError.innerHTML = "";
    }

}


var submit = document.getElementById("submit");
submit.addEventListener("click", Validate);
var gender = document.getElementsByName("gender");
var inquiryType = document.getElementsByName("inquiryType")[0];
var message = document.getElementById("message");

function Validate() {
    nameError.innerText = "";
    emailError.innerText = "";
    genderError.innerText = "";
    inquiryTypeError.innerText = "";
    messageError.innerText = "";

    if (fname.value.length <= 3) {
        nameError.innerText = "Name must be at least 4 characters"
        nameLabel.append(nameError);
    }

    if (!email.value.match(/^\w+@[a-z]{3,}\.[a-z]{2,3}$/)) {
        emailError.innerText = "Email is not in correct form";
        emailLabel.append(emailError);
    }

    if (!(gender[0].checked || gender[1].checked)) {
        genderError.innerText = "Please select your gender";
        genderLabel.append(genderError);
    }

    if (inquiryType.selectedIndex == 0) {
        inquiryTypeError.innerText = "Please Select the type of inquiry";
        inquiryTypeLabel.append(inquiryTypeError);
    }

    if (message.value == "") {
        messageError.innerText = "Message cannot be empty";
        messageLabel.append(messageError);
    }
}


document.addEventListener("DOMContentLoaded", changeCartCount);

function changeCartCount() {
    var cartCount = 0;
    var allCookieList = document.cookie.split(";");
    allCookieList.forEach(cookie => {
        if (cookie.includes("Quantity")) {
            cartCount += parseInt(cookie.substring(cookie.indexOf("=") + 1));
        }
    });
    if (cartCount > 0) {
        document.getElementById("cartCount").innerText = cartCount;
    }
    else {
        document.getElementById("cartCount").innerText = 0;
    }
}