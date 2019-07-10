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



class Footer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }
     
    }



    

    render() {
      return (
      <div className = 'footer row'>
        <div className = 'footerContentContainer col s12 m12 l12'>
          <div className = "col all-rights s8 m8 l8">
            <span className = 'rightsText'>
              Lightboard Inc., all rights reserved
            </span>
          </div>
          <div className = 'col terms s2 m2 l2'>
            <Link to ='/terms'>
              <span className = 'termsText'>
                Terms and Conditions
              </span>             
            </Link>
          </div>
          <div className = 'col privacy s2 m2 l2'>
            <Link to ='/privacy'>
              <span className = 'privacyText'>
                Privacy Policy
              </span>
            </Link>
          </div>          
        </div>
      </div>  
    )
    }
}

export default Footer
