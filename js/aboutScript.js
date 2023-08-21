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