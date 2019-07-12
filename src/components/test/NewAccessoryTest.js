import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import UpdateAccessoryTest from '../test/UpdateAccessoryTest.js';

require('dotenv').config()
const aws = require('aws-sdk');
const emailjs = require('emailjs-com');

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class NewAccessoryTest extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            image: '',
            code: '',
            description: '',
            price: '',
            category: 'accessory',
        }
        this.handleAccessoryChange = this.handleAccessoryChange.bind(this)
        this.handleAccessorySubmit = this.handleAccessorySubmit.bind(this)
        this.handleAccessoryDelete = this.handleAccessoryDelete.bind(this)
        this.handleAccessoryEdit = this.handleAccessoryEdit.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
    }

    toggleEdit() {
        this.setState({edit: !this.state.edit})    
    }

    handleEditItem() {
        this.props.getAccessories()
        this.state = {
            name: '',
            image: '',
            code: '',
            description: '',
            price: '',
            category: 'accessory',
        }
        this.toggleEdit()
    }

    handleAccessoryEdit(id) { 
        if (this.props.fakeAuth.isAuthenticated) {
            this.toggleEdit()
            this.setState({currentEdit: id})
            console.log(this.state.currentEdit)
        }
        else {
            alert('Please login')
        }   
        
    }

    handleAccessoryDelete(id) {
        if (this.props.fakeAuth.isAuthenticated) {
            fetch(baseURL + '/accessories/' + id, { method: 'DELETE' }).then(response => {
                this.props.getAccessories()
            })
        }
        else {
            alert('Please login')
        }
    }

    deleteItem(id) {
        this.props.
        fetch(baseURL + '/accessories/' + (id + 1), { method: 'DELETE' }).then(response => {
            console.log(id)
        })
    }

    handleAccessoryChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleAccessorySubmit(event) {
        event.preventDefault()

        if (this.props.fakeAuth.isAuthenticated) {
        fetch(baseURL + '/accessories', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                image: this.state.image,
                code: this.state.code,
                description: this.state.description,
                price: this.state.price,
                category: this.state.category,             
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            this.props.handleAddAccessory(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        this.setState({
            name: '',
            image: '',
            code: '',
            description: '',
            price: '',
            category: 'accessory',
          })
        }
        else {
            alert('Please login')
        }
    }

    handleAddAccessory(item) {
          const copyAccessories = [...this.state.accessories]
          copyAccessories.unshift(item)
          this.setState({
            accessories: copyAccessories,
            name: '',
            image: '',
            code: '',
            description: '',
            price: '',
            category: 'accessory',
          })
        }


    render() {
        return (
            <div className = 'row aboutContent'>
                <div className = 'aboutContainer'>
                <div className = 'aboutHeader'>
                        New Accessory
                    </div>
                    {this.state.edit  ? (
  <> 
 
 <UpdateAccessoryTest currentEdit={this.state.currentEdit} handleEditItem={this.handleEditItem}/>
  </>
):(
<>
<form className = 'col s12 m12 l12' onSubmit={this.handleAccessorySubmit}>
                    <div className = 'form-inline'>
                        <div className = 'col s12 m12 l12 form-group'>
                            <label className = 'col s2 m2 l2' htmlFor="name">
                                Name
                            </label>
                            <input className = 'col s6 m6 l6' type="text" id="name" name="name" onChange={this.handleAccessoryChange} value={this.state.name}  />  
                        </div>   
                    </div>
                    <div className = 'form-inline'>
                        <div className = 'col s12 m12 l12 form-group'>
                            <label className = 'col s2 m2 l2' htmlFor="image">
                                Image
                            </label>
                            <input className = 'col s6 m6 l6' type="text" id="image" name="image" onChange={this.handleAccessoryChange} value={this.state.image}  />  
                        </div>   
                    </div>
                    <div className = 'form-inline'>
                        <div className = 'col s12 m12 l12 form-group'>
                            <label className = 'col s2 m2 l2' htmlFor="code">
                                Code
                            </label>
                            <input className = 'col s6 m6 l6' type="text" id="code" name="code" onChange={this.handleAccessoryChange} value={this.state.code}  />  
                        </div>   
                    </div>
                    <div className = 'form-inline'>
                        <div className = 'col s12 m12 l12 form-group'>
                            <label className = 'col s2 m2 l2' htmlFor="description">
                                Description
                            </label>
                            <input className = 'col s6 m6 l6' type="text" id="description" name="description" onChange={this.handleAccessoryChange} value={this.state.description}  />  
                        </div>   
                    </div>
                    <div className = 'form-inline'>
                        <div className = 'col s12 m12 l12 form-group'>
                            <label className = 'col s2 m2 l2' htmlFor="price">
                                Price
                            </label>
                            <input className = 'col s6 m6 l6' type="number" id="price" name="price" onChange={this.handleAccessoryChange} value={this.state.price}  />  
                        </div>   
                    </div>
                    <div className = 'form-row'>
                        <input type="submit" value="Add a Accessory"/>
                    </div>
                </form>
        </>
        )}

<div className = 'cardEditContainer'>
           {this.props.accessories.map((item, index) => {
                return (
                    <div className="card cardDelete">
                        <p>
                            Name: {item.name}
                        </p>
                        <p>
                            Description: {item.description}
                        </p>
                        <p>
                            Price: ${item.price}
                        </p>
                        <p onClick={() => { this.handleAccessoryDelete(item.id) }} >
                            <i className="small material-icons adminDelete" >
                                delete
                            </i>
                        </p>
                        <p onClick={() => { this.handleAccessoryEdit(item) }} className = 'adminEdit'>
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

export default NewAccessoryTest
