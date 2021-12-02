import './App.css';
import {ThemeProvider} from '@material-ui/core/styles';
import SignIn from "./component/login/SignIn";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import mainTheme from "./assets/style/MainTheme";
import React from "react";
import Rooms from "./component/room/Rooms";
import SignUp from "./component/login/SignUp";

    function App() {
    return (
            <Router>
                <ThemeProvider theme={mainTheme}>
                    <div className="App">
                        <Routes>
                            <Route exact path="/" element={<SignIn/>}/>
                            <Route exact path="/signup" element={<SignUp/>}/>
                            <Route exact path="/room" element={<Rooms/>}/>
                            <Route exact path="/room/:id" element={<SignIn/>}/>

                        </Routes>
                    </div>
                </ThemeProvider>
            </Router>
    );
}

export default App;
