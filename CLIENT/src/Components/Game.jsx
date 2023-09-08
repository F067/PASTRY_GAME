import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Rules from '../Components/Rules';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import Stack from '@mui/material/Stack';
import AlertTitle from '@mui/material/AlertTitle';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../Store/User/Slice';
import { callPost } from '../Utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

function Game(props) {
    const { pastryData } = props
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    console.log(user)

    const [open, setOpen] = useState(false);
    const [dice, setDice] = useState([1, 2, 3, 4, 5]); // Initial state with 5 dice
    const [rolling, setRolling] = useState(false);
    const [played, setPlayed] = useState(false);

    const [yamsResult, setYamsResult] = useState(null);
    const [carreResult, setCarreResult] = useState(null);
    const [doubleResult, setDoubleResult] = useState(null);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const addPastry = async () => {

        let pastryToAdd = null;

        if (user.newCarreResult !== null) {
            pastryToAdd = user.newCarreResult;
        } else if (user.newDoubleResult !== null) {
            pastryToAdd = user.newDoubleResult;
        } else if (user.newYamsResult !== null) {
            pastryToAdd = user.newYamsResult;
        }
        if (pastryToAdd !== null) {
            const resApi = await callPost("/users/savePastryToUser", {
                userId: user._id,
                pastry: pastryToAdd
            });

            if (resApi) {
                // localStorage.clear();
                // dispatch(setUser())
                // dispatch(setPastry())
            }
        } else {
            console.log("Aucune pâtisserie à ajouter.");
        }
    };

    const rollDice = async () => {
        if (!rolling) {
            setRolling(true);
            setTimeout(() => {
                const newDice = dice.map(() => Math.floor(Math.random() * 6) + 1);
                setDice(newDice);
                setRolling(false);
                const newYamsResult = checkYams(newDice, pastryData);
                const newCarreResult = checkCarre(newDice, pastryData);
                const newDoubleResult = checkDouble(newDice, pastryData);

                const userWithResults = {
                    ...user,
                    newYamsResult,
                    newCarreResult,
                    newDoubleResult,
                };

                if (newYamsResult) {
                    setYamsResult(newYamsResult);
                    if (newYamsResult != null) {
                        dispatch(setUser(userWithResults))
                    }
                } else if (newCarreResult) {
                    setCarreResult(newCarreResult);
                    if (newCarreResult != null) {
                        dispatch(setUser(userWithResults))
                    }
                } else if (newDoubleResult) {
                    setDoubleResult(newDoubleResult);
                    if (newDoubleResult != null) {
                        dispatch(setUser(userWithResults))
                    }
                }


            }, 500);

            setTimeout(() => {
                setPlayed(true)
                addPastry()
            }, 2500);
        }
    };

    // Fonction pour vérifier Yams
    function checkYams(dice, pastryData) {
        // Vérifiez si tous les dés sont identiques (Yams)
        const isYams = dice.every((value, index, arr) => value === arr[0]);

        if (isYams) {
            // Si c'est Yams, choisir 3 pâtisseries au hasard
            const selectedPastries = [];
            while (selectedPastries.length < 3) {
                const randomIndex = Math.floor(Math.random() * pastryData.length);
                const pastry = pastryData[randomIndex];
                if (!selectedPastries.includes(pastry)) {
                    selectedPastries.push(pastry);
                }
            }
            return selectedPastries;
        }

        return null;
    }


    // Fonction pour vérifier Carré
    function checkCarre(dice, pastryData) {

        dice.sort();

        // Vérifiez si les 4 premiers dés sont identiques (Carré)
        if (dice[0] === dice[3]) {
            // Si c'est un Carré, choisir 2 pâtisseries au hasard
            const selectedPastries = [];
            while (selectedPastries.length < 2) {
                const randomIndex = Math.floor(Math.random() * pastryData.length);
                const pastry = pastryData[randomIndex];
                if (!selectedPastries.includes(pastry)) {
                    selectedPastries.push(pastry);
                }
            }
            return selectedPastries;
        }

        return null;
    }


    // Fonction pour vérifier (double paire)

    function checkDouble(dice, pastryData) {
        dice.sort();

        // Vérifiez s'il y a deux paires
        if (
            (dice[0] === dice[1] && dice[2] === dice[3]) ||
            (dice[0] === dice[1] && dice[3] === dice[4]) ||
            (dice[1] === dice[2] && dice[3] === dice[4])
        ) {
            // Choisir 1 pâtisserie au hasard
            const randomIndex = Math.floor(Math.random() * pastryData.length);
            const selectedPastry = pastryData[randomIndex];
            return [selectedPastry];
        }
        return null;
    }


    return (
        <div>


            {
                !played ?
                    <div>
                        <Button sx={{ fontSize: '25px', fontWeight: 'bold' }} size="large" variant="outlined" onClick={handleClickOpen}>
                            Lancer le jeu
                        </Button>

                        <Dialog
                            maxWidth={'xl'}
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>{"Pastry Yams"}</DialogTitle>

                            <DialogContent sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <div>
                                    <Rules />
                                </div>
                                <div className="dice-container">
                                    {dice.map((d, index) => (
                                        <div key={index} className={`dice ${rolling ? 'rolling' : ''}`}>
                                            {d}
                                        </div>
                                    ))}
                                </div>
                                <Button sx={{ fontSize: '25px', fontWeight: 'bold' }} onClick={rollDice} disabled={rolling}>
                                    Lancer les dés
                                </Button>
                            </DialogContent>
                        </Dialog>

                    </div>
                    :
                    <div>
                        {yamsResult ? (
                            <div>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                                        <h2>Félicitation votre scores : Yams !</h2>
                                        <p>Pâtisseries gagnées :</p>
                                        <ul>
                                            {yamsResult.map((pastry, index) => (
                                                <li key={index}>{pastry.name}</li>
                                            ))}
                                        </ul>
                                    </Alert>
                                </Stack>
                            </div>
                        ) : null}
                        {carreResult ? (
                            <div>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert icon={<CelebrationIcon fontSize="inherit" />} severity="success">
                                        <h2>Félicitation votre scores : Carré !</h2>
                                        <p>Pâtisseries gagnées :</p>
                                        <ul>
                                            {carreResult.map((pastry, index) => (
                                                <li key={index}>{pastry.name}</li>
                                            ))}
                                        </ul>
                                    </Alert>
                                </Stack>

                            </div>
                        ) : null}
                        {doubleResult ? (
                            <div>
                                <Stack sx={{ width: '100%' }} spacing={2}>
                                    <Alert icon={<CelebrationIcon fontSize="inherit" />} severity="success">
                                        <h2>Félicitation votre scores : Double paire !</h2>
                                        <p>Pâtisseries gagnées :</p>
                                        <ul>
                                            {doubleResult.map((pastry, index) => (
                                                <li key={index}>{pastry.name}</li>
                                            ))}
                                        </ul>
                                    </Alert>
                                </Stack>

                            </div>
                        ) : null}
                        {!yamsResult && !carreResult && !doubleResult ? (

                            <Alert severity="error">
                                <AlertTitle>Dommage</AlertTitle>
                                <h2>Vous avez perdu, retentez votre chance en creant un autre compte </h2>
                            </Alert>
                        ) : null}

                    </div>

            }
        </div>
    );
}

export default Game;
