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
let quantityInputField

// Ajoute un event listener sur les <input> quantité de chaque produit et leur bouton "Supprimer"; active la fonction getCartTotal si la valeur d'un input change, ou la fonction removeFromCart si un clic sur "Supprimer"; ajuste les quantités individuelles de chaque produit sur la page
const eventListener = function () {
  quantityInputField = document.querySelectorAll(".cart__item__content__settings__quantity > .itemQuantity")
  quantityInputField.forEach(element => {
    element.setAttribute('value', element.value)
    productQuantity += element.value
    element.addEventListener("change", pushLocalStorageQuantity)
  });
  removeButton = document.querySelectorAll(".deleteItem")
  removeButton.forEach(element => {
    element.addEventListener("click", removeFromCart)
  })
}

const getUnitQuantities = function() {
  quantityInputField.setAttribute('value', element.value)
}

// Quand la quantité dans les <input> change, calcule le total depuis les quantités affichées et le prix des produits récupérés depuis l'API dans la fonction displayCart
const getCartTotal = function () {
  let cartTotalPrice = new Number()
  let cartTotalQuantity = new Number();
  let i = 0
  while (i !== quantityInputField.length) {
    cartTotalQuantity += Number(quantityInputField[i].value)
    cartTotalPrice += displayPrice[i] * quantityInputField[i].value
    i++
  }
  totalQuantityElement.textContent = cartTotalQuantity
  displayedTotal.textContent = cartTotalPrice
  eventListener()
}

// Compare l'id et la couleur de l'élément 'article' avec ceux contenus dans le panier en localstorage pour trouver son index dans cart et le supprimer, puis le supprime du DOM et force un recalcul du total
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
    eventListener()
    getCartTotal()
  }
}

// Compare l'id et la couleur de l'élément 'article' avec ceux contenus dans le panier en localstorage pour trouver son index dans cart et mettre à jour sa quantité, puis force un recalcul du total
const pushLocalStorageQuantity = function () {
  const getParentArticle = this.closest("article")
  let parentArticleDataset = {
    color: getParentArticle.dataset.color,
    id: getParentArticle.dataset.id
  }
  const updatedProduct = cart.find(product => product.color == parentArticleDataset.color && product.id == parentArticleDataset.id)
  if (updatedProduct) {
    const indexOfUpdatedProduct = cart.indexOf(updatedProduct)
    updatedProduct.quantity = parseInt(quantityInputField[indexOfUpdatedProduct].value)
    localStorage.setItem("cart", JSON.stringify(cart));
    eventListener()
    getCartTotal()
  }
}