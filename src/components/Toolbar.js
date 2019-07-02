import React from 'react';
import {} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com/'
}

class Toolbar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
products: [],
        }

    }
        componentDidMount() {
            // https://stackoverflow.com/questions/49684217/how-to-use-fetch-api-in-react-to-setstate
            const that = this;
            fetch(baseURL + '/users')
                .then(function(response) {
                    return response.json();
                })
                .then(function(jsonData) {
                    return jsonData;
                })
                .then(function(jsonStr) {
                    that.setState({ products: jsonStr });
                });
                console.log(baseURL + '/users')
                console.log(this.state.products)
        }

    render()
    
    {
        return (

           
            this.state.products.map((item, index) => {
                return (
                  <div className = 'logo-choice' key = {item._id} index = {index} >
                    <div>
                        {item.name}
                    </div>
                  </div>
                      )
              })

    

        
  
 
        )
    }
}

export default Toolbar
