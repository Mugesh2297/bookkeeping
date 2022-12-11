import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import "./product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { CounterData } from '../Context';


const Product = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        loadData()
    }, [])
    let loadData = async () => {
        setLoading(true)
        let users = await axios.get("http://localhost:3001/products/getProducts", {
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
                let response = await axios.delete(`http://localhost:3001/products/deleteProducts/${id}`,
                    {
                        headers: {
                            accesstoken: localStorage.getItem("token"),
                        }
                    });
                console.log(response)
                Swal.fire({ title: 'Product Deleted Successfully', icon: 'success', confirmButtonText: 'okay' });
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
                    Product Details
                </div>
                <div className="createButton">
                   <button className="addProduct"> <Link className="createProductLink" to="/createproducts">Create Products</Link></button>
                </div>
                
                {
                    isLoading ? <span>Loading...</span> :
                        <div className='contentData'>
                            <div className='tableData'>
                                <table id="customers">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Products</th>
                                            <th>Price</th>
                                            <th>Bought</th>
                                            <th>Sold</th>
                                            <th>Balance</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((user, index) => {
                                                return <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.productName}</td>
                                                    <td>{user.price}</td>
                                                    <td>{user.bought}</td>
                                                    <td>{user.sold}</td>
                                                    <td>{user.balance}</td>
                                                    <td><Link to={`/editProducts/${user._id}`} className="edit" >
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

export default Product