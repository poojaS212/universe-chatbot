import "../App.css"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Footer(){
   return<>
      <div className="Footer">
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-lg-5 col-12 ft-1">
                <Navbar.Brand href="#home">
                    <img width={80} src="https://cdn.propstory.com/magicpages/NAME/16iwl4khzwli8ekjocPS_logo.png"  alt="brand"/>
                </Navbar.Brand>
                <h5>Address</h5>
                <p>Trinity Coworking Space 26/A, 1st floor, Patel Ram Reddy Rd, K.R.Colony, Krishna Reddy Layout, Domlur, Bengaluru, Karnataka 560071</p>
                </div>
                <div className="col-md-6 col-lg-3 col-12 ft-2">
                    <h5>Contact Us</h5>
                    <p>ashish.mahajan@propstory.com </p>
                    <p><i class="fa-solid fa-phone-volume"></i> +91 9167510950</p>
                </div>
                <div className="col-md-6 col-lg-4 col-12 ft-3">
                    <h5>Follow us</h5>
                    <div className='footer-icons'>
                        <a href="https://www.instagram.com/propstory/"  target="_blank"><i class="fa-brands fa-instagram"></i></a>
                        <a href="https://twitter.com/propstory" target="_blank"><i class="fa-brands fa-square-twitter"></i></a>
                        <a href="https://www.linkedin.com/company/18031950/" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
                        <a href="https://www.facebook.com/PropStoryIndia/" target="_blank"><i class="fa-brands fa-facebook"></i></a>
                    </div>
                    <p>
                        Powered By <a href="https://propstory.in/">PropStory</a>
                    </p>
                </div>
            </div>
        </div>
      </div>
   </>
}

export default Footer
