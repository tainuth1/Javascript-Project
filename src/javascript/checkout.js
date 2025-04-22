let carts = JSON.parse(localStorage.getItem("carts")) || [];

const cartContainer = document.getElementById("cart-item-container");

const renderCartItem = () => {
  let cartLists = "";

  carts.forEach((cart) => {
    cartLists += `
        <div class="grid grid-cols-12 py-4 items-center border-b-2">
            <div class="col-span-5 text-gray-700 flex gap-4">
                <img
                class="w-16 border aspect-square object-cover p-1 rounded-md"
                src="${cart.image}"
                alt="Product Image"
                />
                <div class="">
                <h2 class="w-[220px] truncate font-medium">
                    ${cart.name}
                </h2>
                <span class="font-medium text-gray-800"
                    >Category :
                    <span class="text-gray-600">${cart.category}</span></span
                >
                <p class="font-medium text-gray-800"
                    >Price :
                    <span class="text-gray-600">$${cart.price}</span>
                </p>
                </div>
            </div>
            <div class="col-span-3 text-gray-700">
                <div
                class="inline space-x-2 border border-gray-300 rounded-full px-4 py-1 shadow-sm"
                >
                <button
                    onclick="decrease(${cart.id})"
                    class="text-lg font-medium px-1 text-gray-700 hover:text-red-500"
                >
                    -
                </button>
                <span class="text-lg font-medium">${cart.quantity}</span>
                <button
                    onclick="increase(${cart.id})"
                    class="text-lg font-medium px-1 text-gray-700 hover:text-green-500"
                >
                    +
                </button>
                </div>
            </div>
            <div class="col-span-3 text-gray-700 font-bold">$${(
              cart.price * cart.quantity
            ).toFixed(2)}</div>
            <div class="col-span-1 text-gray-700">
            <button onclick="removeCartItem(${
              cart.id
            })" class="hover:text-red-500">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                    />
                </svg>
                </button>
            </div>
        </div>
    `;
  });
  cartContainer.innerHTML = cartLists;
};
renderCartItem();

const removeCartItem = (id) => {
  carts = carts.filter((pro) => pro.id != id);
  localStorage.setItem("carts", JSON.stringify(carts));
  renderCartItem();
  showSumary();
};

const totalQuantity = document.getElementById("total-quantity");
const totalPrice = document.getElementById("total-price");
const showSumary = () => {
  const quantity = carts.reduce((prev, curr) => {
    return prev + curr.quantity;
  }, 0);
  totalQuantity.innerHTML = `${quantity} Items`;

  const price = carts.reduce((prev, curr) => {
    return prev + curr.price * curr.quantity;
  }, 0);
  totalPrice.innerHTML = `${price.toFixed(2)}$`;
};
showSumary();

const increase = (id) => {
  carts = carts.map((cart) =>
    cart.id === id ? { ...cart, quantity: cart.quantity + 1 } : cart
  );
  localStorage.setItem("carts", JSON.stringify(carts));
  renderCartItem();
  showSumary();
};
const decrease = (id) => {
  const checkQuantity = carts.find((cart) => cart.id == id);

  if (checkQuantity.quantity <= 1) {
    removeCartItem(id);
  } else {
    carts = carts.map((cart) =>
      cart.id === id ? { ...cart, quantity: cart.quantity - 1 } : cart
    );
    localStorage.setItem("carts", JSON.stringify(carts));
  }

  renderCartItem();
  showSumary();
};

const checkout = () => {
  if (carts.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your Carts is Empty",
    });
  } else {
    Swal.fire({
      title: "Checkout Successfuly",
      icon: "success",
      draggable: true,
    });
  }
  carts = [];
  localStorage.setItem("carts", JSON.stringify(carts));
  showSumary();
  renderCartItem();
};

document.getElementById("checkout-btn").addEventListener("click", () => {
  checkout();
});
