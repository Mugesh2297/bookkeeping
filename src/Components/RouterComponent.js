import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import ActivateEmail from "../Components/ActivateComponent/ActivateEmail";
import Confirm from "../Components/PasswordChange/Confirm";
import LoginComponent from "../Components/LoginComponent/LoginComponent";
import Passwordreset from "../Components/ForgetPassword/Passwordreset";
import RegisterComponent from "../Components/RegisterComponent/RegisterComponent";
import Home from "./Home/Home";
import Product from "./ProductsComponent/Product";
import ProductEdit from "./ProductsComponent/ProductEdit";
import ProductCreate from "./ProductsComponent/ProductCreate";
import Expenses from "./ExpensesComponent/Expenses";
import CreateExpenses from "./ExpensesComponent/CreateExpenses";
import EditExpenses from "./ExpensesComponent/EditExpenses";
import Sellers from "./SellersComponent/Sellers";
import CreateSeller from "./SellersComponent/CreateSeller";
import EditSeller from "./SellersComponent/EditSeller";
import Customer from "./CustomerComponent/Customer";
import CreateCustomer from "./CustomerComponent/CreateCustomer";
import EditCustomer from "./CustomerComponent/EditCustomer";
import Purchase from "./PurchaseComponent/Purchase";
import CreatePurchase from "./PurchaseComponent/CreatePurchase";
import EditPurchases from "./PurchaseComponent/EditPurchase";
 
 function RouterComponent() {
   return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginComponent/>}/>
        <Route path='/resetpassword' element={<Passwordreset/>}/>
        <Route path='/register' element={<RegisterComponent/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/resetpass/:id" element={<Confirm/>}/>
        <Route path="/activateEmail" element={<ActivateEmail/>}/>
        <Route path="/products" element={<Product/>}/>
        <Route path="/createproducts" element={<ProductCreate/>}/>
        <Route path="/editProducts/:id" element={<ProductEdit/>}/>
        <Route path="/expenses" element={<Expenses/>}/>
        <Route path="/createExpenses" element={<CreateExpenses/>}/>
        <Route path="/editExpenses/:id" element={<EditExpenses/>}/>
        <Route path="/seller" element={<Sellers/>}/>
        <Route path="/createseller" element={<CreateSeller/>}/>
        <Route path="/editseller/:id" element={<EditSeller/>}/>
        <Route path="/customer" element={<Customer/>}/>
        <Route path="/createcustomer" element={<CreateCustomer/>}/>
        <Route path="/editcustomer/:id" element={<EditCustomer/>}/>
        <Route path="/purchases" element={<Purchase/>}/>
        <Route path="/createPurchase" element={<CreatePurchase/>}/>
        <Route path="/editPurchase/:id" element={<EditPurchases/>}/>
        
       

    </Routes>
    </BrowserRouter>
    </>
   )
 }
 
 export default RouterComponent

