import React, { Component } from 'react';
import { NavLink,Link } from 'react-router-dom';
import LinkupssLogo from './logo';
class NavBar extends Component {
    state = {  } 
    render() { 
        return (

          <nav className="nav collapsible">
            <Link className="navbar__brand" to="/"  style={{ textDecoration: 'none' }}>Linkupss</Link>
            

          <ul className="list nav__list collapsible__content">
                <li className="nav__item"><NavLink className="nav-item nav-link col" to="/setup">Set Up</NavLink></li>
                <li className="nav__item"><NavLink className="nav-item nav-link col" to="/aboutus">About Us</NavLink></li>
                                 
                <li className="nav__item" ><NavLink className= "nav-item nav-link col" to="/products">Products</NavLink></li>
               
                <li className="nav__item"><NavLink className="nav-item nav-link col" to="/latestnews">Latest News</NavLink></li>
               
               
                <React.Fragment>
                <li className="nav__item"><NavLink className="nav-item nav-link col" to="/">Login</NavLink></li>
                <li className="nav__item"><NavLink className="nav-item nav-link col" to="/">Register</NavLink></li>
                </React.Fragment>
                
  
          </ul>
   
















                 
    
                
               {/* 
                <React.Fragment>
                <li><NavLink className="nav-item nav-link" to='/'>Log Out</NavLink></li>
                <li><NavLink className="nav-item nav-link btn-primary name_badge tool" to="/">{props.user['name']}</NavLink></li>
        
                </React.Fragment>
                */}
                
        
       
    
          
        </nav>
        );
    }
}
 
export default NavBar;