import * as React from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Chat from "../chat/chat";

const theme = createTheme();

export default function Rooms() {

    return (
        <ThemeProvider theme={theme} style={{height:"100vh"}}>
               <Chat />
        </ThemeProvider>
    );
}
