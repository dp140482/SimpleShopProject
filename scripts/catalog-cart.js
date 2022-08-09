// Задание к уроку 8 базового курса JavaScript:

'use strict';

// Инициализация индикатора числа товаров в корзине
let goodsNum = 0;
let goodsNumElem = document.getElementById('goodsInCart');
goodsNumElem.innerText = goodsNum;

function getRandomPrice() {
    // Возвращает случайное число с точностью до 0.01 в промежутке от 12 до 52.
    return Math.round((12 + Math.random() * 40) * 100) / 100;
}

let cart = document.getElementById('cartBtn');
let wModal = document.querySelector('.modal-window');
let wModalVisible = false;

function onCartButtonClick() {
    if (wModalVisible) {
        wModal.style.display = 'none';
        wModalVisible = false;
    } else {
        wModal.style.display = 'block';
        wModalVisible = true;
    }
}

cart.addEventListener("click", onCartButtonClick);

let productTable = document.querySelector('.modal-window-table');
let productTableRows = productTable.querySelectorAll('tr');

function dollarToNumber(priceElem) {
    return +priceElem.innerText.slice(1);
}

function getRowOfThisProduct(productName, productPrice) {
    for (let row of productTableRows) {
        let rowPrice = dollarToNumber(row.cells[2]);
        if (row.cells[0].innerText === productName && rowPrice === productPrice) {
            return row;
        }
    }
    return null;
}

function addProductToRow(row) {
    let productCount = +row.cells[1].innerText;
    productCount++;
    row.cells[1].innerText = productCount;
    row.cells[3].innerText = '$' + (productCount * dollarToNumber(row.cells[2])).toFixed(2);
}

function addNewProduct(productName, productPrice) {
    productTable.insertAdjacentHTML('beforeend', `<tr>
    <td>${productName}</td>
    <td>1</td>
    <td>$${productPrice.toFixed(2)}</td>
    <td>$${productPrice.toFixed(2)}</td>
    </tr>`);
}

function getTableSum() {
    let sum = 0;
    for (let row of productTableRows) {
        let rowSum = dollarToNumber(row.cells[3]);
        if (isFinite(rowSum)) {
            sum += rowSum;
        }
    }
    return sum;
}

let tableSumElem = wModal.querySelector('.modal-window-sum span');

function onAddButtonClick(event) {
    goodsNum++;
    goodsNumElem.innerText = goodsNum;
    let chosenCard = event.currentTarget.parentNode.parentNode;
    let productName = chosenCard.querySelector('.card-header').innerText;
    let productPrice = dollarToNumber(chosenCard.querySelector('.card-price'));
    let row = getRowOfThisProduct(productName, productPrice);
    if (row !== null) {
        addProductToRow(row);
    } else {
        addNewProduct(productName, productPrice);
    }
    productTableRows = productTable.querySelectorAll('tr');
    tableSumElem.innerText = '$' + getTableSum().toFixed(2);
}

function prepareCards() {
    let addBtns = document.querySelectorAll('a.add');
    for (let addBtn of addBtns) {
        // Установка обработчика события нажатия кнопки "Add to Cart"
        addBtn.addEventListener('click', onAddButtonClick);
        addBtn.setAttribute('href', '#');
    }
    let productNames = document.querySelectorAll('.card-header');
    let productNum = 0;
    for (let productName of productNames) {
        productName.innerText = 'Product ' + productNum;
        productNum++;
    }
    let productPrices = document.querySelectorAll('.card-price');
    for (let productPrice of productPrices) {
        productPrice.innerText = '$' + getRandomPrice().toFixed(2);
    }
}
prepareCards();