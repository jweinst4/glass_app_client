import React from 'react';
import { BrowserRouter as Router, Link, Route, Redirect,withRouter} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

// SHOW COMPONENTS //
// START //
    import Lightboard from './components/show/Lightboard.js'
    import Studio from './components/show/Studio.js'
    import Accessory from './components/show/Accessory.js'
// SHOW COMPONENTS //
// END //

    // ABOUT COMPONENTS //
    // START //
        import ContactForm from './components/about/ContactForm.js'
        import Term from './components/about/Terms.js'
        import FAQ from './components/about/Faq.js'
        import HowTo from './components/about/HowTo.js'
        import Management from './components/about/Management.js'
        import News from './components/about/News.js'
        import Overview from './components/about/Overview.js'
        import Privacy from './components/about/Privacy.js'
    // ABOUT COMPONENTS //
    // END //

// MAIN COMPONENTS //
// START //
    import Sidebar from './components/main/Sidebar.js'
    import Navbar from './components/main/Navbar.js'
    import Home from './components/main/Home.js'
    import Footer from './components/main/Footer.js'
    import ScrollToTop from './components/main/ScrollToTop.js'
// MAIN COMPONENTS //
// END //

    // NEW COMPONENTS //
    // START //
        import NewStudio from './components/new/NewStudio.js'
        import NewAccessory from './components/new/NewAccessory.js'
        import NewFAQ from './components/new/NewFAQ.js'
        // import NewHowTo from './components/new/NewHowTo.js'
        // import NewLightboard from './components/new/NewLightboard.js'
        // import NewManagement from './components/new/NewManagement.js'
        // import NewNews from './components/new/NewNews.js'
        // import NewOverview from './components/new/NewOverview.js'
        // import NewPrivacy from './components/new/NewPrivacy.js'
    // NEW COMPONENTS //
    // END //

require('dotenv').config()

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com/'
}

    // ADMIN AUTHORIZATION CONTAINER \\
    // START \\
    // https://tylermcginnis.com/react-router-protected-routes-authentication/
      
        // ADMIN AUTHORIZATION SECTION \\
        // START \\
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
        // ADMIN AUTHORIZATION SECTION \\
        // END \\

            // ADMIN AUTHORIZATION SECTION \\
            // START \\
              const Public = () => <h3>Public</h3>
              const Protected = () => <h3>Protected</h3>
            // ADMIN AUTHORIZATION SECTION \\
            // END \\

          // ADMIN AUTHORIZATION SECTION \\
          // START \\  
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
                              <label className = 'col s2 m2 l2' htmlFor="password">
                                Password:
                              </label>
                              <input className = 'col s6 m6 l6' type="text" id="password" name="password" onChange={this.handlePasswordChange} value={this.state.password}  />  
                            </div>   
                          </div>
                        </form>     
                        <button onClick={this.login}>
                          Log in
                        </button>
                      </div>
                    </div>
                  )
                }
              }
          // ADMIN AUTHORIZATION SECTION \\
          // END \\

          // ADMIN AUTHORIZATION SECTION \\
          // START \\ 
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
          // ADMIN AUTHORIZATION SECTION \\  
          // END \\

          // ADMIN AUTHORIZATION SECTION \\ 
          // START \\
              const AuthButton = withRouter(({ history }) => (
                fakeAuth.isAuthenticated ? (
                <div>
                  <div className = 'row authenticatedRow'>    
                    <div className = 'col'>Welcome, Admin  !</div>
                    <div className = 'col'><Link to ="/newLightboard">NewLightboard</Link></div>
                    <div className = 'col'> <Link to ="/newStudio">NewStudio</Link></div>
                    <div className = 'col'><Link to ="/newAccessory">NewAccessory</Link></div>
                    <div className = 'col'><Link to ="/newNews">NewNews</Link></div>      
                  </div>
                  <div className = 'row authenticatedRow'>           
                    <div className = 'col'><Link to ="/newFAQ">NewFAQ</Link></div>
                    <div className = 'col'><Link to ="/newHowTo">NewHowTo</Link></div>
                    <div className = 'col'><Link to ="/newOverview">NewOverview</Link></div>      
                    <div className = 'col'><Link to ="/newManagement">NewManagement</Link></div>
                    <div className = 'col'><Link to ="/newPrivacy">NewPrivacy</Link></div>
                    <div className = 'col'>
                      <button className = 'signOutButton' onClick={() => {
                        fakeAuth.signout(() => history.push('/'))
                        }}>
                          Sign out
                      </button>
                    </div>
                  </div>
                </div>
                ) : (
                  <>
                  </>
                )
              ))
        // ADMIN AUTHORIZATION SECTION \\ 
        // END \\

    // ADMIN AUTHORIZATION CONTAINER \\
    // END \\

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
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

  // Fetches all of the data for lightboards, studios, accessories, management information, overview information, faq's, privacy policy, terms, and how to tutorials
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

  //functions related to adding new products
  this.handleAddLightboard = this.handleAddLightboard.bind(this)
  this.handleAddStudio = this.handleAddStudio.bind(this)
  this.handleAddAccessory = this.handleAddAccessory.bind(this)
  this.handleAddNews = this.handleAddNews.bind(this)
  this.handleAddFAQ = this.handleAddFAQ.bind(this)
  this.handleAddHowTo = this.handleAddHowTo.bind(this)
  this.handleAddManagement = this.handleAddManagement.bind(this)
  this.handleAddOverview = this.handleAddOverview.bind(this)
  this.handleAddPrivacy = this.handleAddPrivacy.bind(this)

  //related to displaying the specific product when they go to a show page
  this.changeCurrentShowItem = this.changeCurrentShowItem.bind(this)
  }

  componentDidMount(){
      // fetches all the data for all of the products
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

   //changes the current show item depending on which product link they clicked on
   changeCurrentShowItem(item) {
     this.setState({currentShowItem: item})
     console.log(this.state.currentShowItem)
   }

          // Fetching information for all of the various products \\
          // START \\
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

        // Fetching information for all of the various products \\
        // END \\

  // Adding new products \\
  // START \\
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
  // Adding new products \\
  // END \\

  render() {

    return (
      <div className = 'outerContainer'>

        <Router>
          
            <ScrollToTop>

              <Navbar />
              
              <Sidebar lightboards = {this.state.lightboards} studios={this.state.studios} accessories={this.state.accessories} users = {this.state.users} currentShowItem={this.state.currentShowItem} changeCurrentShowItem = {this.changeCurrentShowItem}/>

              {/* ADMIN AUTHORIZATION COMPONENTS*/}
              {/* START */}
                <AuthButton/>
                <Route path="/public" component={Public} admin={this.state.admin}/>
                <Route path="/login" component={Login} admin={this.state.admin}/>
                <PrivateRoute path='/protected' component={Protected} admin={this.state.admin} />
              {/* ADMIN AUTHORIZATION COMPONENTS*/}
              {/* END */}

                    {/* NAVBAR LINK COMPONENTS */}
                    {/* START*/}
                      <Route exact path ='/resources/faqs' exact render={() => <FAQ defaultCardHeight = {this.state.defaultCardHeight} activeCardHeight = {this.state.activeCardHeight} cardHeights = {this.state.cardHeights} getCardHeights = {this.getCardHeights} activeCard = {this.state.card} faqs={this.state.faqs} originalCardHeights={this.state.originalCardHeights}/>}/>

                      <Route exact path ='/resources/howtos' exact render={() => <HowTo howtos={this.state.howtos}/>}/>

                      <Route exact path ='/contact' exact render={() => <ContactForm/>}/>

                      <Route exact path ='/aboutus/news' exact render={() => <News news={this.state.news}/>}/>

                      <Route exact path ='/aboutus/overview' exact render={() => <Overview overviews={this.state.overviews}/>}/>

                      <Route exact path ='/aboutus/management' exact render={() => <Management managements={this.state.managements}/>}/>
                    {/* NAVBAR LINK COMPONENTS */}
                    {/* END */}

              {/* HOME COMPONENTS*/}
              {/* START */}
                  <Route exact path ='/' exact render={() => <Home getImages={this.getImages} lightboards={this.state.lightboards} studios={this.state.studios} accessories={this.state.accessories}/>}/>
              {/* HOME COMPONENTS */}
              {/* END */}

                {/* SHOW COMPONENTS */}
                {/* START */}
                    <Route exact path='/lightboards/:id' exact render = {(props) => <Lightboard lightboards={this.state.lightboards} {...props} faqs={this.state.faqs} getFAQs = {this.getFAQs}/>}/>

                    <Route exact path='/studios/:id' exact render = {(props) => <Studio studios={this.state.studios} {...props} faqs={this.state.faqs} getFAQs = {this.getFAQs}/>}/>

                    <Route exact path='/accessories/:id' exact render = {(props) => <Accessory accessories={this.state.accessories} {...props} faqs={this.state.faqs} getFAQs = {this.getFAQs}/>}/>

                {/* SHOW COMPONENTS */}
                {/* END*/}

            {/* NEW COMPONENTS */}
            {/* START*/}

              <Route exact path ='/newstudio' exact render={() => <NewStudio studios={this.state.studios} handleAddStudio={this.handleAddStudio} fakeAuth = {fakeAuth} getStudios = {this.getStudios}/>}/>

              <Route exact path ='/newaccessory' exact render={() => <NewAccessory accessories={this.state.accessories} handleAddAccessory={this.handleAddAccessory} fakeAuth = {fakeAuth} getAccessories = {this.getAccessories}/>}/>

              <Route exact path ='/newfaq' exact render={() => <NewFAQ faqs={this.state.faqs} handleAddFAQ={this.handleAddFAQ} fakeAuth = {fakeAuth} getFAQs = {this.getFAQs}/>}/>
          
            {/* NEW COMPONENTS */}
            {/* END * /}

              {/* TERMS AND PRIVACY COMPONENTS */}
              {/* START */}
                  <Route exact path ='/terms' exact render={() => <Term terms={this.state.terms}/>}/>

                  <Route exact path ='/privacy' exact render={() => <Privacy privacy={this.state.privacy}/>}/>
              {/* TERMS AND PRIVACY COMPONENTS*/}
              {/* END */}
              
            <Footer />

          </ScrollToTop>

        </Router>

      </div>
                  
    );
  }
}

export default App;