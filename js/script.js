// cost
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVlZjIzNzIzZGQwMjAwMTUxZGM0ZWEiLCJpYXQiOjE3NTEwNTI4NTUsImV4cCI6MTc1MjI2MjQ1NX0.tOWS3X5gYLPewGgRPna-i2jQoRFOKAZO2G_JPDRl-NI"; // Sostituisci con il tuo token

const productsContainer = document.getElementById("products-container");

const loadProducts = () => {
    productsContainer.innerHTML = "Caricamento...";
    fetch(API_URL, {
        headers: {
            Authorization: "Bearer " + TOKEN
        }
    })
    .then(res => res.json())
    .then(products => {
        productsContainer.innerHTML = "";
        if (products.length === 0) {
            productsContainer.innerHTML = "<p>Nessun prodotto trovato.</p>";
        }
        products.forEach(product => {
            const div = document.createElement("div");
            div.className = "product-card";
            div.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" style="width:80px;height:80px;object-fit:cover;">
                <div>
                    <h3>${product.name}</h3>
                    <p>${product.brand}</p>
                    <p>€${product.price}</p>
                    <button class="dettaglio-btn" data-id="${product._id}">Dettaglio</button>
                </div>
            `;
            productsContainer.appendChild(div);
        });

        // Login backoffice 
        document.querySelectorAll('.dettaglio-btn').forEach(btn => {
            btn.onclick = function() {
                const id = btn.getAttribute('data-id');
                window.location.href = `product.html?id=${id}`;
            };
        });
    })
    .catch(() => {
        productsContainer.innerHTML = "Errore nel caricamento dei prodotti.";
    });
};

loadProducts();