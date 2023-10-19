import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import { images } from '../../assets/genres/images'
import { categories } from './categories';
import { genres } from './genres';
import logo from '../../assets/myflix-logo.png'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext } from 'react';
import { DrawerContext } from '../../context/DrawerContext';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const matches = useMediaQuery('(min-width:600px)');

    const {setPage,setSearch, openDrawer, setChangeMovies, setOpenDrawer, setCategory, setGenre} = useContext(DrawerContext)
    
    const handleOpenDrawer = () => openDrawer === false ? setOpenDrawer(true) : setOpenDrawer(false)

    return (
        <>
            <Drawer variant={matches ? 'permanent' : 'temporary'} anchor='left' onClose={handleOpenDrawer} open={openDrawer} >
                <Box overflow={'auto'} sx={{backgroundColor: 'rgb(18, 18, 18)', height: '100vh'}} width={'240px'}>
                    <List>
                        <ListItem sx={{padding: '20px 0'}} alignItems='center'>
                            <img style={{margin: '0 auto'}}  width={150} height={50} src={logo} alt='logo'/>
                        </ListItem>
                    </List>
                    <Divider sx={{borderColor: '#564d4d'}} />
                    <List  sx={{height: '200px'}} subheader={<ListSubheader sx={{backgroundColor: 'rgb(18, 18, 18)'}} component="div" id="nested-list-subheader">Categories</ListSubheader>}>
                        <Stack sx={{height: 'calc(100% - 48px)'}} justifyContent={'space-between'} direction={'column'}>
                            {categories.map(({value, label}) => {
                                return (
                                    <Link key={value}  to={'/'} style={{textDecoration: 'none'}}>
                                        <ListItem onClick={() => {setCategory(value), setChangeMovies(0), window.scrollTo(0, 0), setOpenDrawer(false), setPage(1), setSearch('')}}  id='list-item-categories' disablePadding>
                                            <ListItemButton disableRipple disableTouchRipple>
                                                <ListItemIcon>
                                                    <img className='invert' width={30} height={30} src={images[label]}/>
                                                </ListItemIcon>
                                                <ListItemText primary={label} id='list-item-text'>
                                                </ListItemText>
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                )
                            })}
                        </Stack>
                    </List>
                    <Divider sx={{borderColor: '#564d4d'}}/>
                    <List sx={{height: '100%'}} subheader={<ListSubheader sx={{backgroundColor: 'rgb(18, 18, 18)'}} component="div" id="nested-list-subheader">Genres</ListSubheader>}>
                        <Stack sx={{height: '100%'}} justifyContent={'space-between'} direction={'column'}>
                            {genres.map(({value, label}) => {
                                return (
                                    <Link key={value} to={'/'} style={{textDecoration: 'none'}}>
                                        <ListItem onClick={() => {setGenre(value), setChangeMovies(1), window.scrollTo(0, 0), setOpenDrawer(false), setPage(1), setSearch('')}} id='list-item-categories' disablePadding>
                                            <ListItemButton disableRipple disableTouchRipple>
                                                <ListItemIcon>
                                                    <img className='invert' width={30} height={30} src={images[label.toLowerCase()]}/>
                                                </ListItemIcon>
                                                <ListItemText primary={label} id='list-item-text'>

                                                </ListItemText>
                                            </ListItemButton>
                                        </ListItem>
                                    </Link>
                                )
                            })}
                        </Stack>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
 
export default Sidebar;