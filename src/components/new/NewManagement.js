import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import UpdateManagement from '../new/UpdateManagement.js';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class NewManagement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          item: '',
        }
        this.handleManagementChange = this.handleManagementChange.bind(this)
        this.handleManagementSubmit = this.handleManagementSubmit.bind(this)
        this.handleManagementDelete = this.handleManagementDelete.bind(this)
        this.handleManagementEdit = this.handleManagementEdit.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
    }

    toggleEdit() {
        this.setState({edit: !this.state.edit})    
    }

    handleEditItem() {
        this.props.getManagements()
        this.setState({item: ''})
        this.toggleEdit()
    }

    handleManagementEdit(id) { 
        if (this.props.fakeAuth.isAuthenticated) {
            this.toggleEdit()
            this.setState({currentEdit: id})
            console.log(this.state.currentEdit)
        }
        else {
            alert('Please login')
        }   
        
    }

    handleManagementDelete(id) {
        if (this.props.fakeAuth.isAuthenticated) {
            fetch(baseURL + '/managements/' + id, { method: 'DELETE' }).then(response => {
                this.props.getManagements()
            })
        }
        else {
            alert('Please login')
        }
    }

    deleteItem(id) {
        this.props.
        fetch(baseURL + '/managements/' + (id + 1), { method: 'DELETE' }).then(response => {
            console.log(id)
        })
    }

    handleManagementChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleManagementSubmit(event) {
        event.preventDefault()

        if (this.props.fakeAuth.isAuthenticated) {
        fetch(baseURL + '/managements', {
            method: 'POST',
            body: JSON.stringify({
                item: this.state.item,            
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            this.props.handleAddManagement(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        this.setState({
           item: '',
           
          })
        }
        else {
            alert('Please login')
        }
    }

    handleAddManagement(item) {
          const copyManagement = [...this.state.managements]
          copyManagement.unshift(item)
          this.setState({
            managements: copyManagement,
            item: '',
          
          })
        }

    render() {
        return (
            <div className = 'row showContent'>
            <div className = 'col rightBlackBox'></div>
            <div className = 'col leftWhiteBox'>
                <div className = 'aboutWrapper'>
                    <div className = 'aboutHeader'>
                        New Management
                    </div>
                    {this.state.edit  ? (
  <> 
 
 <UpdateManagement currentEdit={this.state.currentEdit} handleEditItem={this.handleEditItem}/>
  </>
):(
<>
         <form className = 'col s12 m12 l12' onSubmit={this.handleManagementSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="item">item</label>
                <input className = 'col s6 m6 l6' type="text" id="item" name="item" onChange={this.handleManagementChange} value={this.state.item}  />  
                </div>   
                </div>


                <div className = 'form-row'>
                <input type="submit" value="Add Management"/>
                </div>       
             
            </form>
        </>
        )}
            </div></div>

           <div className = 'cardEditContainer'>
            {this.props.managements.map((item, index) => {
                return (
                    <div className="card cardDelete">
                        <p>
                            Item: {item.item}
                        </p>
                        <p onClick={() => { this.handleManagementDelete(item.id) }} >
                            <i className="small material-icons adminDelete">
                                delete
                            </i>
                        </p>
                        <p onClick={() => { this.handleManagementEdit(item) }} className = 'adminEdit'>
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

export default NewManagement
