// cost
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVlZjIzNzIzZGQwMjAwMTUxZGM0ZWEiLCJpYXQiOjE3NTEwNTI4NTUsImV4cCI6MTc1MjI2MjQ1NX0.tOWS3X5gYLPewGgRPna-i2jQoRFOKAZO2G_JPDRl-NI";

const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const productDetailSection = document.getElementById("product-detail");

if (productId) {
    fetch(API_URL + productId, {
        headers: {
            "Authorization": "Bearer " + TOKEN
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("Prodotto non trovato");
        return res.json();
    })
    .then(product => {
        // Dati prodotto
        productDetailSection.innerHTML = `
            <h2>${product.name}</h2>
            <img src="${product.imageUrl}" alt="${product.name}" style="max-width:200px;">
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Descrizione:</strong> ${product.description}</p>
            <p><strong>Prezzo:</strong> €${product.price}</p>
            <p><small>ID: ${product._id}</small></p>
            <p><small>Creato il: ${new Date(product.createdAt).toLocaleString()}</small></p>
        `;
    })
    .catch(() => {
        productDetailSection.innerHTML = "<p>Prodotto non trovato o errore nel caricamento.</p>";
    });
} else {
    productDetailSection.innerHTML = "<p>ID prodotto non trovato nell'URL.</p>";
}

// Aggiunta prodotto
const newProductSection = document.getElementById("new-product");

newProductSection.innerHTML = `
    <h2>${newProduct.name}</h2>
    <img src="${newProduct.imageUrl}" alt="${newProduct.name}" style="max-width:200px;">
    <p><strong>Brand:</strong> ${newProduct.brand}</p>
    <p><strong>Descrizione:</strong> ${newProduct.description}</p>
    <p><strong>Prezzo:</strong> €${newProduct.price}</p>
`;

