// Start Landing Slider

var img = document.getElementById("landing-img");
document.addEventListener("DOMContentLoaded", Play);

var currentNum = 0;

function Following() {
    if (currentNum == 4)
        currentNum = 0;
    else
        currentNum++;
    console.log(currentNum);
    img.setAttribute("src", `./Images/L${currentNum}.png`);
}

function Previous() {
    if (currentNum == 0)
        currentNum = 4;
    else
        currentNum--;
    console.log(currentNum);
    img.setAttribute("src", `./Images/L${currentNum}.png`);
}

var playInterval;

function PlayInterval() {
    Following()
}

function Play() {
    playInterval = setInterval(PlayInterval, 3000);
}

// End Landing Slider



// Start Product Cards

var electronics = document.getElementById("electronics");
var furniture = document.getElementById("furniture");
var fashion = document.getElementById("fashion");
var groceries = document.getElementById("groceries");

// electronics.addEventListener("click", ShowProducts);
// furniture.addEventListener("click", ShowProducts);
// fashion.addEventListener("click", ShowProducts);
// groceries.addEventListener("click", ShowProducts);

function ShowProducts(id) {
    console.log(id);
    switch (id) {
        case "electronics":

            break;
        case "furniture":

            break;
        case "fashion":

            break;
        case "groceries":

            break;
        default:
            break;
    }
}

// var xhr = new XMLHttpRequest();
// xhr.open("GET", "https://dummyjson.com/products");
// xhr.send("");
// xhr.onreadystatechange = GetProducts

function GetProducts(e) {
    if (xhr.readyState == 4) {
        // success
        if (xhr.status == 200) {
            var response = xhr.response;
            var data = JSON.parse(response);
            console.log(data);

            // var tr = document.createElement("tr");
            // tr.innerHTML = `<td>${data.id}</td><td>${data.name}</td><td>${data.email}</td>`;
            // tbody.append(tr);
        } else {
            console.log("error");
        }
    }
}

// End Product Cards