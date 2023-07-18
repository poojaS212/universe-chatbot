import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SignIn_img from "./SignIn_img";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){
    const history = useNavigate();

    const [inpValue, setInpValue] = useState({
        email : "",
        password : "",
    })

    const [data, setData] = useState([]);
   
    console.log(inpValue);

    const getData = (event) => {
        // console.log(event);
     const {value, name} = event.target;

     setInpValue(() => {
        return {
            ...inpValue,
            [name] : value
        }
     })

    }

    const handleData = (event) => {
       event.preventDefault();

       const getUserInfo = localStorage.getItem("userInfo");
       console.log(getUserInfo);

       const {email, password} = inpValue;

       if(email === ""){
        alert("Email field Required")
       }else if(!email.includes('@')){
        alert("Please enter valid email")
       }else if(password === ""){
        alert("password field Required")
       }else if(password.length < 5){
        alert("Please enter valid password")
       }else{
          if(getUserInfo && getUserInfo.length){
            const userData = JSON.parse(getUserInfo);
            const userLogin = userData.filter((el, k) => {
               return el.email === email && el.password === password
            })

            if(userLogin.length === 0){
                alert("Invalid Details")
            }else{
                console.log("Successful")
                history("/dashboard");

                localStorage.setItem("user_login", JSON.stringify(getUserInfo))
            }
          }
       }
    }

  return <>
     <div className="container mt-3">
            <section className='d-flex justify-content-between'>
                <div className="left_data mt-3 p-3" style={{width: "100%"}}>
                    <h3 className='text-center col-lg-6'>Login</h3>
                    <Form>
                       
                        <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                            <Form.Control type="email" onChange={getData} name="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                            <Form.Control type="password" onChange={getData} name="password" placeholder="Password" />
                        </Form.Group>
                       
                        <Button variant="primary" onClick={handleData} className='col-lg-6' style={{background : "#00c67d"}} type="submit">
                            Submit
                        </Button>
                        </Form>

                        <p className='mt-3'>Already Have an Account ? <span>SignIn</span></p>
                </div>
                <SignIn_img />
            </section>
        </div>
  </>
}

export default Login;