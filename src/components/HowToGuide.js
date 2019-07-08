import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3000'
} else {
  baseURL = 'https://glass-app-api.herokuapp.com'
}



class HowToGuide extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
       
        }
     
    }



    

    render() {
      return (
          
<div className = 'pdfWrapper'>
        <a href = 'https://jweinst4.s3.amazonaws.com/GlassApp/PDF/How+to+Guides+1.+PowerPoint-Setup-Tutorial.pdf'>Part 1 Download - Setup Tutorial</a>

       <a href = 'https://jweinst4.s3.amazonaws.com/GlassApp/PDF/How+to+Guides+2.+OBS-Tutorial.pdf'>Part 2 Download - OBS Tutorial</a>
       </div>

    )
    }
}

export default HowToGuide
