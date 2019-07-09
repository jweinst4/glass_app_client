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
            <div className = 'row showContent'>
              <div className = 'col rightBlackBox'></div>
              <div className = 'col leftWhiteBox'></div>
            
              <div className = 'cardContainer'>
              {this.props.lightboards.map((item, index) => {
                  return (
                    <div className="card">
                      <div className="card-image">
                        <img src={item.image} />
                        <span className="card-title">
                          {item.name}
                        </span>
                      </div>
                      <div className="card-content">
                        {item.description}
                      </div>
                    </div>
                        )
                })}
              </div>
            </div>
                 )
    }
}

export default Lightboard
