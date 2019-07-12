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



class UpdateFAQTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleFAQEditChange = this.handleFAQEditChange.bind(this)
        this.handleFAQEditSubmit = this.handleFAQEditSubmit.bind(this)

    }
    handleFAQEditChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
       
    }

    handleFAQEditSubmit(event) {
        event.preventDefault()//if you comment out, it edits that field and deletes the rest.

        console.log(this.props.currentEdit)
      
        fetch(baseURL + '/faqs/' + this.props.currentEdit.id, {
            method: 'PUT',
            body: JSON.stringify({
                question: this.state.question,
                answer:this.state.answer,
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
            <form className = 'col s12 m12 l12' onSubmit={this.handleFAQEditSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="question">Question</label>
                <input className = 'col s6 m6 l6' type="text" id="question" name="question" onChange={this.handleFAQEditChange} defaultValue={this.props.currentEdit.question}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="answer">Answer</label>
                <input className = 'col s6 m6 l6' type="text" id="answer" name="answer" onChange={this.handleFAQEditChange} defaultValue={this.props.currentEdit.answer}  />  
                </div>   
                </div>

                <div className = 'form-row'>
                <input type="submit" value="Edit a FAQ"/>
                </div>
            </form>
  
                 )
    }
}

export default UpdateFAQTest
