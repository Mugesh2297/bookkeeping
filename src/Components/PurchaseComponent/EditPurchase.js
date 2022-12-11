import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar';
import "./purchase.css";

function EditPurchases() {
  const params = useParams()
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
        purchasedName: "",
        sellerName: "",
        category: "",
        price: "",
      date: "",
    },
   

    onSubmit: async (values) => {
      
     try{
       
       console.log(formik.values.available);
       let response =  await axios.put(`https://bookkeeping.onrender.com/purchases/updatePurchase/${params.id}`, 
       values,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
      })
     
      console.log(response)
      if(response.status===200){
        Swal.fire({ title: 'Purchase details Edited Successfully',  icon: 'success', confirmButtonText: 'okay'});
        navigate('/purchases');
     
      }
    }catch(err){
      console.log(err)
      Swal.fire({ title: err.response.data.msg,  icon: 'error', confirmButtonText: 'okay'});
      navigate("/purchases");
    
    }
    }
  })

  useEffect(() => {
    loadUser()
    loadData()
  }, [])

  let loadData = async () => {

    let users = await axios.get("https://bookkeeping.onrender.com/sellers/getSeller", {
        headers: {
            accesstoken: localStorage.getItem("token"),
        }

    });
    console.log(users)
    setUsers(users.data)
}
  let loadUser = async () => {
    try {
      let user = await axios.get(`https://bookkeeping.onrender.com/purchases/getPurchase/${params.id}`,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
     
      });
      console.log("user")
      console.log(user)
    

      formik.setValues({
        
        purchasedName: user.data.purchasedName,
        sellerName: user.data.sellerName,
        category: user.data.category,
        price: user.data.price,
        date: user.data.date,
     
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
            Create Purchase Data
        </div>
        <div className="forms">
            <div class="container">
                <form onSubmit={formik.handleSubmit}>
                    <div className='product-details'>
                        <div className='input-box'>
                            <span className='details'>Purchased Material</span>
                            <input type="text" className="editPro" placeholder='eg: Raw goods, steel' name="purchasedName"
                                value={formik.values.purchasedName} onChange={formik.handleChange} required />

                        </div>

                        <div className='input-box'>
                        <span className='details'>Status </span>
                             <select name="category" id="category" value={formik.values.category} onChange={formik.handleChange} required>
                                <option value="Debit">Debit</option>
                                <option value="Settled">Settled</option>
                                <option value="Partial Settled">Partial Settled</option>
                            </select>

                        </div>
                        <div className='input-box'>
                            <span className='details'>Type</span>
                            <select name="sellerName" id="sellerName" value={formik.values.sellerName} onChange={formik.handleChange} required>
                                {
                                    users.map((user, index) => {


                                        return <option key={index} value={user.SellerName} >{user.SellerName}  </option>

                                    })


                                }

                            </select>


                        </div>
                        <div className='input-box'>
                            <span className='details'>Price</span>
                            <input className="editPro" type="number" placeholder='Price' name="price"
                                value={formik.values.price} onChange={formik.handleChange} required />
                        </div>
                        <div className='input-box'>
                            <span className='details'>Date</span>
                            <input className="editPro" type="date" placeholder='Select Date' name="date"
                                value={formik.values.date} onChange={formik.handleChange} required />
                        </div>
                    </div>
                    <div className='editButton'>
                        <input type="submit" value="Save Details" />
                    </div>
                </form>
            </div>
        </div>

    </div>
</div>
  )
}

export default EditPurchases