'use strict';

const currentPageUrl = window.location.href;
const url = new URL(currentPageUrl);
const productId = url.searchParams.get("id");

function createTag(newTagName) {
  return document.createElement(newTagName);
}

function fillProductsPages() {
  fetch("http://localhost:3000/api/products")
    .then((response) => {
      return response.json()
    })
    .then((productList) => {
      let i = 0;
      while (productList[i]._id !== productId) {
        i++
      }
      const productImage = createTag('img');
      document.getElementsByClassName('item__img')[0].appendChild(productImage)
      document.getElementById('title').textContent = `${productList[i].name}`
      document.getElementById('price').textContent = `${productList[i].price}`
      document.getElementById('description').textContent = `${productList[i].description}`
      productImage.src = `${productList[i].imageUrl}`
      productImage.alt = `${productList[i].altTxt}`
      let colorNumber = 0;
      for (const colorOption in productList[i].colors) {
        const productOptions = createTag('option');
        document.getElementById('colors').appendChild(productOptions)
        productOptions.value = `${productList[i].colors[colorNumber]}`
        productOptions.textContent = `${productList[i].colors[colorNumber]}`
        colorNumber++
      }
    })
    .catch((err) => {
      console.log(`There was an error somewhere!`)
    })
}

fillProductsPages()

const selectedColor = document.getElementById("colors");
const cartButton = document.getElementById("addToCart");
const selectedQuantity = document.getElementById("quantity");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const addToCart = function () {
  let newProductInCart = {
    color: selectedColor.value,
    id: productId,
    quantity: new Number(selectedQuantity.value)
  }
  const productInCart = cart.find(product => product.color == selectedColor.value && product.id == productId)
  if (productInCart) {
    console.log("Produit bien détecté dans le panier")
    productInCart.quantity = parseInt(productInCart.quantity) + parseInt(selectedQuantity.value)
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    cart.push(newProductInCart);
    return localStorage.setItem("cart", JSON.stringify(cart));
  }
};

cartButton.addEventListener("click", addToCart)