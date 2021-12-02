import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {setSignIn} from "../../request/userRequest";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/reducer/user-reducer";
import {io} from "socket.io-client"
const socket = io('http://localhost:3050')


export default function SignIn() {
    const dispatch = useDispatch()
    let navigate = useNavigate();
    const handleSubmit = async (event) => {
        socket.on('connect', () => {
            console.log(socket.id)
        })
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            login: data.get('login'),
            password: data.get('password'),
        }
        setSignIn(user).then(response => {
            if (response.success) {
                new Cookies().set('token-user', response.token)
                dispatch(setUser(response.success))
                navigate("/room")
            } else {
                console.log(JSON.stringify(response.error) || JSON.stringify(response.errors))
            }
        })
    };

    return (
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="login"
                        label="Email Address or User Name"
                        name="login"
                        autoComplete="login"
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
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
