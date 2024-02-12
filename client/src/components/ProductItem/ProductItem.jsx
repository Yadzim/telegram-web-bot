import React from 'react';
import './ProductItem.css'
// import Button from "../Buttons/Button";
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import image from "../../assets/images/product_2.jpg";
import { FaMinus, FaPlus } from 'react-icons/fa';

const ProductItem = ({ product, className, onAdd }) => {
    const onAddHandler = () => {
        onAdd(product)
    }

    return (
        <>
            <Card className='product- rounded-2xl'  >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Lizard
                        </Typography>
                        <Typography gutterBottom variant="span" component="div">
                            $50
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" variant="contained" className="bg-yellow-500 w-full" >
                        Add order
                    </Button>
                </CardActions>
                {/* <CardActions>
                    <Button  variant="contained" className="bg-yellow-500" ><FaMinus/></Button>
                        <Typography variant="span">
                            50
                        </Typography>
                    <Button  variant="contained" className="bg-yellow-500" ><FaPlus/></Button>
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