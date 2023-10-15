import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack } from '@mui/material';
import Drawer from '@mui/material/Drawer';

import { images } from '../../assets/genres/images'
import { categories } from './categories';
import { genres } from './genres';

import logo from '../../assets/myflix-logo.png'

import useMediaQuery from '@mui/material/useMediaQuery';
import { useContext } from 'react';

import { DrawerContext } from '../../context/DrawerContext';

const Sidebar = () => {

    const matches = useMediaQuery('(min-width:600px)');

    const {openDrawer, setOpenDrawer, setCategory, category} = useContext(DrawerContext)
    
    const handleOpenDrawer = () => {
        openDrawer === false ? setOpenDrawer(true) : setOpenDrawer(false)
    }

    return (
        <> 
        {console.log(category)}
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
                                    <ListItem onClick={() => setCategory(value)} key={value} id='list-item-categories' disablePadding>
                                        <ListItemButton >
                                            <ListItemIcon>
                                                <img className='invert' width={30} height={30} src={images[label]}/>
                                            </ListItemIcon>
                                            <ListItemText primary={label} id='list-item-text'>
                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </Stack>
                    </List>
                    <Divider sx={{borderColor: '#564d4d'}}/>
                    <List sx={{height: '100%'}} subheader={<ListSubheader sx={{backgroundColor: 'rgb(18, 18, 18)'}} component="div" id="nested-list-subheader">Genres</ListSubheader>}>
                        <Stack sx={{height: '100%'}} justifyContent={'space-between'} direction={'column'}>
                            {genres.map(({value, label}) => {
                                return (
                                    <ListItem key={value} id='list-item-categories' disablePadding>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <img className='invert' width={30} height={30} src={images[label]}/>
                                            </ListItemIcon>
                                            <ListItemText primary={label} id='list-item-text'>

                                            </ListItemText>
                                        </ListItemButton>
                                    </ListItem>
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