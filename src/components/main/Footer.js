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
        <div className = 'footerContentContainer'>
          <div className = "col all-rights">
            Lightboard Inc., all rights reserved
          </div>
          <div className = "col">
            <div className = 'row'> 
              <Link to ='/terms'>
                <div className = 'col terms'>
                  Terms
                </div>
              </Link>
              <Link to ='/privacy'>
                <div className = 'col privacy'>
                  Privacy
                </div>
              </Link>
            </div>
          </div>
        </div>
          
          
      
        </div>  
    )
    }
}

export default Footer
