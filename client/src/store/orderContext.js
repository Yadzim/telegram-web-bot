import { createContext, useState } from "react";
// import { productsArray, getProductData } from "./ProductsStore";

export const getAllProduct = async () => {
  let data = [];
  try {
    const res = await fetch("https://quronhusnixati.uz/product/all");
    const data = await res.json();
    data = data?.products;
  } catch (error) {
    console.log(error);
  }
  return data;
};

export const CartContext = createContext({
  products: [],
  items: [],
  data: {
    order: {
      products: [],
      comment: undefined,
      totalPrice: 0,
    },
    shippingInfo: {
      fullName: undefined,
      phoneNumber: undefined,
      region: undefined,
      district: undefined,
      address: undefined,
    },
  },
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
  getorderProduct: () => {},
  setComment: () => {},
  setShippingInfo: () => {},
  setProducts: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [comment, set_Comment] = useState("");
  const [shipping, setShipping] = useState({});
  const [products, setProductes] = useState({});

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
    cartProducts?.forEach((e) => {
      data.push({
        product: e?._id,
        quantity: e?.quantity,
      });
    });
    return data;
  }

  function setComment(e) {
    set_Comment(e);
  }

  function setShippingInfo(e) {
    setShipping((p) => ({
      ...(p ?? {}),
      ...(e ?? {}),
    }));
  }

  function setProducts(data) {
    setProductes(data);
  }

  const contextValue = {
    products,
    items: cartProducts,
    data: {
      order: {
        products: getOrderProduct(),
        comment,
        totalPrice: getTotalCost(),
      },
      shippingInfo: shipping,
    },
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
    setComment,
    setShippingInfo,
    setProducts,
  };
  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
