import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {useNavigate} from "react-router-dom";
import validator from 'validator'

const theme = createTheme();

export default function ForgetPassword() {
    let navigate = useNavigate();
    const [error, setError] = React.useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        let mail = ''
        const data = new FormData(event.currentTarget);
        if (data.get('mail') === '') {
            setError({mail : 'Ne peut pas être vide'})
        } else if (validator.isEmail(data.get('mail'))) {
            mail = data.get('mail');
        } else {
            setError({mail : 'Doit être un Email'})
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Mot de passe oublié
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            error={false}
                            margin="normal"
                            required
                            fullWidth
                            id="mail"
                            label="Email Address"
                            name="mail"
                            autoComplete="mail"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Send
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
