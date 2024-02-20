import { createContext, useState } from "react";
// import { productsArray, getProductData } from "./ProductsStore";

export const CartContext = createContext({
  items: [],
  data: {},
  getProductQuantity: () => { },
  addOneToCart: () => { },
  removeOneFromCart: () => { },
  deleteFromCart: () => { },
  getTotalCost: () => { },
  getorderProduct: () => { },
  setComment: () => { },
  setShipping: () => { },
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [comment, set_Comment] = useState("");
  const [shipping, setShipping] = useState({});

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneToCart(payload) {
    const quantity = getProductQuantity(payload?._id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: payload?._id,
          ...payload,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === payload?._id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }
  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }
  }
  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id !== id;
      })
    );
  }
  function getTotalCost() {
      let totalCost = 0;
      cartProducts.forEach((cartItem) => {
        totalCost += cartItem.price * cartItem.quantity;
      });
      return totalCost;
  }

  function getOrderProduct() {
    let data = [];
    cartProducts?.forEach(e => {
      data.push({
        product: e?._id,
        quantity: e?.quantity
      })
    });
    return data
  }

  function setComment(e) {
    set_Comment(e);
  }

  function setShippingInfo(e) {
    setShipping({
      fullName: e?.fullName,
        phoneNumber: e?.phoneNumber,
        region: e?.region,
        district: e?.district,
        address: e?.address
    })
  }

  const contextValue = {
    items: cartProducts,
    data: {
      order: {
        products: getOrderProduct(),
        comment,
        totalPrice: getTotalCost(),
      },
      shippingInfo: shipping
    },
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    setComment,
    setShippingInfo
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
