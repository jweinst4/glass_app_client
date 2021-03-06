import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css'; 



const aws = require('aws-sdk');
require('dotenv').config()

let currentImage ='';
let clickCounter = 0;
let allImages = [];

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentImage: 'https://jweinst4.s3.amazonaws.com/GlassApp/Images/Lightboards/S66A_Lightboard_System.jpg',
            counter: 0,
        }
        this.nextImage = this.nextImage.bind(this)
    }
   // https://stackoverflow.com/questions/39426083/update-react-component-every-second
   componentDidMount() {
    // https://stackoverflow.com/questions/46207198/how-i-can-use-dropdown-from-materialize-css-in-react
let elems = document.querySelectorAll('.dropdown-trigger');
M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});

 this.interval = setInterval(() => this.nextImage(), 5000)    
 
 }

 componentWillUnmount() {
    clearInterval(this.interval);

  }

  nextImage() {

    if (clickCounter === 0) {
      allImages = [...this.props.lightboards,...this.props.studios,...this.props.accessories]
      console.log(this.props.lightboards)
      console.log(this.props.studios)
      console.log(this.props.accessories)
      console.log(allImages)
    }
    
    if (this.state.counter === allImages.length - 1){
      this.setState({counter: 0})
      this.setState({currentImage: allImages[allImages.length - 1].image})
    }

    else {
      this.setState({currentImage: allImages[this.state.counter].image})
      this.setState({counter: this.state.counter + 1})  
    }
    clickCounter ++;
  }



    render() {
        return (
            <div className = 'row'>

            
            <div className = 'carouselContainerOuter'>
              
              <div className = 'carouselContainerInner'>
   
                <img className = 'currentCarouselImage' onClick = {this.nextImage} src = {this.state.currentImage} />         
          
                </div>
              </div>


            <div className = 'homepageText col s6 m6 l6'>

            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h5>

            <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h5>
          
            </div>
            
            </div>
  
                 )
    }
}

export default Home
