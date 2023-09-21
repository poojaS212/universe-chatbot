import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Head from './Head';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import Footer from './Footer';


function Home (){
   const stylesImg = {
     width : '90px'
   }
  return <>
     <Head />
     <div className="container">
            {/* <section className='d-flex align-items-center container'>
                
                <div className="left_data mt-3 p-3" style={{width: "100%"}}>
                    <h2 className=' mt-5 col-lg-8' style={{ color: "#192e36"}}><span style={{color : "#00f3a6"}}>ChatBot</span> Helps You automate customer Service</h2>
                    <p className="mt-5" style={{color : "#086246"}}>A platform where you can get all the details about ChatBot</p>
                    <Button className='text-center mt-3' variant="success" style={{ backgroundColor: "#086246"}}> <NavLink to="/signup" style={{ color: "#fff", textDecoration: "none"}}>Get Started</NavLink></Button>{' '}
                </div>
                <div className="right_data mt-5" style={{width: "100%"}}>
                    <div className='sign_img mt-3'>
                        <img src="./home-img.jpg" style={{width: "500px"}} alt=""/>
                    </div>
                </div>
                
               
                
            </section> */}

            <section className='align-items-center '>
                <div className='row'>
                    <div className='col-md-6'>
                        <div>
                        <h2 className=' mt-5 col-lg-8' style={{ color: "#192e36"}}><span style={{color : "#00f3a6"}}>ChatBot</span> Helps You automate customer Service</h2>
                    <p className="mt-5" style={{color : "#086246"}}>A platform where you can get all the details about ChatBot</p>
                    <Button className='text-center mt-3' variant="success" style={{ backgroundColor: "#086246"}}> <NavLink to="/signup" style={{ color: "#fff", textDecoration: "none"}}>Get Started</NavLink></Button>{' '}
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div>
                        <div className='sign_img mt-3'>
                        <img src="./home-img.jpg" className='main_img' alt=""/>
                    </div>
                        </div>
                    </div>
                </div>
               
               
            </section>

           <section className='align-items-center mt-3 p-3 mb-5'>
             <div className='row'>
                <div>
                        <h2 className='text-center mt-3 p-3'>Why Unibot ?</h2>
                        <h5 className='text-center mt-3 p-3'>A platform where you can get all the details about ChatBot</h5>
                    </div>

                <div className='col-md-4 col-12'>
                    <img src='https://www.tawk.to/wp-content/uploads/2020/08/Get-Close.png' width="100%"/>
                    <h3 className='text-center mt-3 p-3'>Get closed</h3>
                    <p className='text-center'>Your customers have questions before they buy. Be where they are, when they need you, so they have the confidence they need to choose you over the competition. Every time.</p>
                </div>
                <div className='col-md-4 col-12'>
                <img src="https://www.tawk.to/wp-content/uploads/2020/08/Get-Organized.png" width="100%"/>
                    <h3 className='text-center mt-3 p-3'>Get organized</h3>
                    <p className='text-center'>With customer data siloed across so many tools, it’s hard to get a top-down view of the customer journey. Not anymore. You now have one place for all your customer interactions.</p>
                </div>
                <div className='col-md-4 col-12'>
                <img src="https://www.tawk.to/wp-content/uploads/2020/08/Get-in-Front.png" width="100%"/>
                    <h3 className='text-center mt-3 p-3'>Get in front</h3>
                    <p className='text-center'>Easily identify FAQs and capture help center searches to create articles and shortcuts, so agents can respond faster, and customers can get help without having to make contact.</p>
                </div>
             </div>
           </section>

          
            
            
                {/* <Row>
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
                   
                </Row> */}
             
            
    </div>
    <Footer/>
  </>
}

export default Home;