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
          <div className = 'leftContent valign-wrapper'>
            <div className = 'blackIconTop'>
            </div>
            <div className = 'blackIconBottom'>
            </div>
            <div className = 'col'>          
              <div className = 'leftContentFolder col s12 m12 l12'>
                <div className = 'col s12 m12 l12'>
                  
                    <div className = 'leftContentHeader col s12 m12 l12'>
                      Lightboards:
                    </div>
                  
                </div>
                <div className = 'col s12 m12 l12'>
                  {this.props.lightboards.map((item, index) => {
                      return (
                        <Link to={`lightboards/${item.id}`} >
                          <div className = 'leftContentItem col s12 m12 l12' key = {item._id} index = {index} onClick={() => { 
                                  this.props.changeCurrentShowItem(item) }}>
                            {item.name} 
                          </div>
                        </Link>
                            )
                    })}
                </div>
              </div>
              <div className = 'leftContentFolder col s12 m12 l12'>
                <div className = 'col s12 m12 l12'>
                  
                    <div className = 'leftContentHeader col s12 m12 l12'>
                      Studios:
                    </div>
                  
                </div>
                <div className = 'col s12 m12 l12'>
                    {this.props.studios.map((item, index) => {
                        return (
                          <Link to={`studios/${item.id}`} >
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
                  
                    <div className = 'leftContentHeader col s12 m12 l12'>
                      Accessories:
                    </div>
                  
                </div>
                <div className = 'col s12 m12 l12'>
                  {this.props.accessories.map((item, index) => {
                      return (
                        <Link to={`accessories/${item.id}`} >
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
