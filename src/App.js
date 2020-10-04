// import module and config file

import React,{useEffect,useState} from 'react';
import {apiServerRequet,API_KEY} from './config';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Container,Row} from 'reactstrap'

// pages import and componants

import Home from './pages/Home';
import Recette from './pages/recette';
import Header from './components/Header';
import Favorie from './pages/Favorie'
import Search from './pages/Search'

const App = () => {
  useEffect( () => {

  },[])

  return (
    <Router> 
      <Container>
        <Row>
            <Header />    
        </Row>
        <Row>
          <Switch>
            <Route path="/" component={Home} exact={true}></Route>
            <Route path="/favorie" component={Favorie}></Route>
            <Route path="/recette/:id" component={Recette}></Route>
            <Route path="/search" component={Search}></Route>
          </Switch>
        </Row>
      
      </Container>
    </Router>
  );
}

export default App;
