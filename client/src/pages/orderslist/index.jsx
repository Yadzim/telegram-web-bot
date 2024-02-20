import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CartContext } from "../../store/orderContext";
import { Box, Button, ListItemButton, TextField } from "@mui/material";
import OrderItem from "./components/OrderItem.tsx";
import { useNavigate } from "react-router-dom";
import useTelegram from "../../hooks/useTelegram.js";

export default function OrderList() {
  const store = React.useContext(CartContext);
  const { tg, queryId, onToggleMainButton, onToggleBackButton } = useTelegram();
  const navigate = useNavigate()

  React.useEffect(() => {
    tg.BackButton.isVisible = true;
    onToggleBackButton(true, () => {
      navigate("/")
    });

    if(store.items.length)
      onToggleMainButton(true, "To'lovga o'tish", () => {
        navigate("/form")
      })
  }, [])

  return (
    <div className="">
      <div className="flex items-center justify-between p-2">
        <Typography variant='h5' component='div'>
          Buyurtmalaringiz
        </Typography>
        <Button onClick={() => { navigate("/") }} >Edit</Button>
      </div>
      <List
        dense
        disablePadding
        sx={{ width: "100%", bgcolor: "background.paper", borderRadius: ".5rem" }}>
        {store.items?.map((e) => (
          <OrderItem order={e} />
        ))}
      </List>
      {!store.items?.length ? <Typography variant='span' component='div' textAlign={"center"} margin={".5rem 0"} className="text-red-500" >
        Savat bo'sh
      </Typography>
        : <div className="bg-white mt-4 rounded-lg">
          <TextField
            id="standard-multiline-flexible"
            label="Comment"
            multiline
            maxRows={4}
            // variant="filled"
            onChange={(e) => { store.setComment(e?.target?.value) }}
            className="w-full"
          />
        </div>
      }
      <Button onClick={() => {navigate("/form")}} >Form</Button>
    </div>
  );
}
