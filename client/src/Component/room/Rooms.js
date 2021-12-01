import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import {setSignIn} from "../../request/userRequest";
import jsCookie from "js-cookie"
import Chat from "../chat/chat";

const theme = createTheme();

export default function Rooms() {

    return (
        <ThemeProvider theme={theme}>
               <Chat />
        </ThemeProvider>
    );
}
