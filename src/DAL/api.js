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
