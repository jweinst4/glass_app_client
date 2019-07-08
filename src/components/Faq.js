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
       currentFAQ: '',
        }
     this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {

    }

handleClick(item) {
  this.setState({currentFAQ: item.id})
  console.log(this.state.currentFAQ)

}

    

    render() {
        return (
          
            <div className = 'row faqContent'>

{this.props.faq.map((item, index) => {
                 return (
                   <div className = 'faqItem' key = {item._id} index = {index} >
                     <h6 onClick={() => { 
                                this.handleClick(item) }}>{item.question}</h6>
                     
                     { this.state.currentFAQ === item.id ? (
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

            
        )
    }
}

export default FAQ
