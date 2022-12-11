import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar';
import "./customer.css";

function EditCustomer() {
  const params = useParams()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
        SellerName: "",
      mobile: "",
      email: "",
     
    },
    validate: (values) => {
      let errors = {};
      if (values.CustomerName === "") {
        errors.CustomerName = "Please Enter Customer Name"
      }
      if (values.mobile === "") {
        errors.mobile = "Please Enter Mobile No"
      }
      if (values.email === "") {
        errors.email = "Enter email "
      }
    
      
      return errors;
    },

    onSubmit: async (values) => {
      
     try{
       
       let response =  await axios.put(`https://bookkeeping.onrender.com/customers/updateCustomer/${params.id}`, 
       values,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
      })
     
      console.log(response)
      if(response.status===200){
        Swal.fire({ title: 'Customer Edited Successfully',  icon: 'success', confirmButtonText: 'okay'});
        navigate('/customer');
     
      }
    }catch(err){
      console.log(err)
      if(err.response.data.code === "existCustomer"){
        Swal.fire({ title: err.response.data.message,  icon: 'error', confirmButtonText: 'okay'});
        navigate("/customer");
    }
    
    }
    }
  })

  useEffect(() => {
    loadUser()
  }, [])

  let loadUser = async () => {
    try {
      let user = await axios.get(`https://bookkeeping.onrender.com/customers/getCustomer/${params.id}`,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
     
      });
      console.log("user")
      console.log(user)
    

      formik.setValues({
        
        CustomerName: user.data.CustomerName,
        mobile: user.data.mobile,
        email: user.data.email,
     
      })
    }
    
    catch (error) {
      console.log(error.user)

    }
  }
  return (
    <div className='home'>
    <Sidebar />
    <div className='homeContainer'>
        <Navbar />

        <div className='editProductTitle'>
          Edit Seller Details
        </div>
        <div className="forms">
        <div class="container">
          <form onSubmit={formik.handleSubmit}>
            <div className='product-details'>
              <div className='input-box'>
                <span className='details'>Customer Name</span>
                <input type="text"className="editPro" placeholder='Enter Customer name' name="CustomerName"
                value={formik.values.CustomerName} onChange={formik.handleChange}/>
              </div>
              <div className='input-box'>
                <span className='details'>Mobile No</span>
                <input className="editPro" type="number" placeholder='Enter Mobile No' name="mobile"
                value={formik.values.mobile} onChange={formik.handleChange}/>
              </div>
              <div className='input-box'>
                <span className='details'>Email</span>
                <input className="editPro" type="email" placeholder='Enter Email' name="email"
                value={formik.values.email} onChange={formik.handleChange}/>
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

export default EditCustomer