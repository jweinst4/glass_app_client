import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

require('dotenv').config()
const aws = require('aws-sdk');
const emailjs = require('emailjs-com');

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class Updaudio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
        this.handleStudioEditChange = this.handleStudioEditChange.bind(this)
        this.handleStudioEditSubmit = this.handleStudioEditSubmit.bind(this)

    }
    handleStudioEditChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
       
    }

    handleStudioEditSubmit(event) {
        event.preventDefault()//if you comment out, it edits that field and deletes the rest.

        console.log(this.props.currentEdit)
      
        fetch(baseURL + '/studios/' + this.props.currentEdit.id, {
            method: 'PUT',
            body: JSON.stringify({
                name: this.state.name,
                image: this.state.image,
                code: this.state.code,
                description: this.state.description,
                price: this.state.price,
                category: 'studio',   
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            // console.log(resJSON)
            this.props.handleEditItem(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        
    }




    render() {
        return (
            <form className = 'col s12 m12 l12' onSubmit={this.handleStudioEditSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="name">Name</label>
                <input className = 'col s6 m6 l6' type="text" id="name" name="name" onChange={this.handleStudioEditChange} defaultValue={this.props.currentEdit.name}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="image">Image</label>
                <input className = 'col s6 m6 l6' type="text" id="image" name="image" onChange={this.handleStudioEditChange} defaultValue={this.props.currentEdit.image}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="code">Code</label>
                <input className = 'col s6 m6 l6' type="text" id="code" name="code" onChange={this.handleStudioEditChange} defaultValue={this.props.currentEdit.code}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="description">Description</label>
                <input className = 'col s6 m6 l6' type="text" id="description" name="description" onChange={this.handleStudioEditChange} defaultValue={this.props.currentEdit.description}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="price">Price</label>
                <input className = 'col s6 m6 l6' type="number" id="price" name="price" onChange={this.handleStudioEditChange} defaultValue={this.props.currentEdit.price}  />  
                </div>   
                </div>

                <div className = 'form-row'>
                <input type="submit" value="Edit a Studio"/>
                </div>
            </form>
  
                 )
    }
}

export default Updaudio
