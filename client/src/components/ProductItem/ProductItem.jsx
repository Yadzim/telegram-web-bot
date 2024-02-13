import React, { useContext } from "react";
import "./ProductItem.css";
// import Button from "../Buttons/Button";
import {
  Badge,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import image from "../../assets/images/product_2.jpg";
import { FaMinus, FaPlus } from "react-icons/fa";
import { CartContext } from "../../store/orderContext";

const ProductItem = ({ product, className, onAdd }) => {
  const onAddHandler = () => {
    onAdd(product);
  };

  const store = useContext(CartContext);
  const productQuantity = store?.getProductQuantity(product?._id);

  console.log(productQuantity);

  return (
    <>
      <Card className='product- rounded-2xl'>
        <CardActionArea>
          <CardMedia
            component='img'
            height='140'
            image={"https://quronhusnixati.uz/static/" + product?.image}
            alt='green iguana'
            title=''
          />
          <CardContent>
            {/* <Badge badgeContent={productQuantity} color='primary'></Badge> */}
            <Typography variant='h5' component='div'>
              {product?.name}
            </Typography>
            <Typography variant='span' component='div'>
              {product?.price}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {productQuantity > 0 ? (
            <>
              <Button
                variant='contained'
                color='error'
                onClick={() => {
                  store?.removeOneFromCart(product?._id);
                }}>
                <FaMinus />
              </Button>
              <Typography variant='span'>{productQuantity}</Typography>
              <Button
                variant='contained'
                onClick={() => {
                  store?.addOneToCart(product?._id);
                }}>
                <FaPlus />
              </Button>
            </>
          ) : (
            <Button
              size='small'
              variant='contained'
              className='bg-yellow-500 w-full'
              onClick={() => {
                store?.addOneToCart(product?._id);
              }}>
              Savatga qo'shish
            </Button>
          )}
        </CardActions>
        {/* <CardActions>
          <Button variant='contained' className='bg-yellow-500'>
            <FaMinus />
          </Button>
          <Typography variant='span'>50</Typography>
          <Button variant='contained' className='bg-yellow-500'>
            <FaPlus />
          </Button>
        </CardActions> */}
      </Card>
      {/* <div className={'product' + className}>
                <div className={'img h-full w-full object-cover object-center group-hover:opacity-75'} />
                <div className={'title'}>{product.title}</div>
                <div className={'description'}>{product.description}</div>
                <div className={'price-'}>Price: <b className='price' >{product.price}</b></div>
                <Button className={'add-btn'} onClick={onAddHandler}>
                    Add to basket
                </Button>
            </div> */}
    </>
  );
};

export default ProductItem;
