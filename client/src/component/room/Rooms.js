import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Chat from "../chat/chat";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const theme = createTheme();

export default function Rooms() {
    const user = useSelector((state) => state.user.user)
    let navigate = useNavigate()

    useEffect(() => {
        if (!user._id) {
            navigate('/')
        }
    }, [])

    return (
        <ThemeProvider theme={theme} style={{height:"100vh"}}>
               <Chat />
        </ThemeProvider>
    );
}
