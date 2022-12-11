import React from 'react';
import "./Sidebar.css";
import { faBook, faBookOpen, faBoxesStacked, faCartShopping, faFileInvoice, faMoneyBill1Wave, faPeopleLine, faSackDollar, faTachometer} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar'>
        <div className='top'>
        <FontAwesomeIcon className="bookicon" size="3x" icon={faBook}> </FontAwesomeIcon> <span className='logo'>Bookkeeping</span>
        </div>
        <hr/>
        <div className='center'>
            <ul>
                <li>
                <NavLink to="/home" activeClassName="active" className='nav_link'><FontAwesomeIcon className="navicon" icon={faTachometer}> </FontAwesomeIcon>
                <span className='tags'>Dashboard</span></NavLink>
                </li>
               
                <li>
                <NavLink to="/expenses" activeClassName="active" className='nav_link'><FontAwesomeIcon className="navicon"  icon={faMoneyBill1Wave}> </FontAwesomeIcon>
                <span className='tags'>Expenses</span></NavLink>
                </li>
                <li>
                <NavLink to="/purchases" activeClassName="active" className='nav_link'>
                  <FontAwesomeIcon className="navicon"  icon={faCartShopping}> </FontAwesomeIcon><span className='tags'>Purchases</span></NavLink>
                </li>
                <li>
                <NavLink to="/products" activeClassName="active" className='nav_link'><FontAwesomeIcon className="navicon"  icon={faBoxesStacked}> </FontAwesomeIcon> 
                <span className='tags'>Products</span></NavLink>
                </li>
                {/* <li> */}
                {/* <FontAwesomeIcon className="navicon"  icon={faFileInvoice}> </FontAwesomeIcon><Link to="/invoice" className='nav_link'><span className='tags'>Invoice</span></Link> */}
                {/* </li> */}
                <li>
                <NavLink to="/seller" activeClassName="active" className='nav_link'>
                  <FontAwesomeIcon className="navicon"  icon={faSackDollar}> </FontAwesomeIcon><span className='tags'>Sellers</span></NavLink>
                </li>
                <li>
                <NavLink to="/customer" activeClassName="active" className='nav_link'>
                  <FontAwesomeIcon className="navicon"  icon={faPeopleLine}> </FontAwesomeIcon><span className='tags'>Customers</span></NavLink>
                </li>
            </ul>
        </div>
        <div className="last"> <FontAwesomeIcon  icon={faBookOpen}> </FontAwesomeIcon></div>
    </div>
  )
}

export default Sidebar