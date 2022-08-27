import React, { Component } from 'react';
import FoodBankIcon from "@mui/icons-material/FoodBank";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import HomeIcon from '@mui/icons-material/Home';
import HelpIcon from '@mui/icons-material/Help';
import { Transition } from 'react-transition-group';
import {sidebarStyle,sidebarTransitionStyles,linkStyle,linkTransitionStyles} from '../animations/animations'
class SideBar extends Component {
    state = { animator:false,activeBar:false }; 

    links = [
        { name: "Home", icon: <HomeIcon /> },
        { name: "Account", icon: <AccountCircleIcon /> },
        { name: "Organization", icon: <CorporateFareIcon /> },
        { name: "Settings", icon: <SettingsIcon /> },
        { name: "Need help ?", icon: <HelpIcon /> },
      ]
      handleSidebarState =()=>{
        this.setState({activeBar:!this.state.activeBar});
        this.setState({animator:!this.state.animator});
        //console.log(this.state.activeBar);
      }
    render() { 

        return (
            
                <div className = "sidebar-closed">
                    
                
                <ul className="no-bull">
                {this.links.map(item=>(
                    <li key={item.name} style={{paddingTop:"30px",paddingBottom:"30px"}}>
                        <div className="sidebar__listItem centered sidebar-options" >
                            <div className="sidebar__icon">

                            {item.icon}

                            </div>
                            <div className="">
                            {item.name} 
                            </div>
                            {/* <Transition in={this.state.animator} timeout={0}>
                            {(state) => (
                            <span style={{
                                ...linkStyle,
                                ...linkTransitionStyles[state],
                                }}>{item.name}
                            </span>
                            )}
                            </Transition> */}
                        </div>
                    </li>
                ))}
                </ul>
                </div>
      
            
        );
        
    }
}
 
export default SideBar;