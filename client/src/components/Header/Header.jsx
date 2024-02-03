import React from 'react';
import Button from "../Buttons/Button";
import './Header.css'
import useTelegram from "../../hooks/useTelegram";

const Header = () => {
    const {user, onClose} = useTelegram()

    return (
        <div className={'header'}>
            <b className={'username'}>
                {user?.username}
            </b>
            <Button onClick={onClose}>Close App</Button>
        </div>
    );
};

export default Header;