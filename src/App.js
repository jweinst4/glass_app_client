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
users: [],
    }
  
      }
componentDidMount(){
      fetch(baseURL+ '/users')
      .then(data => {
        return data.json()},
        err => console.log(err))
      .then(parsedData => this.setState({users: parsedData}),
      
      err=> console.log(err))
      .then(parsedData => this.setState({currentUser: this.state.users[0]}),
      err=> console.log(err))
} 
  
  render() {

    return (
      <Router>

<Route exact path ='/' exact render={() => <Toolbar users={this.state.users}/>}/>


<Route exact path ='/newUser' exact render={() => <NewUser handleAddUser={this.handleAddUser}/>}/>



</Router>
       
    );
  }
}

export default App;