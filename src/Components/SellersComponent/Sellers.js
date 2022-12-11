import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import "./seller.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Sellers = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        loadData()
    }, [])
    let loadData = async () => {
        setLoading(true)
        let users = await axios.get("https://bookkeeping.onrender.com/sellers/getSeller", {
            headers: {
                accesstoken: localStorage.getItem("token"),
            }

        });
        console.log(users)
        setUsers(users.data)
        setLoading(false)
    }
    let deleteProduct = async (id) => {
        try {
            let ask = window.confirm("Are You Sure Want to Delete This Data");
            if (ask) {
                let response = await axios.delete(`https://bookkeeping.onrender.com/sellers/deleteSeller/${id}`,
                    {
                        headers: {
                            accesstoken: localStorage.getItem("token"),
                        }
                    });
                console.log(response)
                Swal.fire({ title: 'Seller Deleted Successfully', icon: 'success', confirmButtonText: 'okay' });
                loadData()
            }
        } catch (error) {
            console.log(error.response);
            Swal.fire({ title: error.response.data.msg, icon: 'error', confirmButtonText: 'okay' });


        }
    }


    return (
        <div className='home'>
            <Sidebar />
            <div className='homeContainer'>
                <Navbar />
                <div className='begin'>
                    Seller Details
                </div>
                <div className="createButton">
                   <button className="addProduct"> <Link className="createProductLink" to="/createseller">Create Seller</Link></button>
                </div>
                
                {
                    isLoading ? <span>Loading...</span> :
                        <div className='contentData'>
                            <div className='tableData'>
                                <table id="customers">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Seller Name</th>
                                            <th>Mobile</th>
                                            <th>Email</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((user, index) => {
                                                return <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.SellerName}</td>
                                                    <td>{user.mobile}</td>
                                                    <td>{user.email}</td>
                                                    <td><Link to={`/editseller/${user._id}`} className="edit" >
                                                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Link>
                                                        <button onClick={() => deleteProduct(user._id)} className="delete">
                                                            <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> </button>

                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                }


            </div>
        </div>
    )
}

export default Sellers