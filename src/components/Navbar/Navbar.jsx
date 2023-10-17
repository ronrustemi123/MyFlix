import { Stack, Box, InputAdornment, Input, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect, useContext } from "react";

import { DrawerContext } from "../../context/DrawerContext";

const Navbar = () => {

    const [burger, setBurger] = useState('none')

    const matches = useMediaQuery('(min-width:600px)');

    const {openDrawer, setOpenDrawer} = useContext(DrawerContext)

    useEffect(() => {
        matches ? setBurger('none') : setBurger('block')
    }, [window.innerWidth]);

    const handleOpenDrawer = () => {
        openDrawer === false ? setOpenDrawer(true) : setOpenDrawer(false)
    }

    return (
        <>
            <Box  ml={{sm: '240px'}} height={'80px'} sx={{backgroundColor: '#272727', color: 'white'}}>
                <Stack alignItems={"center"} height={1} px={{sm: 4.5, xs: 1.5}} direction={'row'} justifyContent={'space-between'}>
                    <Box sx={{display: burger}} onClick={handleOpenDrawer}>
                        <MenuIcon />
                    </Box>
                    <Input
                        id="outlined-adornment-weight"
                        startAdornment={<InputAdornment position="start"><SearchIcon sx={{color: 'white !important'}}/></InputAdornment>}
                        aria-describedby="outlined-weight-helper-text"
                        inputProps={{
                        'aria-label': 'search',
                        }}
                        color="error"
                        placeholder="Search Movie"
                        sx={{borderColor: 'white'}}
                    />
                    <Button size={'medium'} startIcon={<AccountCircleIcon/>} color="inherit" variant="text">Log In</Button>
                </Stack>
            </Box>
        </>
    );
}
 
export default Navbar;