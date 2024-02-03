import React, { useCallback, useEffect, useState } from "react";
import "./Form.css";
import useTelegram from "../../hooks/useTelegram";

const Form = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [subject, setSubject] = useState("physical");

  const { tg } = useTelegram();

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
    <div className={"form"}>
      <h3>Your info:</h3>
      <input
        type={"text"}
        placeholder={"Your full name"}
        className={"input"}
        value={name}
        onChange={onChangeName}
      />
      <input
        type={"text"}
        placeholder={"Your telephon number"}
        className={"input"}
        value={name}
        onChange={onChangePhone}
      />
      <input
        type={"text"}
        placeholder={"Your address"}
        className={"input"}
        value={address}
        onChange={onChangeAddress}
      />
      <select className={"select"} value={subject} onChange={onChangeSubject}>
        <option value={"physical"}>Physical person</option>
        <option value={"legal"}>Entity</option>
      </select>
    </div>
  );
};

export default Form;
