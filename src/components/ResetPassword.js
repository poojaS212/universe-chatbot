// import { useState } from "react"
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";
// import api from "../Apis/api";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";



// const ResetPassword = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [token, setToken] = useState('');
//     const [message, setMessage] = useState('');
//     const [error, setError] = useState('');

//     const handlePasswordReset = async(e) => {
//         e.preventDefault();
//         setMessage('');
//         setError('');

//         if (!token || !password) {
//             setError('Please provide a valid token and new password.');
//             return;
//         }

//         // if (!token || token.trim() === '') {
//         //     setError('Invalid token. Please try again.');
//         //     return;
//         // }

//         try {
//             const response = await api.post('/user/set-pwd', {
//                 password: password,
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Include the JWT token in the header
//                 },
//             });

//             if (response.status === 200) {
//                 setMessage(response.data.msg);
//             } else {
//                 setError(response.data.msg || 'An error occurred.');
//             }
            
//             console.log('Token:', token);
//             console.log('Password:', password);

//         } catch (err) {
//             setError(err.response?.data?.msg || 'An error occurred. Please try again.');
//         }
//     }
   
//     return (
//         <div className="forgot-password">
//             <h2>Reset Your Password</h2>
//             <form onSubmit={handlePasswordReset}>
//                 <div className="form-group">
//                     <label htmlFor="token">Reset Token</label>
//                     <input
//                         type="text"
//                         id="token"
//                         value={token}
//                         onChange={(e) => setToken(e.target.value)}
//                         placeholder="Enter the token sent to your email"
//                         required
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">New Password</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         placeholder="Enter your new password"
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn">Reset Password</button>
//             </form>

//             {message && <p className="success-message">{message}</p>}
//             {error && <p className="error-message">{error}</p>}
//         </div>
//     );
// }

// const ResetPassword = () => {
//     const formik = useFormik({
//       initialValues: {
//         newPassword: "",
//         confirmPassword: "",
//       },
//       validationSchema: Yup.object({
//         newPassword: Yup.string().required("Required").min(6, "Too Short!"),
//         confirmPassword: Yup.string()
//           .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
//           .required("Required"),
//       }),
//       onSubmit: (values) => {
//         const { newPassword } = values;
//         const token = new URLSearchParams(window.location.search).get('token').toString()

//         console.log({ token })
  
//         api
//           .post(`/users/reset-password/${token}`, { newPassword })
//           .then((response) => {
//             toast.success(response.data.message);
//             setTimeout(() => {
//               window.location.href = "/login";
//             }, 3000);
//           })
//           .catch((error) => {
//             console.log(error.response);
//             toast.error("Your link has expired");
//           });
//       },
//     });
  
//     return (
//       <>
//         <div className="bg-secondary h-screen">
//           {/* <Navbar /> */}
//           <ToastContainer />
//           <div className="flex justify-center my-32">
//             <div className="bg-white p-16 rounded-lg">
//               <h1 className="text-3xl font-semibold">Reset Password</h1>
//               <form onSubmit={ev => {
//                 ev.preventDefault()
//                 const fd = new FormData(ev.currentTarget)
//                 const password = fd.get('newPassword')
//                 const token = new URLSearchParams(window.location.search).get('token').toString()

//                 console.log({ token })
          
//                 api
//                   .post(`/user/reset-password/${token}`, { password })
//                   .then((response) => {
//                     toast.success(response.data.message);
//                     setTimeout(() => {
//                       window.location.href = "/login";
//                     }, 3000);
//                   })
//                   .catch((error) => {
//                     console.log(error.response);
//                     toast.error("Your link has expired");
//                   });

//               }} className="mt-5">
//                 <label
//                   htmlFor="newPassword"
//                   className={`text-sm  ${
//                     formik.touched.newPassword && formik.errors.newPassword
//                       ? "text-red-500"
//                       : ""
//                   }`}
//                 >
//                   {formik.touched.newPassword && formik.errors.newPassword
//                     ? formik.errors.newPassword
//                     : "New Password"}
//                 </label>
//                 <motion.input
//                   type="password"
//                   placeholder="New Password"
//                   className={`border-2 w-full p-2 focus:outline-none rounded-md
//                   ${
//                     formik.touched.newPassword && formik.errors.newPassword
//                       ? "border-red-500 focus:border-red-500"
//                       : "focus:border-secondary border-primary"
//                   }`}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.newPassword}
//                   name="newPassword"
//                   id="newPassword"
//                 />
  
//                 <label
//                   htmlFor="confirmPassword"
//                   className={`text-sm  ${
//                     formik.touched.confirmPassword &&
//                     formik.errors.confirmPassword
//                       ? "text-red-500"
//                       : ""
//                   }`}
//                 >
//                   {formik.touched.confirmPassword && formik.errors.confirmPassword
//                     ? formik.errors.confirmPassword
//                     : "Confirm Password"}
//                 </label>
//                 <motion.input
//                   type="password"
//                   placeholder="Confirm Password"
//                   className={`border-2 w-full p-2 focus:outline-none rounded-md
//                   ${
//                     formik.touched.confirmPassword &&
//                     formik.errors.confirmPassword
//                       ? "border-red-500 focus:border-red-500"
//                       : "focus:border-secondary border-primary"
//                   }`}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.confirmPassword}
//                   name="confirmPassword"
//                   id="confirmPassword"
//                 />
  
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   type="submit"
//                   className="bg-primary text-white w-full mt-5 p-2 rounded-md"
//                 >
//                   Reset Password
//                 </motion.button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };
  
  // export default ResetPassword;


  import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import api from "../Apis/api";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { token } = useParams(); // Get the token from the URL params
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validate passwords
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Call the backend API
      const response = await api.post(`/user/reset-password/${token}`, {
        password,
      });

      // Handle success
      setMessage(response.data.message);
      setError("");
      setTimeout(() => {
        navigate("/login"); // Redirect to login page after success
      }, 3000);
    } catch (err) {
      // Handle error
      setError(err.response?.data?.message || "An error occurred.");
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Reset Password</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleResetPassword}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ display: "block", width: "100%", margin: "10px 0" }}
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ display: "block", width: "100%", margin: "10px 0" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;


// export default ResetPassword;