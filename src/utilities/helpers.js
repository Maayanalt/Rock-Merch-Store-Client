export function organizeSizes(sizes) {
  const newSizes = [];
  sizes.forEach((size) => {
    let disabled = false;
    let value = size.size;
    if (!size.unitsInStock) disabled = true;
    if (!size.size) value = "one size";
    newSizes.push({ value, disabled });
  });

  return newSizes;
}

export function organizeItemsForOrder(items) {
  const newItems = [];
  items.forEach((item) => {
    let { totalPrice, quantity, size } = item;
    const img = item.item.images[0];
    const name = item.item.name;
    if (!size) size = "one size";
    newItems.push({ name, img, totalPrice, quantity, size });
  });
  return newItems;
}
