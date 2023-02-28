import { createContext, useState } from "react";
import CartModal from "../CartModal/CartModal";

export const CartModalValueContext = createContext(null);
export const CartModalDispatchContext = createContext(null);

export function ModalContextProvider({ children }) {
  const [modalProps, setModalProps] = useState({ show: false });

  return (
    <CartModalDispatchContext.Provider value={setModalProps}>
      {children}
      <CartModalValueContext.Provider value={modalProps}>
        <CartModal></CartModal>
      </CartModalValueContext.Provider>
    </CartModalDispatchContext.Provider>
  );
}

export default ModalContextProvider;
