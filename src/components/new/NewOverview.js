import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import UpdateOverview from '../new/UpdateOverview.js';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class NewOverview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          item: '',
        }
        this.handleOverviewChange = this.handleOverviewChange.bind(this)
        this.handleOverviewSubmit = this.handleOverviewSubmit.bind(this)
        this.handleOverviewDelete = this.handleOverviewDelete.bind(this)
        this.handleOverviewEdit = this.handleOverviewEdit.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
    }

    toggleEdit() {
        this.setState({edit: !this.state.edit})    
    }

    handleEditItem() {
        this.props.getOverviews()
        this.setState({item: ''})
        this.toggleEdit()
    }

    handleOverviewEdit(id) { 
        if (this.props.fakeAuth.isAuthenticated) {
            this.toggleEdit()
            this.setState({currentEdit: id})
            console.log(this.state.currentEdit)
        }
        else {
            alert('Please login')
        }   
        
    }

    handleOverviewDelete(id) {
        if (this.props.fakeAuth.isAuthenticated) {
            fetch(baseURL + '/overviews/' + id, { method: 'DELETE' }).then(response => {
                this.props.getOverviews()
            })
        }
        else {
            alert('Please login')
        }
    }

    deleteItem(id) {
        this.props.
        fetch(baseURL + '/overviews/' + (id + 1), { method: 'DELETE' }).then(response => {
            console.log(id)
        })
    }

    handleOverviewChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleOverviewSubmit(event) {
        event.preventDefault()

        if (this.props.fakeAuth.isAuthenticated) {
        fetch(baseURL + '/overviews', {
            method: 'POST',
            body: JSON.stringify({
                item: this.state.item,            
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            this.props.handleAddOverview(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        this.setState({
           item: '',
           
          })
        }
        else {
            alert('Please login')
        }
    }

    handleAddOverview(item) {
          const copyOverview = [...this.state.overviews]
          copyOverview.unshift(item)
          this.setState({
            overviews: copyOverview,
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
                        New Overview
                    </div>
                    {this.state.edit  ? (
  <> 
 
 <UpdateOverview currentEdit={this.state.currentEdit} handleEditItem={this.handleEditItem}/>
  </>
):(
<>
         <form className = 'col s12 m12 l12' onSubmit={this.handleOverviewSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="item">item</label>
                <input className = 'col s6 m6 l6' type="text" id="item" name="item" onChange={this.handleOverviewChange} value={this.state.item}  />  
                </div>   
                </div>


                <div className = 'form-row'>
                <input type="submit" value="Add Overview"/>
                </div>       
             
            </form>
        </>
        )}
            </div></div>

           <div className = 'cardEditContainer'>
            {this.props.overviews.map((item, index) => {
                return (
                    <div className="card cardDelete">
                        <p>
                            Item: {item.item}
                        </p>
                        <p onClick={() => { this.handleOverviewDelete(item.id) }} >
                            <i className="small material-icons adminDelete">
                                delete
                            </i>
                        </p>
                        <p onClick={() => { this.handleOverviewEdit(item) }} className = 'adminEdit'>
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

export default NewOverview
