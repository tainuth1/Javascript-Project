import products from "./products.js";

const productData = products;
let carts = JSON.parse(localStorage.getItem("carts")) || [];

const urlParam = new URLSearchParams(window.location.search);
const productId = urlParam.get("id");

const product = productData.find((pro) => pro.id == productId);

document.getElementById("thumbnail").src = product.image;

const detailContainer = document.getElementById("detail-container");

detailContainer.innerHTML = `
    <h1 class="text-4xl font-bold">${product.name}</h1>
    <p class="text-gray-500 text-sm mt-2">Category : ${product.category}</p>
    <p class="text-gray-700 mt-3">${product.description}</p>

    <div class="mt-6 text-lg space-y-2" id="detail-list">
        
    </div>

    <div class="mt-6 text-3xl font-bold">$${product.price}</div>

    <button
        onclick="addToCart(${product.id})"
        class="mt-6 bg-black text-white px-6 py-3 rounded-lg w-full hover:bg-gray-900"
    >
        Add to Cart
    </button>
`;
const detailList = document.getElementById("detail-list");

for (let key in product.details) {
  detailList.innerHTML += `
        <p><strong>${key}:</strong> ${product.details[key]}</p>
    `;
}

const addToCart = (id) => {
  const product = productData.find((item) => item.id == id);

  const chekcIfExist = carts.find((item) => item.id == product.id);

  if (chekcIfExist) {
    const cartAfterUpdateQty = carts.map((item) =>
      item.id == id ? { ...item, quantity: item.quantity + 1 } : item
    );
    carts = cartAfterUpdateQty;
    localStorage.setItem("carts", JSON.stringify(carts));
  } else {
    const newCartArray = [...carts, { ...product, quantity: 1 }];
    carts = newCartArray;
    localStorage.setItem("carts", JSON.stringify(carts));
  }
};
window.addToCart = addToCart;
