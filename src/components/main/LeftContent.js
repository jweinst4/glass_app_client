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



class LeftContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }
     
    }



    

    render() {
        return (
          <div className = 'leftContent col s2 m2 l2'>
            <div className = 'col'>
            <Link to ="/lightboards"><h6>Lightboards:</h6></Link>
            {this.props.lightboards.map((item, index) => {
                 return (
                   <div className = 'logo-choice' key = {item._id} index = {index} >
                     <div>
                        {item.name}
                     </div>
                   </div>
                       )
               })}
            
            </div>

            <div className = 'col'>
            <Link to ="/studios"><h6>Studios:</h6></Link>
            {this.props.studios.map((item, index) => {
                 return (
                   <div className = 'logo-choice' key = {item._id} index = {index} >
                     <div>
                        {item.name}
                     </div>
                   </div>
                       )
               })}
            
            </div>

            <div className = 'col'>
            <Link to ="/accessories"><h6>Accessories:</h6></Link>
            {this.props.studios.map((item, index) => {
                 return (
                   <div className = 'logo-choice' key = {item._id} index = {index} >
                     <div>
                        {item.name}
                     </div>
                   </div>
                       )
               })}
            
            </div>

 
            </div>

            
        )
    }
}

export default LeftContent
