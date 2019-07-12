import React from 'react';
import { BrowserRouter as Router, Link, Route, Redirect,withRouter} from 'react-router-dom'

import NewLightboard from './components/new/NewLightboard.js'
import NewStudio from './components/new/NewStudio.js'
import NewAccessory from './components/new/NewAccessory.js'
import NewNews from './components/new/NewNews.js'
import NewFAQ from './components/new/NewFAQ.js'
import NewHowTo from './components/new/NewHowTo.js'
import NewOverview from './components/new/NewOverview.js'
import NewManagement from './components/new/NewManagement.js'
import NewPrivacy from './components/new/NewPrivacy.js'
import TestLightboard from './components/test/TestLightboard.js'
import TestStudio from './components/test/TestStudio.js'
import TestAccessory from './components/test/TestAccessory.js'
import TestContactForm from './components/test/TestContactForm.js'
import TestTerm from './components/test/TestTerms.js'
import TestFAQ from './components/test/TestFAQ.js'
import TestHowTo from './components/test/TestHowTo.js'
import TestManagement from './components/test/TestManagement.js'
import TestNews from './components/test/TestNews.js'
import TestOverview from './components/test/TestOverview.js'
import TestTerms from './components/test/TestTerms.js'
import TestPrivacy from './components/test/TestPrivacy.js'
import Sidebar from './components/test/Sidebar.js'
import Navbar2 from './components/test/Navbar2.js'

import Home from './components/test/Home.js'

import NewStudioTest from './components/test/NewStudioTest.js'
import UpdateStudioTest from './components/test/UpdateStudioTest.js'

import NewAccessoryTest from './components/test/NewAccessoryTest.js'
import UpdateAccessoryTest from './components/test/UpdateAccessoryTest.js'

import NewFAQTest from './components/test/NewFAQTest.js'
import UpdateFAQTest from './components/test/UpdateFAQTest.js'

import NewHowToTest from './components/test/NewHowToTest.js'
import UpdateHowToTest from './components/test/UpdateHowToTest.js'

import NewLightboardTest from './components/test/NewLightboardTest.js'
import UpdateLightboardTest from './components/test/UpdateLightboardTest.js'

import NewManagementTest from './components/test/NewManagementTest.js'
import UpdateManagementTest from './components/test/UpdateManagementTest.js'

import NewNewsTest from './components/test/NewNewsTest.js'
import UpdateNewsTest from './components/test/UpdateNewsTest.js'

import NewOverviewTest from './components/test/NewOverviewTest.js'
import UpdateOverviewTest from './components/test/UpdateOverviewTest.js'

import NewPrivacyTest from './components/test/NewPrivacyTest.js'
import UpdatePrivacyTest from './components/test/UpdatePrivacyTest.js'



import LeftContent from './components/main/LeftContent.js'
import RightContent from './components/main/RightContent.js'
import Navbar from './components/main/Navbar.js'
import Studio from './components/main/Studio.js'
import Accessory from './components/main/Accessory.js'
import Lightboard from './components/main/Lightboard.js'
import Footer from './components/main/Footer.js'

import Overview from './components/about/Overview.js'
import Management from './components/about/Management.js'
import News from './components/about/News.js'
import Faq from './components/about/Faq.js'
import ContactForm from './components/about/ContactForm.js'
import Privacy from './components/about/Privacy.js'
import Terms from './components/about/Terms.js'
import HowTo from './components/about/HowTo.js'

import LightboardShowRoute from './components/show/LightboardShowRoute.js'
import StudioShowRoute from './components/show/StudioShowRoute.js'
import AccessoryShowRoute from './components/show/AccessoryShowRoute.js'

import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

require('dotenv').config()
const aws = require('aws-sdk');
//test
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

              if (this.state.password === process.env.REACT_APP_SECRET_CODE){
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
            this.setState({ [event.currentTarget.id]: event.currentTarget.value})
                console.log(this.state.password)
          }

            render() {
              const { from } = this.props.location.state || { from: { pathname: '/' } }
              const { redirectToReferrer } = this.state

              if (redirectToReferrer === true) {
                return <Redirect to={from} />
              }

              return (
                <div className = 'row aboutContent'>
                <div className = 'aboutContainer'>
          <div className = 'aboutHeader'>
            Contact Form: 
          </div>
          <form className = 'col s12 m12 l12'>
                  
                      <div className = 'form-inline'>
                      <div className = 'col s12 m12 l12 form-group'>
                      <label className = 'col s2 m2 l2' htmlFor="password">Password:</label>
                          <input className = 'col s6 m6 l6' type="text" id="password" name="password" onChange={this.handlePasswordChange} value={this.state.password}  />  
                          </div>   
                          </div>
                          </form>     
                  <button onClick={this.login}>Log in</button>
          </div>
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
              <div className = 'row authenticatedRow'>
             
                 <div className = 'col'>Welcome!</div>
                  <div className = 'col'><button onClick={() => {
                    fakeAuth.signout(() => history.push('/'))
                  }}>Sign out</button> </div>

<div className = 'col'><Link to ="/newLightboard">NewLightboard</Link></div>
<div className = 'col'> <Link to ="/newStudio">NewStudio</Link></div>
<div className = 'col'><Link to ="/newAccessory">NewAccessory</Link></div>
<div className = 'col'><Link to ="/newNews">NewNews</Link></div>
<div className = 'col'><Link to ="/newFAQ">NewFAQ</Link></div>
<div className = 'col'><Link to ="/newHowTo">NewHowTo</Link></div>
<div className = 'col'><Link to ="/newOverview">NewOverview</Link></div>
<div className = 'col'><Link to ="/newManagement">NewManagement</Link></div>
<div className = 'col'><Link to ="/newPrivacy">NewPrivacy</Link></div>
              
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
    managements: [],
    overviews: [],
    news: [],
    faqs: [],
    privacy: [],
    terms: [],
    howtos: [],
    currentShowItem: [],
    }

  this.getLightboards = this.getLightboards.bind(this)
  this.getStudios = this.getStudios.bind(this)
  this.getAccessories = this.getAccessories.bind(this)
  this.getManagements = this.getManagements.bind(this)
  this.getOverviews = this.getOverviews.bind(this)
  this.getNews = this.getNews.bind(this)
  this.getFAQs = this.getFAQs.bind(this)
  this.getPrivacy = this.getPrivacy.bind(this)
  this.getTerms = this.getTerms.bind(this)
  this.getHowTos = this.getHowTos.bind(this)

  this.handleAddLightboard = this.handleAddLightboard.bind(this)
  this.handleAddStudio = this.handleAddStudio.bind(this)
  this.handleAddAccessory = this.handleAddAccessory.bind(this)
  this.handleAddNews = this.handleAddNews.bind(this)
  this.handleAddFAQ = this.handleAddFAQ.bind(this)
  this.handleAddHowTo = this.handleAddHowTo.bind(this)
  this.handleAddManagement = this.handleAddManagement.bind(this)
  this.handleAddOverview = this.handleAddOverview.bind(this)
  this.handleAddPrivacy = this.handleAddPrivacy.bind(this)

  this.changeCurrentShowItem = this.changeCurrentShowItem.bind(this)
  }

  componentDidMount(){
      this.getStudios()
      this.getAccessories()
      this.getLightboards()
      this.getManagements()
      this.getNews()
      this.getOverviews()
      this.getFAQs()
      this.getPrivacy()
      this.getTerms()
      this.getHowTos()   
   } 

   changeCurrentShowItem(item) {
     this.setState({currentShowItem: item})
     console.log(this.state.currentShowItem)
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

  getManagements() {
    fetch(baseURL+ '/managements')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({managements: parsedData}),
          err=> console.log(err))
  }

  getOverviews() {
    fetch(baseURL+ '/overviews')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({overviews: parsedData}),
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

  getFAQs() {
    fetch(baseURL+ '/faqs')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({faqs: parsedData}),
          err=> console.log(err))
  }

  getTerms() {
    fetch(baseURL+ '/terms')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({terms: parsedData}),
          err=> console.log(err))
  }

  getPrivacy() {
    fetch(baseURL+ '/privacies')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({privacy: parsedData}),
          err=> console.log(err))
  }

  getHowTos() {
    fetch(baseURL+ '/howtos')
      .then(data => {
        return data.json()},
        err => console.log(err))
          .then(parsedData => this.setState({howtos: parsedData}),
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

  handleAddNews(item) {
    const copyNews = [...this.state.news]
    copyNews.unshift(item)
    this.setState({
      news: copyNews,
    })
  }

  handleAddFAQ(item) {
    const copyFAQs = [...this.state.faqs]
    copyFAQs.unshift(item)
    this.setState({
      faqs: copyFAQs,
    })
  }

  handleAddHowTo(item) {
    const copyHowTos = [...this.state.howtos]
    copyHowTos.unshift(item)
    this.setState({
      howtos: copyHowTos,
    })
  }

  handleAddManagement(item) {
    const copyManagements = [...this.state.managements]
    copyManagements.unshift(item)
    this.setState({
      managements: copyManagements,
    })
  }

  handleAddOverview(item) {
    const copyOverviews = [...this.state.overviews]
    copyOverviews.unshift(item)
    this.setState({
      overviews: copyOverviews,
    })
  }

  handleAddPrivacy(item) {
    const copyPrivacies = [...this.state.privacy]
    copyPrivacies.unshift(item)
    this.setState({
      privacy: copyPrivacies,
    })
  }

  render() {

    return (
      <div className = 'outerContainer'>
      <Router>
     
        {/* ADMIN AUTHORIZATION */}
       
         
        <Navbar2 />
        
        <Sidebar lightboards = {this.state.lightboards} studios={this.state.studios} accessories={this.state.accessories} users = {this.state.users} currentShowItem={this.state.currentShowItem} changeCurrentShowItem = {this.changeCurrentShowItem}/>

         
        <AuthButton/>
          <Route path="/public" component={Public} admin={this.state.admin}/>
          <Route path="/login" component={Login} admin={this.state.admin}/>
          <PrivateRoute path='/protected' component={Protected} admin={this.state.admin} />
      

            {/* <Route exact path='/faq' exact render = {() => </>}/> */}

            <Route exact path='/lightboards/:id' exact render = {(props) => <TestLightboard lightboards={this.state.lightboards} {...props}/>}/>

            <Route exact path='/studios/:id' exact render = {(props) => <TestStudio studios={this.state.studios} {...props}/>}/>

            <Route exact path='/accessories/:id' exact render = {(props) => <TestAccessory accessories={this.state.accessories} {...props}/>}/>

            <Route exact path ='/contact' exact render={() => <TestContactForm/>}/>

            <Route exact path ='/terms' exact render={() => <TestTerm terms={this.state.terms}/>}/>

            <Route exact path ='/resources/faqs' exact render={() => <TestFAQ defaultCardHeight = {this.state.defaultCardHeight} activeCardHeight = {this.state.activeCardHeight} cardHeights = {this.state.cardHeights} getCardHeights = {this.getCardHeights} activeCard = {this.state.card} faqs={this.state.faqs} originalCardHeights={this.state.originalCardHeights}/>}/>

            <Route exact path ='/resources/howtos' exact render={() => <TestHowTo howtos={this.state.howtos}/>}/>

            <Route exact path ='/aboutus/news' exact render={() => <TestNews news={this.state.news}/>}/>

            <Route exact path ='/aboutus/overview' exact render={() => <TestOverview overviews={this.state.overviews}/>}/>

            <Route exact path ='/privacy' exact render={() => <TestPrivacy privacy={this.state.privacy}/>}/>

            <Route exact path ='/aboutus/management' exact render={() => <TestManagement managements={this.state.managements}/>}/>

            <Route exact path ='/newstudio' exact render={() => <NewStudioTest studios={this.state.studios} handleAddStudio={this.handleAddStudio} fakeAuth = {fakeAuth} getStudios = {this.getStudios}/>}/>

            <Route exact path ='/newaccessory' exact render={() => <NewAccessoryTest accessories={this.state.accessories} handleAddAccessory={this.handleAddAccessory} fakeAuth = {fakeAuth} getAccessories = {this.getAccessories}/>}/>

            <Route exact path ='/newfaq' exact render={() => <NewFAQTest faqs={this.state.faqs} handleAddFAQ={this.handleAddFAQ} fakeAuth = {fakeAuth} getFAQs = {this.getFAQs}/>}/>


            <Route exact path ='/' exact render={() => <Home getImages={this.getImages} lightboards={this.state.lightboards} studios={this.state.studios} accessories={this.state.accessories}/>}/>

   <Footer />
   

















          {/* <Route exact path ='/newLightboard/' exact render={() => <NewLightboard lightboards={this.state.lightboards} handleAddLightboard={this.handleAddLightboard} fakeAuth = {fakeAuth} getLightboards = {this.getLightboards}/>}/>

          <Route exact path ='/newStudio/' exact render={() => <NewStudio studios={this.state.studios} handleAddStudio={this.handleAddStudio} fakeAuth = {fakeAuth} getStudios = {this.getStudios}/>}/>

          <Route exact path ='/newAccessory/' exact render={() => <NewAccessory accessories={this.state.accessories} handleAddAccessory={this.handleAddAccessory} fakeAuth = {fakeAuth} getAccessories = {this.getAccessories}/>}/>


          <Route exact path ='/newNews/' exact render={() => <NewNews news={this.state.news} handleAddNews={this.handleAddNews} fakeAuth = {fakeAuth} getNews = {this.getNews}/>}/>

          <Route exact path ='/newFAQ/' exact render={() => <NewFAQ faqs={this.state.faqs} handleAddFAQ={this.handleAddFAQ} fakeAuth = {fakeAuth} getFAQs = {this.getFAQs}/>}/>

          <Route exact path ='/newHowTo/' exact render={() => <NewHowTo howtos={this.state.howtos} handleAddHowTo={this.handleAddHowTo} fakeAuth = {fakeAuth} getHowTos = {this.getHowTos}/>}/>

          <Route exact path ='/newManagement/' exact render={() => <NewManagement managements={this.state.managements} handleAddManagement={this.handleAddManagement} fakeAuth = {fakeAuth} getManagements = {this.getManagements}/>}/>

          <Route exact path ='/newOverview/' exact render={() => <NewOverview overviews={this.state.overviews} handleAddOverview={this.handleAddOverview} fakeAuth = {fakeAuth} getOverviews = {this.getOverviews}/>}/>

          <Route exact path ='/newPrivacy/' exact render={() => <NewPrivacy privacy={this.state.privacy} handleAddPrivacy={this.handleAddPrivacy} fakeAuth = {fakeAuth} getPrivacy = {this.getPrivacy}/>}/>


          <Route exact path ='/studios/' exact render={() => <Studio studios={this.state.studios}/>}/>

          <Route exact path ='/lightboards' exact render={() => <Lightboard  lightboards = {this.state.lightboards} studios={this.state.studios} accessories={this.state.accessories} users = {this.state.users}/>}/>

          <Route exact path ='/accessories/' exact render={() => <Accessory accessories={this.state.accessories}/>}/>

          <Route exact path ='/aboutUs/overview' exact render={() => <Overview overviews={this.state.overviews}/>}/>

          <Route exact path ='/aboutus/management' exact render={() => <Management managements={this.state.managements}/>}/>

          <Route exact path ='/aboutus/news' exact render={() => <News news={this.state.news}/>}/>

          <Route exact path ='/resources/faqs' exact render={() => <Faq defaultCardHeight = {this.state.defaultCardHeight} activeCardHeight = {this.state.activeCardHeight} cardHeights = {this.state.cardHeights} getCardHeights = {this.getCardHeights} activeCard = {this.state.card} faqs={this.state.faqs} originalCardHeights={this.state.originalCardHeights}/>}/>

          <Route exact path ='/resources/howtos' exact render={() => <HowTo howtos={this.state.howtos}/>}/>

          <Route exact path ='/contact' exact render={() => <ContactForm/>}/>

          <Route exact path ='/privacy' exact render={() => <Privacy privacy={this.state.privacy}/>}/>

          <Route exact path ='/terms' exact render={() => <Terms terms={this.state.terms}/>}/>

          <Route exact path='/lightboards/:id' exact render = {(props) => <LightboardShowRoute {...props} lightboards={this.state.lightboards}/>} />

          <Route exact path='/studios/:id' exact render = {(props) => <StudioShowRoute {...props} studios={this.state.studios}/>} />

          <Route exact path='/accessories/:id' exact render = {(props) => <AccessoryShowRoute {...props} accessories={this.state.accessories}/>} /> */}

          

 

     {/* CONTAINER FOR LEFT AND RIGHT CONTENT COLUMNS       */}
     


 
    
     
     

      </Router>
      </div>
            
    );
  }
}

export default App;