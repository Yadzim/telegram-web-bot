import React, { useCallback, useContext, useEffect, useState } from "react";
import "./ProductList.css";
import ProductItem from "../../components/ProductItem";
import useTelegram from "../../hooks/useTelegram";
import { Box, Button, Skeleton, Typography } from "@mui/material";
import { CartContext } from "../../store/orderContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";

const products = [
  { id: "1", title: "Car", description: "Red car", price: 1000 },
  { id: "2", title: "Doll", description: "Doll with blue eyes", price: 800 },
  { id: "3", title: "Ball", description: "Soccer ball", price: 125 },
  {
    id: "4",
    title: "Train",
    description: "Train with full railroad",
    price: 5000,
  },
  {
    id: "5",
    title: "Book",
    description: "Book about dragon world hero",
    price: 200,
  },
];

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price);
  }, 0);
};

const ProductList = () => {
  const [data, setData] = useState([]);
  const { tg, queryId } = useTelegram();
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
    (async () => {
      try {
        const res = await fetch("https://quronhusnixati.uz/product/all");
        const data = await res.json();
        console.log(data);
        setData(data?.products);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", () => {
      navigate("/order/list");
    });
    return () => {
      tg.offEvent("mainButtonClicked", () => {
        navigate("/order/list");
      });
    };
  }, []);

  const onAdd = () => {
    if (!store?.items?.length) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: "Savatga o'tish",
        color: "#fbbf24",
        textColor: "#fff",
      });
    }
  };

  return (
    <div className=''>
      <Header />
      <div
        className={`list grid grid-cols-2 gap-4 p-2 py-4 bg-[#F1F1F1] ${
          store.items?.length ? "pb-[60px]" : ""
        }`}>
        {data?.length
          ? data.map((product) => (
              <ProductItem product={product} onAdd={onAdd} className={"item"} />
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
      {store?.items?.length ? (
        <div className='fixed bottom-0 left-1 right-1 py-1-'>
          <Link to={"/order/list"}>
            <Button variant='contained' fullWidth onClick={() => {}}>
              <Typography padding={"4px 0"} variant='h5' component='div'>
                Savatga o'tish
              </Typography>
            </Button>
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default ProductList;
