import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./forgetPass.css";
import Swal from 'sweetalert2';


function Passwordreset() {
  
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
        
        email: "",
       
       
    },  
    validate: (values) => {
        let errors = {};
       
        if (values.email === "") {
            errors.email = "Please Enter Email Id"
        }
        
       

        return errors;
    },
    onSubmit: async (values) => {
        try {
            var response = await axios.post("https://bookkeeping.onrender.com/register/resetpassword", values);
          console.log(response)
         if(response.status===200){
            Swal.fire({ title:"Email sent to the mail",  icon: 'success', confirmButtonText: 'Okay'});
          navigate("/")
         }
        }
        catch (err) {
            console.log(err.response);
            Swal.fire({ title:err.response.data.message,  icon: 'error', confirmButtonText: 'Okay'});
           
        }
    }


})
  
  return (

<body className="content">
<div className='forgetPage'>
<form onSubmit={formik.handleSubmit}>
<div className='cover2'>
<h1>Reset Password</h1>
<input className="inputReset" type="email" placeholder='Enter Email' name="email" value={formik.values.email} onChange={formik.handleChange}/>

<span className="resetPasserr" style={{ color: 'red' }}>{formik.errors.email}</span>


<button type="submit" className='reset-btn'>Reset Password</button>

<Link to="/register" className='text1'>Don't Have a Account Create?</Link>

<Link to="/" className='text1'>Remember Password Login?</Link>

</div>
</form>
</div>
</body>

  );
}

export default Passwordreset;
