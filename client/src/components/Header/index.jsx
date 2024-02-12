import React from 'react';
import useTelegram from "../../hooks/useTelegram";
import { Box, Button, Typography } from '@mui/material';

const Header = () => {
    const { user, onClose } = useTelegram()

    return (
        <Box className={'header- flex items-center justify-between h-14 bg-white px-4 shadow-md'}>
            <Typography gutterBottom variant="h5" component="div" className='text-yellow-500 m-0' >
                Lizard
                {user?.username}
            </Typography>
            <Button color="error" onClick={onClose}>Close</Button>
        </Box>
    );
};

export default Header;