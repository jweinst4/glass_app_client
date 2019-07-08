import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css'; 



require('dotenv').config()
const aws = require('aws-sdk');
let allImagesHere =[];


let baseURL = process.env.REACT_APP_BASEURL


  
    
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}
// https://codepen.io/nbondy/pen/qjPyvW

class RightContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          currentImage: '',
          counter: 0,
          allImages: ['https://jweinst4.s3.amazonaws.com/GlassApp/Accessories/Decimator.jpg','https://jweinst4.s3.amazonaws.com/GlassApp/Accessories/Dracast.jpg','https://jweinst4.s3.amazonaws.com/GlassApp/Accessories/Markers.jpg','https://jweinst4.s3.amazonaws.com/GlassApp/Accessories/Mini-recoders.jpg','https://jweinst4.s3.amazonaws.com/GlassApp/Lightboards/S66A Lightboard System.jpg','https://jweinst4.s3.amazonaws.com/GlassApp/Studios/S33 Table Top Lightboard Studio Package.jpg','https://jweinst4.s3.amazonaws.com/GlassApp/Studios/S66 Standalone Lightboard Studio Package.jpg']
    
        }
        
        this.nextImage = this.nextImage.bind(this)
        this.getInitialImage = this.getInitialImage.bind(this)
      }
      // https://stackoverflow.com/questions/39426083/update-react-component-every-second
      componentDidMount() {
      this.setState({currentImage: this.state.allImages[0]})
      this.interval = setInterval(() => this.nextImage(), 100000)
      }

      componentDidUpdate() {
   
      }

      getInitialImage() {
        
      }

      componentWillUnmount() {
        clearInterval(this.interval);

      }

      nextImage() {
        if (this.state.counter === this.state.allImages.length - 1) {
          this.setState({currentImage: this.state.allImages[0]})
          this.setState({counter: 0})

        }
        else {
          this.setState({currentImage: this.state.allImages[this.state.counter + 1]})
          this.setState({counter: this.state.counter + 1})
        }    
      }

    render() {
     
        return (
        
            <div className='rightContent col s10 m10 l10'>

           
              <img className = 'currentCarouselImage' src = {this.state.currentImage} onClick = {this.nextImage}></img>
        
              </div>
      

    

        )
    }
}

export default RightContent
