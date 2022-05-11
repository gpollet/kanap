'use strict';

const cartSection = document.getElementById("cart__items");

// Crée un nouvel élément html de type (newTagName)
function createTag(newTagName) {
  return document.createElement(newTagName);
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let cartItemImage;
let cartItemImageAlt;
let productName;
let productColor;
let productPrice;
let productQuantity = []
let displayPrice = []
let cartContent = '';
let i = 0;

// Récupère les données de l'API, puis 1/ compare l'ID du panier en localstorage avec l'id des produits de l'API 2/ retourne les propriétés des produits trouvés dans l'API et le localstorage dans le innerHTML puis 3/ ajoute un event listener sur les input "Qté"
function displayCart() {
  fetch("http://localhost:3000/api/products")
    .then((response) => {
      return response.json()
    })
    .then((APIProductList) => {
      while (i !== cart.length) {
        const matchingProduct = APIProductList.find(product => product._id == cart[i].id)
        APIProductList.forEach(productInList => {
          if (matchingProduct) {
            cartItemImage = `${matchingProduct.imageUrl}`
            cartItemImageAlt = `${matchingProduct.altTxt}`
            productName = `${matchingProduct.name}`
            productColor = `${cart[i].color}`
            productPrice = `${matchingProduct.price}`
          }
        })
        createInnerContent()
        displayPrice.push(productPrice)
        i++
      }
      cartSection.innerHTML += cartContent;
      eventListener()
      getCartTotal()
    })
}

// Crée un nouveau bloc article pour chaque produit du panier
const createInnerContent = function () {
  cartContent += `<article class="cart__item" data-id="${cart[i].id}" data-color="${productColor}"><div class="cart__item__img"><img src="${cartItemImage}" alt="${cartItemImageAlt}"></div><div class="cart__item__content"><div class="cart__item__content__description"><h2>${productName}</h2><p>${productColor}</p><p>${productPrice} €</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div></article>`
}


displayCart()

const totalQuantityElement = document.getElementById("totalQuantity")
const displayedTotal = document.getElementById("totalPrice")
let removeButton
let quantityInputsValue

// Surveille la valeur des éléments <input> de la quantité de chaque produit, et active la fonction getCartTotal si un changement est détecté ; ajout une détection de clic sur les boutons "Supprimer", pour activer la fonction adaptée en réponse
const eventListener = function () {
  quantityInputsValue = document.querySelectorAll(".cart__item__content__settings__quantity > .itemQuantity")
  quantityInputsValue.forEach(element => {
    productQuantity += element.value
    element.addEventListener("change", getCartTotal)
  });
  removeButton = document.querySelectorAll(".deleteItem")
  removeButton.forEach(element => {
    element.addEventListener("click", removeFromCart)
  })
}

// Quand la quantité dans les <input> change, calcule le total depuis les quantités affichées et le prix des produits récupérés depuis l'API dans la fonction displayCart
const getCartTotal = function () {
  let cartTotalPrice = new Number()
  let cartTotalQuantity = new Number();
  let i = 0
  while (i !== quantityInputsValue.length) {
    cartTotalQuantity += Number(quantityInputsValue[i].value)
    cartTotalPrice += displayPrice[i] * quantityInputsValue[i].value
    i++
  }
  totalQuantityElement.textContent = cartTotalQuantity
  displayedTotal.textContent = cartTotalPrice
}


const removeFromCart = function () {
  const getParentArticle = this.closest("article")
  let parentArticleDataset = {
    color: getParentArticle.dataset.color,
    id: getParentArticle.dataset.id
  }
  const productToRemove = cart.find(product => product.color == parentArticleDataset.color && product.id == parentArticleDataset.id)
  if (productToRemove) {
    const indexOfRemovedProduct = cart.indexOf(productToRemove)
    const removeProduct = cart.splice(indexOfRemovedProduct,1)
    getParentArticle.remove()
    localStorage.setItem("cart", JSON.stringify(cart));
    getCartTotal()
  }
}