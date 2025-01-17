import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SignIn_img from "./SignIn_img";
import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import api from '../Apis/api';

function Login(){

    const history = useNavigate();

    const [inpValue, setInpValue] = useState({
        email : "",
        password : "",
    })

    const [data, setData] = useState([]);
    // console.log(inpValue);
    const getData = (event) => {
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
            // const reqData = {
            //     email, password
            // }
            api.post("/user/login",  { email, password })
            // axios.post("http://localhost:9000/user/login",  { email, password })
            .then(response => {
                if(response.status === 200){
                    // console.log("🚀 ~ file: Login.js:53 ~ handleData ~ response.data:", response.data)
                    toast.success(response.data?.msg, {
                        position: "top-center",
                    });
                    localStorage.setItem("user", JSON.stringify(response.data?.user))
                    localStorage.setItem("user_token", JSON.stringify(response.data?.token))
                    // localStorage.setItem("loggedin", true)
                    history("/dashboardpage");
                }else{
                    toast.error(response.data?.msg, {
                        position: "top-center",
                    });
                }
            })
            .catch(function (error) {
                toast.error(error.response?.data?.msg, {
                    position: "top-center",
                });
                
            })
       }
    }

  return <>
     <div className="container mt-3">
            <section>
                <div className='row'>
                <div className="col-md-6 mt-3 p-3" >
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
                        <ToastContainer />
                    </Form>

                    <p className='mt-3'>Already Have an Account ? <span><NavLink to="/signup">SignUp</NavLink></span></p>
                    <p><span><NavLink to="/forget-password">Forgot Password</NavLink></span></p>
                </div>
                <div className="col-md-6 mt-3 p-3" >
                   <SignIn_img />
                </div>
                </div>
               
                
            </section>
        </div>
  </>
}

export default Login;