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

          <div className = 'row'>
          
          <div className = 'row faqContent'>
        
          {this.props.faq.map((item, index) => {
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
           <h6>{item.answer}</h6>
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