import React from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Toolbar from './components/Toolbar.js'
import NewUser from './components/NewUser.js'

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

import './App.css';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com/'
}


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
 products: [],
    }
  
      }

     
  
  render() {

    return (
      <Router>

<Route exact path ='/' exact render={() => <Toolbar/>}/>


<Route exact path ='/newUser' exact render={() => <NewUser handleAddUser={this.handleAddUser} getUsers={this.getUsers}/>}/>



</Router>
       
    );
  }
}

export default App;