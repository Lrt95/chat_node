import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@material-ui/core/styles';
import {setSignUp} from "../../request/userRequest";
import Cookies from "universal-cookie";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/reducer/user-reducer";
import validator from 'validator'

const theme = createTheme();

export default function SignUp() {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const [error, setError] = React.useState({});

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {type: 'USER'}
        const data = new FormData(event.currentTarget);

        if (data.get('mail') === '') {
            setError({mail : 'Ne peut pas être vide'})
        } else if (validator.isEmail(data.get('mail'))) {
            user['mail'] = data.get('mail');
        } else {
            setError({mail : 'Doit être un Email'})
        }

        if (data.get('pseudo') === '') {
            setError({pseudo: 'Ne peut pas être vide'})
        } else {
            user['pseudo'] = data.get('pseudo')
        }

        if (data.get('password') === '') {
            setError({password: 'Ne peut pas être vide'})
        } else {
            user['password'] = data.get('password')
        }

        if (Object.keys(user).length === 4) {
            setSignUp(user).then((response) => {
                new Cookies().set('token-user', response.token)
                dispatch(setUser(response.success))
                navigate("/room")
            }).catch(err => {
                    console.log(err)
                }
            )
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
                        Sign up
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            error={!!error.mail}
                            margin="normal"
                            required
                            fullWidth
                            id="mail"
                            label="Email Address"
                            name="mail"
                            autoComplete="mail"
                            autoFocus
                            helperText={error.mail}
                        />
                        <TextField
                            error={!!error.pseudo}
                            margin="normal"
                            required
                            fullWidth
                            id="pseudo"
                            label="User Name"
                            name="pseudo"
                            autoComplete="pseudo"
                            autoFocus
                            helperText={error.pseudo}
                        />
                        <TextField
                            error={!!error.password}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            helperText={error.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
