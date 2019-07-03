import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

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
     this.showItems = this.showItems.bind(this)
    }


showItems() {
    
}
    

    render() {
        return (
           
                <div className = 'row'>

                <ul id="dropdown1" className="dropdown-content">
  <li><a href="#!">one</a></li>
  <li><a href="#!">two</a></li>
  <li className="divider"></li>
  <li><a href="#!">three</a></li>
</ul>
<nav>
  <div className="nav-wrapper navBar">

    <a href="#!" className="brand-logo"><span className = 'black-text'>Logo</span></a>
    <ul className="right hide-on-med-and-down">
      <li><a href="#"><span className = 'black-text'>ContactInfo</span></a></li>
      <li><a href="#"><span className = 'black-text'>Resources</span></a></li>
      
      <li><a className="dropdown-trigger" href="#" data-target="dropdown1" onClick={this.showItems}><span className = 'black-text'>CompanyInfo</span><i className="material-icons right"><span className = 'black-text'>arrow_drop_down</span></i></a></li>
    </ul>
  </div>
</nav>
            
                </div>
          
       

        )
    }
}

export default Navbar
