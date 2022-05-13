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
      formInputValidation()
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
let getParentArticle
let updatedProduct

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

const getUnitQuantities = function () {
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

// Compare l'id et la couleur de l'élément 'article' avec ceux contenus dans le panier en localstorage, pour renvoyer au caller (fonction pour supprimer un produit du panier, ou pour mettre à jour la quantité) le produit concerné
const getProductToUpdate = function () {
  let parentArticleDataset = {
    color: getParentArticle.dataset.color,
    id: getParentArticle.dataset.id
  }
  updatedProduct = cart.find(product => product.color == parentArticleDataset.color && product.id == parentArticleDataset.id)
  return updatedProduct;
}

// Trouve l'index du produit dans cart pour le supprimer, le retirer du DOM et forcer un recalcul du total
const removeFromCart = function () {
  getParentArticle = this.closest("article")
  getProductToUpdate()
  if (productToRemove) {
    const indexOfRemovedProduct = cart.indexOf(productToRemove)
    const removeProduct = cart.splice(indexOfRemovedProduct, 1)
    getParentArticle.remove()
    localStorage.setItem("cart", JSON.stringify(cart));
    eventListener()
    getCartTotal()
  }
}

// Trouve l'index du produit dans cart pour mettre à jour sa quantité, puis force un recalcul du total
const pushLocalStorageQuantity = function () {
  getParentArticle = this.closest("article")
  getProductToUpdate()
  if (updatedProduct) {
    const indexOfUpdatedProduct = cart.indexOf(updatedProduct)
    updatedProduct.quantity = parseInt(quantityInputField[indexOfUpdatedProduct].value)
    localStorage.setItem("cart", JSON.stringify(cart));
    eventListener()
    getCartTotal()
    convertCartToArray()
  }
}

const formInputs = document.querySelectorAll(".cart__order__form__question > input")
const formInputsErrors = document.querySelectorAll(".cart__order__form__question > p")
const orderButton = document.getElementById('order')


// Ajoute un eventListener à chaque élément champs du formulaire
const formInputValidation = function () {
  formInputs.forEach(inputField => {
    inputField.addEventListener("change", checkInput)
  });
  orderButton.addEventListener("click", sendCartAndInput)
};


const nameCriterias = /^[a-z ,.'-]+$/i
const emailCriterias = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
let validationStatus = false
let errorName

// Détecte le champs qui a été modifié, vérifie s'il répond aux critères de saisie définis, et si false modifie la balise html d'erreur correspondante. Si la saisie est à nouveau valide après modification, retire le message d'erreur.
const checkInput = function (targetElement) {
  let i = 0
  while (i < 5) {
    if (this.id == `${formInputs.item(i).name}`) {
      if (this.id == 'firstName' || this.id == 'lastName' || this.id == 'city') {
        validationStatus = nameCriterias.test(this.value)
      } else if (this.id == 'email') {
        validationStatus = emailCriterias.test(this.value)
      } else {
        validationStatus = true
      }
      errorName = document.getElementById(`${formInputsErrors.item(i).id}`)
      if (validationStatus == false) {
        errorName.textContent = "Vérifiez votre saisie"
      } else {
        errorName.textContent = ""
      }
      break
    }
    i++
  }
}

let contact

// Sauvegarde le contenu des champs du formulaire dans une variable contact
const saveInputForm = function () {
  contact = {
    firstName: `${formInputs[0].value}`,
    lastName: `${formInputs[1].value}`,
    address: `${formInputs[2].value}`,
    city: `${formInputs[3].value}`,
    email: `${formInputs[4].value}`,
  }
}

const products = []

// Extrait le contenu du panier en localstorage et le sauvegarde dans une variable products
const convertCartToArray = function () {
  cart.forEach(product => {
    cart.find(product => product.id)
    products.push(product.id)
    /* Si besoin de supprimer les id doublons car couleur pas prise en compte par API, décommenter ci-dessous et y intégrer contenu de la fonction convertCartToArray
    if (products.includes(product.id) == false) {
    }
    */
  });
}

let orderProducts

const mergeInputs = function () {
  convertCartToArray()
  saveInputForm()
  orderProducts = {
    contact,
    products
  }
}

let testResponse = []

function sendCartAndInput(event) {
  // event.preventDefault()
  mergeInputs()
  fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify(orderProducts),
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      localStorage.clear();
      window.location.href = `confirmation.html?order=${response.orderId}`
    })
    .catch((error) => {
      console.log(error)
    })
}