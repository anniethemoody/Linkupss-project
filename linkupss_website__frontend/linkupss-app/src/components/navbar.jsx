// import React, { Component } from 'react';
// import { NavLink,Link } from 'react-router-dom';
// import LinkupssLogo from './logo';
// import Badge from 'react-bootstrap/Badge'
// class NavBar extends Component {
//     state = { adminName:"" } 
//     componentDidMount(){
//       localStorage.getItem("userToken")
//     }
//     render() { 
//         return (

//           <nav className="nav collapsible">
//             <Link className="navbar__brand" to="/"  style={{ textDecoration: 'none' }}><h1 className="text-primary">Linkupss</h1></Link>
            

//           <ul className="list nav__list collapsible__content">
//                 <li className="nav__item"><NavLink className="nav-item nav-link col" to="/setup"><h4 className="text-primary">Setup</h4></NavLink></li>
//                 <li className="nav__item"><NavLink className="nav-item nav-link col" to="/aboutus"><h4 className="text-primary">About Us</h4></NavLink></li>
                                 
//                 <li className="nav__item" ><NavLink className= "nav-item nav-link col" to="/products"><h4 className="text-primary">Products</h4></NavLink></li>
               
//                 <li className="nav__item"><NavLink className="nav-item nav-link col" to="/latestnews"><h4 className="text-primary">Latest News</h4></NavLink></li>
               
               
//                 <React.Fragment>
//                 <li className="nav__item"><NavLink className="nav-item nav-link col" to="/adminloginregister"><h4 className="text-primary"><button type="button" className="btn btn-outline-primary btn-lg">Admin ?</button></h4></NavLink></li>
//                 <li className="nav__item"><NavLink className="nav-item nav-link col" to="/participantregister"><h4 className="text-primary"><button type="button" className="btn btn-outline-primary btn-lg">Participant ?</button></h4></NavLink></li>

//                 </React.Fragment>
                
  
//           </ul>
   
        
                
//         </nav>
//         );
//     }
// }
 
// export default NavBar;
import React, { Component } from 'react';
import { NavLink,Link } from 'react-router-dom';
import styled from "styled-components";
class NavBar extends Component{
    state = { 
      adminName:"" ,
      prevScrollpos: window.pageYOffset,
      visible: true} 
    componentDidMount(){
      window.addEventListener("scroll", this.handleScroll);
      localStorage.getItem("userToken")
    }
    componentWillUnmount() {
      window.removeEventListener("scroll", this.handleScroll);
    }
    handleScroll = () => {
      const { prevScrollpos } = this.state;
  
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollpos > currentScrollPos;
  
      this.setState({
        prevScrollpos: currentScrollPos,
        visible
      });
    };
    render(){
      return(
        <NavbarBoxRootRootRoot className={this.state.visible ? "navbar-root" : "navbar-hidden"}>
        <NavLink style={{ textDecoration: 'none' }} to="/">
          <Text1>LINKUPSS</Text1>
        </NavLink>
        <Group>
          <GroupA>
          <NavLink style={{ textDecoration: 'none' }} to="/setup">

            <Text2>Setup</Text2>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }} to="/aboutus">
          <Text3>About Us</Text3>
          </NavLink>

           <NavLink style={{ textDecoration: 'none' }} to="/products">

            <Text4>Products</Text4>
           </NavLink>
          </GroupA>
          <GroupB>
            <NavLink style={{ textDecoration: 'none' }} to ="/adminloginregister">

            <Text5>Login</Text5>
            </NavLink>
            <NavLink style={{ textDecoration: 'none' }} to ="/adminloginregister">
            <Text6>Sign Up</Text6>

</NavLink>
          </GroupB>
        </Group>
      </NavbarBoxRootRootRoot>
      )
    }
}
export default NavBar;

const NavbarBoxRootRootRoot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  align-items: flex-start;
  padding: 1.25em 4.5em 1.13em 1.38em;
  background-color: #f8f8f8;
`;
const Text1 = styled.div`
  width: 7.23em;
  height: 54px;
  color: #798dac;
  font-size: 35px;
  font-weight: 700;
  font-family: Outfit;
`;
const Group = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;
const GroupA = styled.div`
  gap: 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0.13em 0px 0px 0px;
`;
const Text2 = styled.div`
  width: 5.32em;
  height: 54px;
  color: #798dac;
  font-size: 25px;
  font-weight: 700;
  font-family: Outfit;
`;
const Text3 = styled.div`
  width: 7.24em;
  height: 54px;
  color: #798dac;
  font-size: 25px;
  font-weight: 700;
  font-family: Outfit;
`;
const Text4 = styled.div`
  width: 6.4em;
  height: 54px;
  color: #798dac;
  font-size: 25px;
  font-weight: 700;
  font-family: Outfit;
`;
const GroupB = styled.div`
  width: 10em;
  height: 56px;
  position: relative;
  gap: 0px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 0px 0px 8.56em;
`;
const Text5 = styled.div`
  width: 5.88em;
  height: 54px;
  left: 0px;
  top: 0px;
  position: absolute;
  color: rgba(243, 110, 90, 0.44);
  font-size: 25px;
  font-weight: 700;
  font-family: Outfit;
`;
const Text6 = styled.div`
  width: 6.4em;
  height: 54px;
  position: relative;
  color: rgba(243, 110, 90, 0.44);
  font-size: 25px;
  font-weight: 700;
  font-family: Outfit;
`;