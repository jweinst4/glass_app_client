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
 

}

    render() {
        return (
<div className = 'row navBar'>

        <div className = 'navBarLeft col'></div>
    <div className = 'navBarLogo col s8 m8 l8'>
      <img className = 'logo' src = 'https://jweinst4.s3.amazonaws.com/GlassApp/logo2.png' />
    </div>

    <div className = 'navBarLinks col s4 m4 l4'>
          
    </div>

    <div className = 'navBarRight col'>Test2</div>

</div>        

        )
    }
}

export default Navbar
