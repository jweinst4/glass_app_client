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



class FAQ extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentFAQ: [],
        }
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
      
    }
    

    handleClick(item) {

        if (this.state.currentFAQ === item) {
          this.setState({currentFAQ: ''})
        }
        else {
        this.setState({currentFAQ: item})
        }
      
      }

    render() {
        return (
            <div className = 'row aboutContent'>
            
            
              <div className = 'aboutContainer'>
              <div className = 'aboutHeader'>
                Frequently Asked Questions: 
              </div>
              {this.props.faqs.map((item, index) => {
                              return (
                                <div className = 'faqItem' onClick={() => { 
                                  this.handleClick(item) }} key = {item._id} index = {index} >

    { this.state.currentFAQ.id === item.id ? (
                <> 
                <i className="material-icons faqIcon" >remove_circle_outline</i>
                </>
              ):(
              <>
              
                <i className="material-icons faqIcon" >add_circle_outline</i>
              </>
              )}
                                  {item.question}
                                  
                                  { this.state.currentFAQ.id === item.id ? (
                <> 
                <div className = 'faqAnswer'>
              <h6>{item.answer}</h6>
              <h6>{item.answertwo}</h6>
              <h6>{item.answerthree}</h6>
              <h6>{item.answerfour}</h6>
              <h6>{item.answerfive}</h6>
              <h6>{item.answersix}</h6>
              <h6>{item.answerseven}</h6>
              <h6>{item.answereight}</h6>
              <h6>{item.answernine}</h6>
              <h6>{item.answerten}</h6>
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
            </div>
  
                 )
    }
}

export default FAQ
