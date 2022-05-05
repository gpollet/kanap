'use strict';

const currentPageUrl = window.location.href;
const url = new URL(currentPageUrl);
const pageProductParam = url.searchParams.get("id");

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
      while (productList[i]._id !== pageProductParam) {
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

// Gestion du panier
// Event listener clic sur "ajouter au panier"
// Soit ajoute nouvel élément à l'array, soit incrémente si même ID et couleur
// Panier = un array qui contient : ID produit, quantité produit, couleur produit
// Utiliser localStorage


const selectedColor = document.getElementById("colors");
const cartButton = document.getElementById("addToCart");
const selectedQuantity = document.getElementById("quantity");

// let cart = [];
// Crée un array dans le panier contenant la couleur du produit, son ID et sa quantité. Si un array ayant l'ID et la couleur du produit à ajouter au panier existe déjà, modifie la quantité existante au lieu de créer un nouvel array 

// const testCart = function () {
//   const addToCart = {
//     color: selectedColor.value,
//     id: pageProductParam,
//     quantity: selectedQuantity.value}
//   console.log(cart)
//   if (selectedQuantity.value == 0 || selectedColor.value == "") {
//     console.log("Pas de couleur sélectionnée")
//   }
//   else if (cart.length != 0 && (cart.includes(selectedColor.value, pageProductParam)))  {
//       let newQuantity = parseInt(cart + selectedQuantity)
//       return cart.pop(newQuantity)
//   } else {
//     return cart.push(addToCart);
//   }
//     console.log(cart.includes(selectedColor.value, pageProductParam, selectedQuantity.value))
// }

function newQuantity () {
  localStorage.setItem(((localStorage.getItem(`${selectedColor.value}-${pageProductParam}`))) =+ 5)
}

const testCart = function () {
  if (selectedQuantity.value == 0 || selectedColor.value == "") {
    console.log("Pas de couleur sélectionnée")
  }
  else if ((localStorage.getItem(`${selectedColor.value}-${pageProductParam}`)) > 0){
    console.log("Produit déjà dans le panier")
    return localStorage.setItem(`${selectedColor.value}-${pageProductParam}`, selectedQuantity.value);
  } 
  // else {
  //   return localStorage.setItem(`${selectedColor.value}-${pageProductParam}`, selectedQuantity.value);
  // }
    // console.log(cart.includes(selectedColor.value, pageProductParam, selectedQuantity.value))
}


// const displayColor = function () {
//   console.log(cart)
//   let i = 0;
//   for (const productArray in cart) {
//     console.log(cart[i].includes(selectedColor.value, pageProductParam))
//     i++
//   }
// }

const displayColor = function () {
  console.log(localStorage)
  console.log((localStorage.getItem(`${selectedColor.value}-${pageProductParam}`)) > 0)
  // let i = 0;
  // for (const productArray in cart) {
  //   console.log(cart[i].includes(selectedColor.value, pageProductParam))
  //   i++
  // }
}

// class productInCart {
//   constructor(color, id, quantity) {
//     this.color = color;
//     this.id = id;
//     this.quantity = quantity;
//   }
//   currentCart() {
//     console.log(`Produits actuellement dans le panier : ${this.id} en couleur ${this.color} et en quantité ${this.quantity}`)
//   }
// }

// const addProductToCart =  new productInCart(selectedColor.value, pageProductParam, selectedQuantity.value);
  // console.log(`Produits actuellement dans le panier : ${productInCart.id} en couleur ${productInCart.color} et en quantité ${productInCart.quantity}`)

// const checkCart = function () {
//   console.log(`Produits actuellement dans le panier : ${this.id} en couleur ${this.color} et en quantité ${this.quantity}`)
// }

// cartButton.addEventListener("click", addProductToCart)
cartButton.addEventListener("click", testCart)
selectedColor.addEventListener("change", displayColor)
// selectedColor.addEventListener("change", checkCart)