import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import UpdateNews from '../new/UpdateNews.js';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class NewNews extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          item: '',
        }
        this.handleNewsChange = this.handleNewsChange.bind(this)
        this.handleNewsSubmit = this.handleNewsSubmit.bind(this)
        this.handleNewsDelete = this.handleNewsDelete.bind(this)
        this.handleNewsEdit = this.handleNewsEdit.bind(this)
        this.toggleEdit = this.toggleEdit.bind(this)
        this.handleEditItem = this.handleEditItem.bind(this)
    }

    toggleEdit() {
        this.setState({edit: !this.state.edit})    
    }

    handleEditItem() {
        this.props.getNews()
        this.setState({item: ''})
        this.toggleEdit()
    }

    handleNewsEdit(id) { 
        if (this.props.fakeAuth.isAuthenticated) {
            this.toggleEdit()
            this.setState({currentEdit: id})
            console.log(this.state.currentEdit)
        }
        else {
            alert('Please login')
        }   
        
    }

    handleNewsDelete(id) {
        if (this.props.fakeAuth.isAuthenticated) {
            fetch(baseURL + '/news/' + id, { method: 'DELETE' }).then(response => {
                this.props.getNews()
            })
        }
        else {
            alert('Please login')
        }
    }

    deleteItem(id) {
        this.props.
        fetch(baseURL + '/news/' + (id + 1), { method: 'DELETE' }).then(response => {
            console.log(id)
        })
    }

    handleNewsChange(event) {
        this.setState({ [event.currentTarget.id]: event.currentTarget.value }) 
    }

    handleNewsSubmit(event) {
        event.preventDefault()

        if (this.props.fakeAuth.isAuthenticated) {
        fetch(baseURL + '/news', {
            method: 'POST',
            body: JSON.stringify({
                item: this.state.item,            
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(resJSON => {
            this.props.handleAddNews(resJSON)
        }).catch(error => console.error({ 'Error': error }))
        this.setState({
           item: '',
           
          })
        }
        else {
            alert('Please login')
        }
    }

    handleAddNews(item) {
          const copyNews = [...this.state.news]
          copyNews.unshift(item)
          this.setState({
            news: copyNews,
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
                        New News
                    </div>
                    {this.state.edit  ? (
  <> 
 
 <UpdateNews currentEdit={this.state.currentEdit} handleEditItem={this.handleEditItem}/>
  </>
):(
<>
         <form className = 'col s12 m12 l12' onSubmit={this.handleNewsSubmit}>
         
            <div className = 'form-inline'>
            <div className = 'col s12 m12 l12 form-group'>
            <label className = 'col s2 m2 l2' htmlFor="item">item</label>
                <input className = 'col s6 m6 l6' type="text" id="item" name="item" onChange={this.handleNewsChange} value={this.state.item}  />  
                </div>   
                </div>


                <div className = 'form-row'>
                <input type="submit" value="Add News"/>
                </div>       
             
            </form>
        </>
        )}
            </div></div>

           <div className = 'cardEditContainer'>
            {this.props.news.map((item, index) => {
                return (
                    <div className="card cardDelete">
                        <p>
                            Item: {item.item}
                        </p>
                        <p onClick={() => { this.handleNewsDelete(item.id) }} >
                            <i className="small material-icons adminDelete">
                                delete
                            </i>
                        </p>
                        <p onClick={() => { this.handleNewsEdit(item) }} className = 'adminEdit'>
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

export default NewNews
