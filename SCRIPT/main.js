let homeProductShow = [
    { name: "Potato", stock: 10, price: 2, img: 'Images/mister_potato.png' },
    { name: "Mister potato", stock: 10, price: 2, img: 'Images/mister_potato.png' },
    { name: "Mister potato", stock: 10, price: 2, img: 'Images/mister_potato.png' },
    { name: "Mister potato", stock: 10, price: 2, img: 'Images/mister_potato.png' },
];

let shoesProducShow = [
    { name: "Mister", stock: 10, price: 2, img: 'Images/mister_potato.png' },
    { name: "Potato", stock: 10, price: 2, img: 'Images/mister_potato.png' },
    // { name: "Mister potato", stock: 10, price: 2, img: 'Images/mister_potato.png' },
    // { name: "Mister potato", stock: 10, price: 2, img: 'Images/mister_potato.png' },
];

// Data save to local storage
function saveSnackData() {
    localStorage.setItem('ProductShow', JSON.stringify(homeProductShow));
}

// Load data from local storage
function loadSnackData() {
    const snackDataString = localStorage.getItem('ProductShow');
    if (snackDataString) {
        homeProductShow = JSON.parse(snackDataString);
    }
}


let product_list;

function createProduct(data) {
    product_list = document.querySelector(".product-list");

    product_list.innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let product = data[i];
        let productContainer = document.createElement('div');
        productContainer.classList.add('product');

        let productImg = document.createElement('img');
        productImg.classList.add('product-img');
        productImg.src = product.img;

        let productName = document.createElement('p');
        productName.classList.add('product-name');
        productName.textContent = product.name;

        let productStock = document.createElement('p');
        productStock.classList.add('product-stock');
        productStock.textContent = "Total in stock: ";

        let stockSpan = document.createElement('span');
        stockSpan.textContent = product.stock;

        let productPrice = document.createElement('p');
        productPrice.classList.add('product-price');
        productPrice.textContent = "Price: ";

        let priceSpan = document.createElement('span');
        priceSpan.textContent = product.price;

        let productBtn = document.createElement('button');
        productBtn.classList.add('add-btn');
        productBtn.textContent = "Order";
        productBtn.id = i;

        productBtn.addEventListener('click', createCardPay);

        productStock.appendChild(stockSpan);
        productPrice.appendChild(priceSpan);

        productContainer.appendChild(productImg);
        productContainer.appendChild(productName);
        productContainer.appendChild(productStock);
        productContainer.appendChild(productPrice);
        productContainer.appendChild(productBtn);

        product_list.appendChild(productContainer);
    }
}

function searchPro() {
    for (pName of product_list.children) {
        if (pName.children[1].textContent.toLocaleLowerCase().includes(searchName.value.toLocaleLowerCase())) {
            pName.style.display = "block";
        }
        else {
            pName.style.display = "none";
        }
    }

}
let searchName = document.querySelector("#search-input");




function createCardPay(event) {
    let isNotExit = true;
    let cardContent = document.querySelector('.product-incart');
    let button = event.currentTarget;
    let buttonId = button.id;
    let indexCard = homeProductShow[buttonId];

    for (Quantitys of cardContent.children) {
        let a = Quantitys.children[0].textContent
        if (a === indexCard.name) {
            isNotExit = false;
            if(indexCard.stock > Quantitys.children[1].children[0].textContent){
                Quantitys.children[1].children[0].textContent = parseInt(Quantitys.children[1].children[0].textContent) + 1;
                Quantitys.children[2].children[0].textContent = parseInt(indexCard.price) * parseInt(Quantitys.children[1].children[0].textContent) + "$";
            }

        }
    }
    if (isNotExit) {
        let cardPay = document.createElement('div');
        cardPay.className = 'cardpay';

        let cardNamePay = document.createElement('p');
        cardNamePay.textContent = indexCard.name;

        let cardQuality = document.createElement('p');
        cardQuality.textContent = "Quantity: " ;
        //---------------
        let quantitySpan = document.createElement('span');
        quantitySpan.textContent = 1;
        cardQuality.appendChild(quantitySpan);
        //-------------

        let cardPricePay = document.createElement('p');
        cardPricePay.textContent = "Price: " ;

        //----------------
        let priceSpan = document.createElement('span');
        priceSpan.textContent = indexCard.price + "$";
        cardPricePay.appendChild(priceSpan);
        //--------------

        let bntDeleteCard = document.createElement('button');
        bntDeleteCard.className = 'bntdelet';
        bntDeleteCard.textContent = 'delete';
        cardPay.appendChild(cardNamePay);
        cardPay.appendChild(cardQuality);
        cardPay.appendChild(cardPricePay);
        cardPay.appendChild(bntDeleteCard);
        cardContent.appendChild(cardPay);

        bntDeleteCard.addEventListener('click', delet);
    }

}

function delet(event) {
    if (confirm('Are you wanting to remove order?')) {
        event.target.parentElement.remove();
    }
}

/*Get buttons category */
let homeProduct = document.querySelector('#homeProduc');
homeProduct.addEventListener('click', function () {
    createProduct(homeProductShow);
});

let shoeProduct = document.querySelector('#Shoes');
shoeProduct.addEventListener('click', function () {
    createProduct(shoesProducShow);
});

loadSnackData();
createProduct(homeProductShow);
searchName.addEventListener('keyup', searchPro);