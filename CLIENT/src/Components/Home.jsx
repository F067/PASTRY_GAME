import React from 'react';
import Formular from './Formular';

function Home() {

    const containerStyle = {
        height: '80vh',
        width: '40vw',
        display: 'flex',
        flexDirection: 'column', // Mettre le contenu en colonne
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '15px',
        padding: '40px', // Ajouter un espacement intérieur
        margin: '40px',
        textAlign: 'center', // Centrer le texte horizontalement
        color: '#1A76D2'
    };

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            <div style={containerStyle}>
                <div>
                    <h1 style={{ marginBottom: "70px" }}>
                        Pastry Grenoble vous fait gagner des pâtisseries. <br /> Pour jouer gratuitement, inscrivez-vous en remplissant le formulaire.
                    </h1>
                </div>
                <Formular />
            </div>
        </div>
    );
}

export default Home;
