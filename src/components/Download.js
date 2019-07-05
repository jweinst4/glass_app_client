import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
require('dotenv').config()
require('dotenv').config()

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class Download extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }
     
    }

componentDidMount(){

}

    

    render() {
        return (
          
          <p>Download</p>

            
        )
    }
}

export default Download
