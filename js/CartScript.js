document.addEventListener("DOMContentLoaded", loadCartItems);
var cartProductsContainer = document.getElementById("cart-products-container");
var productCard;

function loadCartItems() {
    changeCartCount();
    if (!hasCookie("productId")) {
        var message = `<div id="no-items">
                           <h2>Your Shopping Cart is Empty!</h2>
                           <h2><a href="./index.html">Begin Your Shopping Journey Here</a></h2>
                       </div>`;
        cartProductsContainer.innerHTML += message;
        return;
    }
    var products = getCookie("productId").split(",");
    for (let i = 0; i < products.length - 1; i++) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", `https://dummyjson.com/products/${products[i]}`);
        xhr.send("");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var response = xhr.response;
                    var data = JSON.parse(response);
                    productCard = `<div id="product${
                        data.id
                    }" class="card mb-3 cart-product-container">
                                        <div class="row g-0">
                                        <div class="col-md-4">
                                            <img src="${
                                                data.thumbnail
                                            }" class="img-fluid rounded-start cart-product-img" alt="">
                                        </div>
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h4 id="card-title" class="card-title">${
                                                    data.title
                                                }</h4>
                                                <button id="${
                                                    data.id
                                                }" class="remove-item" onclick="removeItem(this)"><i class="fa-solid fa-x"></i></button>
                                                <h6 id="cart-card-description" class="card-title">${
                                                    data.description
                                                }</h6>
                                                <h5 class="card-text">$${
                                                    data.price
                                                }</h5>
                                                <div class="btn-group" role="group" aria-label="Basic outlined example">
                                                    <button id="decreaseProduct${
                                                        data.id
                                                    }" type="button" class="btn btn-outline-primary" onclick="decreaseQuantity(this)"><i class="fa-solid fa-minus"></i></button>
                                                    <button id="increaseProduct${
                                                        data.id
                                                    }" data-quantity="${
                        data.stock
                    }" type="button" class="btn btn-outline-primary" onclick="increaseQuantity(this)"><i class="fa-solid fa-plus"></i></button>
                                                </div>
                                                <h5 id="product${
                                                    data.id
                                                }Quantity" class="card-text">Quantity: ${getCookie(
                        `product${data.id}Quantity`
                    )}</h5>
                                                <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                            </div>
                                        </div>
                                    </div>`;
                    cartProductsContainer.innerHTML += productCard;
                }
            }
        };
    }
}

function removeItem(item) {
    deleteCookie(`product${item.id}Quantity`);
    var productsCookie = getCookie("productId");
    var itemIndex = productsCookie.indexOf(item.id);
    if (item.id > 9)
        var newProductsCookie =
            productsCookie.substring(0, itemIndex) +
            productsCookie.substring(itemIndex + 3);
    else
        var newProductsCookie =
            productsCookie.substring(0, itemIndex) +
            productsCookie.substring(itemIndex + 2);
    setCookie("productId", newProductsCookie);
    var removedProductCard = document.getElementById(`product${item.id}`);
    removedProductCard.remove();
    if (getCookie("productId") == "") {
        deleteCookie("productId");
        var message = `<div id="no-items">
                           <h2>Your Shopping Cart is Empty!</h2>
                           <h2><a href="./index.html">Begin Your Shopping Journey Here</a></h2>
                       </div>`;
        cartProductsContainer.innerHTML += message;
        changeCartCount();
    }
}

function changeCartCount() {
    var cartCount = 0;
    var allCookieList = document.cookie.split(";");
    allCookieList.forEach((cookie) => {
        if (cookie.includes("Quantity")) {
            cartCount += parseInt(cookie.substring(cookie.indexOf("=") + 1));
        }
    });
    if (cartCount > 0) {
        document.getElementById("cartCount").innerText = cartCount;
    } else {
        document.getElementById("cartCount").innerText = 0;
    }
}

function increaseQuantity(item) {
    var itemId = item.id.substring(15);
    if (getCookie(`product${itemId}Quantity`) < item.dataset.quantity) {
        setCookie(
            `product${itemId}Quantity`,
            parseInt(getCookie(`product${itemId}Quantity`)) + 1
        );
        document.getElementById(
            `product${itemId}Quantity`
        ).innerText = `Quantity: ${getCookie(`product${itemId}Quantity`)}`;
        changeCartCount();
    }
}

function decreaseQuantity(item) {
    var itemId = item.id.substring(15);
    setCookie(
        `product${itemId}Quantity`,
        parseInt(getCookie(`product${itemId}Quantity`)) - 1
    );
    if (getCookie(`product${itemId}Quantity`) == 0) {
        removeItem(document.getElementById(itemId));
        changeCartCount();
        return;
    }
    document.getElementById(
        `product${itemId}Quantity`
    ).innerText = `Quantity: ${getCookie(`product${itemId}Quantity`)}`;
    changeCartCount();
}

var expireDate = new Date();
expireDate.setDate(expireDate.getDate() + 3);
var lastDate = new Date();
lastDate.setDate(lastDate.getDate() - 1);

function getCookie(cookieName) {
    var start = document.cookie.indexOf(cookieName) + (cookieName.length + 1);
    var end = document.cookie.indexOf(";", start);
    if (end == -1) end = document.cookie.length;
    return document.cookie.slice(start, end);
}

function setCookie(cookieName, cookieValue, expiryDate) {
    if (expiryDate)
        document.cookie =
            cookieName + "=" + cookieValue + ";expires=" + expiryDate;
    else document.cookie = cookieName + "=" + cookieValue;
}

function deleteCookie(cookieName) {
    document.cookie = cookieName + "=abc;expires=" + lastDate;
}

function hasCookie(cookieName) {
    return document.cookie.includes(cookieName);
}
