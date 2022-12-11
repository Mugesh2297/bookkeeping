import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar';
import "./product.css";

function ProductEdit() {
  const params = useParams()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      productName: "",
      price: "",
      bought: "",
      sold: "",
      balance: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.productName === "") {
        errors.productName = "Please Enter Product Name"
      }
      if (values.price === "") {
        errors.price = "Please Enter Quantity"
      }
      if (values.bought === "") {
        errors.bought = "Enter No of "
      }
     
      if (values.balance === "") {
        errors.balance = "Please Enter description"
      }
      
      return errors;
    },

    onSubmit: async (values) => {
      
     try{
       
       console.log(formik.values.available);
       let response =  await axios.put(`https://bookkeeping.onrender.com/products/updateProducts/${params.id}`, 
       values= {
        productName: values.productName,
        price: values.price,
        bought: values.bought,
        balance: values.balance - values.sold,
        sold: values.sold

       },{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
      })
     
      console.log(response)
      if(response.status===200){
        Swal.fire({ title: 'Product Edited Successfully',  icon: 'success', confirmButtonText: 'okay'});
        navigate('/products');
     
      }
    }catch(err){
      console.log(err)
      Swal.fire({ title: err.response.data.msg,  icon: 'error', confirmButtonText: 'okay'});
      navigate("/products");
    
    }
    }
  })

  useEffect(() => {
    loadUser()
  }, [])

  let loadUser = async () => {
    try {
      let user = await axios.get(`https://bookkeeping.onrender.com/products/getProducts/${params.id}`,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
     
      });
      console.log("user")
      console.log(user)
    

      formik.setValues({
        
        productName: user.data.productName,
        price: user.data.price,
        bought: user.data.bought,
        sold: user.data.sold,
        balance: user.data.balance,
     
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
          Edit Product Details
        </div>
        <div className="forms">
        <div class="container">
          <form onSubmit={formik.handleSubmit}>
            <div className='product-details'>
              <div className='input-box'>
                <span className='details'>Product Name</span>
                <input type="text"className="editPro" placeholder='Enter product name' name="productName"
                value={formik.values.productName} onChange={formik.handleChange}/>
              </div>
              <div className='input-box'>
                <span className='details'>Product Price</span>
                <input className="editPro" type="number" placeholder='Enter product price' name="price"
                value={formik.values.price} onChange={formik.handleChange}/>
              </div>
              <div className='input-box'>
                <span className='details'>Product Quantity Bought</span>
                <input className="editPro" type="number" placeholder='Enter available stock' name="bought"
                value={formik.values.bought} onChange={formik.handleChange}/>
              </div>
              <div className='input-box'>
                <span className='details'>No of Products Sold</span>
                <input className="editPro" type="number" placeholder='Sold Products'  name="sold"
                value={formik.values.sold} onChange={formik.handleChange}/>
              </div>
              <div className='input-box'>
                <span className='details'>Balance Products</span>
                <input className="editPro" type="number" placeholder='Enter balance products' name="balance"
                value={formik.values.balance} onChange={formik.handleChange}/>
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

export default ProductEdit