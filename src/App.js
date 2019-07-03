import React from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom'
import Toolbar from './components/Toolbar.js'
import NewUser from './components/NewUser.js'
import LeftContent from './components/LeftContent.js'
import RightContent from './components/RightContent.js'
import NewLightboard from './components/NewLightboard.js'
import NewStudio from './components/NewStudio.js'
import NewAccessory from './components/NewAccessory.js'
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
    lightboards: [],
    studios: [],
    accessories: [],
    }
  this.getUsers = this.getUsers.bind(this)
  this.getLightboards = this.getLightboards.bind(this)
  this.getStudios = this.getStudios.bind(this)
  this.getAccessories = this.getAccessories.bind(this)
      }

  componentDidMount(){
      this.getUsers()
      this.getStudios()
      this.getAccessories()
      this.getLightboards()
  } 
    
  getUsers() {
    fetch(baseURL+ '/users')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({users: parsedData}),
          err=> console.log(err))
  }


  getLightboards() {
    fetch(baseURL+ '/lightboards')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({lightboards: parsedData}),
          err=> console.log(err))
  }

  getStudios() {
    fetch(baseURL+ '/studios')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({studios: parsedData}),
          err=> console.log(err))
  }

  getAccessories() {
    fetch(baseURL+ '/accessories')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({accessories: parsedData}),
          err=> console.log(err))
  }


  render() {

    return (

      <Router>

            {/* NEWUSER FORM */}
          <Route exact path ='/newUser/' exact render={() => <NewUser users={this.state.users}/>}/>

          <Route exact path ='/newLightboard/' exact render={() => <NewLightboard lightboards={this.state.lightboards}/>}/>

          <Route exact path ='/newStudio/' exact render={() => <NewStudio studios={this.state.studios}/>}/>

          <Route exact path ='/newAccessory/' exact render={() => <NewAccessory accessories={this.state.accessories} />}/>

 {/* NAVBAR */}
    
 <Route exact path ='/' exact render={() => <Navbar />}/>
     

     {/* CONTAINER FOR LEFT AND RIGHT CONTENT COLUMNS       */}
     <div className = 'row LeftAndRightContentRow'>

       {/* LEFTCONTENT COLUMN */}
            
         <Route exact path ='/' exact render={() => <LeftContent lightboards = {this.state.lightboards} studios={this.state.studios} accessories={this.state.accessories} users = {this.state.users}/>}/>
   

       {/* RIGHTCONTENT COLUMN */}
                
         <Route exact path ='/' exact render={() => <RightContent />}/>
  

     </div>
          {/* <Route exact path ='/' exact render={() => <Toolbar />}/> */}

      </Router>
            
    );
  }
}

export default App;