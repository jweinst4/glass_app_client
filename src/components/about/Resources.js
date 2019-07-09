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



class Resource extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }
     
    }
    render() {
        return (
            <div className = 'row'>
   <div className = 'leftContentResource'>
  </div>

   <div className = 'rightContentResource'>
   
   Test</div>
      
   
            </div>
                 )
    }
}

export default Resource
