export async function getCategories() {
  let categories = await fetch("http://localhost:3200/api/items/categories");
  categories = await categories.json();
  const newCategories = [];
  for (const category of categories) {
    if (category.childCategories.length !== 0) newCategories.push(category);
  }
  return newCategories;
}

export async function getProducts() {
  let products = await fetch("http://localhost:3200/api/items");
  products = await products.json();
  return products;
}

export async function postLogin(email, password) {
  const data = { email, password };
  const response = await fetch("http://localhost:3200/api/users/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) return true;
  return false;
}

export async function getCart() {
  let cart = await fetch("http://localhost:3200/api/users/cart");
  cart = await cart.json();
  return cart;
}
