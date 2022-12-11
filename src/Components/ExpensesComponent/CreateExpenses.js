import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

function CreateExpenses() {
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {

            transactionName: "",
            type: "",
            amount: "",
            description: "",
            date: ""


        },


        onSubmit: async (values) => {
           console.log(values)
            try {
                var response = await axios.post("http://localhost:3001/expenses/createexpense", values , {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    }
                });
                console.log(response)
                Swal.fire({ title: 'Expense Created Successfully', icon: 'success', confirmButtonText: 'okay' });
                navigate("/expenses")
            } catch (err) {
                console.log(err.response.data.msg)
                Swal.fire({ title: err.response.data.message, icon: 'error', confirmButtonText: 'okay' });
                navigate("/expenses")
            }

        }
    })
    return (
        <div className='home'>
            <Sidebar />
            <div className='homeContainer'>
                <Navbar />

                <div className='editProductTitle'>
                    Create Expense
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
                                       <option value={"default"} selected>Select a Type</option>
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

export default CreateExpenses