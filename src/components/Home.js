import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Head from './Head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';


function Home (){
   const stylesImg = {
     width : '90px'
   }
  return <>
     <Head />
     <div className="container mt-3">
            <section className='d-flex justify-content-between'>
                <div className="left_data mt-3 p-3" style={{width: "100%"}}>
                    <h2 className='text-center mt-5 col-lg-8' style={{ color: "#192e36"}}><span style={{color : "#00f3a6"}}>ChatBot</span> Helps You automate customer Service</h2>
                    <p className="mt-5" style={{color : "#086246"}}>A platform where you can get all the details about ChatBot</p>
                    <Button className='text-center mt-3' variant="success" style={{ backgroundColor: "#086246"}}> <NavLink to="/signup" style={{ color: "#fff", textDecoration: "none"}}>Get Started</NavLink></Button>{' '}
                </div>
                <div className="right_data mt-5" style={{width: "100%"}}>
                    <div className='sign_img mt-3'>
                        <img src="./home-img.jpg" style={{width: "500px"}} alt=""/>
                    </div>
                </div>
            </section>

            
            
            
                <Row>
                    <Col>
                    <h2 className='mt-5' style={{ color: "#192e36"}}><span style={{color : "#00f3a6"}}>How </span> we work</h2>
                <h4 className='mt-3 p-2'>We are passionate about innovation and state of the
art technologies and methodologies</h4>
                    </Col>
                </Row>
           
            
                <Row className=' mt-5'>
                    <Col className='p-3'>
                        <img src="./images/1.jpg" style={stylesImg} alt=""/>
                        <h5>Digital Strategy and Analytics</h5>
                        <p>Carefully crafted digital plans are created by engaging the most effective platform to suit each individual campaign and derive maximum RoI.</p>
                    </Col>
                    <Col className='p-3'>
                        <img src="./images/2.jpg" style={stylesImg} alt=""/>
                        <h5>CRM Implementations</h5>
                        <p>Complete integration of campaigns with any and all CRM tools</p>
                    </Col>
                    <Col className='p-3'>
                    <img src="./images/3.jpg" style={stylesImg} alt=""/>
                       <h5>Paid Media</h5>
                        <p>Google | Facebook & Instagram | LinkedIn | Taboola | TimesNetwork | OutBrain</p>
                    </Col>
                   
                </Row>
          
           
            
            
    </div>
  </>
}

export default Home;