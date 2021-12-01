import './App.css';
import {ThemeProvider} from '@material-ui/core/styles';
import SignIn from "./Component/login/SignIn";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import mainTheme from "./assets/style/MainTheme";
import React from "react";

function App() {
    return (
            <Router>
                <ThemeProvider theme={mainTheme}>
                    <div className="App">
                        <Routes>
                            <Route exact path="/" element={<SignIn/>}/>
                            <Route exact path="/signup" element={<SignIn/>}/>
                            <Route exact path="/room" element={<SignIn/>}/>
                            <Route exact path="/room/:id" element={<SignIn/>}/>
                        </Routes>
                    </div>
                </ThemeProvider>
            </Router>
    );
}

export default App;
