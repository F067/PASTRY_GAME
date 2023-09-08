import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import CasinoIcon from '@mui/icons-material/Casino';
import CelebrationIcon from '@mui/icons-material/Celebration';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';

export default function InsetDividers() {
    return (
        <List
            sx={{
                width: '100%',
                bgcolor: 'background.paper',
            }}
        >
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <CelebrationIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Si la combinaison est gagnante venez recuperer votre patisserie dans notre boutique" secondary="Avant le 9 octobre 2023" />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <CasinoIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Yams correspond à 3 pâtisseries gagnées au hasard. (Un Yams c'est 5 dés identiques)." />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <CasinoIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Un carré correspond à 2 pâtisseries gagnées au hasard. (Un carré c'est 4 dés identiques parmi les 5)." />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <CasinoIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Un double (double paire) correspond à 1 pâtisserie gagnée au hasard. (Un double c'est deux fois 2 dés identiques parmi les 5)." />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <CasinoIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Un carré correspond à 2 pâtisseries gagnées au hasard. (Un carré c'est 4 dés identiques parmi les 5)." />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ThumbUpAltIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Bonne chance !!" />
            </ListItem>
        </List>
    );
}