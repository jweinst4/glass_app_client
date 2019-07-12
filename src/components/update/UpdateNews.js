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



class UpdateNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.handleNewsEditChange = this.handleNewsEditChange.bind(this)
        this.handleNewsEditSubmit = this.handleNewsEditSubmit.bind(this)

    }
    handleNewsEditChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value })
       
    }

    handleNewsEditSubmit(event) {
        event.preventDefault()//if you comment out, it edits that field and deletes the rest.

        console.log(this.props.currentEdit)
      
        fetch(baseURL + '/news/' + this.props.currentEdit.id, {
            method: 'PUT',
            body: JSON.stringify({
                item: this.state.item,
              
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
            
            <form className = 'col s12 m12 l12' onSubmit={this.handleNewsEditSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="item">Item</label>
                <input className = 'col s6 m6 l6' type="text" id="item" name="item" onChange={this.handleNewsEditChange} defaultValue={this.props.currentEdit.item}  />  
                </div>   
                </div>

                <div className = 'form-row'>
                <input type="submit" value="Edit a News"/>
                </div>
            </form>
        )
    }
}

export default UpdateNews
