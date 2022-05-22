function onClickedTopOrder() {
    sessionStorage.setItem('FILM_TYPE', '1');
    sessionStorage.setItem('FROM_DROM_DOWN','0');
    window.location.href = "order.html";
    return;
}

function onClickedSpiderManOrder(){
    sessionStorage.setItem('FILM_TYPE', '2');
    sessionStorage.setItem('FROM_DROM_DOWN','0');
    window.location.href = "order.html";
    return;
}

function onClickedVenomOrder() {
    sessionStorage.setItem('FILM_TYPE', '3');
    sessionStorage.setItem('FROM_DROM_DOWN','0');
    window.location.href = "order.html";
    return;
}

function onClickedOrderItem() {
    sessionStorage.setItem('FILM_TYPE','4');
    sessionStorage.setItem('FROM_DROM_DOWN','1');
    window.location.href = "order.html";
    return;
}