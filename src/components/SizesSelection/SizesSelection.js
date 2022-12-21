import { useEffect, useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { organizeSizes } from "../../utilities/helpers";

function SizesSelection({ itemSizes, selectedSize, setSelectedSize }) {
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    const sizes = organizeSizes(itemSizes);
    setSizes(sizes);
  }, []);

  return (
    <ToggleButtonGroup type="radio" name="size" required>
      {sizes.map((radio, idx) => (
        <ToggleButton
          key={idx}
          disabled={radio.disabled}
          id={`radio-${idx}`}
          type="radio"
          variant="outline-dark"
          name="size"
          value={radio.value}
          checked={selectedSize === radio.value}
          className="shadow-none me-1"
          onChange={(e) => setSelectedSize(e.currentTarget.value)}
        >
          {radio.value}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export default SizesSelection;
