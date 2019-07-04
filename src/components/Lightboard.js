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



class Lightboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }
     
    }



    

    render() {
        return (
          
            <div className = 'row lightboardContent'>

            {this.props.lightboards.map((item, index) => {
                 return (
                   <div className = 'logo-choice lightboardItem' key = {item._id} index = {index} >
                     <h4>{item.name}</h4>
                     <img src={item.image}></img>
                     <h6>{item.description}</h6>
                   </div>
                       )
               })}
            
            </div>

            
        )
    }
}

export default Lightboard