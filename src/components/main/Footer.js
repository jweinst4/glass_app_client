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
          <div className = "col all-rights s10 m10 l10">
          JSW, all rights reserved
          </div>
          <div className = "col copyright s1 m1 l1">
            <i className="small material-icons s1">copyright</i>
          </div>
          <div className = "col company-name s1 m1 l1">
            JSW 2019
          </div>
        </div>  
    )
    }
}

export default Footer
