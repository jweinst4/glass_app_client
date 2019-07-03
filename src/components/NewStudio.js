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



class NewStudio extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          name: '',
          image: '',
          code: '',
          description: '',
          price: '',

        }
        this.handleStudioChange = this.handleStudioChange.bind(this)
        this.handleStudioSubmit = this.handleStudioSubmit.bind(this)
    }


    handleStudioChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleStudioSubmit(event) {
        event.preventDefault()

        fetch(baseURL + '/studios', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.name,
                image: this.state.image,
                code: this.state.code,
                description: this.state.description,
                price: this.state.price,
               
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            this.handleAddStudio(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        this.setState({
            name: '',
            image: '',
            code: '',
            description: '',
            price: '',})
    }

    handleAddStudio(item) {
          const copyStudios = [...this.state.studios]
          copyStudios.unshift(item)
          this.setState({
            studios: copyStudios,
            name: '',
            image: '',
            code: '',
            description: '',
            price: '',
          })
        }

    render() {
        return (

            <div className = 'studioContainer'>
         <form className = 'col s12 m12 l12' onSubmit={this.handleStudioSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="name">Name</label>
                <input className = 'col s6 m6 l6' type="text" id="name" name="name" onChange={this.handleStudioChange} value={this.state.name}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="image">Image</label>
                <input className = 'col s6 m6 l6' type="text" id="image" name="image" onChange={this.handleStudioChange} value={this.state.image}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="code">Code</label>
                <input className = 'col s6 m6 l6' type="text" id="code" name="code" onChange={this.handleStudioChange} value={this.state.code}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="description">Description</label>
                <input className = 'col s6 m6 l6' type="text" id="description" name="description" onChange={this.handleStudioChange} value={this.state.description}  />  
                </div>   
                </div>

                <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="price">Price</label>
                <input className = 'col s6 m6 l6' type="number" id="price" name="price" onChange={this.handleStudioChange} value={this.state.price}  />  
                </div>   
                </div>



                <div className = 'form-row'>
                <input type="submit" value="Add a Studio"/>
                </div>
              
             
            </form>

            <div className = 'col'>
           {this.props.studios.map((item, index) => {
                return (
                  <div className = 'logo-choice' key = {item._id} index = {index} >
                    <div>
                    Index: {index}, Name: {item.name}, Description: {item.description}
                    </div>
                  </div>
                      )
              })}
           
           </div>

            </div>
        )
    }
}

export default NewStudio
