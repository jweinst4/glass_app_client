import React from 'react';
import { BrowserRouter as Router, Link, Route, Redirect,withRouter} from 'react-router-dom'
import Toolbar from './components/Toolbar.js'
import NewUser from './components/NewUser.js'
import LeftContent from './components/LeftContent.js'
import RightContent from './components/RightContent.js'
import NewLightboard from './components/NewLightboard.js'
import NewStudio from './components/NewStudio.js'
import NewAccessory from './components/NewAccessory.js'
import Navbar from './components/Navbar.js'
import Lightboard from './components/Lightboard.js'
import Studio from './components/Studio.js'
import Accessory from './components/Accessory.js'
import Overview from './components/Overview.js'
import Management from './components/Management.js'
import News from './components/News.js'
import Faq from './components/Faq.js'




import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

import './App.css';


let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com/'
}


// https://tylermcginnis.com/react-router-protected-routes-authentication/

    // ADMIN AUTHORIZATION SECTION
          const fakeAuth = {
            isAuthenticated: false,
            authenticate(cb) {
              this.isAuthenticated = true
              setTimeout(cb, 100)
            },
            signout(cb) {
              this.isAuthenticated = false
              setTimeout(cb, 100)
            }

          }

      // ADMIN AUTHORIZATION SECTION      
          const Public = () => <h3>Public</h3>
          const Protected = () => <h3>Protected</h3>

      // ADMIN AUTHORIZATION SECTION      
          class Login extends React.Component {
            constructor(props) {
              super(props)
            this.state = {
              redirectToReferrer: false,
              password: '',
            }
            this.handlePasswordChange=this.handlePasswordChange.bind(this)
            }
            login = () => {

              if (this.state.password === 'ABc'){
                fakeAuth.authenticate(() => {
                  
                  this.setState(() => ({
                    redirectToReferrer: true
                  }))
                })
              }
              else{
                alert('wrong password')
                this.setState({password: ''})
              }
            }

            handlePasswordChange(event) {
            this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 

          }

            render() {
              const { from } = this.props.location.state || { from: { pathname: '/' } }
              const { redirectToReferrer } = this.state

              if (redirectToReferrer === true) {
                return <Redirect to={from} />
              }

              return (
                <div>
                  <p>You must log in to view the page</p>

                  <form className = 'col s12 m12 l12'>
                  
                      <div className = 'form-inline'>
                      <div className = 'col s12 m12 l12 form-group'>
                      <label className = 'col s2 m2 l2' htmlFor="password">Password:</label>
                          <input className = 'col s6 m6 l6' type="text" id="password" name="password" onChange={this.handlePasswordChange} value={this.state.password}  />  
                          </div>   
                          </div>
                          </form>

                          {this.state.password}
                          
                  <button onClick={this.login}>Log in</button>
                </div>
              )
            }
          }

      // ADMIN AUTHORIZATION SECTION      
          const PrivateRoute = ({ component: Component, ...rest }) => (
            <Route {...rest} render={(props) => (
              fakeAuth.isAuthenticated === true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                  }} />
            )} />
          )
          
      // SPECIAL INFO ONLY ADMIN SEES WHEN THEY LOG IN   
          const AuthButton = withRouter(({ history }) => (
            fakeAuth.isAuthenticated ? (
              <div className = 'row'>
             
                  <div className = 'col'>Welcome!</div>
                  <div className = 'col'><button onClick={() => {
                    fakeAuth.signout(() => history.push('/'))
                  }}>Sign out</button> </div>

<div className = 'col'><Link to ="/newLightboard">NewLightboard</Link></div>
<div className = 'col'> <Link to ="/newStudio">NewStudio</Link></div>
<div className = 'col'><Link to ="/newAccessory">NewAccessory</Link></div>
              
                </div>
            ) : (
              <>
              </>
            )
          ))
    //END ADMIN AUTHORIZATION SECTION



class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    users: [],
    lightboards: [],
    studios: [],
    accessories: [],
    management: [],
    overview: [],
    news: [],
    faq: [],
    }
  this.getUsers = this.getUsers.bind(this)
  this.getLightboards = this.getLightboards.bind(this)
  this.getStudios = this.getStudios.bind(this)
  this.getAccessories = this.getAccessories.bind(this)
  this.getManagement = this.getManagement.bind(this)
  this.getOverview = this.getOverview.bind(this)
  this.getNews = this.getNews.bind(this)
  this.getFAQ = this.getFAQ.bind(this)

  this.handleAddLightboard = this.handleAddLightboard.bind(this)
  this.handleAddStudio = this.handleAddStudio.bind(this)
  this.handleAddAccessory = this.handleAddAccessory.bind(this)

      }

  componentDidMount(){
      this.getUsers()
      this.getStudios()
      this.getAccessories()
      this.getLightboards()
      this.getManagement()
      this.getNews()
      this.getOverview()
      this.getFAQ()
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

  getManagement() {
    fetch(baseURL+ '/managements')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({management: parsedData}),
          err=> console.log(err))
  }

  getOverview() {
    fetch(baseURL+ '/overviews')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({overview: parsedData}),
          err=> console.log(err))
  }

  getNews() {
    fetch(baseURL+ '/news')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({news: parsedData}),
          err=> console.log(err))
  }

  getFAQ() {
    fetch(baseURL+ '/faqs')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({faq: parsedData}),
          err=> console.log(err))
  }

  handleAddLightboard(item) {
    const copyLightboards = [...this.state.lightboards]
    copyLightboards.unshift(item)
    this.setState({
      lightboards: copyLightboards,
    })
  }

  handleAddStudio(item) {
    const copyStudios = [...this.state.studios]
    copyStudios.unshift(item)
    this.setState({
      studios: copyStudios,
    })
  }

  handleAddAccessory(item) {
    const copyAccessories = [...this.state.accessories]
    copyAccessories.unshift(item)
    this.setState({
      accessories: copyAccessories,
    })
  }

  handleAddUser(item) {
    const copyUsers = [...this.state.users]
    copyUsers.unshift(item)
    this.setState({
      users: copyUsers,
    })
  }

  render() {

    return (

      <Router>

        {/* ADMIN AUTHORIZATION */}
        <div>
          <AuthButton/>
          <Route path="/public" component={Public} admin={this.state.admin}/>
          <Route path="/login" component={Login} admin={this.state.admin}/>
          <PrivateRoute path='/protected' component={Protected} admin={this.state.admin} />
        </div>

            {/* NEWUSER FORM */}

          <Route exact path ='/newUser/' exact render={() => <NewUser users={this.state.users} handleAddUser={this.handleAddUser} fakeAuth = {fakeAuth}/>}/>

          <Route exact path ='/newLightboard/' exact render={() => <NewLightboard lightboards={this.state.lightboards} handleAddLightboard={this.handleAddLightboard} fakeAuth = {fakeAuth}/>}/>

          <Route exact path ='/newStudio/' exact render={() => <NewStudio studios={this.state.studios} handleAddStudio={this.handleAddStudio} fakeAuth = {fakeAuth}/>}/>

          <Route exact path ='/newAccessory/' exact render={() => <NewAccessory accessories={this.state.accessories} handleAddAccessory={this.handleAddAccessory} fakeAuth = {fakeAuth}/>}/>

          <Route exact path ='/lightboards/' exact render={() => <Lightboard lightboards={this.state.lightboards}/>}/>

          <Route exact path ='/studios/' exact render={() => <Studio studios={this.state.studios}/>}/>

          <Route exact path ='/accessories/' exact render={() => <Accessory accessories={this.state.accessories}/>}/>

          <Route exact path ='/aboutUs/overview' exact render={() => <Overview overview={this.state.overview}/>}/>

          <Route exact path ='/aboutus/management' exact render={() => <Management management={this.state.management}/>}/>

          <Route exact path ='/aboutus/news' exact render={() => <News news={this.state.news}/>}/>

          <Route exact path ='/faq' exact render={() => <Faq faq={this.state.faq}/>}/>

          

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