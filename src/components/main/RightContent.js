import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css'; 



const aws = require('aws-sdk');
require('dotenv').config()

let amazonObject = [];
let amazonObjectURL = [];
let allImages=[];
let currentImage ='';
let newArray=[];

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
          currentImage: 'https://jweinst4.s3.amazonaws.com/GlassApp/Images/Lightboards/S33A_Table_Top_Lightboard_System.jpg',
          counter: 0,
        }
        this.nextImage = this.nextImage.bind(this)
        this.getInitialImage = this.getInitialImage.bind(this)
      }
      // https://stackoverflow.com/questions/39426083/update-react-component-every-second
      componentDidMount() {
         // https://stackoverflow.com/questions/46207198/how-i-can-use-dropdown-from-materialize-css-in-react
  let elems = document.querySelectorAll('.dropdown-trigger');
  M.Dropdown.init(elems, {inDuration: 300, outDuration: 225});

(async function() {
  try { 
    aws.config.setPromisesDependency();
    aws.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1',
  });

  const s3= new aws.S3();

  const response = await s3.listObjectsV2({
    Bucket: process.env.REACT_APP_S3_BUCKET
  }).promise();

    amazonObject.push(response)
    for (let i = 0; i < amazonObject[0].Contents.length; i++) {
      if (amazonObject[0].Contents[i].Size > 0) {
        amazonObjectURL.push(amazonObject[0].Contents[i].Key)
      }
    }

    allImages = amazonObjectURL.map(el => 'https://' + process.env.REACT_APP_S3_BUCKET + '.s3.amazonaws.com/' + el)
    console.log(allImages)

  } catch(e) {
    console.log('error');
  }

})();
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

        if (this.state.counter === allImages.length - 1){
          this.setState({counter: 0})
          this.setState({currentImage: allImages[allImages.length - 1]})
        }

        else {
          this.setState({counter: this.state.counter + 1})       
          this.setState({currentImage: allImages[this.state.counter]})
        }

      }

    render() {
        return (
        
            <div className = 'rightContent'>
              <img className = 'currentCarouselImage' onClick = {this.nextImage} src = {this.state.currentImage} />
              </div>

        )
    }
}

export default RightContent
