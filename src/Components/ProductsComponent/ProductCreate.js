import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';




function ProductCreate() {
    const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
   
      productName: "",
      price: "",
      bought: "",
      description: "",
    
      
    },
    validate: (values)=>{
      let errors = {};
      if (values.productName === "") {
        errors.productName = "Please Enter Product Name"
      }
      if (values.price === "") {
        errors.price = "Please Enter Product price"
      }
      if (values.availableStock === "") {
        errors.availableStock = "Please Enter availableStock"
      }
     
     
      return errors;
      
    },
 
    onSubmit: async (values) => {
     
     try{
      var response = await axios.post("https://bookkeeping.onrender.com/products/createProduct",values={
        productName: values.productName,
        price: values.price,
        bought: values.bought,
        balance: values.bought,
        sold: 0
      },{headers:{
        accesstoken: localStorage.getItem("token"),
    }});
    console.log(response)
    Swal.fire({ title: 'Product Created Successfully',  icon: 'success', confirmButtonText: 'okay'});
    navigate("/products")
  }catch(err){
    console.log(err.response.data.msg)
    Swal.fire({ title: err.response.data.msg,  icon: 'error', confirmButtonText: 'okay'});
    navigate("/products")
  }
      
    }
  })
  return (
    <div className='home'>
    <Sidebar />
    <div className='homeContainer'>
        <Navbar />

        <div className='editProductTitle'>
          Create Product 
        </div>
        <div className="forms">
        <div class="container">
          <form onSubmit={formik.handleSubmit}>
            <div className='product-details'>
              <div className='input-box'>
                <span className='details'>Product Name</span>
                <input type="text"className="editPro" placeholder='Enter product name' name="productName"
                value={formik.values.productName} onChange={formik.handleChange} required/>
                
              </div>
              <div className='input-box'>
                <span className='details'>Product Price</span>
                <input className="editPro" type="number" placeholder='Enter product price' name="price"
                value={formik.values.price} onChange={formik.handleChange} required/>
                
              </div>
              <div className='input-box'>
                <span className='details'>Product Quantity Bought</span>
                <input className="editPro" type="number" placeholder='Enter available stock' name="bought"
                value={formik.values.bought} onChange={formik.handleChange} required/>
                
              </div>
              <div className='input-box'>
                <span className='details'>No of Products Sold</span>
                <input className="editPro" type="number" placeholder='Sold Products'  name="sold"
                value={formik.values.sold} onChange={formik.handleChange} disabled />
              </div>
              <div className='input-box'>
                <span className='details'>Balance Products</span>
                <input className="editPro" type="number" placeholder='Enter balance products' name="balance"
                value={formik.values.balance} onChange={formik.handleChange} disabled/>
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

export default ProductCreate