import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import UpdatePrivacy from '../update/UpdatePrivacy.js';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class NewPrivacy extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          item: '',
        }
        this.handlePrivacyChange = this.handlePrivacyChange.bind(this)
        this.handlePrivacySubmit = this.handlePrivacySubmit.bind(this)
        this.handlePrivacyDelete = this.handlePrivacyDelete.bind(this)
        this.handlePrivacyEdit = this.handlePrivacyEdit.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
    }

    toggleEdit() {
        this.setState({edit: !this.state.edit})    
    }

    handleEditItem() {
        this.props.getPrivacy()
        this.setState({item: ''})
        this.toggleEdit()
    }

    handlePrivacyEdit(id) { 
        if (this.props.fakeAuth.isAuthenticated) {
            this.toggleEdit()
            this.setState({currentEdit: id})
            console.log(this.state.currentEdit)
        }
        else {
            alert('Please login')
        }   
        
    }

    handlePrivacyDelete(id) {
        if (this.props.fakeAuth.isAuthenticated) {
            fetch(baseURL + '/privacies/' + id, { method: 'DELETE' }).then(response => {
                this.props.getPrivacy()
            })
        }
        else {
            alert('Please login')
        }
    }

    deleteItem(id) {
        this.props.
        fetch(baseURL + '/privacies/' + (id + 1), { method: 'DELETE' }).then(response => {
            console.log(id)
        })
    }

    handlePrivacyChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handlePrivacySubmit(event) {
        event.preventDefault()

        if (this.props.fakeAuth.isAuthenticated) {
        fetch(baseURL + '/privacies', {
            method: 'POST',
            body: JSON.stringify({
                item: this.state.item,            
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            this.props.handleAddPrivacy(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        this.setState({
           item: '',
           
          })
        }
        else {
            alert('Please login')
        }
    }

    handleAddPrivacy(item) {
          const copyPrivacy = [...this.state.privacies]
          copyPrivacy.unshift(item)
          this.setState({
            privacies: copyPrivacy,
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
                        New Privacy
                    </div>
                    {this.state.edit  ? (
  <> 
 
 <UpdatePrivacy currentEdit={this.state.currentEdit} handleEditItem={this.handleEditItem}/>
  </>
):(
<>
         <form className = 'col s12 m12 l12' onSubmit={this.handlePrivacySubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="item">item</label>
                <input className = 'col s6 m6 l6' type="text" id="item" name="item" onChange={this.handlePrivacyChange} value={this.state.item}  />  
                </div>   
                </div>


                <div className = 'form-row'>
                <input type="submit" value="Add Privacy"/>
                </div>       
             
            </form>
        </>
        )}
            </div></div>

           <div className = 'cardEditContainer'>
            {this.props.privacy.map((item, index) => {
                return (
                    <div className="card privacyCard">
                        <p>
                            Item: {item.item}
                        </p>
                        <p onClick={() => { this.handlePrivacyDelete(item.id) }} >
                            <i className="small material-icons adminDelete">
                                delete
                            </i>
                        </p>
                        <p onClick={() => { this.handlePrivacyEdit(item) }} className = 'adminEdit'>
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

export default NewPrivacy
