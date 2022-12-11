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
            var response = await axios.post("http://localhost:3001/register/resetpassword", values);
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
//     <div style={{ margin: "10%", paddingLeft: "30%" }}><Typography variant="h4">
//     Reset Password
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
//         <Button variant="contained" type="submit">Reset Password</Button>
//               <br /><br />
              
        


//     </form>
//     <br />
        
// <div><span><Link to="/">Remember Your password Login??</Link></span></div>
// <br/>
// <div><span><Link to="/register">Don't have a account Register??</Link></span></div>


//     {/* <h3><Link to={/Resetpassword}>ResetPassword </h3></Link> */}
// </div>
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
