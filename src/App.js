import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import History from './components/History';
import Weather from './components/Weather';

class App extends Component {
  render() {
    return (
       <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/home' component={Home} />
            <Route path='/history' component={History} />
            <Route path='/weather' component={Weather} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
