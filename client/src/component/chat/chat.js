import * as React from 'react';
import {useEffect} from "react";
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
import {useSelector} from "react-redux";
import io from 'socket.io-client'
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
    // necessary for content to be below app bar
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
    const user = useSelector((state) => state.user.user)


    useEffect(() => {
        getAllRooms().then(result => {
            setRooms(result?.success)
        })
    }, []);

    useEffect(() => {
        socket.on('message', (arg) => {
            setMessages(messages.concat(arg))
        })
    }, );

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
        getRoom(id).then(result => {
            if (result.success) {
                setRoom(result.success)
                setTitle(result.success.name)
                setMessages(result.success.messages)
            }
            console.log(result);
        })
    }

    const handleSendMessage = () => {
        sendMessage({
            "message": text,
            "pseudo": user.pseudo,
            "id_room": room._id
        })
    }

    const handleChangeText = (event) => {
        console.log(event)
        setText(event.target.value)
    }
    
    const viewMessage = () => {
      return <>
          {messages.map((message, index) => {
             return  <div key={'message' + index} style={{display: 'flex', justifyContent: 'left'}}>
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
                        <ListItem button key={room.name} onClick={() => handleRoom(room._id)}>
                            <ListItemIcon>
                                <ChatIcon/>
                            </ListItemIcon>
                            <ListItemText primary={room.name}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Main open={open}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height:'95vh'}}>
                    <DrawerHeader/>
                    <div style={{height: '100%', overflowY: 'auto'}}>
                        {viewMessage()}
                    </div>
                    <div style={{display: 'flex', alignItems:'center'}}>
                        <TextField
                            id="outlined-multiline-static"
                            label={user.pseudo}
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
