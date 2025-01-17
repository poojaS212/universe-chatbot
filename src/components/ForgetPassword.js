// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { Navbar } from "react-bootstrap";
// import api from "../Apis/api";

// const ForgetPassword = () => {
//     const formik = useFormik({
//       initialValues: {
//         email: "",
//       },
//       validationSchema: Yup.object({
//         email: Yup.string().email("Invalid email address").required("Required"),
//       }),
//       onSubmit: (values) => {
//         api
//           .post("/user/forget-password", values)
//           .then((response) => {
//             toast.success("Email sent successfully");
//           })
//           .catch((error) => {
//             console.log(error.response);
//             if (error.response.status === 404) {
//               toast.error("Email not found");
//             } else {
//               toast.error("Server error");
//             }
//           });
//       },
//     });
  
//     return (
//       <>
//         <div className="bg-secondary h-screen">
//           <Navbar />
//           <ToastContainer />
//           <div className="flex justify-center my-32">
//             <div className="bg-white p-16 rounded-lg">
//               <h1 className="text-3xl font-semibold">Forget Password</h1>
//               <form onSubmit={formik.handleSubmit} className="mt-5">
//                 <label
//                   htmlFor="email"
//                   className={`text-sm  ${
//                     formik.touched.email && formik.errors.email
//                       ? "text-red-500"
//                       : ""
//                   }`}
//                 >
//                   {formik.touched.email && formik.errors.email
//                     ? formik.errors.email
//                     : "Email"}
//                 </label>
//                 <motion.input
//                   type="email"
//                   placeholder="Email"
//                   className={`border-2  w-full p-2 focus:outline-none  rounded-md
//                   ${
//                     formik.touched.email && formik.errors.email
//                       ? "border-red-500 focus:border-red-500"
//                       : "focus:border-secondary border-primary"
//                   }`}
//                   onChange={formik.handleChange}
//                   onBlur={formik.handleBlur}
//                   value={formik.values.email}
//                   name="email"
//                   id="email"
//                 />
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   type="submit"
//                   className="bg-primary text-white w-full mt-5 p-2 rounded-md"
//                 >
//                   Send Email
//                 </motion.button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };
  // export default ForgetPassword;

  import React, { useState } from "react";
import axios from "axios";
import api from "../Apis/api";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the forget-password API
      const response = await api.post("/user/forget-password", { email });

      // Handle success
      setMessage(response.data.message);
      setError("");
    } catch (err) {
      // Handle error
      setError(err.response?.data?.message || "An error occurred.");
      setMessage("");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Forgot Password</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ display: "block", width: "100%", margin: "10px 0" }}
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
