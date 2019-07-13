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



class Navbar2 extends React.Component {
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
            <div className="navbar-fixed">
            <nav>
              <div class="nav-wrapper">
              <div className = 'row'>
              
                <ul id="dropdown1" className="dropdown-content">
              <div className = 'test1'><Link to ="/aboutUs/overview">Overview</Link></div>
              <Link to ="/aboutus/management">Management</Link>
              <Link to ="/aboutus/news">News</Link>
            </ul>
            <ul id="dropdown2" className="dropdown-content">
              <Link to ="/resources/howtos">How To Guide</Link>
              <Link to ="/resources/faqs">FAQ</Link>
            </ul>

            <div className = 'col' className="brand-logo"><Link to ="/"><img className = 'logo-image' src='https://i.imgur.com/sAmZqaE.png?1' /></Link></div>
            <div className = 'row'>
            <div className = 'col s9 m9 l9'></div>
            <div className = 'col s1 m1 l1 hide-on-med-and-down'>
                <div className="dropdown-trigger" href="#" data-target="dropdown2" onClick={this.showItems}>
                  Resources
                  <i className="material-icons right">
                    <span className = 'navText'>
                      arrow_drop_down
                    </span>
                  </i>
                </div>          
              </div>
              <div className = 'col s1 m1 l1 hide-on-med-and-down'>
                <div className="dropdown-trigger" href="#" data-target="dropdown1" onClick={this.showItems}>
                  About Us
                  <i className="material-icons right">
                    <span className = 'navText'>
                      arrow_drop_down
                    </span>
                  </i>
                </div>          
              </div>
              <Link to = '/contact'>
                <div className = 'col s1 m1 l1'>
                  Contact
                </div>
              </Link>
            </div>
              </div>
              </div>
            </nav>
          </div>     

        )
    }
}

export default Navbar2
