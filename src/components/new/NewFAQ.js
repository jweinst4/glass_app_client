import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import UpdateFAQ from '../update/UpdateFAQ.js'

require('dotenv').config()
const aws = require('aws-sdk');
const emailjs = require('emailjs-com');

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}

class NewFAQ extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
         
        }
        this.handleFAQChange = this.handleFAQChange.bind(this)
        this.handleFAQSubmit = this.handleFAQSubmit.bind(this)
        this.handleFAQDelete = this.handleFAQDelete.bind(this)
        this.handleFAQEdit = this.handleFAQEdit.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
    }

    toggleEdit() {
        this.setState({edit: !this.state.edit})    
    }

    handleEditItem() {
        this.props.getFAQs()
        this.setState({question: ''})
        this.setState({answer: ''})
        this.setState({answertwo: ''})
        this.setState({answerthree: ''})
        this.setState({answerfour: ''})
        this.setState({answerfive: ''})
        this.setState({answersix: ''})
        this.setState({answerseven: ''})
        this.setState({answereight: ''})
        this.setState({answernine: ''})
        this.setState({answerten: ''})
        this.toggleEdit()
    }

    handleFAQEdit(id) { 
        if (this.props.fakeAuth.isAuthenticated) {
            this.toggleEdit()
            this.setState({currentEdit: id})
            console.log(this.state.currentEdit)
        }
        else {
            alert('Please login')
        }   
        
    }

    handleFAQDelete(id) {
        if (this.props.fakeAuth.isAuthenticated) {
            fetch(baseURL + '/faqs/' + id, { method: 'DELETE' }).then(response => {
                this.props.getFAQs()
            })
        }
        else {
            alert('Please login')
        }
    }

    deleteItem(id) {
        this.props.
        fetch(baseURL + '/faqs/' + (id + 1), { method: 'DELETE' }).then(response => {
            console.log(id)
        })
    }

    handleFAQChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleFAQSubmit(event) {
        event.preventDefault()

        if (this.props.fakeAuth.isAuthenticated) {
        fetch(baseURL + '/faqs', {
            method: 'POST',
            body: JSON.stringify({
                question: this.state.question,
                answer: this.state.answer,             
                answertwo: this.state.answertwo,             
                answerthree: this.state.answerthree,             
                answerfour: this.state.answerfour,             
                answerfive: this.state.answerfive,             
                answersix: this.state.answersix,             
                answerseven: this.state.answerseven,             
                answereight: this.state.answereight,             
                answernine: this.state.answernine,             
                answerten: this.state.answerten,             
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            this.props.handleAddFAQ(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        this.setState({
            question: '',
            answer: '',
            answertwo: '',
            answerthree: '',
            answerfour: '',
            answerfive: '',
            answersix: '',
            answerseven: '',
            answereight: '',
            answernine: '',
            answerten: '',
          })
        }
        else {
            alert('Please login')
        }
    }

    handleAddFAQ(item) {
          const copyFAQs = [...this.state.faqs]
          copyFAQs.unshift(item)
          this.setState({
            faqs: copyFAQs,
            question: '',
            answer: '',
            answertwo: '',
            answerthree: '',
            answerfour: '',
            answerfive: '',
            answersix: '',
            answerseven: '',
            answereight: '',
            answernine: '',
            answerten: '',
          })
        }


  

    render() {
        return (
            <div className = 'row aboutContent'>
                <div className = 'aboutContainer'>
                <div className = 'aboutHeader'>
                        New FAQ
                    </div>
                    {this.state.edit  ? (
  <> 
 
 <UpdateFAQ currentEdit={this.state.currentEdit} handleEditItem={this.handleEditItem}/>
  </>
):(
<>
         <form className = 'col s12 m12 l12' onSubmit={this.handleFAQSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="question">Question</label>
                <input className = 'col s6 m6 l6' type="text" id="question" name="question" onChange={this.handleFAQChange} value={this.state.question}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="answer">Answer</label>
                <input className = 'col s6 m6 l6' type="text" id="answer" name="answer" onChange={this.handleFAQChange} value={this.state.answer}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="answertwo">answertwo</label>
                <input className = 'col s6 m6 l6' type="text" id="answertwo" name="answertwo" onChange={this.handleFAQChange} value={this.state.answertwo}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="answerthree">answerthree</label>
                <input className = 'col s6 m6 l6' type="text" id="answerthree" name="answerthree" onChange={this.handleFAQChange} value={this.state.answerthree}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="answerfour">answerfour</label>
                <input className = 'col s6 m6 l6' type="text" id="answerfour" name="answerfour" onChange={this.handleFAQChange} value={this.state.answerfour}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="answerfive">answerfive</label>
                <input className = 'col s6 m6 l6' type="text" id="answerfive" name="answerfive" onChange={this.handleFAQChange} value={this.state.answerfive}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="answersix">answersix</label>
                <input className = 'col s6 m6 l6' type="text" id="answersix" name="answersix" onChange={this.handleFAQChange} value={this.state.answersix}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="answerseven">answerseven</label>
                <input className = 'col s6 m6 l6' type="text" id="answerseven" name="answerseven" onChange={this.handleFAQChange} value={this.state.answerseven}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="answereight">answereight</label>
                <input className = 'col s6 m6 l6' type="text" id="answereight" name="answereight" onChange={this.handleFAQChange} value={this.state.answereight}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="answernine">answernine</label>
                <input className = 'col s6 m6 l6' type="text" id="answernine" name="answernine" onChange={this.handleFAQChange} value={this.state.answernine}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="answerten">answerten</label>
                <input className = 'col s6 m6 l6' type="text" id="answerten" name="answerten" onChange={this.handleFAQChange} value={this.state.answerten}  />  
                </div>   
                </div>

                <div className = 'form-row'>
                <input type="submit" value="Add a FAQ"/>
                </div>       
             
            </form>
        </>
        )}<div className = 'cardEditContainer'>
        {this.props.faqs.map((item, index) => {
            return (
                <div className="card cardDelete">
                    <p>
                        Question: {item.question}
                    </p>
                    <p>
                       Answer: {item.answer}
                    </p>

                    <p>
                       answertwo: {item.answertwo}
                    </p>

                    <p>
                       answerthree: {item.answerthree}
                    </p>

                    <p>
                       answerfour: {item.answerfour}
                    </p>

                    <p>
                       answerfive: {item.answerfive}
                    </p>

                    <p>
                       answersix: {item.answersix}
                    </p>

                    <p>
                       answerseven: {item.answerseven}
                    </p>

                    <p>
                       answereight: {item.answereight}
                    </p>

                    <p>
                       answernine: {item.answernine}
                    </p>

                    <p>
                       answerten: {item.answerten}
                    </p>

                    <p onClick={() => { this.handleFAQDelete(item.id) }} >
                        <i className="small material-icons adminDelete">
                            delete
                        </i>
                    </p>
                    <p onClick={() => { this.handleFAQEdit(item) }} className = 'adminEdit'>
                        Edit
                    </p>
                </div>
                    )
        })}
   </div>
          
          </div>
            </div>
  
                 )
    }
}

export default NewFAQ
