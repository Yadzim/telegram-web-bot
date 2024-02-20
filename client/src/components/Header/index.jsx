import React, { useContext } from "react";
import useTelegram from "../../hooks/useTelegram";
import { Badge, Box, Button, Typography } from "@mui/material";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../store/orderContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, onClose } = useTelegram();
  const store = useContext(CartContext);
  const navigate = useNavigate();
  const { tg } = useTelegram();

  const onClick = () => {
    navigate("/order/list");
    // tg.MainButton.show();
    // tg.MainButton.setParams({
    //   text: "Savatga o'tish",
    //   color: "#fbbf24",
    // });
    // tg.BackButton.isVisible = true;
    // tg.SettingsButton.isVisible = true;
    // tg.SettingsButton.show();
    // tg.BackButton.show();
    // tg.PopupButton.text("sdfdsf sdfsdf");
  };

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
        className='text-yellow-500 m-0'
        onClick={() => {
          navigate("/");
        }}>
        {user?.username ?? "User"}
      </Typography>
      <Button color='simple' onClick={onClick}>
        <Badge badgeContent={store.items?.length} color='primary'>
          <FaShoppingCart fontSize={24} />
        </Badge>
      </Button>
    </Box>
  );
};

export default Header;
