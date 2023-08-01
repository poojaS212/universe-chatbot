
import Form from 'react-bootstrap/Form';
import { Dropdown } from 'react-bootstrap/';
import Button from 'react-bootstrap/Button';
import SignIn_img from "./SignIn_img";
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function SignUp(){

    const [inpValue, setInpValue] = useState({
        name : "",
        email : "",
        phone : "",
        company : null,
        password : "",
    })
    // console.log("🚀 ~ file: SignUp.js:21 ~ SignUp ~ inpValue:", inpValue)

    const [data, setData] = useState([]);

    const getData = (event) => {
        // console.log("gee", event.target.value);
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

       const {name, email, phone, password} = inpValue;

        if(name === ""){
            alert("Name field Required")
        }else if(email === ""){
            alert("Email field Required")
        }else if(!email.includes('@')){
            alert("Please enter valid email")
        }else if(phone === ""){
            alert("phone field Required")
        }else if(phone < 10){
            alert("Please enter valid phone number")
        }
        //    else if(company === ""){
        //     alert("Please enter valid company name")
        //    }
        else if(password === ""){
            alert("password field Required")
        }else if(password.length < 5){
            alert("Please enter valid password")
        }else{

        const reqData = {
            name, email, phone, company: selectedOption, password
        }
        // console.log("🚀 ~ file: SignUp.js:63 ~ handleData ~ reqData:", reqData)
     
        
        axios.post("http://localhost:9000/user/register",  { crossdomain: true, reqData })
        .then(response => {
            // console.log("🚀 ~ file: SignUp.js:70 ~ handleData ~ response:", response)
           
            // if(response.data.success)
            if(response.status === 200){
                // localStorage.setItem("userInfo", JSON.stringify([...data,inpValue]))
                // alert(response.statusText)
                toast.success(response.data.msg, {
                    position: "top-center",
                });
            }else{
                toast.error(response.data.msg, {
                    position: "top-center",
                });
            }
        })
        .catch(function (error) {
            // console.log("🚀 ~ file: SignUp.js:86 ~ handleData ~ error:", error)
            // console.log(error);
            toast.error(error.response.data.msg, {
                position: "top-center",
            });
            
         })
       }
    }

    useEffect(() => {
        axios.get("http://localhost:9000/conversation/getCompany")
        .then(res => {
            // console.log("Company Name", res.data.result)
            setData(res.data.result)
        })
        
    }, [])
    // const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');

    const myCompany = data.companies

    const handleSelectChange = (event) => {
        // console.log("🚀 ~ file: SignUp.js:113 ~ handleSelectChange ~ event:", event.target)
        setSelectedOption(event.target.value);
    };

    // console.log("dasasdsd", myCompany)

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

                        <Form.Group className="mb-3 col-lg-6" controlId="formBasicPhone">
                            <Form.Control type="phone" onChange={getData} name="phone" placeholder="Enter phone Number" />
                        </Form.Group>

                        <Form.Select className="mb-3 col-lg-6" aria-label="Default select example" style={{backgroundColor : "#00c67d", width : "50%"}} value={selectedOption} onChange={handleSelectChange} >
                            <option>Open this select menu</option>
                            {myCompany && myCompany?.map((comp) => {
                                return <option value={comp._id} key={comp._id}>{comp.name}</option>
                            })}
                            
                        </Form.Select>

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