import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "./activateEmail.css"

function ActivateEmail() {
    const navigate = useNavigate();
    // const [value, setValue] = useState("");
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
                var response = await axios.post("https://bookkeeping.onrender.com/register/activate-account", values);
                console.log(response);
                
                if(response.status === 200){
                    Swal.fire({ title:response.data.message,  icon: 'success', confirmButtonText: 'Okay'});
                   }
                   else if (response.data.code === "active"){
                    console.log(response.data.code)
                    Swal.fire({ title: response.data.message,  icon: 'success', confirmButtonText: 'Okay'});
                   }

                 
                   navigate("/");

            } catch (err) {
                console.log(err.response);
                console.log(err.response.data.message);
                console.log(err.response.status);
                 if (err.response.data.code === "noemail"){
                    Swal.fire({ title: err.response.data.message,  icon: 'error', confirmButtonText: 'okay'});
                   }
                   navigate("/");
              
              
            }
        }
    })


  return (
    <body className="main">
    <div className='activatePage'>
    <form onSubmit={formik.handleSubmit}>
<div className='cover1'>
   <h1>Activate Your Email</h1>
   <input className="inputEmail" type="email" placeholder='Enter Email' name="email" value={formik.values.email} onChange={formik.handleChange}/>
   
   <span className="activeEmail" style={{ color: 'red' }}>{formik.errors.email}</span>
   
   
 <button type="submit" className='activate-btn'>Activate your Email</button>

 <Link to="/register" className='text1'>Don't Have a Account Create?</Link>
 
 <Link to="/resetpassword" className='text1'>Forget Password?</Link>

</div>
</form>
</div>
</body>
  )
}

export default ActivateEmail