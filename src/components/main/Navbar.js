import React from 'react';
import { BrowserRouter as Router, Link, Route} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css'; 

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class Navbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
   
        }
this.handleLink = this.handleLink.bind(this)
    }
handleLink() {
  
}
componentDidMount() {
   // https://stackoverflow.com/questions/46207198/how-i-can-use-dropdown-from-materialize-css-in-react
   let elems = document.querySelectorAll('.dropdown-trigger');
   M.Dropdown.init(elems, {inDuration: 300, outDuration: 225}); 

}

    render() {
        return (
<div className = 'row navBar'>

       
        <div className = 'navBarLogo col s8 m8 l8' onClick = {this.handleLink}>
     <Link to = '/'><img className = 'logo'  src = 'https://jweinst4.s3.amazonaws.com/GlassApp/logo2.png' ></img></Link>
      
    </div>


    <div className = 'navBarLinks col s4 m4 l4' >
    
    </div>
    

    <div className = 'navBarRight col'>

  
    <ul id="dropdown1" className="dropdown-content">
              <Link to ="/aboutUs/overview">Overview</Link>
              <Link to ="/aboutUs/management">Management</Link>
              <Link to ="/aboutUs/news">News</Link>
            </ul>
 



  
          
                <div className = 'row navBarRightRow s12 m12 l12'>
                  <Link to = '/contact'>
                    <div className = 'col navText s4 m4 l4'>
                      Contact
                    </div>
                  </Link>
                  <Link to = '/resources'>
                    <div className = 'col navText s4 m4 l4'>
                      Resources
                    </div>
                  </Link>
                 
        <div className = 'col navText s4 m4 l4 right hide-on-med-and-down'>
                  <div className="dropdown-trigger" href="#" data-target="dropdown1" onClick={this.showItems}>AboutUs<i className="material-icons right"><span className = 'navText'>arrow_drop_down</span></i></div>          
        </div>

    </div>
                  
          
         

    </div>

</div>        

        )
    }
}

export default Navbar
