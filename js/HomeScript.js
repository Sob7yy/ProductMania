// Start Landing Slider

var img = document.getElementById("landing-img");
document.addEventListener("DOMContentLoaded", Play);

var currentNum = 1;

function Following() {
    if (currentNum == 12)
        currentNum = 1;
    else
        currentNum++;
    console.log(currentNum);
    img.setAttribute("src", `./images/${currentNum}.jpg`);
}

function Previous() {
    if (currentNum == 1)
        currentNum = 12;
    else
        currentNum--;
    console.log(currentNum);
    img.setAttribute("src", `./images/${currentNum}.jpg`);
}

var playInterval;

function PlayInterval() {
    Following()
}

function Play() {
    playInterval = setInterval(PlayInterval, 3000);
    changeCartCount();
}

// End Landing Slider



// Start Product Cards

var electronics = document.getElementById("electronics");
var furniture = document.getElementById("furniture");
var fashion = document.getElementById("fashion");
var groceries = document.getElementById("groceries");
var tabs = [electronics, furniture, fashion, groceries];
var cardContainer = document.getElementById("row");

electronics.addEventListener("click", ShowProducts);
furniture.addEventListener("click", ShowProducts);
fashion.addEventListener("click", ShowProducts);
groceries.addEventListener("click", ShowProducts);
document.addEventListener("DOMContentLoaded", function () { GetProducts(["smartphones", "laptops"]); })


function ShowProducts(e) {
    var id = e.target.id;
    document.getElementsByClassName("active")[1].classList.remove("active");
    e.target.classList.add("active");
    switch (id) {
        case "electronics":
            GetProducts(["smartphones", "laptops"]);
            break;
        case "furniture":
            GetProducts(["furniture"]);
            break;
        case "fashion":
            GetProducts(["mens-shirts", "mens-shoes", "mens-watches"]);
            break;
        case "groceries":
            GetProducts(["groceries"]);
            break;
        default:
            break;
    }
}

function GetProducts(categories) {
    cardContainer.innerHTML = "";
    var productCard;
    for (let i = 0; i < categories.length; i++) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `https://dummyjson.com/products/category/${categories[i]}`);
        xhr.send("");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var response = xhr.response;
                    var data = JSON.parse(response);
                    for (let j = 0; j < data.products.length; j++) {
                        var quantity = 0;
                        if (hasCookie(`product${data.products[j].id}Quantity`)) {
                            quantity = getCookie(`product${data.products[j].id}Quantity`);
                        }
                        productCard = `<div class="card m-4" style="width: 18rem;">
                                        <img src="${data.products[j].thumbnail}" class="card-img-top product-img" alt="">
                                        <div class="card-body">
                                            <h5 id="card-title" class="card-title">${data.products[j].title}</h5>
                                            <h5 id="card-description" class="card-title">${data.products[j].description}</h5>
                                            <p class="card-text">$ ${data.products[j].price}</p>
                                            <p id="q${data.products[j].id}" class="card-text">Quantity: ${data.products[j].stock - quantity}</p>
                                            <button id="${data.products[j].id}" class="btn btn-primary" onclick="AddToCart(this)">Add to Cart</button>
                                        </div>
                                    </div>`
                        cardContainer.innerHTML += productCard;
                    }
                } else {
                    console.log("error");
                }
            }
        }
    }

}

var productIds;
var productQuantity;

function AddToCart(product) {
    var q = document.getElementById(`q${product.id}`).innerText.substring(10);
    if (q > 0) {
        document.getElementById(`q${product.id}`).innerText = `Quantity: ${q - 1}`;
        if (hasCookie("productId")) {
            productIds = getCookie("productId");
            if (productIds.includes(product.id)) {
                if (hasCookie(`product${product.id}Quantity`)) {
                    productQuantity = getCookie(`product${product.id}Quantity`);
                    productQuantity++;
                    setCookie(`product${product.id}Quantity`, productQuantity);
                }
                else {
                    document.cookie = `product${product.id}Quantity=1`
                }
            }
            else {
                productIds += product.id + ",";
                document.cookie = `productId=${productIds}`;
                setCookie(`product${product.id}Quantity`, 1);
            }
        }
        else {
            productIds = `${product.id},`;
            document.cookie = `productId=${productIds}`;
            setCookie(`product${product.id}Quantity`, 1);
        }
        changeCartCount();
        alert("Hurray! Item Added!");
    }
    else
        alert("Sorry, Out Of Stock");
}


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



var expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 3);
var lastDate = new Date();
lastDate.setDate(lastDate.getDate() - 1);


function getCookie(cookieName) {
    var start = document.cookie.indexOf(cookieName) + (cookieName.length + 1);
    var end = document.cookie.indexOf(";", start);
    if (end == -1)
        end = document.cookie.length;
    return document.cookie.slice(start, end);
}

function setCookie(cookieName, cookieValue, expiryDate) {
    if (expiryDate)
        document.cookie = cookieName + "=" + cookieValue + ";expires=" + expiryDate;
    else
        document.cookie = cookieName + "=" + cookieValue;
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + "=abc;expires=" + lastDate;
}

function hasCookie(cookieName) {
    return (document.cookie.includes(cookieName));
}

// End Product Cards