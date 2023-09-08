import React, { useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';

import { callPost } from '../Utils';
import { useDispatch } from 'react-redux';
import { setUser } from '../Store/User/Slice';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Formular() {

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        mail: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [isEmptyField, setIsEmptyField] = useState([]);

    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const requiredFields = ['mail', 'password'];
            const errors = [];

            requiredFields.forEach(field => {
                if (formData[field] === "") {
                    errors.push(field)
                }
            })
            setIsEmptyField(errors);

            const resApi = await callPost("/users/signUp", {
                mail: formData.mail,
                password: formData.password
            })
            let user = resApi.user;
            if (resApi.JWT) {
                localStorage.setItem('JWT', resApi.JWT)
            }
            dispatch(setUser(user))
            setOpen(false);
        }
        catch (error) {
            setErrorMessage(error.message)
            setOpen(true);
        }
    }

    return (
        <div>
            <Button sx={{ fontSize: '25px', fontWeight: 'bold' }} size="large" variant="outlined" onClick={handleClickOpen}>
                Inscription
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleSubmit}
                aria-describedby="alert-dialog-slide-description"
            >

                <DialogContent>
                    <span style={{ marginBottom: "15px", fontSize: "12px", textAlign: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <DialogTitle sx={{ fontSize: '25px', fontWeight: 'bold', color: '#1A76D2' }}>{"Inscription au jeu"}</DialogTitle>
                        {errorMessage && (
                            <div style={{ maxWidth: "80%", color: "red", marginTop: '20px', fontWeight: 'bold', fontFamily: 'sans-serif' }} className="error-message">{errorMessage}</div>
                        )}
                    </span>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <TextField
                                label="Mail"
                                variant="outlined"
                                name="mail"
                                value={formData.mail}
                                onChange={handleChange}
                                margin="dense"
                                error={isEmptyField.includes("name")}
                                fullWidth
                                sx={{ minWidth: '390px' }}
                            />
                        </div>
                        <div>
                            <TextField
                                label="Mot de passe"
                                variant="outlined"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                margin="dense"
                                type="password"
                                error={isEmptyField.includes("name")}
                                fullWidth
                                sx={{ minWidth: '390px' }}
                            />
                        </div>
                        <div style={{ margin: "20px", display: 'flex', justifyContent: 'center' }}>
                            <Button type="submit">S'inscrire </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Formular