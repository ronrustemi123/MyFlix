import { Stack, Box, InputAdornment, Input, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect, useContext } from "react";

import { DrawerContext } from "../../context/DrawerContext";

const Navbar = ({show}) => {

    const [burger, setBurger] = useState('none')
    
    const [isSubmited, setIsSubmited] = useState(false)

    const matches = useMediaQuery('(min-width:600px)');

    const {search, setSearch, openDrawer, setOpenDrawer, setSearchMovie, options, setCatLoading, setChangeMovies, page} = useContext(DrawerContext)

    useEffect(() => {
        matches ? setBurger('none') : setBurger('block')
    }, [window.innerWidth]);

    const handleOpenDrawer = () => {
        openDrawer === false ? setOpenDrawer(true) : setOpenDrawer(false)
    }
  
    const getSearchData = async () => {
        setCatLoading(true)
        try {
          const resp = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`, options)
          const data = await resp.json()
          setSearchMovie(data.results)
          setCatLoading(false)
        } catch (error) {
          console.error(error)
        }
    }

    const handleSubmit = e => e.preventDefault()
    const changeSubmitState = () => isSubmited === false ? setIsSubmited(true) : setIsSubmited(false)

    useEffect(() => {
        getSearchData()
    }, [isSubmited, page])

    return (
        <>
            <Box ml={{sm: '240px'}} height={'80px'} sx={{backgroundColor: '#272727', color: 'white', boxShadow: '0 3px 6px #00000029', position: 'sticky', top: {sm: '0', xs: '-1px'}, zIndex: '9999'}}>
                <Stack alignItems={"center"} height={1} px={{sm: 4.5, xs: 2}} direction={'row'} justifyContent={'space-between'}>
                    <Box sx={{display: burger}} onClick={handleOpenDrawer}>
                        <MenuIcon />
                    </Box>
                    <form style={{display: show, textAlign: 'center'}} onSubmit={e => {handleSubmit(e), setChangeMovies(2), changeSubmitState()}} action="">
                        <Input
                            id="outlined-adornment-weight"
                            startAdornment={<InputAdornment position="start"><SearchIcon sx={{color: 'white !important'}}/></InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                            'aria-label': 'search',
                            }}
                            color="error"
                            placeholder="Search Movie"
                            sx={{borderColor: 'white', width: {xs: '150px', sm: 'auto'}}}
                            
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </form>
                    <Button size={'medium'} startIcon={<AccountCircleIcon/>} sx={show === 'none' ? {marginLeft: 'auto'} : {marginLeft: '0'}} color="inherit" variant="text">Log In</Button>
                </Stack>
            </Box>
        </>
    );
}
 
export default Navbar;