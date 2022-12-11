import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';




function CreateSeller() {
    const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
   
        SellerName: "",
      mobile: "",
      email: "",
    
      
    },
    validate: (values)=>{
      let errors = {};
      if (values.SellerName === "") {
        errors.SellerName = "Please Enter SellerName"
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
      var response = await axios.post("http://localhost:3001/sellers/createSeller",values,
      {headers:{
        accesstoken: localStorage.getItem("token"),
    }});
    console.log(response)
    Swal.fire({ title: 'Seller Created Successfully',  icon: 'success', confirmButtonText: 'okay'});
    navigate("/seller")
  }catch(err){
    console.log(err.response.data.msg)
    Swal.fire({ title: err.response.data.msg,  icon: 'error', confirmButtonText: 'okay'});
    navigate("/seller")
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
                <span className='details'>Seller Name</span>
                <input type="text"className="editPro" placeholder='Enter Seller Name' name="SellerName"
                value={formik.values.SellerName} onChange={formik.handleChange} required/>
                
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

export default CreateSeller