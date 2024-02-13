import React, { useContext } from "react";
import useTelegram from "../../hooks/useTelegram";
import { Badge, Box, Button, Typography } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../store/orderContext";

const Header = () => {
  const { user, onClose } = useTelegram();
  const store = useContext(CartContext);

  return (
    <Box
      className={
        "header- flex items-center justify-between h-14 bg-white px-4 shadow-md"
      }>
      <Typography
        gutterBottom
        variant='h5'
        margin={0}
        component='div'
        className='text-yellow-500 m-0'>
        Lizard
        {user?.username}
      </Typography>
      <Button>
        <Badge badgeContent={store.items?.length} color='success'>
          <FaShoppingCart fontSize={24} />
        </Badge>
      </Button>
    </Box>
  );
};

export default Header;
