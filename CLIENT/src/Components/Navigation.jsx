import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';


function Navigation() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <BakeryDiningIcon sx={{fontSize:'40px', marginRight:'10px'}} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                        Pastry Grenoble
                    </Typography>

                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navigation