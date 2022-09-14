import React, { Component } from 'react';
import { NavLink,Link } from 'react-router-dom';
import LinkupssLogo from './logo';
import Badge from 'react-bootstrap/Badge'
class NavBar extends Component {
    state = {  } 
    render() { 
        return (

          <nav className="nav collapsible">
            <Link className="navbar__brand" to="/"  style={{ textDecoration: 'none' }}><h1 className="text-primary">Linkupss</h1></Link>
            

          <ul className="list nav__list collapsible__content">
                <li className="nav__item"><NavLink className="nav-item nav-link col" to="/setup"><h4 className="text-primary">Setup</h4></NavLink></li>
                <li className="nav__item"><NavLink className="nav-item nav-link col" to="/aboutus"><h4 className="text-primary">About Us</h4></NavLink></li>
                                 
                <li className="nav__item" ><NavLink className= "nav-item nav-link col" to="/products"><h4 className="text-primary">Products</h4></NavLink></li>
               
                <li className="nav__item"><NavLink className="nav-item nav-link col" to="/latestnews"><h4 className="text-primary">Latest News</h4></NavLink></li>
               
               
                <React.Fragment>
                <li className="nav__item"><NavLink className="nav-item nav-link col" to="/loginregister"><h4 className="text-primary"><Badge>Admin ?</Badge></h4></NavLink></li>
                <li className="nav__item"><NavLink className="nav-item nav-link col" to="/loginregister"><h4 className="text-primary"><Badge>Participant ?</Badge></h4></NavLink></li>

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