'use strict';

const cartSection = document.getElementById("cart__items");
// eventListener()

function createTag(newTagName) {
  return document.createElement(newTagName);
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];

// function createStructure() {
//   const cartItem = createTag('article');
//   cartItem.classList.add("cart__item")
//   cartSection.appendChild(cartItem)
//   // #region img
//   const cartImageContainer = createTag('div')
//   cartImageContainer.classList.add("cart__item__img")
//   cartItem.appendChild(cartImageContainer)
//   const cartItemImage = createTag('img')
//   // cartItemImage.src = `${product.imageUrl}`
//   // cartItemImage.alt = `${product.altTxt}`
//   cartImageContainer.appendChild(cartItemImage)
//   // #endregion img
//   // #region content
//   const cartContentContainer = createTag('div')
//   cartContentContainer.classList.add("cart__item__content")
//   cartItem.appendChild(cartContentContainer)
//   // #region Product Description
//   const cartContentDescription = createTag('div')
//   cartContentDescription.classList.add("cart__item__content__description")
//   cartContentContainer.appendChild(cartContentDescription)
//   const cartContentSettings = createTag('div')
//   cartContentSettings.classList.add("cart__item__content__settings")
//   cartContentContainer.appendChild(cartContentSettings)
//   const productName = createTag('h2')
//   productName.textContent = ""
//   const productColor = createTag('p')
//   productColor.textContent = ""
//   const productPrice = createTag('p')
//   productPrice.textContent = `€`
//   cartContentDescription.append(productName, productColor, productPrice)
//   // #endregion Product Description
//   // #region Product Settings
//   const productQuantity = createTag('div')
//   productQuantity.classList.add("cart__item__content__settings__quantity")
//   const removeFromCart = createTag('div')
//   removeFromCart.classList.add('cart__item__content__settings__delete')
//   cartContentSettings.append(productQuantity, removeFromCart)
//   const quantityInfoText = createTag('p')
//   quantityInfoText.textContent = `Qté :`
//   const displayProductQuantity = createTag('input')
//   displayProductQuantity.type = "number"
//   displayProductQuantity.classList.add("itemQuantity")
//   displayProductQuantity.name = "itemQuantity"
//   displayProductQuantity.min = "1"
//   displayProductQuantity.max = "100"
//   // displayProductQuantity.value = `${}`
//   displayProductQuantity.textContent = ``
//   productQuantity.append(quantityInfoText, displayProductQuantity)
//   // #endregion Product Settings
//   // #endregion content
//   const deleteItem = createTag('p')
//   deleteItem.classList.add('deleteItem')
//   deleteItem.textContent = "Supprimer"
//   removeFromCart.appendChild(deleteItem)
// }

// Récupère les données de l'API, puis 1/ compare l'ID du panier en localstorage avec l'id des produits de l'API 2/ retourne les propriétés des produits trouvés dans l'API et le localstorage dans le innerHTML
// function displayCart() {
//   fetch("http://localhost:3000/api/products")
//   .then((response) => {
//     return response.json()
//     })
//     .then((APIProductList) => {
//       let cartItemImage;
//       let cartItemImageAlt;
//       let productName;
//       let productColor;
//       let productPrice;
//       cart.forEach(productInCart => {
//         const matchingProduct = APIProductList.find(product => product._id == productInCart.id)
//         APIProductList.forEach(productInList => {
//           if (matchingProduct) {
//             cartItemImage = `${matchingProduct.imageUrl}`
//             cartItemImageAlt = `${matchingProduct.altTxt}`
//             productName = `${matchingProduct.name}`
//             productColor = `${productInCart.color}`
//             productPrice = `${matchingProduct.price}`
//           }
//         })
//         cartSection.innerHTML += `<article class="cart__item" data-id="${productInCart.id}" data-color="${productColor}"><div class="cart__item__img"><img src="${cartItemImage}" alt="${cartItemImageAlt}"></div><div class="cart__item__content"><div class="cart__item__content__description"><h2>${productName}</h2><p>${productColor}</p><p>${productPrice} €</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productInCart.quantity}"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div></article>`

//         // let productQuantity = document.querySelector(`.cart__item[data-id='${(productInCart.id)}'][data-color='${(productInCart.color)}'] .cart__item__content__settings__quantity > input`)
//         // let productQuantity = document.querySelector(`.cart__item[data-id='${(productInCart.id)}'][data-color='${(productInCart.color)}'] .cart__item__content__settings__quantity > input`);
//         // productQuantity.addEventListener("click", testEvent)
//         // console.log(productQuantity)
//         // eventListener(`${productInCart.id}`, `${productInCart.color}`)
//       })
//     })
//   }

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
      let i = 0;
      let cartContent = '';
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
        cartContent += `<article class="cart__item" data-id="${cart[i].id}" data-color="${productColor}"><div class="cart__item__img"><img src="${cartItemImage}" alt="${cartItemImageAlt}"></div><div class="cart__item__content"><div class="cart__item__content__description"><h2>${productName}</h2><p>${productColor}</p><p>${productPrice} €</p></div><div class="cart__item__content__settings"><div class="cart__item__content__settings__quantity"><p>Qté : </p><input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}"></div><div class="cart__item__content__settings__delete"><p class="deleteItem">Supprimer</p></div></div></div></article>`
        // eventListener(`${cart[i].id}`, `${productColor}`)
        // let clickEvent = document.querySelector(`[data-id=${cart[i].id}]`)
        // clickEvent.addEventListener("click", testEvent)
        i++
      }
      cartSection.innerHTML += cartContent;
      eventListener()
    })
}

displayCart()


let testEvent = function () {
  console.log("Test réussi")
}

// productQuantity.addEventListener("click", testEvent)

// Surveille la valeur des éléments <input> de la quantité de chaque produit, et active la fonction adaptCart si un changement est détecté
const eventListener = function () {
  let displayedQuantity = document.querySelectorAll(".cart__item__content__settings__quantity > .itemQuantity")
      displayedQuantity.forEach(element => {  
        element.addEventListener("change", testEvent)
      });
}

const adaptCart = function () {

}