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





class ContactForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        name: '',
         email: '',
         message: '',


        }
        this.handleContactChange = this.handleContactChange.bind(this)
        this.handleContactSubmit = this.handleContactSubmit.bind(this)
        this.sendEmail = this.sendEmail.bind(this)
    }


    handleContactChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleContactSubmit(event) {
        event.preventDefault()
        console.log(this.state.name,this.state.email,this.state.message)
        this.sendEmail(this.state.name,this.state.email,this.state.message)
    }

    sendEmail(name,email,message) {
        var templateParams = {
          name: name,
          email: email,
          message: message,
        };
         
        emailjs.send('gmail', 'contact_form', templateParams,'user_9Z15AiUlH6qGAT2Ro6H3m')
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
               alert('Thank you for your submission!')
            }, function(error) {
               console.log('FAILED...', error);
               alert('There was a technical issue with your submisson.  We will look into this, thank you!')
            });
    }


    

    render() {
        return (
          <div className = 'row aboutContent'>
          <div className = 'col rightBlackBox'></div>
          <div className = 'col leftWhiteBox'></div>
        
          <div className = 'aboutContainer'>
          <div className = 'aboutHeader'>
            Contact Form: 
          </div>
          <form className = 'col s12 m12 l12 contactForm' onSubmit={this.handleContactSubmit}>
         
         <div className = 'form-inline'>
         <div className = 'col s12 m12 l12 form-group'>
         <label className = 'col s2 m2 l2' htmlFor="name"><span className = 'contactLabel'>Name: </span></label>
             <input className = 'col s6 m6 l6 contactInput' type="text" id="name" name="name" onChange={this.handleContactChange} value={this.state.name}  />  
             </div>   
             </div>

             <div className = 'form-inline'>
         <div className = 'col s12 m12 l12 form-group'>
         <label className = 'col s2 m2 l2' htmlFor="email"><span className = 'contactLabel'>Email: </span></label>
             <input className = 'col s6 m6 l6 contactInput' type="text" id="email" name="email" onChange={this.handleContactChange} value={this.state.email}  />  
             </div>   
             </div>

             <div className = 'form-inline'>
         <div className = 'col s12 m12 l12 form-group'>
         <label className = 'col s2 m2 l2' htmlFor="message"><span className = 'contactLabel'>Message: </span></label>
             <textarea className = 'col s6 m6 l6 contactInput' type="text" id="message" name="message" onChange={this.handleContactChange} value={this.state.message}  />  
             </div>   
             </div>


             <div className = 'form-row'>
               <input className = 'contactSubmit' type="submit" value="Submit Your Message"/>
             </div>
           
          
         </form>
          </div>
        </div>
                 )
    }
}

export default ContactForm
