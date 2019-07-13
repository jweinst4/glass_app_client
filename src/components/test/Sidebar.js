import React, { Component } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import "materialize-css/dist/css/materialize.min.css";

class Sidebar extends Component {
    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }

    render() {
        return (
            <div>
            <ul class="sidebar">
            <div className = 'sidebarFolder'>
              <div className = 'sidebarInner'>          
             
                <div className = 'col s12 m12 l12'>
                    <div className = 'sidebarHeader'>Lightboards:</div>
                  {this.props.lightboards.map((item, index) => {
                      return (
                        <Link to={`../lightboards/${item.id}`} >
                          <div className = 'sidebarItem col s12 m12 l12' key = {item._id} index = {index} onClick={() => { 
                                  this.props.changeCurrentShowItem(item) }}>
                            {item.code} 
                          </div>
                        </Link>
                            )
                    })}
                </div>
          
              
              
                <div className = 'col s12 m12 l12'>
                <div className = 'sidebarHeader'>Studios:</div>
                    {this.props.studios.map((item, index) => {
                        return (
                          <Link to={`../studios/${item.id}`} >
                          <div className = 'sidebarItem col s12 m12 l12' key = {item._id} index = {index} >
                            {item.code} 
                          </div>
                        </Link>
                              )
                      })}
                </div>
            
                <div className = 'col s12 m12 l12'>
                <div className = 'sidebarHeader'>Accessories:</div>
                  {this.props.accessories.map((item, index) => {
                      return (
                        <Link to={`../accessories/${item.id}`} >
                        <div className = 'sidebarItem col s12 m12 l12' key = {item._id} index = {index} >
                          {item.code}
                        </div>
                      </Link>
                          )
                  })}
                </div>
            
            </div>
  </div>
</ul>


</div>
         
        );
    }
}

export default Sidebar;