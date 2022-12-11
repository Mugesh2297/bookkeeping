import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';
import "./registerComponent.css";
import Swal from 'sweetalert2';


function RegisterComponent() {
    const navigate = useNavigate();
   
    const [errorMessage, setErrorMessage] = useState('')


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
           
        },  validate: (values) => {
            let errors = {};
            if (values.name === "") {
                errors.name = "Please Enter Name"
            }
            if (values.email === "") {
                errors.email = "Please Enter Email Id"
            }
            if (values.password === "") {
                errors.password = "Please Enter Password"
            }
            if (values.confirmPassword === "") {
                errors.confirmPassword = "Please Enter Confirm Password"
            }
           

            return errors;
        },
        onSubmit: async (values) => {
            const validate = formik.values.password
            if (validator.isStrongPassword(validate, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
              })) {
                try {
                    var response = await axios.post("https://bookkeeping.onrender.com/register/signup", values);
                    localStorage.setItem("token", response.data);
                  if(response.data.code === "newUseradded")  {
                    Swal.fire({ title: response.data.message,  icon: 'success', confirmButtonText: 'Login'});
                    navigate("/");
                  }
                }
                catch (err) {
                    console.log(err.response);
                    
                    if(err.response.data.code === "existUser"){
                        Swal.fire({ title: err.response.data.message,  icon: 'error', confirmButtonText: 'okay'});
                        navigate("/");
                    }
                }
              } else {
                setErrorMessage(`Password Should Consist min of 8 characters 
                should includes min of 1 lowercase 1 uppercase 1 number and 1 symbol` )
              }
           
        }


    })

  return (
//     <div style={{ margin: "10%", paddingLeft: "30%" }}><Typography variant="h4">
//     Sign In
// </Typography>
//     <br />
//     <form onSubmit={formik.handleSubmit}>
//     <div>
//             <TextField id="filled-basic" label="Name"
//                 name="name"
//                 variant="filled"
//                 type="name" style={{ width: "35%" }} placeholder="Enter Your Name"
//                 value={formik.values.name} onChange={formik.handleChange}
//             /><br/>
//             <span style={{ color: 'red' }}>{formik.errors.name}</span>

//         </div> <br />
//         <div>
//             <TextField id="filled-basic" label="Email"
//                 name="email"
//                 variant="filled"
//                 type="email" style={{ width: "35%" }} placeholder="Enter Your Email"
//                 value={formik.values.email} onChange={formik.handleChange}
//             /><br/>
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
//             <span style={{ color: 'red' }}>{formik.errors.password}</span>
//         </div>
//         <br />
//         <div>
//             <TextField id="filled-basic" label="Confirm Password"
//                 name="confirmPassword"
//                 variant="filled"
//                 type="password" style={{ width: "35%" }} placeholder="Enter confirm Password"
//                 value={formik.values.confirmPassword} onChange={formik.handleChange}

//             /><br/><span style={{ color: 'red' }}>{formik.errors.confirmPassword}</span>
//                         <span style={{ color: 'red' }}>{errorMessage}</span>

//         </div><br />
//         <Button variant="contained" type="submit">Register</Button>
//               <br /> <br />

      
        


//     </form>
//     <br />
        


//     {/* <h3><Link to={/Resetpassword}>ResetPassword </h3></Link> */}
// </div>
<body className='registerComp'>
<div className='register'>
    <form onSubmit={formik.handleSubmit}>
<div className='signup'>
   <h1>Signup</h1>
   <input className="entry" type="name" placeholder='Enter Name' name="name" value={formik.values.name} onChange={formik.handleChange}/>
   
   <span className="valueError" style={{ color: 'red' }}>{formik.errors.name}</span>

   <input  className="entry" type="email" placeholder='Enter Email' name="email" value={formik.values.email} onChange={formik.handleChange}/>
   
   <span className="valueError" style={{ color: 'red' }}>{formik.errors.email}</span>

   <input   className="entry" type="password" placeholder='Enter Password'
   value={formik.values.password} onChange={formik.handleChange} name="password"/>
   
   <span className="valueError" style={{ color: 'red' }}>{formik.errors.password}</span>

   <input   className="entry" type="password" placeholder='Confirm Password '
   value={formik.values.confirmPassword} onChange={formik.handleChange} name="confirmPassword"/>
   
   <span className="valueError" style={{ color: 'red' }}>{formik.errors.confirmPassword}</span>

   <span className="errormsg" style={{ color: "red" }}>{errorMessage}</span>
 <button type="submit" className='register-btn'>Register</button>

 <Link  to ="/" className='text'>Have a Account Login?</Link>
 
 <Link to ="/resetpassword" className='text'>Forget Password?</Link>

</div>
</form>
</div>
</body>
  )
}

export default RegisterComponent