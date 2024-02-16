import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CartContext } from "../../../store/orderContext";

const OrderItem = ({ order }) => {
  const store = React.useContext(CartContext);
  const productQuantity = store?.getProductQuantity();

  return (
    <>
      <ListItem alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
        </ListItemAvatar>
        <ListItemText
          primary={order?.name}
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component='span'
                variant='body2'
                color='text.primary'>
                {order?.price}
              </Typography>
              {" — "}  { } ta
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </>
  );
}

export default OrderItem;