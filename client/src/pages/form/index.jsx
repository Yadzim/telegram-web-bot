import React, { useCallback, useEffect, useRef, useState } from "react";
import "./style.css";
import useTelegram from "../../hooks/useTelegram";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CartContext } from "../../store/orderContext";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";

const Form = () => {
  const [regions, setregions] = useState([]);
  const [districts, setdistricts] = useState([]);
  const [regionLoding, setregionLoding] = useState(false);
  const [districtLoading, setdistrictLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const [selectionStart, setSelectionStart] = useState(0);
  const [selectionEnd, setSelectionEnd] = useState(0);
  const inputRef = useRef(null);
  const input2Ref = useRef(null);

  const {
    tg,
    user: tgUser,
    onToggleMainButton,
    onToggleBackButton,
  } = useTelegram();
  const store = React.useContext(CartContext);

  const user = {
    id: tgUser?.id,
    tgFirstName: tgUser?.first_name,
    tgLastName: tgUser?.last_name,
    username: tgUser?.username,
  };
  // const user = {
  //   id: "600722862",
  //   tgFirstName: "Azizxon",
  //   tgLastName: "",
  //   username: "yadzim",
  // };
  // const onSendForm = useCallback(() => {
  //   const data = {
  //     name,
  //     phone,
  //     address,
  //     subject,
  //   };
  //   tg.sendData(JSON.stringify(data));
  // }, [store.data.shippingInfo]);

  // useEffect(() => {
  //   tg.onEvent("mainButtonClicked", sendData);
  //   return () => {
  //     tg.offEvent("mainButtonClicked", sendData);
  //   };
  // }, [sendData]);

  // useEffect(() => {
  //   tg.MainButton.setParams({
  //     text: "Send form",
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!name || !address || !phone) {
  //     tg.MainButton.hide();
  //   } else {
  //     tg.MainButton.show();
  //   }
  // }, [store.data.shippingInfo]);

  useEffect(() => {
    onToggleBackButton(true, () => {
      navigate("/order/list");
    });

    // tg.MainButton.disabled();
    onToggleMainButton(false, "Buyurtma berish", () => {});
  }, []);

  useEffect(() => {
    if (
      store.data.shippingInfo.address &&
      store.data.shippingInfo.district &&
      store.data.shippingInfo.fullName &&
      store.data.shippingInfo.phoneNumber &&
      store.data.shippingInfo.region
    ) {
      // tg.MainButton.enabled();
      onToggleMainButton(true, "Buyurtma berish", () => {
        if (!loading) {
          sendData();
        }
      });
    }
  }, [store.data.shippingInfo]);

  useEffect(() => {
    (async () => {
      try {
        setregionLoding(true);
        const res = await fetch("https://quronhusnixati.uz/address/regions");
        const data = await res.json();
        setregions(data);
        setregionLoding(false);
      } catch (error) {
        setregionLoding(false);
        console.log(error);
      }
    })();
  }, []);

  const getDistrict = async (regionId) => {
    try {
      setdistrictLoading(true);
      const res = await fetch(
        `https://quronhusnixati.uz/address/districts/${regionId}`
      );
      const data = await res.json();
      setdistricts(data);
      setdistrictLoading(false);
    } catch (error) {
      setdistrictLoading(false);
      console.log(error);
    }
  };

  const sendData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://quronhusnixati.uz/order/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({ user, ...store.data }),
      });
      const data = await res.json();
      if (data) {
        navigate("/");
        tg.showAlert(
          "Buyurtma muvaffaqiyatli yuborildi. Iltimos kuting sizga xabar keladi",
          () => {
            tg.close();
          }
        );
      }
      setLoading(false);
    } catch (error) {
      tg.showAlert("Malumot yuborishda xatolik", () => {});
      setLoading(false);
      console.log(error);
    }
  };

  console.log(store.data);

  const PhoneInput = React.forwardRef((props) => {
    return (
      <InputMask
        {...props}
        mask='+\9\98 (99) 999 99 99'
        className='ant-input-'
        placeholder='+998 (90) 999 99 99'
        keepCharPositions
        ref={input2Ref}
        onChange={(e) => {
          store.setShippingInfo({ phoneNumber: e?.target?.value });
          if (inputRef.current) {
            inputRef.current.focus();
          }
          e.target.focus();
          // if (input2Ref.current) {
          //   input2Ref.current?.focus();
          // }
        }}>
        {(inputProps) => (
          <TextField {...inputProps} inputRef={inputRef} className='bg-white' />
        )}
      </InputMask>
    );
  });

  return (
    <div className={"flex flex-col gap-3 py-1 px-2"}>
      <h3>Your info:</h3>
      <div className=''>
        <p>{user.id}</p>
        <p>{user.tgLastName}</p>
        <p>{user.tgFirstName}</p>
        <p>{user.username}</p>
      </div>
      <TextField
        variant='outlined'
        label={"To'liq ism"}
        className={"input bg-white"}
        value={store.data.shippingInfo.fullName}
        onChange={(e) => {
          store.setShippingInfo({ fullName: e?.target?.value });
        }}
        // size='small'
      />
      {/* <TextField
        variant='outlined'
        label={"Telefon raqami"}
        className={"input bg-white"}
        value={store.data.shippingInfo.phoneNumber}
        onChange={(e) => {
          store.setShippingInfo({ phoneNumber: e?.target?.value });
        }}
        // size='small'
      /> */}
      <InputMask
        mask='+\9\98 (99) 999 99 99'
        className='ant-input'
        placeholder='+998 (90) 999 99 99'
      />
      <PhoneInput
        id='phone-number'
        variant='outlined'
        label={"Telefon raqami"}
        className={"input bg-white"}
        value={store.data.shippingInfo.phoneNumber}
      />
      {/* <TextField
        variant='outlined'
        label={"Telefon raqami"}
        className={"input bg-white"}
        value={store.data.shippingInfo.phoneNumber}
        onChange={(e) => {
          store.setShippingInfo({ phoneNumber: e?.target?.value });
        }}
        InputProps={{
          inputComponent: PhoneInput,
        }}
      /> */}
      <FormControl sx={{ backgroundColor: "white" }}>
        <InputLabel id='demo-select-small-label'>Viloyat</InputLabel>
        <Select
          labelId='demo-select-small-label'
          id='demo-select-small'
          value={store.data.shippingInfo.region}
          label='Viloyat'
          onChange={(e) => {
            store.setShippingInfo({
              region: regions?.find((i) => i?.id == e.target.value)?.name_uz,
              district: undefined,
            });
            getDistrict(e.target.value);
          }}>
          <MenuItem value=''>
            <em>none</em>
          </MenuItem>
          {regions?.map((e) => (
            <MenuItem key={e?.id} value={e?.id}>
              {e?.name_uz}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ backgroundColor: "white" }}>
        <InputLabel id='demo-select-small-label'>Tuman</InputLabel>
        <Select
          labelId='demo-select-small-label'
          id='demo-select-small'
          value={store.data.shippingInfo.district}
          label='Tuman'
          onChange={(e) => {
            store.setShippingInfo({ district: e.target.value });
          }}>
          <MenuItem value=''>
            <em>none</em>
          </MenuItem>
          {districts?.map((e) => (
            <MenuItem key={e?.id} value={e?.name_uz}>
              {e?.name_uz}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id='standard-multiline-flexible'
        label='Manzil'
        multiline
        rows={2}
        maxRows={4}
        value={store.data.shippingInfo.address}
        onChange={(e) => {
          store.setShippingInfo({ address: e?.target?.value });
        }}
        className='bg-white'
      />
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            onChange={(e) => {
              setRememberMe(e.target.checked);
            }}
          />
        }
        label='Malumotlarni eslab qolish'
      />
      <div>
        <Button
          onClick={() => {
            tg.showAlert("asdasdsa", () => {});
          }}>
          Alert
        </Button>
        <Button
          onClick={() => {
            tg.showConfirm("asdasdsa", () => {});
          }}>
          Confirm
        </Button>
        <Button
          onClick={() => {
            tg.showPopup();
          }}>
          Popup
        </Button>
        <Button
          onClick={() => {
            tg.showScanQrPopup();
          }}>
          Qr code
        </Button>
        <Button
          onClick={() => {
            sendData();
          }}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Form;
