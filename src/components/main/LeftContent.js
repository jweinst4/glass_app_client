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
          <div className = 'leftContent'>
            <div className = 'blackIconTop'>
            </div>
            <div className = 'blackIconBottom'>
            </div>
            <div className = 'col navAlignTest'>          
              <div className = 'leftContentFolder col s12 m12 l12'>
                <div className = 'col s12 m12 l12'>
                  <Link to ="/lightboards">
                    <div className = 'leftContentHeader col s12 m12 l12'>
                      Lightboards:
                    </div>
                  </Link>
                </div>
                <div className = 'col s12 m12 l12'>
                  {this.props.lightboards.map((item, index) => {
                      return (
                        <Link to ="/lightboards">
                          <div className = 'leftContentItem col s12 m12 l12' key = {item._id} index = {index} >
                            {item.name} 
                          </div>
                        </Link>
                            )
                    })}
                </div>
              </div>
              <div className = 'leftContentFolder col s12 m12 l12'>
                <div className = 'col s12 m12 l12'>
                  <Link to ="/studios">
                    <div className = 'leftContentHeader col s12 m12 l12'>
                      Studios:
                    </div>
                  </Link>
                </div>
                <div className = 'col s12 m12 l12'>
                    {this.props.studios.map((item, index) => {
                        return (
                          <Link to ="/studios">
                          <div className = 'leftContentItem col s12 m12 l12' key = {item._id} index = {index} >
                            {item.name} 
                          </div>
                        </Link>
                              )
                      })}
                </div>
              </div>
              <div className = 'leftContentFolder col s12 m12 l12'>
                <div className = 'col s12 m12 l12'>
                  <Link to ="/accessories">
                    <div className = 'leftContentHeader col s12 m12 l12'>
                      Accessories:
                    </div>
                  </Link>
                </div>
                <div className = 'col s12 m12 l12'>
                  {this.props.accessories.map((item, index) => {
                      return (
                        <Link to ="/lightboards">
                        <div className = 'leftContentItem col s12 m12 l12' key = {item._id} index = {index} >
                          {item.name}
                        </div>
                      </Link>
                          )
                  })}
                </div>
              </div>
            </div>
          </div>  
     
        )
    }
}

export default LeftContent
