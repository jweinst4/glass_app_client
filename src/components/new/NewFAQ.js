import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import UpdateFAQ from '../update/UpdateFAQ.js';

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
          question: '',
          answer: '',
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
console.log(this.state.question)
console.log(this.state.answer)
        if (this.props.fakeAuth.isAuthenticated) {
        fetch(baseURL + '/faqs', {
            method: 'POST',
            body: JSON.stringify({
                question: this.state.question,
                answer: this.state.answer,             
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
          })
        }

    render() {
        return (
            <div className = 'row showContent'>
            <div className = 'col rightBlackBox'></div>
            <div className = 'col leftWhiteBox'>
                <div className = 'aboutWrapper'>
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

                <div className = 'form-row'>
                <input type="submit" value="Add a FAQ"/>
                </div>       
             
            </form>
        </>
        )}
            </div></div>

           <div className = 'cardEditContainer'>
            {this.props.faqs.map((item, index) => {
                return (
                    <div className="card cardDelete">
                        <p>
                            Question: {item.question}
                        </p>
                        <p>
                           Answer: {item.answer}
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
        )
    }
}

export default NewFAQ
