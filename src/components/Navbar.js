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
  <li><a href="/aboutUs/overview">Overview</a></li>
  <li><a href="/aboutUs/management">Management</a></li>
  <li><a href="/aboutUs/news">News</a></li>
</ul>
<nav>
  <div className="nav-wrapper navBar">

    <a href="#!" className="brand-logo"><span className = 'navText'>Logo</span></a>
    <ul className="right hide-on-med-and-down">
      <li><a href="#"><span className = 'navText'>ContactInfo</span></a></li>
      <li><a href="#"><span className = 'navText'>Resources</span></a></li>
      
      <li><a className="dropdown-trigger" href="#" data-target="dropdown1" onClick={this.showItems}><span className = 'navText'>AboutUs</span><i className="material-icons right"><span className = 'navText'>arrow_drop_down</span></i></a></li>
    </ul>
  </div>
</nav>
            
                </div>
          
       

        )
    }
}

export default Navbar
