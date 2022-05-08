'use strict';

const itemsSection = document.getElementById("items");

// Fonction pour créer une nouvelle balise HTML ("exemple") quand la fonction est appelée
function createTag(newTagName) {
  return document.createElement(newTagName);
}

// Fonction qui 1/ récupère le contenu de l'API et le converti en JSON 2/ crée une carte par object dans le JSON en créant les balises HTML puis 3/ leur assigne une classe et importe le contenu depuis le JSON (nom du produit, image, id...)

function createProductsCards() {
  fetch("http://localhost:3000/api/products")
    .then((response) => {
      return response.json()
    })
    .then((productList) => {
      productList.forEach(product => {
        const productLink = createTag('a');
        const articleTag = createTag('article');
        const productImage = createTag('img');
        const productName = createTag('h3');
        const productDescription = createTag('p');
        productLink.appendChild(articleTag);
        articleTag.append(productImage, productName, productDescription);
        itemsSection.appendChild(productLink);
        productLink.href = `./product.html?id=${product._id}`
        productImage.src = `${product.imageUrl}`
        productImage.alt = `${product.altTxt}`
        productName.classList.add("productName")
        productName.textContent = `${product.name}`
        productDescription.classList.add("productDescription")
        productDescription.textContent = `${product.description}`
      })
    })
    .catch((err) => {
      console.log(`There was an error somewhere!`)
    })
}

createProductsCards()