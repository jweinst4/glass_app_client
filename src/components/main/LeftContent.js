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
          <div className = 'leftContent col'>


<div className = 'blackIconTop'></div>
<div className = 'blackIconBottom'></div>
         
            <div className = 'leftContentFolder col s12 m12 l12'>
            <div className = 'row'>
            <Link to ="/lightboards"><div className = 'leftContentHeader col s12 m12 l12'>Lightboards:</div></Link>
            </div>
            <div className = 'row'>
            {this.props.lightboards.map((item, index) => {
                 return (
                   <div className = 'leftContentItem col' key = {item._id} index = {index} >
                    
                        {item.code} Lightboard
                    
                   </div>
                       )
               })}
               </div>
            
            </div>

            <div className = 'leftContentFolder col s12 m12 l12'>
            <div className = 'row'>
            <Link to ="/studios"><div className = 'leftContentHeader col s12 m12 l12'>Studios:</div></Link>
            </div>
            <div className = 'row'>
            {this.props.studios.map((item, index) => {
                 return (
                   <div className = 'leftContentItem col' key = {item._id} index = {index} >
                 
                 {item.code} Studio
                
                   </div>
                       )
               })}
               </div>
            
            </div>

            <div className = 'leftContentFolder col s12 m12 l12'>
            <div className = 'row'>
            <Link to ="/accessories"><div className = 'leftContentHeader col s12 m12 l12'>Accessories:</div></Link>
            </div>
            <div className = 'row'>
            {this.props.accessories.map((item, index) => {
                 return (
                   <div className = 'leftContentItem col' key = {item._id} index = {index} >
                  
                        {item.name}
                   
                   </div>
                       )
               })}
            </div>
            </div>

 
            </div>
    
            
        )
    }
}

export default LeftContent
