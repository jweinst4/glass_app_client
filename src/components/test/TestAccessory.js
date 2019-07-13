import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import Navbar2 from '../test/Navbar2.js'
import Sidebar from '../test/Sidebar.js'

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class TestAccessory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }
     
    }
componentDidMount() {
    
}

    render() {
        return (
            <div className = 'row aboutContent'>
                {this.props.accessories.map((item, index) => {
                    return (
                            <div>  
                                {item.id === parseInt(this.props.match.params.id) ? (
                                    <> 
                                     <div>
                                        <h3 className = 'showParagraph'>
                                            {item.name}
                                        </h3>
                                        <h5 className = 'showParagraph'>{item.description}
                                        </h5>
                                        <h4 className = 'showParagraph'>${item.price}
                                        </h4>
                                    </div> 
                                    <div>
                                        <img className = 'currentShowImage currentAccessoryImage' src={item.image} />
                                    </div>
                                   
                                       
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

export default TestAccessory
