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
  const res = await fetch("http://localhost:3200/api/users/cart", {
    credentials: "include",
  });
  if (res.status === 403) {
    alert("You must log in first");
  }
  const cart = await res.json();
  return cart;
}

export async function getWishlist() {
  const res = await fetch("http://localhost:3200/api/wishlist", {
    credentials: "include",
  });
  if (res.status === 403) {
    alert("You must log in first");
  }
  const wishlist = await res.json();
  return wishlist;
}

export async function postToWishlist(id) {
  const response = await fetch("http://localhost:3200/api/wishlist", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: id }),
  });
  if (response.status === 201) return true;
  if (response.status === 403) alert("You must log in first");
  return false;
}

export async function deleteFromWishlist(id) {
  fetch(`http://localhost:3200/api/wishlist/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}
