'use strict';

const cartSection = document.getElementById("cart__items");

function createTag(newTagName) {
  return document.createElement(newTagName);
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];



function createStructure() {
        const cartItem = createTag('article');
        cartItem.classList.add("cart__item")
        cartSection.appendChild(cartItem)
        // #region img
        const cartImageContainer = createTag('div')
        cartImageContainer.classList.add("cart__item__img")
        cartItem.appendChild(cartImageContainer)
        const cartItemImage = createTag('img')
        // cartItemImage.src = `${product.imageUrl}`
        // cartItemImage.alt = `${product.altTxt}`
        cartImageContainer.appendChild(cartItemImage)
        // #endregion img
        // #region content
        const cartContentContainer = createTag('div')
        cartContentContainer.classList.add("cart__item__content")
        cartItem.appendChild(cartContentContainer)
        // #region Product Description
        const cartContentDescription = createTag('div')
        cartContentDescription.classList.add("cart__item__content__description")
        cartContentContainer.appendChild(cartContentDescription)
        const cartContentSettings = createTag('div')
        cartContentSettings.classList.add("cart__item__content__settings")
        cartContentContainer.appendChild(cartContentSettings)
        const productName = createTag('h2')
        productName.textContent = ""
        const productColor = createTag('p')
        productColor.textContent = ""
        const productPrice = createTag('p')
        productPrice.textContent = `€`
        cartContentDescription.append(productName, productColor, productPrice)
        // #endregion Product Description
        // #region Product Settings
        const productQuantity = createTag('div')
        productQuantity.classList.add("cart__item__content__settings__quantity")
        const removeFromCart = createTag('div')
        removeFromCart.classList.add('cart__item__content__settings__delete')
        cartContentSettings.append(productQuantity, removeFromCart)
        const quantityInfoText = createTag('p')
        quantityInfoText.textContent = `Qté :`
        const displayProductQuantity = createTag('input')
        displayProductQuantity.type = "number"
        displayProductQuantity.classList.add("itemQuantity")
        displayProductQuantity.name = "itemQuantity"
        displayProductQuantity.min = "1"
        displayProductQuantity.max = "100"
        // displayProductQuantity.value = `${}`
        displayProductQuantity.textContent = ``
        productQuantity.append(quantityInfoText, displayProductQuantity)
        // #endregion Product Settings
        // #endregion content
        const deleteItem = createTag('p')
        deleteItem.classList.add('deleteItem')
        deleteItem.textContent = "Supprimer"
        removeFromCart.appendChild(deleteItem)
      }
      
      createStructure()
      // const articleTag = createTag('article');
      // const productImage = createTag('img');
      // const productName = createTag('h3');
      // const productDescription = createTag('p');
      // productLink.appendChild(articleTag);
      // articleTag.append(productImage, productName, productDescription);
      // itemsSection.appendChild(productLink);
      // productLink.href = `./product.html?id=${product._id}`
      // productName.classList.add("productName")
      // productName.textContent = `${product.name}`
      // productDescription.classList.add("productDescription")
      // productDescription.textContent = `${product.description}`