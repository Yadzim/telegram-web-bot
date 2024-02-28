import * as React from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CartContext } from "../../../store/orderContext";
import { ListItemButton } from "@mui/material";
import divideLargeNumber from "../../../utils/inex";

const OrderItem = ({ order }) => {
  const store = React.useContext(CartContext);
  const productQuantity = store?.getProductQuantity();

  React.useEffect(() => {}, []);

  return (
    <ListItemButton
      sx={{
        py: 1,
        px: 2,
        mt: "1px",
        // ...(notification.isUnRead && {
        //   bgcolor: 'action.selected',
        // }),
      }}>
      {/* <ListItem alignItems='flex-start'> */}
      <ListItemAvatar>
        <Avatar
          alt='Remy Sharp'
          src={"https://quronhusnixati.uz/static/" + order?.image}
        />
      </ListItemAvatar>
      <div className='w-full flex justify-between items-center'>
        <ListItemText
          primary={<b>{order?.name}</b>}
          className='max-w-[60%]'
          secondary={
            <React.Fragment>
              <Typography
                sx={{ display: "inline" }}
                component='span'
                variant='body2'
                color='text.primary'>
                {order?.quantity} ta
              </Typography>
            </React.Fragment>
          }
        />
        <span>
          <b>{divideLargeNumber(order?.price * order?.quantity)}</b> so'm
        </span>
      </div>

      {/* </ListItem> */}
      {/* <Divider variant='inset' component='li' /> */}
    </ListItemButton>
  );
};

export default OrderItem;
