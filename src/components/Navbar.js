import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
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

    }

componentDidMount() {
  // https://stackoverflow.com/questions/46207198/how-i-can-use-dropdown-from-materialize-css-in-react
  let elems = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});

}

    render() {
        return (
           
          <div>
          
            <ul id="dropdown1" className="dropdown-content">
              <li><Link to ="/aboutUs/overview">Overview</Link></li>
              <li><Link to ="/aboutUs/management">Management</Link></li>
              <li><Link to ="/aboutUs/news">News</Link></li>
            </ul>

            <nav>
              <div className="nav-wrapper navBar">
                <Link to ="#" className="brand-logo">Logo</Link>
                <ul className="right hide-on-med-and-down">
                  <li><Link to ="#">ContactInfo</Link></li>
                  <li><Link to ="#">Resources</Link></li>
                  <li><a className="dropdown-trigger" href="#" data-target="dropdown1" onClick={this.showItems}>AboutUs<i className="material-icons right"><span className = 'navText'>arrow_drop_down</span></i></a></li>
                </ul>
              </div>
            </nav>
            
                </div>
          
       

        )
    }
}

export default Navbar
