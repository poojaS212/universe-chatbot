
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SignIn_img from "./SignIn_img";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp(){

    const [inpValue, setInpValue] = useState({
        name : "",
        email : "",
        date : "",
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

       const {name, email, date, password} = inpValue;

       if(name === ""){
         alert("Name field Required")
       }else if(email === ""){
        alert("Email field Required")
       }else if(!email.includes('@')){
        alert("Please enter valid email")
       }else if(date === ""){
        alert("date field Required")
       }else if(password === ""){
        alert("password field Required")
       }else if(password.length < 5){
        alert("Please enter valid password")
       }else{

        const reqData = {
            name, email, date, password
        }

        axios.post("http://localhost:9000/user/register",  { crossdomain: true, reqData })
        .then(response => {
            console.log("🚀 ~ file: SignUp.js:55 ~ axios.get ~ response:", response.data)
           
            // if(response.data.success)
            if(response.status === 200){
                localStorage.setItem("userInfo", JSON.stringify([...data,inpValue]))
                // alert(response.statusText)
                toast.success('SuccessFul', {
                    position: "top-center",
                    });
            }else{
              
                alert(response.data.message);


            }
            
        })
        .catch(function (error) {

            console.log(error);
            toast.error('error', {
                position: "top-center",
                });
            
         })


         
       }
    }


    return <>
        <div className="container mt-3">
            <section className='d-flex justify-content-between'>
                <div className="left_data mt-3 p-3" style={{width: "100%"}}>
                    <h3 className='text-center col-lg-6'>Sign Up</h3>
                    <Form>
                        <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                            <Form.Control type="text" onChange={getData} name="name" placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                            <Form.Control type="email" onChange={getData} name="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
                            <Form.Control onChange={getData} name="date" type="date" />
                        </Form.Group>

                        <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
                            <Form.Control type="password" onChange={getData} name="password" placeholder="Password" />
                        </Form.Group>
                        {/* <Form.Group className="mb-3 col-lg-6" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <Button variant="primary" onClick={handleData} className='col-lg-6' style={{background : "#00c67d"}} type="submit">
                            Submit
                        </Button>
                        <ToastContainer />
                        </Form>

                        <p className='mt-3'>Already Have an Account ? <span><NavLink to="/login">SignIn</NavLink></span></p>
                </div>
                <SignIn_img />
            </section>
        </div>
    </>
}

export default SignUp;