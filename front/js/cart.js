'use strict';

const cartSection = document.getElementById("cart__items");

function createTag(newTagName) {
  return document.createElement(newTagName);
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];



// Récupère les données de l'API, puis 1/ compare l'ID du panier en localstorage avec l'id des produits de l'API 2/ retourne les propriétés des produits trouvés dans l'API et le localstorage dans le innerHTML
function displayCart() {
  fetch("http://localhost:3000/api/products")
  .then((response) => {
    return response.json()
    })
    .then((APIProductList) => {
      let cartItemImage;
      let cartItemImageAlt;
      let productName;
      let productColor;
      let productPrice;
      cart.forEach(productInCart => {
        const matchingProduct = APIProductList.find(product => product._id == productInCart.id)
        APIProductList.forEach(productInList => {
          if (matchingProduct) {
            cartItemImage = `${matchingProduct.imageUrl}`
            cartItemImageAlt = `${matchingProduct.altTxt}`
            productName = `${matchingProduct.name}`
            productColor = `${productInCart.color}`
            productPrice = `${matchingProduct.price}`
          }
        })
        cartSection.innerHTML += `<article class="cart__item" data-id="${productInCart.id}" data-color="${productColor}"><div class="cart__item__img"><img src="${cartItemImage}" alt="${cartItemImageAlt}"></div><div class="cart__item__content"><div class="cart__item__content__description"><h2>${productName}</h2><p>${productColor}</p><p>${productPrice} €</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInCart.quantity}"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div></article>`
      })
    })
}

displayCart()

