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

// Gestion du panier
// Event listener clic sur "ajouter au panier"
// Soit ajoute nouvel élément à l'array, soit incrémente si même ID et couleur


// Crée un array dans le panier contenant la couleur du produit, son ID et sa quantité. Si un array ayant l'ID et la couleur du produit à ajouter au panier existe déjà, modifie la quantité existante au lieu de créer un nouvel array 



const selectedColor = document.getElementById("colors");
const cartButton = document.getElementById("addToCart");
const selectedQuantity = document.getElementById("quantity");


const cart = JSON.parse(localStorage.getItem("cart")) || [];

// let newQuantity = parseInt(cart[i].quantity + parseInt(selectedQuantity.value)


// const updatedQuantity = function(quantityStored, quantityOnPage) {
// let newQuantity = parseInt(productInCart.quantity) + parseInt(selectedQuantity.value)
// console.log(newQuantity)
// }


// const addToCart = function () {
//   let newProductInCart = {
//     color: selectedColor.value,
//     id: productId,
//     quantity: selectedQuantity.value
//   }
//   if (cart.length === 0) {
//     cart.push(newProductInCart);
//     return localStorage.setItem("cart", JSON.stringify(cart));

//   } else {
//     const productInCart = cart.find(product => product.color == selectedColor.value && product.id == productId)
//       if (productInCart) {
//         console.log("Produit bien détecté dans le panier")
//         productInCart.quantity = parseInt(productInCart.quantity) + parseInt(selectedQuantity.value)
//         localStorage.setItem("cart", JSON.stringify(cart));
//       }

//       else {
//         cart.push(newProductInCart);
//         // return localStorage.setItem("cart", JSON.stringify(cart));
//       }

//     };
//   }

const addToCart = function () {
  let newProductInCart = {
    color: selectedColor.value,
    id: productId,
    quantity: selectedQuantity.value
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



// const checkLocalStorage = function () {
//   console.log(localStorage)
//   console.log(localStorage.getItem(cart))
// console.log((localStorage.getItem(`${selectedColor.value}-${productId}`)) > 0)
// console.log((localStorage.getItem(`${selectedColor.value}-${productId}`)))
// }




// cartButton.addEventListener("click", retrieveCart)
cartButton.addEventListener("click", addToCart)
// selectedColor.addEventListener("change", checkLocalStorage)