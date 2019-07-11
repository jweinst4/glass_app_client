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



class AccessoryShowRoute extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }
     
    }
componentDidMount() {
    
}

    render() {
        return (
            <div className = 'showRouteContent'>
                <div className = 'col rightBlackBox'></div>
                <div className = 'col leftWhiteBox'></div>
                {this.props.accessories.map((item, index) => {
                    return (
                            <div>  
                                {parseInt(this.props.match.params.id) === item.id ? (
                                    <>  
                                        <img className = 'currentShowImage' src={item.image} />
                                    </>
                                    ):(
                                    <>
                                    
                                    </>
                                )}
                            </div>                    
                            )
                })}
            </div>
                 )
    }
}

export default AccessoryShowRoute
