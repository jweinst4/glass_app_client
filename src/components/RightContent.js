import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css'; 



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
          allImages: ['https://i.imgur.com/DLZnino.jpg','https://i.imgur.com/kNCm2Qv.jpg','https://i.imgur.com/E1sSnOH.jpg','https://i.imgur.com/mxr79bm.jpg'],
          
        currentImage: '',
        counter: 0,
        }
        this.nextImage = this.nextImage.bind(this)
      }
        
      componentDidMount() {
      this.setState({currentImage: this.state.allImages[0]})
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
