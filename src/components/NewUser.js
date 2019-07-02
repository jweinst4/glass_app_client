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



class NewUser extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           users: [],
           name: '',
           email: '',

        }
        this.handleUserChange = this.handleUserChange.bind(this)
        this.handleUserSubmit = this.handleUserSubmit.bind(this)
    }


    handleUserChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleUserSubmit(event) {
        event.preventDefault()

        fetch(baseURL + '/users', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
               
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            this.handleAddUser(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        this.setState({name: '',email: ''})
    }

    handleAddUser(item) {
          const copyUsers = [...this.state.users]
          copyUsers.unshift(item)
          this.setState({
            users: copyUsers,
            name: '',
         email: '',
          })
        }

    render() {
        return (

           
         <form className = 'col s12 m12 l12' onSubmit={this.handleUserSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="name">User Name:</label>
                <input className = 'col s6 m6 l6' type="text" id="name" name="name" onChange={this.handleUserChange} value={this.state.name}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="email">Email:</label>
                <input className = 'col s6 m6 l6' type="text" id="email" name="email" onChange={this.handleUserChange} value={this.state.email}  />  
                </div>   
                </div>

                <div className = 'form-row'>
                <input type="submit" value="Add a User"/>
                </div>
              
             
            </form>
        )
    }
}

export default NewUser
