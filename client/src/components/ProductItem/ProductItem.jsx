import React from 'react';
import './ProductItem.css'
import Button from "../Buttons/Button";
const ProductItem = ({product, className, onAdd}) => {
    const onAddHandler = () => {
        onAdd(product)
    }

    return (
        <div className={'product ' + className}>
            <div className={'img'}/>
            <div className={'title'}>{product.title}</div>
            <div className={'description'}>{product.description}</div>
            <div className={'price-'}>Price: <b className='price' >{product.price}</b></div>
            <Button className={'add-btn'} onClick={onAddHandler}>
                Add to basket
            </Button>
        </div>
    );
};

export default ProductItem;