import React from 'react';
import {} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}

class Toolbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

    }
     
    render()
    
    {
        return (

           
            this.props.users.map((item, index) => {
                return (
                  <div className = 'logo-choice' key = {item._id} index = {index} >
                    <div>
                        Index: {index}, Name: {item.name}, Email: {item.email}
                    </div>
                  </div>
                      )
              })

    

        
  
 
        )
    }
}

export default Toolbar
