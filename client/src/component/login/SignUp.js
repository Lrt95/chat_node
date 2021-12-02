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

const theme = createTheme();

export default function SignUp() {
    let navigate = useNavigate();
    const dispatch = useDispatch()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            mail: data.get('mail'),
            pseudo: data.get('pseudo'),
            password: data.get('password'),
            type: 'USER'
        }
        setSignUp(user).then((response) => {
            new Cookies().set('token-user', response.token)
            dispatch(setUser(response.success))
            navigate("/room")
        }).catch(err => {
            console.log(err)
            }
        )
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
                            margin="normal"
                            required
                            fullWidth
                            id="mail"
                            label="Email Address"
                            name="mail"
                            autoComplete="mail"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="pseudo"
                            label="User Name"
                            name="pseudo"
                            autoComplete="pseudo"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
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
