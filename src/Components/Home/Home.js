import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import "./home.css";
import { Chart, Tooltip, Title, ArcElement, Legend } from "chart.js";
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
Chart.register(
  Tooltip, Title, ArcElement, Legend
);

const data = {
  // labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

function Home() {
  const [products, setProducts] = useState({
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  })
  const [data, setData] = useState({
    labels: [
      'Red',
      'Blue',
      'Yellow'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  });
  const [purchase, setPurchase] = useState(0);

  const [bar, setBar] = useState({
    // labels: labels,
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }]
  })
  const navigate = useNavigate();

  if (!localStorage.getItem("token")) {
    Swal.fire({ title: "Session Expired, Please Login to continue", icon: 'error', confirmButtonText: 'okay' });
    navigate("/");
  }

  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [sold, setSold] = useState(0);
  const [isLoading, setLoading] = useState(false);


  useEffect(() => {
    loadData();
    loadProducts();
    loadPurchase();
  }, [])
  let loadData = async () => {
    setLoading(true)
    let users = await axios.get("https://bookkeeping.onrender.com/expenses/getExpenses", {
      headers: {
        accesstoken: localStorage.getItem("token"),
      }

    });
    totalExpenses(users.data);
    console.log(users.data);
    const lable = [];
    const data = [];
    for (var i of users.data) {
      lable.push(i.transactionName);
      data.push(i.amount);

    }


    setData({
      datasets: [{
        data: data,
        backgroundColor: [
          '#34568b',
          '#8a3333',
          '	#5e338a'
        ]
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: lable
    })
    setLoading(false)
  }
  let loadPurchase = async () => {
    let users = await axios.get("https://bookkeeping.onrender.com/purchases/getPurchase", {
      headers: {
        accesstoken: localStorage.getItem("token"),
      }
     
    });
    totalPurchase(users.data)
  }
  let loadProducts = async () => {
    let users = await axios.get("https://bookkeeping.onrender.com/products/getProducts", {
      headers: {
        accesstoken: localStorage.getItem("token"),
      }

    });

    totalSold(users.data)
    console.log(users.data);
    const lable = [];
    const data = [];
    const sold = [];
    const lables = [];
    for (var i of users.data) {
      lable.push(i.productName);
      lables.push(i.productName);
      data.push(i.balance);
      sold.push(i.sold);
    }
    sumArray(users.data);
    setProducts({
      datasets: [{
        data: sold,
        backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#ff6347', "#ee82ee"],
        hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: lable
    })

    setBar({
      labels: lable,
      datasets: [{
        label: "Products Balance",
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1
      }]
    })

  }

  function sumArray(array) {
    let sum = 0;

    for (let i = 0; i < array.length; i += 1) {
      console.log(array[i].balance);

      sum += array[i].balance;
    }
    console.log(sum);
    setBalance(sum);
  }


  function totalExpenses(array) {
    let initalAmount = 0;

    for (let i = 0; i < array.length; i += 1) {


      initalAmount += array[i].amount;
    }
    setExpenses(initalAmount);

  }
  function totalSold(array) {
    let sold = 0;

    for (let i = 0; i < array.length; i += 1) {


      sold += array[i].sold;
    }
    setSold(sold);

  }
  function totalPurchase(array) {
    let price = 0;

    for (let i = 0; i < array.length; i += 1) {


      price += array[i].price;
    }
    setPurchase(price);

  }
  return (
    <div className='home'>
      <Sidebar />
      <div className='homeContainer'><Navbar />



        <div className='bodymain'>

          <div className='begin'> Chart based On Data
          </div>
          <div className='displayArea'>
            <div className="display1">
              <h4 className="subTitle"><b>Total Balance Product</b></h4>
              <p className="subTitle1">{balance}</p>
            </div>


            <div className="display2">
              <h4 className="subTitle"><b>Total Expense </b></h4>
              <p className="subTitle1">{expenses}</p>
            </div>

            <div className="display3">
              <h4 className="subTitle"><b>Total Sold </b></h4>
              <p className="subTitle1">{sold}</p>
            </div>
            <div className="display4">
              <h4 className="subTitle"><b>Total Purchased Cost</b></h4>
              <p className="subTitle1">{purchase}</p>
            </div>
          </div>
          <div className='chartArea'>
            <div className='chart1'>

              {/* <Doughnut data={data}/> */}


              <p className='subtitle'>Expense Chart</p>
              <Doughnut options={{
                maintainAspectRatio: false,
                tooltips: {
                  backgroundColor: "rgb(255,255,255)",
                  bodyFontColor: "#858796",
                  borderColor: '#dddfeb',
                  borderWidth: 1,
                  xPadding: 15,
                  yPadding: 15,
                  displayColors: false,
                  caretPadding: 10,
                },
                legend: {
                  display: false
                },
                cutoutPercentage: 80,
              }} data={data} />


            </div>

            <div className='chart2'>
              <p className='subtitle'>Products Sold Data </p>
              <Pie
                options={{
                  maintainAspectRatio: false,
                  tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                  },
                  legend: {
                    display: false
                  },
                  cutoutPercentage: 80,
                }} data={products} />

            </div>

          </div>
          
          <div className='barArea'>
            <div className='chart3'>
              <p className='subtitle'>Products Chart Based on Instock </p>
              <Bar
                data={bar} />

            </div>
          </div>


        </div>
      </div>

    </div>
  )
}

export default Home