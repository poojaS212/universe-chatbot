import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Head from './Head';

function Home (){
 
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
          </div>
  </>
}

export default Home;