function openMenu() {
    document.getElementById("mainMenu ").className = "menu-on ";
}

function closeMenu() {
    document.getElementById("mainMenu ").className = "menu-off ";
}

function closeFilterMenu() {
    document.getElementById("filterMenuHead").style.visibility = "hidden";
}

function openFilterMenu() {
    document.getElementById("filterMenuHead").style.visibility = "visible";
}

function openSizeMenu() {
    document.getElementById("sizeMenuHead").style.visibility = "visible";
    document.getElementById("sizeBtn").onclick = closeSizeMenu;
}

function closeSizeMenu() {
    document.getElementById("sizeMenuHead").style.visibility = "hidden";
    document.getElementById("sizeBtn").onclick = openSizeMenu;
}