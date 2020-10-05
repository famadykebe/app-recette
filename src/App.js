// import module and config file

import React,{useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Container,Row} from 'reactstrap'

// pages import and componants

import Home from './pages/Home';
import Recette from './pages/recette';
import Header from './components/Header';
import Favorite from './pages/Favorite'
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
            <Route path="/favorite" component={Favorite}></Route>
            <Route path="/recette/:id" component={Recette}></Route>
            <Route path="/search" component={Search}></Route>
          </Switch>
        </Row>
      
      </Container>
    </Router>
  );
}

export default App;
