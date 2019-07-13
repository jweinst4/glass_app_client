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



class HowTo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
       
    }



    render() {
        return (
            <div className = 'row aboutContent'>
           
              <div className = 'aboutContainer'>
              <div className = 'aboutHeader'>
                How To Guides:
              </div>
              {this.props.howtos.map((item, index) => {
                  return (
                
                      <div className = 'aboutText'>
                        {item.item}
                      </div>
            
                    
                        )
                })}
              </div>
            </div>
           
                 )
    }
}

export default HowTo
