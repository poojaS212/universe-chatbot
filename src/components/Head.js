import 'bootstrap/dist/css/bootstrap.min.css';

import { BellOutlined, MailOutlined } from '@ant-design/icons';
import { Badge, Space } from 'antd';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BiLogIn, BiUser } from 'react-icons/bi'
import { NavLink } from 'react-router-dom';

function Head(){
    return <>
       <Navbar bg="light" data-bs-theme="light" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="#home">
            <img width={80} src="https://cdn.propstory.com/magicpages/NAME/16iwl4khzwli8ekjocPS_logo.png"  alt="brand"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            {/* <Nav.Link href="#features">Features</Nav.Link> */}
          </Nav>
          <Nav>
          <NavLink to="/signup">
            <Nav.Link href="#deets">
             <BiUser /> SignUp
             </Nav.Link>
           </NavLink>
           <NavLink to="/login">
           <Nav.Link eventKey={2} href="#memes">
              <BiLogIn />Login
            </Nav.Link>
           </NavLink>
          </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

  
    </>
}

export default Head;