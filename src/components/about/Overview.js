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



class Overview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }
     
    }


    render() {
        return (
            <div className = 'row showContent'>
               
   <div className = 'aboutHeader' >Overview: 
   </div>
            {this.props.overview.map((item, index) => {
                 return (
               
                <div className="aboutText">
                  {item.item}
                </div>
                
       
                       )
               })}
      
   
            </div>
                 )
    }
}

export default Overview
