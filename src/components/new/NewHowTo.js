import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import UpdateHowTo from '../new/UpdateHowTo.js';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class NewHowTo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          item: '',
        }
        this.handleHowToChange = this.handleHowToChange.bind(this)
        this.handleHowToSubmit = this.handleHowToSubmit.bind(this)
        this.handleHowToDelete = this.handleHowToDelete.bind(this)
        this.handleHowToEdit = this.handleHowToEdit.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
    }

    toggleEdit() {
        this.setState({edit: !this.state.edit})    
    }

    handleEditItem() {
        this.props.getHowTos()
        this.setState({item: ''})
        this.toggleEdit()
    }

    handleHowToEdit(id) { 
        if (this.props.fakeAuth.isAuthenticated) {
            this.toggleEdit()
            this.setState({currentEdit: id})
            console.log(this.state.currentEdit)
        }
        else {
            alert('Please login')
        }   
        
    }

    handleHowToDelete(id) {
        if (this.props.fakeAuth.isAuthenticated) {
            fetch(baseURL + '/howtos/' + id, { method: 'DELETE' }).then(response => {
                this.props.getHowTos()
            })
        }
        else {
            alert('Please login')
        }
    }

    deleteItem(id) {
        this.props.
        fetch(baseURL + '/howtos/' + (id + 1), { method: 'DELETE' }).then(response => {
            console.log(id)
        })
    }

    handleHowToChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleHowToSubmit(event) {
        event.preventDefault()

        if (this.props.fakeAuth.isAuthenticated) {
        fetch(baseURL + '/howtos', {
            method: 'POST',
            body: JSON.stringify({
                item: this.state.item,            
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            this.props.handleAddHowTo(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        this.setState({
           item: '',
           
          })
        }
        else {
            alert('Please login')
        }
    }

    handleAddHowTo(item) {
          const copyHowTo = [...this.state.howtos]
          copyHowTo.unshift(item)
          this.setState({
            howtos: copyHowTo,
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
                        New HowTo
                    </div>
                    {this.state.edit  ? (
  <> 
 
 <UpdateHowTo currentEdit={this.state.currentEdit} handleEditItem={this.handleEditItem}/>
  </>
):(
<>
         <form className = 'col s12 m12 l12' onSubmit={this.handleHowToSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="item">item</label>
                <input className = 'col s6 m6 l6' type="text" id="item" name="item" onChange={this.handleHowToChange} value={this.state.item}  />  
                </div>   
                </div>


                <div className = 'form-row'>
                <input type="submit" value="Add HowTo"/>
                </div>       
             
            </form>
        </>
        )}
            </div></div>

           <div className = 'cardEditContainer'>
            {this.props.howtos.map((item, index) => {
                return (
                    <div className="card cardDelete">
                        <p>
                            Item: {item.item}
                        </p>
                        <p onClick={() => { this.handleHowToDelete(item.id) }} >
                            <i className="small material-icons adminDelete">
                                delete
                            </i>
                        </p>
                        <p onClick={() => { this.handleHowToEdit(item) }} className = 'adminEdit'>
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

export default NewHowTo
