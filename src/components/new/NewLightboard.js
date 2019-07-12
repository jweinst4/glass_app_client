import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import UpdateLightboard from '../update/UpdateLightboard.js';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class NewLightboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            image: '',
            code: '',
            description: '',
            price: '',
            category: 'lightboard',
        }
        this.handleLightboardChange = this.handleLightboardChange.bind(this)
        this.handleLightboardSubmit = this.handleLightboardSubmit.bind(this)
        this.handleLightboardDelete = this.handleLightboardDelete.bind(this)
        this.handleLightboardEdit = this.handleLightboardEdit.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
    }

    toggleEdit() {
        this.setState({edit: !this.state.edit})    
    }

    handleEditItem() {
        this.props.getLightboards()
        this.setState({
            name: '',
            image: '',
            code: '',
            description: '',
            price: '',
            category: 'lightboard',
          })
        this.toggleEdit()
    }

    handleLightboardEdit(id) { 
        if (this.props.fakeAuth.isAuthenticated) {
            this.toggleEdit()
            this.setState({currentEdit: id})
            console.log(this.state.currentEdit)
        }
        else {
            alert('Please login')
        }   
        
    }

    handleLightboardDelete(id) {
        if (this.props.fakeAuth.isAuthenticated) {
            fetch(baseURL + '/lightboards/' + id, { method: 'DELETE' }).then(response => {
                this.props.getLightboards()
            })
        }
        else {
            alert('Please login')
        }
    }

    deleteItem(id) {
        this.props.
        fetch(baseURL + '/lightboards/' + (id + 1), { method: 'DELETE' }).then(response => {
            console.log(id)
        })
    }

    handleLightboardChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleLightboardSubmit(event) {
        event.preventDefault()

        if (this.props.fakeAuth.isAuthenticated) {
        fetch(baseURL + '/lightboards', {
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
            this.props.handleAddLightboard(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        this.setState({
            name: '',
            image: '',
            code: '',
            description: '',
            price: '',
            category: 'lightboard',
          })
        }
        else {
            alert('Please login')
        }
    }

    handleAddLightboard(item) {
          const copyLightboards = [...this.state.lightboards]
          copyLightboards.unshift(item)
          this.setState({
            lightboards: copyLightboards,
            name: '',
            image: '',
            code: '',
            description: '',
            price: '',
            category: 'lightboard',
          })
        }

    render() {
        return (
            <div className = 'row showContent'>
            <div className = 'col rightBlackBox'></div>
            <div className = 'col leftWhiteBox'>
                <div className = 'aboutWrapper'>
                    <div className = 'aboutHeader'>
                        New Lightboard
                    </div>
                    {this.state.edit  ? (
  <> 
 
 <UpdateLightboard currentEdit={this.state.currentEdit} handleEditItem={this.handleEditItem}/>
  </>
):(
<>
<form className = 'col s12 m12 l12' onSubmit={this.handleLightboardSubmit}>
                    <div className = 'form-inline'>
                        <div className = 'col s12 m12 l12 form-group'>
                            <label className = 'col s2 m2 l2' htmlFor="name">
                                Name
                            </label>
                            <input className = 'col s6 m6 l6' type="text" id="name" name="name" onChange={this.handleLightboardChange} value={this.state.name}  />  
                        </div>   
                    </div>
                    <div className = 'form-inline'>
                        <div className = 'col s12 m12 l12 form-group'>
                            <label className = 'col s2 m2 l2' htmlFor="image">
                                Image
                            </label>
                            <input className = 'col s6 m6 l6' type="text" id="image" name="image" onChange={this.handleLightboardChange} value={this.state.image}  />  
                        </div>   
                    </div>
                    <div className = 'form-inline'>
                        <div className = 'col s12 m12 l12 form-group'>
                            <label className = 'col s2 m2 l2' htmlFor="code">
                                Code
                            </label>
                            <input className = 'col s6 m6 l6' type="text" id="code" name="code" onChange={this.handleLightboardChange} value={this.state.code}  />  
                        </div>   
                    </div>
                    <div className = 'form-inline'>
                        <div className = 'col s12 m12 l12 form-group'>
                            <label className = 'col s2 m2 l2' htmlFor="description">
                                Description
                            </label>
                            <input className = 'col s6 m6 l6' type="text" id="description" name="description" onChange={this.handleLightboardChange} value={this.state.description}  />  
                        </div>   
                    </div>
                    <div className = 'form-inline'>
                        <div className = 'col s12 m12 l12 form-group'>
                            <label className = 'col s2 m2 l2' htmlFor="price">
                                Price
                            </label>
                            <input className = 'col s6 m6 l6' type="number" id="price" name="price" onChange={this.handleLightboardChange} value={this.state.price}  />  
                        </div>   
                    </div>
                    <div className = 'form-row'>
                        <input type="submit" value="Add a Lightboard"/>
                    </div>
                </form>
        </>
        )}
            </div></div>

           <div className = 'cardEditContainer'>
           {this.props.lightboards.map((item, index) => {
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
                        <div className = 'row'>
                            <div className = 'col s1 m1 l1' onClick={() => { this.handleLightboardDelete(item.id) }} >
                                <i className="small material-icons adminDelete">
                                    delete
                                </i>
                            </div>
                            <div className = 'col s1 m1 l1' onClick={() => { this.handleLightboardEdit(item) }} className = 'adminEdit'>
                                Edit
                            </div>
                        </div>
                    </div>
                        )
            })}
       </div>

            </div>
        )
    }
}

export default NewLightboard
