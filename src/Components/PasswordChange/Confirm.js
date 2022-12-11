import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./confirm.css";
import validator from 'validator';


function Confirm() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const test = useParams()
    let formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validate: (value) => {
            let errors = {}
            //Password;
            if (value.password === "") {
                errors.password = "Enter password"
            }
            if (value.confirmPassword === "") {
                errors.confirmPassword = "Enter confirm password"
            }
            return errors
        },
        onSubmit: async (values) => {
            const validate = formik.values.password
            if (validator.isStrongPassword(validate, {
                minLength: 8, minLowercase: 1,
                minUppercase: 1, minNumbers: 1, minSymbols: 1
              })) {
                try {
                    var response =  await axios.post(`http://localhost:3001/register/reset-password-page/${test.id}`, values);
                 console.log(response);
                 if(response.status===200){
                    Swal.fire({ title: response.data.message,  icon: 'success', confirmButtonText: 'okay'});
                 }
                 navigate("/")
                }
                catch (err) {
                    console.log(err.response);
                    
                    if(err.response.data.code === "link"){
                        Swal.fire({ title: "Link expired",  icon: 'error', confirmButtonText: 'okay'});
                        navigate("/");
                    }
                    else if(err.response.data.code === "password"){
                        Swal.fire({ title: "Password Doesn't Match",  icon: 'error', confirmButtonText: 'okay'});
                    }
                }
              } else {
                setErrorMessage(`Password Should Consist min of 8 characters 
                should includes min of 1 lowercase 1 uppercase 1 number and 1 symbol` )
              }
           
        }
    });
    return (
        <>
            {/* <div style={{ margin: "10%", paddingLeft: "30%" }}><Typography variant="h4">
           Create a New Password 
        </Typography>
            <br />
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <TextField id="filled-basic" label="Password"
                        name="password"
                        variant="filled"
                        type="password" style={{ width: "35%" }} placeholder="Enter Your Password"
                        value={formik.values.password} onChange={formik.handleChange}
                    />
                    <br/>                                                
                    <span style={{ color: 'red' }}>{formik.errors.password}</span>

                </div>
                <br />
                <div>
                    <TextField id="filled-basic" label="Confirm Password" variant="filled"
                        name="confirmPassword"
                        type="password" style={{ width: "35%" }}
                        placeholder="Repeat Your Password"
                        value={formik.values.confirmPassword} onChange={formik.handleChange}
                    /><br/>
                     <span style={{ color: 'red' }}>{formik.errors.confirmPassword}</span>
                </div>
                <br/>
                <Button variant="contained" type="submit"> Update Password</Button>


            </form>
            <br />
                


            {/* <h3><Link to={/Resetpassword}>ResetPassword </h3></Link> */}
        {/* </div> */} 
        <body className="reset">
    <div className='resetPage'>
    <form onSubmit={formik.handleSubmit}>
<div className='cover3'>
   <h1>Reset Your Password</h1>
   <input className="inputPassword" type="password" placeholder='Enter Password' name="password" value={formik.values.password} onChange={formik.handleChange}/>
   
   <span className="formikmsg" style={{ color: 'red' }}>{formik.errors.password}</span>

   <input className="inputPassword" type="password" placeholder='Confirm Password' name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange}/>
   
   <span className="formikmsg" style={{ color: 'red' }}>{formik.errors.confirmPassword}</span>
   <span className="errormsg1" style={{ color: "red" }}>{errorMessage}</span>

   
 <button type="submit" className='resetpassword-btn'>Reset Password </button>


 <Link to="/" className='text1'>Login?</Link>
 

</div>
</form>
</div>
</body>
        </>
    )
}

export default Confirm;