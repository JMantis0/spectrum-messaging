import React from 'react';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content, Grid, Cell } from 'react-mdl';
import ReactMDL from 'react-mdl';
import Main from './components/main';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Join from './components/join/join'
import Join from './components/chat/chat'


const App = () => {
    <Router>
        <Route path="/" exact component={Join}"></Route>
        <Route path="/chat" exact component={Join}"></Route>
        </Router>

}

export default App;
