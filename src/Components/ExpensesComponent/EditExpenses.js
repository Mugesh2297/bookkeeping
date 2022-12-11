import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar';
import "./expenses.css";

function EditExpenses() {
  const params = useParams()
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
    transactionName: "",
      type: "",
      description: "",
      amount: "",
      date: "",
    },
    validate: (values) => {
      let errors = {};
      if (values.transactionName === "") {
        errors.transactionName = "Please Enter Product Name"
      }
      if (values.type === "") {
        errors.type = "Please Enter Quantity"
      }
      if (values.description === "") {
        errors.description = "Enter No of "
      }
     
      if (values.amount === "") {
        errors.amount = "Please Enter description"
      }
      if (values.date === "") {
        errors.date = "Please Enter description"
      }
      
      return errors;
    },

    onSubmit: async (values) => {
      
     try{
       
       console.log(formik.values.available);
       let response =  await axios.put(`http://localhost:3001/expenses/updateExpenses/${params.id}`, 
       values,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
      })
     
      console.log(response)
      if(response.status===200){
        Swal.fire({ title: 'Product Edited Successfully',  icon: 'success', confirmButtonText: 'okay'});
        navigate('/expenses');
     
      }
    }catch(err){
      console.log(err)
      Swal.fire({ title: err.response.data.msg,  icon: 'error', confirmButtonText: 'okay'});
      navigate("/expenses");
    
    }
    }
  })

  useEffect(() => {
    loadUser()
  }, [])

  let loadUser = async () => {
    try {
      let user = await axios.get(`http://localhost:3001/expenses/getExpenses/${params.id}`,{
        headers:{
          accesstoken: localStorage.getItem("token"),
      }
     
      });
      console.log("user")
      console.log(user)
    

      formik.setValues({
        
        transactionName: user.data.transactionName,
        type: user.data.type,
        description: user.data.description,
        amount: user.data.amount,
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
                    Edit Expense
                </div>
                <div className="forms">
                    <div class="container">
                        <form onSubmit={formik.handleSubmit}>
                            <div className='product-details'>
                                <div className='input-box'>
                                    <span className='details'>Category</span>
                                    <input type="text" className="editPro" placeholder='eg: Salaray, House Rent' name="transactionName"
                                        value={formik.values.transactionName} onChange={formik.handleChange} required />

                                </div>
                                <div className='input-box'>
                                    <span className='details'>Type</span>
                                    <select className="editPro" name="type" value={formik.values.type} onChange={formik.handleChange} required>
                                        <option value={"Investment"}>Investment</option>
                                        <option value={"Savings"}>Savings</option>
                                        <option value={"Expense"}>Expenses</option>
                                    </select>

                                </div>
                                <div className='input-box'>
                                    <span className='details'>Amount</span>
                                    <input className="editPro" type="number" placeholder='amount' name="amount"
                                        value={formik.values.amount} onChange={formik.handleChange} required />

                                </div>
                                <div className='input-box'>
                                    <span className='details'>Description</span>
                                    <input className="editPro" type="text" placeholder='Description' name="description"
                                        value={formik.values.description} onChange={formik.handleChange} required />
                                </div>
                                <div className='input-box'>
                                    <span className='details'>Date</span>
                                    <input className="editPro" type="date" placeholder='Select Date' name="date"
                                        value={formik.values.date} onChange={formik.handleChange}  />
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

export default EditExpenses