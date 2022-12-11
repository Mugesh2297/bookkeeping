import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./loginComponent.css";



function LoginComponent() {
    const navigate = useNavigate();
    const [value, setValue] = useState("");
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validate: (values) => {
            let errors = {};
            if (values.email === "") {
                errors.email = "Please Enter Email Id"
            }
            if (values.password === "") {
                errors.password = "Please Enter Password"
            }

            return errors;
        },

        onSubmit: async (values) => {
            try {
                var response = await axios.post("https://bookkeeping.onrender.com/register/signin", values);
                console.log(response)
                localStorage.setItem("token", response.data);
                navigate("/home");


            } catch (err) {
                console.log(err.response);
                console.log(err.response.data.msg);
               if(err.response.data.code === "email"){
                setValue(err.response.data.msg)
               }
               else if (err.response.data.code === "password"){
                setValue(err.response.data.msg)
               }
               else if (err.response.data.code === "user"){
                Swal.fire({ title: err.response.data.msg,  icon: 'error', confirmButtonText: 'okay'});
               }
            }
        }
    })
    return (
        // <div className="main">
            
        //     <Typography variant="h4">
           
        //     Sign In
        // </Typography>
        //     <br />
        //     <form onSubmit={formik.handleSubmit}>
        //         <div>
        //             <TextField id="filled-basic" label="Email"
        //                 name="email"
        //                 variant="filled"
        //                 type="email" style={{ width: "35%" }} placeholder="Enter Your Email"
        //                 value={formik.values.email} onChange={formik.handleChange}
        //             />
        //             <br/>                                                
        //             <span style={{ color: 'red' }}>{formik.errors.email}</span>

        //         </div>
        //         <br />
        //         <div>
        //             <TextField id="filled-basic" label="Password" variant="filled"
        //                 name="password"
        //                 type="password" style={{ width: "35%" }}
        //                 placeholder="Enter Your Password"
        //                 value={formik.values.password} onChange={formik.handleChange}
        //             /><br/>
        //              <span style={{ color: 'red' }}>{formik.errors.password}</span>
        //         </div>
        //        <div>
        //        <span style={{ color: "red" }}>{value}</span></div>
        //         <br />
        //         <Button variant="contained" type="submit">SignIn</Button>
        //               <br /> <br />

        //        <Link to="/register">Don't have an Account Signup</Link>
        //        <br />  <br />
        //         <Link to="/resetpassword">Forget Password</Link>
                


        //     </form>
        //     <br />
                

          
        //     {/* <h3><Link to={/Resetpassword}>ResetPassword </h3></Link> */}
        // </div>
        <body className='loginCom'>
        <div className='page'>
            <form onSubmit={formik.handleSubmit}>
        <div className='cover'>
           <h1>Login</h1>
           <input type="email" className="login" placeholder='Enter Email' name="email" value={formik.values.email} onChange={formik.handleChange}/>
           
           <span className="valueError"  style={{ color: 'red' }}>{formik.errors.email}</span>
           <input type="password" className="login"  placeholder='Enter Password'
           value={formik.values.password} onChange={formik.handleChange} name="password"/>
           
           <span className="valueError" style={{ color: 'red' }}>{formik.errors.password}</span>
           <span className="valueError" style={{ color: "red" }}>{value}</span>
         <button type="submit" className='login-btn'>Signin</button>

         <Link  to ="/register" className='text'>Don't Have a Account Create?</Link>
         
         <Link to ="/resetpassword" className='text'>Forget Password?</Link>

        </div>
        </form>
       
        </div>
        <div className="testing">
           <p> For testing use:</p>
            <p>email: mugeshkumark22@gmail.com</p>
            <p>password: Mugesh@22</p>
        </div>
        </body>
    )
}

export default LoginComponent