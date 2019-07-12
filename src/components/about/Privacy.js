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



class Privacy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }
     
    }


    render() {
        return (
            <div className = 'row aboutContent'>
              <div className = 'col rightBlackBox'></div>
              <div className = 'col leftWhiteBox'></div>
            
              <div className = 'aboutContainer'>
              {this.props.privacy.map((item, index) => {
                  return (
                    <div className = 'termsAndPrivacyText'>  
                      

                      { item.item === '<p>' ? (
                <> 
                  <div>&nbsp;</div>
                </>
              ):(
              <>
                {item.item}
                
              </>
              )}
                    </div>

                    

                    
                        )
                })}
              </div>
            </div>
                 )
    }
}

export default Privacy
