import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

let baseURL = process.env.REACT_APP_BASEURL

let amazonObject = [];
let amazonItem = [];

require('dotenv').config()
const aws = require('aws-sdk');

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
      Bucket: process.env.REACT_APP_S3_BUCKET,
    }).promise();

      amazonObject.push(response)
      amazonItem = amazonObject[0].Contents


    } catch(e) {
      console.log('error');
    }

  })();
    
  console.log(amazonObject)


if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class Lightboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }
     
    }



    

    render() {
        return (
          
            <div className = 'row lightboardContent'>

            {this.props.lightboards.map((item, index) => {
                 return (
                   <div className = 'logo-choice lightboardItem' key = {item._id} index = {index} >
                     <h4>{item.name}</h4>
                     <img src={item.image}></img>
                     <h6>{item.description}</h6>
                   </div>
                       )
               })}

{amazonItem.map((item, index) => {
                 return (
                   <div className = 'logo-choice lightboardItem' key = {item._id} index = {index} >
                     <h4>{item.Key}</h4>
                   </div>
                       )
               })}

         


            </div>

            
        )
    }
}

export default Lightboard
