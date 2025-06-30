// cost
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVlZjIzNzIzZGQwMjAwMTUxZGM0ZWEiLCJpYXQiOjE3NTEwNTI4NTUsImV4cCI6MTc1MjI2MjQ1NX0.tOWS3X5gYLPewGgRPna-i2jQoRFOKAZO2G_JPDRl-NI";

const form = document.getElementById("product-form");
const resetBtn = document.getElementById("reset-btn");
const productsList = document.getElementById("products-list");
const tableBody = document.getElementById("table-body");

const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const brandInput = document.getElementById("brand");
const imageUrlInput = document.getElementById("imageUrl");
const priceInput = document.getElementById("price");
const idInput = document.getElementById("product-id");

// Carica tutti i prodotti
const loadProducts = async () => {
    tableBody.innerHTML = `<tr><td colspan="5">Caricamento...</td></tr>`;
    try {
        const res = await fetch(API_URL, {
            headers: { Authorization: "Bearer " + TOKEN }
        });
        const products = await res.json();
        tableBody.innerHTML = "";
        products.forEach(product => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.brand}</td>
                <td><img src="${product.imageUrl}" alt="${product.name}" style="width:60px;height:60px;object-fit:cover;"></td>
                <td>€${product.price}</td>
                <td>
                  <div class="actions-row">
                    <button class="edit-btn" data-id="${product._id}">Modifica</button>
                    <button class="delete-btn" data-id="${product._id}">Elimina</button>
                    <a href="product.html?id=${product._id}" target="_blank" class="visit-btn">
                      Visita la pagina
                    </a>
                  </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });

        // Modifica prodotto
        document.querySelectorAll(".edit-btn").forEach(btn => {
            btn.onclick = async () => {
                const id = btn.getAttribute("data-id");
                const res = await fetch(API_URL + id, {
                    headers: { Authorization: "Bearer " + TOKEN }
                });
                const prod = await res.json();
                idInput.value = prod._id;
                nameInput.value = prod.name;
                descriptionInput.value = prod.description;
                brandInput.value = prod.brand;
                imageUrlInput.value = prod.imageUrl;
                priceInput.value = prod.price;
                window.scrollTo({ top: 0, behavior: "smooth" });
            };
        });

        // Elimina prodotto
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.onclick = async () => {
                const id = btn.getAttribute("data-id");
                if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
                    await fetch(API_URL + id, {
                        method: "DELETE",
                        headers: { Authorization: "Bearer " + TOKEN }
                    });
                    loadProducts();
                    form.reset();
                }
            };
        });

    } catch (err) {
        tableBody.innerHTML = `<tr><td colspan="5">Errore nel caricamento prodotti.</td></tr>`;
    }
};

// aggiungi o modifica
form.onsubmit = async (e) => {
    e.preventDefault();
    const priceValue = priceInput.value;
    if (priceValue === "" || isNaN(Number(priceValue))) {
        alert("Inserisci un prezzo valido.");
        return;
    }
    const product = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: imageUrlInput.value,
        price: Number(priceValue)
    };
    const id = idInput.value;
    try {
        if (id) {
             // Modifica prodotto
            await fetch(API_URL + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + TOKEN
                },
                body: JSON.stringify(product)
            });
        } else {
            // Nuovo prodotto
            await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + TOKEN
                },
                body: JSON.stringify(product)
            });
        }
        form.reset();
        idInput.value = "";
        loadProducts();
    } catch (err) {
        alert("Errore nel salvataggio del prodotto.");
    }
};

// Reset
resetBtn.onclick = () => {
    form.reset();
    idInput.value = "";
};

loadProducts();

fetch('https://striveschool-api.herokuapp.com/api/product/', {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODVlZjIzNzIzZGQwMjAwMTUxZGM0ZWEiLCJpYXQiOjE3NTEwNTI4NTUsImV4cCI6MTc1MjI2MjQ1NX0.tOWS3X5gYLPewGgRPna-i2jQoRFOKAZO2G_JPDRl-NI'
  }
})
.then(res => res.json())
.then(data => console.log(data));

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("form.mb-4");
    const productSection = document.querySelector('section:nth-of-type(2)');
    const productsListSection = document.querySelector('section:nth-of-type(3)');
    const loginTitle = document.querySelector('section > h2');

    let isAuth = false;

    function showProductSections(show) {
        productSection.style.display = show ? "block" : "none";
        productsListSection.style.display = show ? "block" : "none";
    }

    showProductSections(false);
    loginForm.style.display = "block";
    loginTitle.textContent = "Login";

    // Login form
    loginForm.onsubmit = function(e) {
        e.preventDefault();
        const email = document.getElementById("exampleInputEmail1").value.trim();
        const password = document.getElementById("exampleInputPassword1").value.trim();
        if (!email || !password) {
            alert("Inserisci email e password.");
            return;
        }
        isAuth = true;
        showProductSections(true);
        loginForm.style.display = "none";
        loginTitle.textContent = "Accesso effettuato";
    };
});