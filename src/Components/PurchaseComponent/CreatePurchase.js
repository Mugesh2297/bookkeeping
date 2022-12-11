import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

function CreatePurchase() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);

    useEffect(() => {
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
    const formik = useFormik({
        initialValues: {

            purchasedName: "",
            sellerName: "",
            category:"",
            price: "",
            date: ""


        },


        onSubmit: async (values) => {
            console.log(values)
            try {
                var response = await axios.post("https://bookkeeping.onrender.com/purchases/createPurchase", values, {
                    headers: {
                        accesstoken: localStorage.getItem("token"),
                    }
                });
                console.log(response)
                Swal.fire({ title: 'Purchase Data Created Successfully', icon: 'success', confirmButtonText: 'okay' });
                navigate("/purchases")
            } catch (err) {
                console.log(err.response.data.msg)
                Swal.fire({ title: err.response.data.message, icon: 'error', confirmButtonText: 'okay' });
                navigate("/purchases")
            }

        }
    })
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
                                       <option value="default" selected>Select Status</option>
                                        <option value="Debit">Debit</option>
                                        <option value="Settled">Settled</option>
                                        <option value="Partial Settled">Partial Settled</option>
                                    </select>

                                </div>
                                <div className='input-box'>
                                    <span className='details'>Type</span>
                                    <select name="sellerName" id="sellerName" value={formik.values.sellerName} onChange={formik.handleChange} required>
                                        <option value="default" selected>Select a Seller Name</option>
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

export default CreatePurchase