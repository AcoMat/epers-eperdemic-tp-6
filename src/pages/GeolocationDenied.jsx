import React from 'react';
import locationMarker from '../assets/LocationMarker.svg';
import { Background } from '../components/Background/Background';
import { Button } from '@mui/material';
import { useTheme } from '@emotion/react'


const GeolocationDenied = () => {
    const theme = useTheme()

    const showPosition = (position) => {
        console.log(position);
        // Reload the window to fetch updated location
        window.location.reload();
    };

    const requestLoc = () => {
        navigator.geolocation.getCurrentPosition(showPosition, (error) => {
            console.error(error);
            //
        });
    };

    const themeColor = {
        color: theme.palette.mode === 'dark' ? '#f5f3e6' : '#a15097',
    };

    return (
        <Background style={backgroundStyle}>
            <div style={ubi}>
                <img src={locationMarker} alt="Location Marker" />
                <h1 style={themeColor}>Por favor habilite la ubicacion en tiempo real para utilizar la pagina</h1>
                <Button variant="outlined" onClick={requestLoc}>Activar ubicacion</Button>
            </div>

        </Background>
    );
};

const backgroundStyle = {
    boxSizing: "border-box",
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    overflowY: "hidden",
    padding: 16,
    gap: 16,
    justifyContent: "center",
    alignItems: "center",
};

const ubi = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
};


export default GeolocationDenied;