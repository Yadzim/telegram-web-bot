import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CartContext } from "../../../store/orderContext";
import { ListItemButton } from "@mui/material";

const OrderItem = ({ order }) => {
  const store = React.useContext(CartContext);
  const productQuantity = store?.getProductQuantity();

  React.useEffect(() => {

  }, [])

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        // ...(notification.isUnRead && {
        //   bgcolor: 'action.selected',
        // }),
      }}

    >
      {/* <ListItem alignItems='flex-start'> */}
      <ListItemAvatar>
        <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
      </ListItemAvatar>
      <ListItemText
        primary={<b>{order?.name}</b>}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component='span'
              variant='body2'
              color='text.primary'>
              {order?.price} so'm
            </Typography>
          </React.Fragment>
        }
      />

      {/* </ListItem> */}
      {/* <Divider variant='inset' component='li' /> */}

    </ListItemButton>
  );
}

export default OrderItem;