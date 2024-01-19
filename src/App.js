import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Form from './components/Form';



const App = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    money: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    await axios.post(`https://razorpaygateway-backend.onrender.com/createOrder`, formData)
      .then(res => {
        console.log(res.data);
        handleOpenRazorPay(res.data);
      })
      .catch(err => {
        console.log(err);
      })
  }

  const handleOpenRazorPay = (data) => {

    const options = {
      key: 'rzp_test_n4xVNJMdkd3LXu',
      amount: data.amount,
      currency: data.currency,
      name: formData.name,
      description: "Tutorial of RazorPay",
      order_id: data.id,
      handler: function (response) {
        axios.post(`https://razorpaygateway-backend.onrender.com/verifyOrder`, {
          response
        })
          .then(res => {
            console.log(res);
            alert("Payment Successfull");
            return axios.post(`https://razorpaygateway-backend.onrender.com/sendMail`, {
              formData,

            });
          })
          .catch(err => {
            console.log(err);
          })

      },
      prefill: {
        name: formData.name,
        email: formData.email,
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#121212"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }



  return (
    <>
      <Form handleChange={handleChange} handleSubmit={handleSubmit} formData={formData} />

    </>
  )
}

export default App