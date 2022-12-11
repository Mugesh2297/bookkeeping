import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';




function CreateCustomer() {
    const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
   
        CustomerName: "",
      mobile: "",
      email: "",
    
      
    },
    validate: (values)=>{
      let errors = {};
      if (values.CustomerName === "") {
        errors.CustomerName = "Please Enter Customer Name"
      }
      if (values.mobile === "") {
        errors.mobile = "Please Enter mobile"
      }
      if (values.email === "") {
        errors.email = "Please Enter email"
      }
     
     
      return errors;
      
    },
 
    onSubmit: async (values) => {
     
     try{
      var response = await axios.post("https://bookkeeping.onrender.com/customers/createCustomer",values,
      {headers:{
        accesstoken: localStorage.getItem("token"),
    }});
    console.log(response)
    Swal.fire({ title: 'Customer Created Successfully',  icon: 'success', confirmButtonText: 'okay'});
    navigate("/customer")
  }catch(err){
    console.log(err.response.data)
    console.log(err.response.data.message)
    if(err.response.data.code === "existCustomer"){
        Swal.fire({ title: err.response.data.message,  icon: 'error', confirmButtonText: 'okay'});
        navigate("/customer");
    }
  
   
  }
      
    }
  })
  return (
    <div className='home'>
    <Sidebar />
    <div className='homeContainer'>
        <Navbar />

        <div className='editProductTitle'>
          Create Seller 
        </div>
        <div className="forms">
        <div class="container">
          <form onSubmit={formik.handleSubmit}>
            <div className='product-details'>
              <div className='input-box'>
                <span className='details'>Customer Name</span>
                <input type="text"className="editPro" placeholder='Enter Customer Name' name="CustomerName"
                value={formik.values.CustomerName} onChange={formik.handleChange} required/>
                
              </div>
              <div className='input-box'>
                <span className='details'>Mobile no</span>
                <input className="editPro" type="number" placeholder='Enter Mobile no' name="mobile"
                value={formik.values.mobile} onChange={formik.handleChange} required/>
                
              </div>
              <div className='input-box'>
                <span className='details'>Email </span>
                <input className="editPro" type="email" placeholder='Enter Email' name="email"
                value={formik.values.email} onChange={formik.handleChange} required/>
                
              </div>
              
            </div>
            <div className='editButton'>
              <input type="submit" value = "Save Details"/>
            </div>
          </form>
        </div>
        </div>
        
        </div>
        </div>
  )
}

export default CreateCustomer