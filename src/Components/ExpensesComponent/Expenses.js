import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import "./expenses.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Expenses() {
    const [users, setUsers] = useState([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        loadData()
    }, [])
    let loadData = async () => {
        setLoading(true)
        let users = await axios.get("http://localhost:3001/expenses/getExpenses", {
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
                let response = await axios.delete(`http://localhost:3001/expenses/deleteExpenses/${id}`,
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
                    Expenses Details
                </div>
                <div className="createButton">
                   <button className="addProduct"> <Link className="createProductLink" to="/createExpenses">Create Expenses</Link></button>
                </div>
                
                {
                    isLoading ? <span>Loading...</span> :
                        <div className='contentData'>
                            <div className='tableData'>
                                <table id="customers">
                                    <thead>
                                        <tr>
                                            <th>S.No</th>
                                            <th>Category</th>
                                            <th>Type</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            users.map((user, index) => {
                                                return <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.transactionName}</td>
                                                    <td>{user.type}</td>
                                                    <td>{user.description}</td>
                                                    <td>{user.amount}</td>
                                                    <td>{user.date}</td>
                                                    <td><Link to={`/editExpenses/${user._id}`} className="edit" >
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

export default Expenses