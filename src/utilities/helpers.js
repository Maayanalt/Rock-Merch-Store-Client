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
