import React, { useCallback, useEffect, useState } from "react";
import "./style.css";
import useTelegram from "../../hooks/useTelegram";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [subject, setSubject] = useState("physical");

  const { tg, onToggleMainButton, onToggleBackButton } = useTelegram();

  const onSendForm = useCallback(() => {
    const data = {
      name,
      phone,
      address,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, [name, phone, address, subject]);

  useEffect(() => {
    tg.BackButton.isVisible = true;
    onToggleBackButton(true, () => {
      navigate(-1);
    });

    onToggleMainButton(true, "Yuborish", () => {
      // navigate("/form")
    });
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendForm);
    return () => {
      tg.offEvent("mainButtonClicked", onSendForm);
    };
  }, [onSendForm]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send form",
    });
  }, []);

  useEffect(() => {
    if (!name || !address || !phone) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [name, address, phone]);

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className={"form flex flex-col gap-3"}>
      <h3>Your info:</h3>
      {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
      <TextField
        variant='outlined'
        label={"Your full name"}
        className={"input bg-white"}
        value={name}
        onChange={onChangeName}
      />
      <TextField
        variant='outlined'
        label={"Your telephon number"}
        className={"input bg-white"}
        value={phone}
        onChange={onChangePhone}
      />
      <TextField
        variant='outlined'
        label={"Your address"}
        className={"input bg-white"}
        value={address}
        onChange={onChangeAddress}
      />
      <FormControl sx={{ backgroundColor: "white" }}>
        <InputLabel id='demo-select-small-label'>Age</InputLabel>
        <Select
          labelId='demo-select-small-label'
          id='demo-select-small'
          value={subject}
          label='Age'
          onChange={onChangeSubject}>
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      {/* <select className={"select"} value={subject} onChange={onChangeSubject}>
        <option value={"physical"}>Physical person</option>
        <option value={"legal"}>Entity</option>
      </select> */}
    </div>
  );
};

export default Form;
