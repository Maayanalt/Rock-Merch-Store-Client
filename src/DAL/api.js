import { toast } from "react-toastify";

export async function getCategories() {
  let categories = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/items/categories`
  );
  categories = await categories.json();
  const newCategories = [];
  for (const category of categories) {
    if (category.childCategories.length !== 0) newCategories.push(category);
  }
  return newCategories;
}

export async function getProducts(page, limit = 6) {
  let response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/items?page=${page}&limit=${limit}`
  );
  const [products, total] = await response.json();
  return [products, total];
}

export async function getProductsSorted(page, order, limit = 6) {
  order = order.toUpperCase();
  let response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/items/sorted?page=${page}&limit=${limit}&order=${order}`
  );
  const [products, total] = await response.json();
  return [products, total];
}

export async function getOneProduct(id) {
  let product = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/items/${id}`
  );
  product = await product.json();
  return product;
}

export async function getProductsBySearch(search, page, limit = 8) {
  let response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/items/search?q=${search}&page=${page}&limit=${limit}`
  );
  const [products, total] = await response.json();
  return [products, total];
}

export async function getProductsBySearchSorted(
  search,
  order,
  page,
  limit = 8
) {
  order = order.toUpperCase();
  let response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/items/search/sorted?q=${search}&page=${page}&limit=${limit}&order=${order}`
  );
  const [products, total] = await response.json();
  return [products, total];
}

export async function getProductsByCategory(id, page, limit = 6) {
  let response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/items/category/${id}?page=${page}&limit=${limit}`
  );
  const [products, total] = await response.json();
  return [products, total];
}

export async function getProductsByParentCategory(id, page, limit = 6) {
  let response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/items/category/parent/${id}?page=${page}&limit=${limit}`
  );
  const [products, total] = await response.json();
  return [products, total];
}

export async function getProductsByCategorySorted(id, page, order, limit = 6) {
  order = order.toUpperCase();
  let response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/items/sorted/category/${id}?page=${page}&limit=${limit}&order=${order}`
  );
  const [products, total] = await response.json();
  return [products, total];
}

export async function getProductsByParentCategorySorted(
  id,
  page,
  order,
  limit = 6
) {
  order = order.toUpperCase();
  let response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/items/sorted/category/parent/${id}?page=${page}&limit=${limit}&order=${order}`
  );
  const [products, total] = await response.json();
  return [products, total];
}

export async function postLogin(email, password) {
  const data = { email, password };
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/users/login`,
    {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (response.status === 200) return true;
  return false;
}

export async function postLogout() {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/users/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );
  if (response.status === 200) return true;
  return false;
}

export async function postForgotPass(email) {
  fetch(`${process.env.REACT_APP_API_SERVER}/api/reset-password/email`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

export async function postResetPass(password, token) {
  const data = { token, password };
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/reset-password`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    toast.error(error.message);
    return false;
  } else {
    return true;
  }
}

export async function getUser() {
  const res = await fetch(`${process.env.REACT_APP_API_SERVER}/api/users`, {
    credentials: "include",
  });
  const user = await res.json();
  return user;
}

export async function createUser(firstName, lastName, email, password) {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/users/register`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    }
  );
  if (response.status === 201) {
    toast.success("Created successfully! now login");
    return true;
  } else {
    const error = await response.json();
    toast.error(error.message);
  }
}

export async function updateUserDetails(inputs) {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/users/update`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputs),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    toast.error(error.message);
    return false;
  }
  return true;
}

export async function getCart() {
  const res = await fetch(`${process.env.REACT_APP_API_SERVER}/api/cart`, {
    credentials: "include",
  });
  if (res.status === 403) {
    toast.warn("You must log in first");
  }
  const cart = await res.json();
  return cart;
}

export async function getWishlist() {
  const res = await fetch(`${process.env.REACT_APP_API_SERVER}/api/wishlist`, {
    credentials: "include",
  });
  if (res.status === 403) {
    toast.warn("You must log in first");
  }
  const wishlist = await res.json();
  return wishlist;
}

export async function postToWishlist(id) {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/wishlist`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: id }),
    }
  );
  if (response.status === 201) return true;
  if (response.status === 403) toast.warn("You must log in first");
  return false;
}

export async function deleteFromWishlist(id) {
  fetch(`${process.env.REACT_APP_API_SERVER}/api/wishlist/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function createToCart(id, size) {
  const response = await fetch(`${process.env.REACT_APP_API_SERVER}/api/cart`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemID: id, quantity: 1, size }),
  });
  if (response.status === 201) return true;
  if (response.status === 403) toast.warn("You must log in first");
  return false;
}

export async function updateCart(id, itemID, quantity, size) {
  if (size === "one size") size = null;
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/cart/update`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartDetailID: id, itemID, quantity, size }),
    }
  );
  if (response.status === 201) return true;
  if (response.status === 403) toast.warn("You must log in first");
  return false;
}

export async function updateCartDuplicates(id, itemID, quantity, size) {
  if (size === "one size") size = null;
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/cart/update/duplicates`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartDetailID: id, itemID, quantity, size }),
    }
  );
  if (response.status === 201) return true;
  if (response.status === 403) toast.warn("You must log in first");
  return false;
}

export async function deleteFromCart(id) {
  return fetch(`${process.env.REACT_APP_API_SERVER}/api/cart/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function deleteCart() {
  fetch(`${process.env.REACT_APP_API_SERVER}/api/cart`, {
    method: "DELETE",
    credentials: "include",
  });
}

export async function getOrders() {
  const res = await fetch(`${process.env.REACT_APP_API_SERVER}/api/orders`, {
    credentials: "include",
  });
  if (res.status === 403) {
    toast.warn("You must log in first");
  }
  const orders = await res.json();
  return orders;
}

export async function createOrder(
  { address, city, postalCode, country, phone },
  totalCost
) {
  const response = await fetch(
    `${process.env.REACT_APP_API_SERVER}/api/orders`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        city,
        country,
        postalCode,
        phone,
        totalCost,
      }),
    }
  );
  console.log(response);
  if (response.status === 201) return true;
  if (response.status === 403) toast.warn("You must log in first");
  return false;
}
