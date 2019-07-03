import React from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Toolbar from './components/Toolbar.js'
import NewUser from './components/NewUser.js'
import LeftContent from './components/LeftContent.js'
import RightContent from './components/RightContent.js'
import Navbar from './components/Navbar.js'


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

  {/* NAVBAR */}
  <div className = 'row white'>
    <Route exact path ='/' exact render={() => <Navbar users={this.state.users}/>}/>
  </div>

  {/* CONTAINER FOR LEFT AND RIGHT CONTENT COLUMNS       */}
  <div className = 'row LeftAndRightContentRow'>

    {/* LEFTCONTENT COLUMN */}
    <div className = 'col leftContentCol s1 m1 l1'>               
      <Route exact path ='/' exact render={() => <LeftContent users={this.state.users}/>}/>
    </div>

    {/* RIGHTCONTENT COLUMN */}
    <div className = 'col rightContentCol s11 m11 l11'>               
      <Route exact path ='/' exact render={() => <RightContent users={this.state.users}/>}/>
    </div>  

  </div>

      {/* NEWUSER FORM */}
    <Route exact path ='/newUser' exact render={() => <NewUser handleAddUser={this.handleAddUser}/>}/>

</Router>
       
    );
  }
}

export default App;