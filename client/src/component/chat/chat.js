import * as React from 'react';
import {useEffect, useRef} from "react";
import {getAllRooms, getRoom} from "../../request/roomRequest";
import {
    Button,
    TextField,
    ListItem,
    useTheme,
    Typography,
    CssBaseline,
    Toolbar,
    IconButton,
    Drawer,
    Divider,
    List,
    ListItemIcon,
    ListItemText, styled, Box
} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChatIcon from '@mui/icons-material/Chat';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@material-ui/icons/Send';
import MuiAppBar from '@mui/material/AppBar';
import {sendMessage} from "../../request/mesageRequest";
import Moment from "react-moment";
import {useDispatch, useSelector} from "react-redux";
import io from 'socket.io-client'
import {setUpdateUser} from "../../request/userRequest";
import Cookies from "universal-cookie";
import {setUser} from "../../store/reducer/user-reducer";

const socket = io('http://localhost:3050')

const drawerWidth = 240;

const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function Chat() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [rooms, setRooms] = React.useState([]);
    const [room, setRoom] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [messages, setMessages] = React.useState([]);
    const [message, setMessage] = React.useState("");
    const [text, setText] = React.useState('');
    const [pseudo, setPseudo] = React.useState('');
    const user = useSelector((state) => state.user.user)
    const messageEl = useRef(null);
    const dispatch = useDispatch()


    useEffect(() => {
        if (messageEl) {
            messageEl.current.addEventListener('DOMNodeInserted', event => {
                const {currentTarget: target} = event;
                target.scroll({top: target.scrollHeight, behavior: 'smooth'});
            });
        }
    }, [])

    useEffect(() => {
        async function fetchData() {
            const rooms = await getAllRooms();
            if (rooms.success) {
                setRooms(rooms?.success)
            }
        }

        fetchData()
    }, []);


    useEffect(() => {
        socket.off('message')
        socket.on('message', (arg) => {
            if (room._id === arg.id_room) {
                setMessage(arg)
            }
        })
    }, [room]);

    useEffect(() => {
        setMessages(messages.concat(message))
    }, [message])

    useEffect(() => {
        if (rooms.length > 0) {
            setTitle(rooms[0].name)
            handleRoom(rooms[0]._id)
        }
    }, [rooms]);


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleRoom = (id) => {
        async function fetchData() {
            const room = await getRoom(id);
            if (room.success) {
                setRoom(room.success)
                setTitle(room.success.name)
                setMessages(room.success.messages)
            }
        }

        fetchData();
    }

    const handleSendMessage = async () => {
        await sendMessage({
            "message": text,
            "pseudo": user.pseudo,
            "id_room": room._id
        })
    }

    const handleSendPseudo = () => {
        setUpdateUser({
            "pseudo": pseudo
        }).then(response => {
            if (response.success) {
                new Cookies().set('token-user', response.token)
                dispatch(setUser(response.success))
            }
        })
    }

    const handleChangeText = (event) => {
        setText(event.target.value)
    }

    const handleChangePseudo = (event) => {
        setPseudo(event.target.value)
    }

    const viewMessage = () => {
        return <>
            {messages.map((message, index) => {
                return <div key={'message' + index} style={{display: 'flex', justifyContent: 'left'}}>
                    <Typography style={{marginRight: 5}}><Moment format="YYYY/MM/DD hh:mm">{message.createdAt}</Moment>:</Typography>
                    <Typography style={{marginRight: 5}}>{message.pseudo}</Typography>
                    <Typography>{message.message}</Typography>
                </div>
            })}

        </>
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{mr: 2, ...(open && {display: 'none'})}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader style={{display: "flex", justifyContent: "space-between"}}>
                    <Typography>Server</Typography>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </DrawerHeader>
                <Divider/>
                <List>
                    {rooms.map((room, index) => (
                        <ListItem button key={room.name} onClick={() => {
                            handleRoom(room._id)
                        }}>
                            <ListItemIcon>
                                <ChatIcon/>
                            </ListItemIcon>
                            <ListItemText primary={room.name}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <div
                    style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '95vh'}}>
                    <DrawerHeader/>
                    <div ref={messageEl} style={{height: '100%', marginBottom: 5,overflowY: 'auto'}}>
                        {viewMessage()}
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <TextField
                            id="outlined-multiline-static"
                            label={<Typography style={{
                                fontSize: 16,
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%'
                            }}>{user.pseudo}</Typography>}
                            multiline
                            rows={4}
                            style={{width: '100%', marginRight: 10}}
                            value={text}
                            placeholder='Ecrivez votre message'
                            onChange={handleChangeText}
                            focused
                        />
                        <Button variant="contained" style={{height: 60}} onClick={() => handleSendMessage()}>
                            <SendIcon>
                            </SendIcon>
                        </Button>

                    </div>
                </div>
            </Main>
        </Box>
    );
}
