import React, { useCallback, useContext, useEffect, useState } from "react";
import "./style.css";
import ProductItem from "../../components/ProductItem";
import useTelegram from "../../hooks/useTelegram";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { CartContext } from "../../store/orderContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  // const [data, setData] = useState([]);
  const { tg, queryId, onToggleMainButton, onToggleBackButton } = useTelegram();
  const navigate = useNavigate();

  const store = useContext(CartContext);
  // const onSendForm = useCallback(() => {
  //   const data = {
  //     products: addedItems,
  //     totalPrice: getTotalPrice(addedItems),
  //     queryId,
  //   };
  //   fetch("http://localhost:8000", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  // }, []);

  useEffect(() => {
    if (!store.products?.length) {
      (async () => {
        try {
          const res = await fetch("https://quronhusnixati.uz/product/all");
          const data = await res.json();
          console.log(data);
          store.setProducts(data?.products);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  // useEffect(() => {
  //   tg.onEvent("mainButtonClicked", () => {
  //     navigate("/order/list");
  //   });
  //   return () => {
  //     tg.offEvent("mainButtonClicked", () => {
  //       navigate("/order/list");
  //     });
  //   };
  // }, []);

  useEffect(() => {
    onToggleBackButton(false);
    // tg.platform = "Maxsulotlar";
    if (!store?.items?.length) {
      onToggleMainButton(false);
    } else {
      onToggleMainButton(true, "Savatga o'tish", () => {
        navigate("/order/list");
      });
    }
  }, [store.items.length]);

  return (
    <div className=''>
      <Header />
      <div className={`list grid grid-cols-2 gap-4 p-2 py-4 bg-[#F1F1F1]`}>
        {store.products?.length
          ? store.products.map((product) => (
              <ProductItem product={product} className={"item"} />
            ))
          : [...Array(4)]?.map((e, i) => (
              <Box key={i} sx={{ pt: 0.5 }}>
                <Skeleton variant='rounded' width={"100%"} height={118} />
                <br />
                <Skeleton />
                <Skeleton width='60%' />
              </Box>
            ))}
      </div>
    </div>
  );
};

export default ProductList;
